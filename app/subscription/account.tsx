'use client';

import { Check, Copy, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Auth, User as FirebaseUser } from 'firebase/auth';
import { API_BASE, firebaseConfig, isFirebaseConfigured } from './config';
import { subscriptionCopy, type SubscriptionCopy } from './copy';
import { currencyForCountry, formatMoney, type Currency } from './currency';
import { useCurrency } from './currencyStore';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { formatByn, mailtoOrder, orderTemplate, planCopy, plans, prices, type Plan } from './merchant';
import { Money } from './Money';
import { MoonPhase } from './MoonPhase';
import { Button, Spinner } from './ui';

type Provider = 'apple.com' | 'google.com';
type CheckoutMode = 'off' | 'test' | 'prod';
type WebConfig = { checkoutMode: CheckoutMode; plans: { id: string; days: number; priceByn: number }[] };
type Me = { premiumUntil: string | null; blocked: boolean };
type Account = { uid: string; email: string | null; provider: string };
type ErrorKey = keyof SubscriptionCopy['checkout'] | 'popupBlocked' | 'signInError';

type State = {
  ready: boolean;
  configured: boolean;
  config: WebConfig | null;
  user: Account | null;
  me: Me | null;
  busy: 'signin' | 'order' | null;
  error: ErrorKey | null;
  errorOrigin: string | null;
  requestPlan: Plan | null;
};

type Api = State & {
  lang: Lang;
  copy: SubscriptionCopy;
  currency: Currency;
  signIn: (provider: Provider, origin?: string) => Promise<Account | null>;
  signOut: () => Promise<void>;
  createOrder: (planId: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  clearError: () => void;
  openRequest: (plan: Plan | null) => void;
};

const Ctx = createContext<Api | null>(null);

async function getAuthInstance(): Promise<Auth> {
  const [{ getApps, initializeApp }, { getAuth, browserSessionPersistence, setPersistence }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // Session persistence: a token stolen from storage is worth nothing once
  // the tab closes, and a shared family computer never keeps the parent
  // signed in by accident.
  await setPersistence(auth, browserSessionPersistence).catch(() => {});
  return auth;
}

// Updater factories live outside the components so no catch-block local is
// captured by a closure (the React Compiler lint rejects that shape).
const settled = (error: ErrorKey | null, origin: string) => (s: State): State => ({ ...s, busy: null, error, errorOrigin: error ? origin : null });

function orderErrorFor(status: number, code: string | undefined, mode: CheckoutMode | undefined): ErrorKey {
  if (status === 429) return 'rateLimited';
  if (code === 'checkout_unavailable') return mode === 'test' ? 'testOnly' : 'unavailable';
  if (code === 'account_blocked') return 'blocked';
  return 'error';
}

function signInErrorFor(code: string): ErrorKey | null {
  if (code === 'auth/popup-blocked') return 'popupBlocked';
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return null;
  return 'signInError';
}

function toAccount(user: FirebaseUser): Account {
  const provider = user.providerData[0]?.providerId ?? 'apple.com';
  return { uid: user.uid, email: user.email, provider };
}

export function AccountProvider({ lang, country, children }: { lang: Lang; country?: string | null; children: ReactNode }) {
  const copy = subscriptionCopy[lang];
  const authRef = useRef<Auth | null>(null);
  // Kept from initialisation so sign-in opens its popup synchronously inside
  // the click — Safari blocks a window opened after an awaited import.
  const authModRef = useRef<typeof import('firebase/auth') | null>(null);
  const [state, setState] = useState<State>({
    ready: !isFirebaseConfigured,
    configured: isFirebaseConfigured,
    config: null,
    user: null,
    me: null,
    busy: null,
    error: null,
    errorOrigin: null,
    requestPlan: null,
  });
  const currency = useCurrency(currencyForCountry(country));

  const getToken = useCallback(async () => {
    const user = authRef.current?.currentUser;
    if (!user) return null;
    return user.getIdToken().catch(() => null);
  }, []);

  const loadMe = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/v1/web/me`, { headers: { 'X-Firebase-Token': token } });
      if (!res.ok) return;
      const me = (await res.json()) as Me;
      setState((s) => ({ ...s, me }));
    } catch {
      // The account still works without the entitlement line.
    }
  }, [getToken]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/v1/web/config`)
      .then((res) => (res.ok ? (res.json() as Promise<WebConfig>) : null))
      .then((config) => {
        if (!cancelled && config) setState((s) => ({ ...s, config }));
      })
      .catch(() => {});
    if (!isFirebaseConfigured) return () => { cancelled = true; };

    let unsubscribe = () => {};
    (async () => {
      const auth = await getAuthInstance();
      if (cancelled) return;
      authRef.current = auth;
      const mod = await import('firebase/auth');
      authModRef.current = mod;
      unsubscribe = mod.onAuthStateChanged(auth, (user) => {
        setState((s) => ({ ...s, ready: true, user: user ? toAccount(user) : null, me: user ? s.me : null }));
        if (user) void loadMe();
      });
    })().catch(() => setState((s) => ({ ...s, ready: true })));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [loadMe]);

  const signIn = useCallback(
    async (providerId: Provider, origin = 'panel') => {
      const auth = authRef.current;
      if (!auth) return null;
      setState((s) => ({ ...s, busy: 'signin', error: null, errorOrigin: null }));
      try {
        const { GoogleAuthProvider, OAuthProvider, signInWithPopup } = authModRef.current ?? (await import('firebase/auth'));
        const provider = providerId === 'apple.com' ? new OAuthProvider('apple.com') : new GoogleAuthProvider();
        if (provider instanceof OAuthProvider) {
          provider.addScope('email');
          provider.addScope('name');
          provider.setCustomParameters({ locale: lang });
        }
        const result = await signInWithPopup(auth, provider);
        const account = toAccount(result.user);
        setState((s) => ({ ...s, busy: null, user: account }));
        void loadMe();
        return account;
      } catch (err) {
        setState(settled(signInErrorFor((err as { code?: string }).code ?? ''), origin));
        return null;
      }
    },
    [lang, loadMe],
  );

  const signOut = useCallback(async () => {
    const auth = authRef.current;
    if (!auth) return;
    const { signOut: fbSignOut } = await import('firebase/auth');
    await fbSignOut(auth);
    setState((s) => ({ ...s, user: null, me: null, error: null }));
  }, []);

  const checkoutMode = state.config?.checkoutMode;
  const createOrder = useCallback(
    async (planId: string) => {
      const token = await getToken();
      if (!token) return;
      setState((s) => ({ ...s, busy: 'order', error: null, errorOrigin: null }));
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Firebase-Token': token },
          body: JSON.stringify({ planId, lang }),
        });
        const body = (await res.json().catch(() => ({}))) as { redirectUrl?: string; error?: string };
        if (res.ok && body.redirectUrl && /^https:\/\/(securesandbox|payment)\.webpay\.by\//.test(body.redirectUrl)) {
          window.location.assign(body.redirectUrl);
          return;
        }
        setState(settled(orderErrorFor(res.status, body.error, checkoutMode), planId));
      } catch {
        setState(settled('error', planId));
      }
    },
    [getToken, lang, checkoutMode],
  );

  const clearError = useCallback(() => setState((s) => ({ ...s, error: null, errorOrigin: null })), []);
  const openRequest = useCallback((plan: Plan | null) => setState((s) => ({ ...s, requestPlan: plan, error: null, errorOrigin: null })), []);

  const api = useMemo<Api>(
    () => ({ ...state, lang, copy, currency, signIn, signOut, createOrder, getToken, clearError, openRequest }),
    [state, lang, copy, currency, signIn, signOut, createOrder, getToken, clearError, openRequest],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const api = useContext(Ctx);
  if (!api) throw new Error('useAccount outside AccountProvider');
  return api;
}

function providerName(id: string) {
  return id === 'google.com' ? 'Google' : id === 'apple.com' ? 'Apple' : id;
}

function IconSwap({ copied, size }: { copied: boolean; size: string }) {
  const Icon = copied ? Check : Copy;
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex"
        exit={{ opacity: 0, scale: 0.6 }}
        initial={{ opacity: 0, scale: 0.6 }}
        key={copied ? 'check' : 'copy'}
        transition={{ duration: 0.15 }}
      >
        <Icon className={size} aria-hidden="true" />
      </motion.span>
    </AnimatePresence>
  );
}

function CopyInline({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      type="button"
    >
      <IconSwap copied={copied} size="h-3.5 w-3.5" />
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}

export function AccountPanel() {
  const { ready, configured, user, me, busy, error, errorOrigin, copy, lang, signIn, signOut } = useAccount();

  // Until sign-in is configured the request form is the whole funnel; the
  // page already says what happens next, so the panel stays out of the way.
  if (!configured) return null;
  if (!ready) {
    return (
      <p className="mt-7 inline-flex items-center gap-2 text-sm text-white/60">
        <Spinner /> {copy.account.checking}
      </p>
    );
  }
  if (!user) {
    return (
      <div className="mt-7 max-w-xl">
        <div className="flex flex-wrap gap-2">
          <Button disabled={busy === 'signin'} onClick={() => void signIn('apple.com')} variant="light">
            {busy === 'signin' ? <Spinner /> : <AppleMark />}
            {copy.account.signInApple}
          </Button>
          <Button disabled={busy === 'signin'} onClick={() => void signIn('google.com')} variant="ghost">
            {copy.account.signInGoogle}
          </Button>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/55">{copy.account.why}</p>
        {errorOrigin === 'panel' && (error === 'popupBlocked' || error === 'signInError') ? (
          <p className="mt-2 text-sm text-[#FCA5A5]" role="alert">
            {copy.account[error]}
          </p>
        ) : null}
      </div>
    );
  }

  const active = me?.premiumUntil && new Date(me.premiumUntil) > new Date();
  return (
    <div className="glass mt-7 grid max-w-xl gap-3 rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-4 backdrop-blur-xl sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF2FF] text-base font-bold text-[#1E1B4B]" aria-hidden="true">
        {(user.email ?? user.uid).slice(0, 1).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-white/60">
          {copy.account.signedInAs} <span className="text-white">{user.email ?? '—'}</span> · {copy.account.via(providerName(user.provider))}
        </p>
        <p className={`mt-0.5 text-sm font-semibold ${active ? 'text-[#FDE68A]' : 'text-white/70'}`}>
          {active && me?.premiumUntil ? copy.account.activeUntil(formatDate(me.premiumUntil, lang)) : copy.account.noSubscription}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
          {copy.account.accountCode}: <code className="rounded bg-black/20 px-1.5 py-0.5 text-white/80">{user.uid}</code>
          <CopyInline done={copy.account.copied} label={copy.account.copy} value={user.uid} />
        </p>
      </div>
      <button
        className="inline-flex min-h-10 items-center gap-2 self-start rounded-full px-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:self-center"
        onClick={() => void signOut()}
        type="button"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        {copy.account.signOut}
      </button>
    </div>
  );
}

function AppleMark() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.37 12.64c0-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.47-1.89-1.48-.15-2.88.87-3.63.87-.75 0-1.9-.85-3.13-.83-1.61.02-3.09.94-3.92 2.38-1.67 2.9-.43 7.2 1.2 9.55.8 1.15 1.74 2.45 2.98 2.4 1.2-.05 1.65-.78 3.1-.78 1.44 0 1.85.78 3.12.75 1.29-.02 2.1-1.17 2.89-2.33.91-1.34 1.29-2.63 1.31-2.7-.03-.01-2.51-.96-2.5-3.82ZM14 5.6c.66-.8 1.1-1.9.98-3-.95.04-2.1.63-2.78 1.43-.61.7-1.14 1.83-1 2.9 1.06.08 2.14-.54 2.8-1.33Z" />
    </svg>
  );
}

export function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const { ready, configured, config, user, busy, error, errorOrigin, copy, lang, currency, signIn, createOrder, openRequest } = useAccount();
  const text = planCopy[lang][plan.id];
  const amount = prices[plan.id][currency];
  const price = formatMoney(amount, currency, lang);
  const perWeekAmount = (amount / plan.days) * 7;
  const perWeek = formatMoney(perWeekAmount, currency, lang);
  const cheaper = Math.round((1 - perWeekAmount / prices.week[currency]) * 100);
  const live = configured && (config?.checkoutMode ?? 'off') !== 'off';
  const [pending, setPending] = useState(false);

  const pay = async () => {
    setPending(true);
    try {
      const account = user ?? (await signIn('apple.com', plan.id));
      if (account) await createOrder(plan.id);
    } finally {
      setPending(false);
    }
  };

  const variant = featured ? 'dark' : 'light';
  const muted = featured ? 'text-[#1E1B4B]/65' : 'text-white/65';
  const strong = featured ? 'text-[#1E1B4B]' : 'text-white';
  const showError = pending || busy === 'order' || errorOrigin !== plan.id ? null : error;
  const fallbackNeeded = showError === 'unavailable' || showError === 'testOnly' || showError === 'blocked' || showError === 'error';

  return (
    <article
      className={`spotlight relative flex w-full min-w-0 flex-col rounded-[1.75rem] border p-6 transition hover:-translate-y-1 ${
        featured
          ? 'spotlight-dark order-first border-[#FDE68A]/60 bg-[#EEF2FF] text-[#1E1B4B] shadow-[0_28px_80px_rgb(99_102_241/30%)] md:order-none'
          : 'border-white/20 bg-white/[0.12] backdrop-blur-xl hover:border-white/35'
      }`}
    >
      {featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-[#FDE68A] px-3 py-1 text-xs font-bold text-[#1E1B4B]">{copy.plans.bestValue}</span>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-2xl font-semibold ${strong}`}>{text.title}</h3>
          <p className={`mt-1 text-sm ${muted}`}>{text.days}</p>
        </div>
        <MoonPhase plan={plan.id} className="h-14 w-14 shrink-0" />
      </div>
      <p className={`mt-4 text-sm leading-6 ${featured ? 'text-[#1E1B4B]/80' : 'text-white/75'}`}>{text.purpose}</p>
      <p className={`mt-6 text-4xl font-semibold tabular-nums sm:text-5xl ${strong}`}>
        <Money text={price} />
      </p>
      <p className={`mt-2 min-h-6 text-sm leading-6 ${muted}`}>
        <Money text={plan.id === 'week' ? '\u00A0' : `${copy.plans.perWeek(perWeek)} · ${copy.plans.cheaper(cheaper)}`} />
      </p>
      <div className="mt-auto pt-6">
        <Button
          className="w-full"
          disabled={live && (!ready || pending || busy !== null)}
          onClick={() => (live ? void pay() : openRequest(plan))}
          variant={variant}
        >
          {pending || busy === 'order' ? <Spinner /> : null}
          {pending || busy === 'order' ? copy.checkout.creating : copy.plans.pay}
        </Button>
        {showError ? (
          <p className={`mt-3 text-sm leading-5 ${featured ? 'text-[#B45309]' : 'text-[#FCA5A5]'}`} role="alert">
            {showError === 'popupBlocked' || showError === 'signInError'
              ? copy.account[showError]
              : copy.checkout[showError as keyof SubscriptionCopy['checkout']] ?? copy.checkout.error}
            {fallbackNeeded ? (
              <>
                {' '}
                <a className="underline" href={mailtoOrder(lang, plan, user?.uid)}>
                  {copy.plans.order}
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}

// What happens after the button: the live sequence once sign-in and checkout
// are configured, the request-form sequence until then.
export function FlowNote({ className }: { className?: string }) {
  const { configured, config, copy } = useAccount();
  const live = configured && (config ? config.checkoutMode !== 'off' : true);
  return <p className={className}>{live ? copy.hero.nextLive : copy.hero.nextRequest}</p>;
}

export function ManualOrder() {
  const { user, copy, lang, openRequest } = useAccount();
  const template = orderTemplate(lang, undefined, user?.uid);
  return (
    <div className="mt-8 grid gap-6 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 lg:grid-cols-[1fr_auto] lg:items-center">
      <div className="grid gap-2 text-sm leading-6 text-white/65">
        <p className="text-base font-semibold text-white">{copy.steps.manualTitle}</p>
        <p>{copy.steps.manualBody}</p>
        {user ? (
          <p className="flex flex-wrap items-center gap-2 text-xs text-white/50">
            {copy.steps.manualCode}: <code className="rounded bg-black/20 px-1.5 py-0.5 text-white/80">{user.uid}</code>
            <CopyInline done={copy.account.copied} label={copy.account.copy} value={user.uid} />
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        <Button onClick={() => openRequest(null)} size="sm" variant="light">
          {copy.steps.writeToUs}
        </Button>
        <CopyButton label={copy.steps.copyAddress} done={copy.account.copied} value={mailtoOrder(lang).replace(/^mailto:([^?]+).*$/, '$1')} />
        <CopyButton label={copy.steps.copyTemplate} done={copy.account.copied} value={template} />
      </div>
    </div>
  );
}

function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      size="sm"
      variant="ghost"
    >
      <IconSwap copied={copied} size="h-4 w-4" />
      <span aria-live="polite">{copied ? done : label}</span>
    </Button>
  );
}

// The fallback funnel step: a request instead of a mailto. The plan comes
// pre-selected, the account code is optional, and the owner answers with a
// payment link. If the worker is unreachable the form falls back to e-mail.
export function RequestForm() {
  const { requestPlan, openRequest, user, copy, lang, currency } = useAccount();
  const [planId, setPlanId] = useState<Plan['id']>('year');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'rate_limited'>('idle');
  const open = requestPlan !== null;
  const openedFor = requestPlan?.id ?? null;

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      setPlanId(openedFor ?? 'year');
      setStatus('idle');
      if (user?.uid) setCode(user.uid);
      if (user?.email) setEmail((current) => current || user.email || '');
    });
    return () => cancelAnimationFrame(frame);
  }, [open, openedFor, user]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openRequest(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, openRequest]);

  if (!open) return null;
  const plan = plans.find((p) => p.id === planId) ?? plans[2];
  const local = formatMoney(prices[plan.id][currency], currency, lang);

  const submit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get('website');
    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE}/v1/web/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, email: email.trim(), accountCode: code.trim() || undefined, lang, website: typeof honeypot === 'string' ? honeypot : '' }),
      });
      setStatus(res.status === 429 ? 'rate_limited' : res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field = 'mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-base text-white outline-none placeholder:text-white/35 focus:ring-4 focus:ring-white/20';

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <button aria-label={copy.request.cancel} className="absolute inset-0 bg-[#0B0B1E]/70 backdrop-blur-sm" onClick={() => openRequest(null)} type="button" />
      <dialog aria-labelledby="request-title" className="relative z-10 m-0 w-full max-w-md rounded-[1.75rem] border border-white/15 bg-[#1E1B4B] p-6 text-white shadow-[0_40px_120px_rgb(0_0_0/50%)]" open>
        {status === 'sent' ? (
          <>
            <p className="text-2xl font-semibold" id="request-title">{copy.request.sentTitle}</p>
            <p className="mt-3 text-base leading-7 text-white/75">{copy.request.sentBody}</p>
            <Button className="mt-6 w-full" onClick={() => openRequest(null)} variant="light">
              {copy.request.close}
            </Button>
          </>
        ) : (
          <form onSubmit={submit}>
            <p className="text-2xl font-semibold" id="request-title">{copy.request.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">{copy.request.body}</p>
            <label className="mt-5 block text-sm font-semibold">
              {copy.request.plan}
              <select className={field} onChange={(e) => setPlanId(e.target.value as Plan['id'])} value={planId}>
                {plans.map((p) => (
                  <option className="text-[#1E1B4B]" key={p.id} value={p.id}>
                    {planCopy[lang][p.id].title} — {formatByn(p.priceByn, lang)}
                  </option>
                ))}
              </select>
            </label>
            <p className="mt-1.5 text-sm text-white/60">
              <Money text={local} />
            </p>
            <label className="mt-4 block text-sm font-semibold">
              {copy.request.email}
              <input autoComplete="email" className={field} inputMode="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required type="email" value={email} />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              {copy.request.code} <span className="font-normal text-white/50">{copy.request.optional}</span>
              <input className={`${field} font-mono text-sm`} onChange={(e) => setCode(e.target.value)} pattern="[A-Za-z0-9_\-]{6,64}" placeholder="Xy12…" value={code} />
              <span className="mt-1 block text-xs font-normal leading-5 text-white/50">{copy.request.codeHint}</span>
            </label>
            <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} />
            {status === 'error' ? (
              <p className="mt-3 text-sm text-[#FCA5A5]" role="alert">
                {copy.request.error}{' '}
                <a className="underline" href={mailtoOrder(lang, plan, code || user?.uid)}>
                  {copy.request.errorMail}
                </a>
              </p>
            ) : null}
            {status === 'rate_limited' ? (
              <p className="mt-3 text-sm text-[#FCA5A5]" role="alert">
                {copy.checkout.rateLimited}
              </p>
            ) : null}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1" disabled={status === 'sending'} type="submit">
                {status === 'sending' ? <Spinner /> : null}
                {copy.request.submit}
              </Button>
              <Button onClick={() => openRequest(null)} variant="ghost">
                {copy.request.cancel}
              </Button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/45">
              {copy.request.consent}{' '}
              <a className="underline" href={subscriptionPath(lang, '/privacy')}>
                {copy.docs.privacy}
              </a>
            </p>
          </form>
        )}
      </dialog>
    </div>
  );
}
