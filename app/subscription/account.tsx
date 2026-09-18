'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Auth, User as FirebaseUser } from 'firebase/auth';
import { AppleGlyph } from '../home/art';
import { API_BASE, firebaseConfig, isFirebaseConfigured } from './config';
import { subscriptionCopy, type SubscriptionCopy } from './copy';
import { currencyForVisitor, formatMoney, type Currency } from './currency';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { charges, formatByn, mailtoOrder, merchant, planCopy, plans, prices, type Plan } from './merchant';
import { legalVersion } from './legal/versions';
import { Money } from './Money';
import { Button, Spinner } from './ui';

type Provider = 'apple.com' | 'google.com';
type CheckoutMode = 'off' | 'test' | 'prod';
type WebConfig = { checkoutMode: CheckoutMode; plans: { id: string; days: number; priceByn: number }[] };
type Me = { premiumUntil: string | null; blocked: boolean };
type Account = { uid: string; email: string | null; provider: string };
// What the buyer ticked before paying, with the document editions they saw —
// sent with the order so the acceptance can be proven later.
type Terms = { offer: string; payment: string; privacy: string; immediateStart?: true };
type ErrorKey = keyof SubscriptionCopy['checkout'] | 'popupBlocked' | 'signInError';

type State = {
  ready: boolean;
  configured: boolean;
  config: WebConfig | null;
  user: Account | null;
  me: Me | null;
  busy: 'signin' | 'order' | 'redirect' | null;
  error: ErrorKey | null;
  errorOrigin: string | null;
  termsPlan: Plan | null;
  requestPlan: Plan | null;
  requestTerms: Terms | null;
};

type Api = State & {
  lang: Lang;
  copy: SubscriptionCopy;
  currency: Currency;
  signIn: (provider: Provider, origin?: string) => Promise<Account | null>;
  signOut: () => Promise<void>;
  createOrder: (planId: string, terms: Terms) => Promise<boolean>;
  getToken: () => Promise<string | null>;
  clearError: () => void;
  openTerms: (plan: Plan | null) => void;
  openRequest: (plan: Plan | null, terms?: Terms) => void;
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

export function AccountProvider({ lang, country, acceptLanguage, children }: { lang: Lang; country?: string | null; acceptLanguage?: string | null; children: ReactNode }) {
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
    termsPlan: null,
    requestPlan: null,
    requestTerms: null,
  });
  const currency = currencyForVisitor(country, acceptLanguage);

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
    async (planId: string, terms: Terms) => {
      const token = await getToken();
      if (!token) return false;
      setState((s) => ({ ...s, busy: 'order', error: null, errorOrigin: null }));
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Firebase-Token': token },
          body: JSON.stringify({ planId, lang, terms }),
        });
        const body = (await res.json().catch(() => ({}))) as { redirectUrl?: string; error?: string };
        if (res.ok && body.redirectUrl && /^https:\/\/(securesandbox|payment)\.webpay\.by\//.test(body.redirectUrl)) {
          setState((s) => ({ ...s, busy: 'redirect' }));
          window.location.assign(body.redirectUrl);
          return true;
        }
        setState(settled(orderErrorFor(res.status, body.error, checkoutMode), planId));
      } catch {
        setState(settled('error', planId));
      }
      return false;
    },
    [getToken, lang, checkoutMode],
  );

  const clearError = useCallback(() => setState((s) => ({ ...s, error: null, errorOrigin: null })), []);
  const openTerms = useCallback((plan: Plan | null) => setState((s) => ({ ...s, termsPlan: plan, error: null, errorOrigin: null })), []);
  const openRequest = useCallback(
    (plan: Plan | null, terms?: Terms) =>
      setState((s) => ({ ...s, termsPlan: null, requestPlan: plan, requestTerms: plan ? (terms ?? s.requestTerms) : null, error: null, errorOrigin: null })),
    [],
  );

  const api = useMemo<Api>(
    () => ({ ...state, lang, copy, currency, signIn, signOut, createOrder, getToken, clearError, openTerms, openRequest }),
    [state, lang, copy, currency, signIn, signOut, createOrder, getToken, clearError, openTerms, openRequest],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const api = useContext(Ctx);
  if (!api) throw new Error('useAccount outside AccountProvider');
  return api;
}

// Under the plan grid: which account the subscription goes to once signed
// in (with a way out of the wrong one), and the Google door for parents who
// use Google in the app. Shown whenever sign-in is available — the request
// form credits the same account as the live checkout.
export function AccountLine({ className = '' }: { className?: string }) {
  const { ready, configured, user, me, busy, error, errorOrigin, copy, lang, signIn, signOut } = useAccount();
  if (!configured || !ready) return null;
  const link = 'font-semibold text-white underline decoration-white/30 hover:decoration-white disabled:opacity-60';
  if (!user) {
    const lineError = errorOrigin === 'line' && (error === 'popupBlocked' || error === 'signInError') ? copy.account[error] : null;
    return (
      <p className={className}>
        {copy.plans.googleQuestion}{' '}
        <button className={link} disabled={busy !== null} onClick={() => void signIn('google.com', 'line')} type="button">
          {copy.plans.googleLink}
        </button>
        {lineError ? (
          <span className="block text-[#FCA5A5]" role="alert">
            {lineError}
          </span>
        ) : null}
      </p>
    );
  }
  const active = Boolean(me?.premiumUntil && new Date(me.premiumUntil) > new Date());
  const email = user.email ?? user.uid;
  return (
    <p className={className}>
      {active && me?.premiumUntil ? copy.plans.activeUntil(email, formatDate(me.premiumUntil, lang)) : copy.plans.goesTo(email)}{' '}
      {active ? null : `${copy.plans.wrongAccount} `}
      <button className={link} onClick={() => void signOut()} type="button">
        {copy.plans.signOut}
      </button>
    </p>
  );
}

const planIcon = { week: 'icon-moon-crescent', month: 'icon-moon-full', year: 'icon-sun' } as const;

// Centres a dialog but never wider than the screen (a minmax(0) track, so a
// long button label cannot stretch it) and, when taller than the screen,
// scrolls from its top instead of cutting it off.
const dialogFrame = 'pointer-events-none relative grid min-h-full grid-cols-[minmax(0,1fr)] place-items-center p-4';

export function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const { me, copy, lang, currency, openTerms } = useAccount();
  const text = planCopy[lang][plan.id];
  const amount = prices[plan.id][currency];
  const price = formatMoney(amount, currency, lang);
  const perWeek = formatMoney((amount / plan.days) * 7, currency, lang);
  const base = formatMoney(prices.week[currency], currency, lang);
  const active = Boolean(me?.premiumUntil && new Date(me.premiumUntil) > new Date());

  const variant = featured ? 'dark' : 'light';
  const muted = featured ? 'text-[#1E1B4B]/65' : 'text-white/65';
  const strong = featured ? 'text-[#1E1B4B]' : 'text-white';
  const label = active ? copy.plans.extend(text.forPeriod) : copy.plans.subscribe(text.forPeriod);

  return (
    <article
      className={`spotlight relative flex w-full min-w-0 flex-col rounded-[1.75rem] border p-6 transition hover:-translate-y-1 ${
        featured
          ? 'spotlight-dark order-first border-[#FDE68A]/60 bg-[#EEF2FF] text-[#1E1B4B] shadow-[0_28px_80px_rgb(99_102_241/30%)] lg:order-none'
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
        <img alt="" aria-hidden="true" className="h-14 w-14 shrink-0 object-contain" height="192" src={`/art/${planIcon[plan.id]}.webp`} width="192" />
      </div>
      <p className={`mt-4 text-sm leading-6 ${featured ? 'text-[#1E1B4B]/80' : 'text-white/75'}`}>{text.purpose}</p>
      <p className={`mt-6 text-4xl font-semibold tabular-nums sm:text-5xl ${strong}`}>
        <Money text={price} />
      </p>
      <p className={`mt-2 min-h-6 text-sm leading-6 ${muted}`}>
        <Money text={plan.id === 'week' ? '\u00A0' : copy.plans.perWeek(perWeek, base)} />
      </p>
      <div className="mt-auto pt-6">
        <Button className="w-full text-center leading-5 whitespace-normal!" onClick={() => openTerms(plan)} variant={variant}>
          {label}
        </Button>
      </div>
    </article>
  );
}

// The hero's price anchor, in the visitor's own currency. It renders the
// whole label: a render prop cannot cross the server-component boundary.
export function HeroCta() {
  const { currency, lang, copy } = useAccount();
  return <Money text={copy.hero.primary(formatMoney(prices.week[currency], currency, lang))} />;
}

// WebPay charges in BYN, so a buyer outside Belarus sees those amounts once,
// under the plans, before they leave for the bank's page — the screen must
// never disagree with the receipt.
export function ChargeNote({ className = '' }: { className?: string }) {
  const { currency, copy, lang } = useAccount();
  if (currency === 'BYN') return null;
  const amounts = plans.map((plan) => formatMoney(charges[plan.id][currency], 'BYN', lang)).join(' · ');
  return (
    <p className={className}>
      <Money text={copy.currency.note(amounts)} />
    </p>
  );
}

// The step between a plan and the bank: what is being bought, for how much and
// on which account, then the acceptance box (never pre-ticked). Buyers in
// Europe also ask for the service to start at once — without that request
// an EU consumer could withdraw within 14 days and owe nothing. Sign-in and
// the order both start from this dialog's button, inside the click, so
// Safari keeps the Apple window.
function TermsDialog() {
  const { termsPlan, openTerms, openRequest, user, me, ready, configured, config, currency, lang, copy, busy, error, errorOrigin, signIn, createOrder, clearError } = useAccount();
  const [accepted, setAccepted] = useState(false);
  const [immediate, setImmediate] = useState(false);
  const [missing, setMissing] = useState<'accept' | 'immediate' | null>(null);
  const [stage, setStage] = useState<'idle' | 'signin' | 'order' | 'redirect'>('idle');
  const acceptRef = useRef<HTMLInputElement>(null);
  const immediateRef = useRef<HTMLInputElement>(null);
  const open = termsPlan !== null;
  const openedFor = termsPlan?.id ?? null;

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      setAccepted(false);
      setImmediate(false);
      setMissing(null);
      setStage('idle');
    });
    return () => cancelAnimationFrame(frame);
  }, [open, openedFor]);

  const closable = stage === 'idle';
  useEffect(() => {
    if (!open || !closable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openTerms(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closable, openTerms]);

  if (!termsPlan) return null;
  const plan = termsPlan;
  const text = planCopy[lang][plan.id];
  const europe = currency === 'EUR';
  const live = configured && (config?.checkoutMode ?? 'off') !== 'off';
  const price = formatMoney(prices[plan.id][currency], currency, lang);
  const charge = currency === 'BYN' ? null : formatMoney(charges[plan.id][currency], 'BYN', lang);
  const active = Boolean(me?.premiumUntil && new Date(me.premiumUntil) > new Date());
  const terms: Terms = { offer: legalVersion.offer, payment: legalVersion.payment, privacy: legalVersion.privacy, ...(europe ? { immediateStart: true as const } : {}) };

  const close = () => {
    if (!closable) return;
    clearError();
    openTerms(null);
  };

  const proceed = async () => {
    if (stage !== 'idle' || busy !== null) return;
    if (!accepted) {
      setMissing('accept');
      acceptRef.current?.focus();
      return;
    }
    if (europe && !immediate) {
      setMissing('immediate');
      immediateRef.current?.focus();
      return;
    }
    setMissing(null);
    if (!configured) {
      openRequest(plan, terms);
      return;
    }
    let account = user;
    if (!account) {
      setStage('signin');
      account = await signIn('apple.com', 'terms');
      if (!account) {
        setStage('idle');
        return;
      }
    }
    if (!live) {
      setStage('idle');
      openRequest(plan, terms);
      return;
    }
    setStage('order');
    const redirecting = await createOrder(plan.id, terms);
    setStage(redirecting ? 'redirect' : 'idle');
  };

  const shownError = stage !== 'idle' || (errorOrigin !== 'terms' && errorOrigin !== plan.id) ? null : error;
  const message =
    shownError === 'popupBlocked' || shownError === 'signInError' ? copy.account[shownError]
    : shownError === 'blocked' ? copy.checkout.blocked(merchant.email)
    : shownError ? copy.checkout[shownError]
    : null;
  const offerRequest = shownError === 'unavailable' || shownError === 'testOnly' || shownError === 'error';
  const label =
    stage === 'signin' ? copy.checkout.signingIn
    : stage === 'order' ? copy.checkout.creating
    : stage === 'redirect' ? copy.checkout.redirecting
    : !configured ? copy.terms.next
    : !user ? copy.terms.withApple
    : live ? copy.terms.pay(price)
    : copy.terms.next;
  const box = 'mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#A78BFA]';
  const link = 'font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <button aria-label={copy.terms.cancel} className="fixed inset-0 bg-[#0B0B1E]/70 backdrop-blur-sm" onClick={close} type="button" />
      <div className={dialogFrame}>
      <dialog
        aria-labelledby="terms-title"
        className="pointer-events-auto relative z-10 m-0 w-full max-w-lg rounded-[1.75rem] border border-white/15 bg-[#1E1B4B] p-6 text-white shadow-[0_40px_120px_rgb(0_0_0/50%)] sm:p-7"
        open
      >
        <p className="text-2xl font-semibold" id="terms-title">
          {copy.terms.title(text.forPeriod)}
        </p>
        <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm">
          <dt className="text-white/60">{copy.terms.period}</dt>
          <dd className="font-medium">{copy.terms.days(text.days)}</dd>
          <dt className="text-white/60">{copy.terms.price}</dt>
          <dd className="font-medium">
            <Money text={price} />
            {charge ? (
              <span className="font-normal text-white/60">
                {' '}
                (<Money text={copy.terms.charge(charge)} />)
              </span>
            ) : null}
          </dd>
        </dl>
        <ul className="mt-4 grid gap-1.5 text-sm leading-6 text-white/75">
          <li>{copy.terms.oneOff}</li>
          <li>
            {user
              ? active && me?.premiumUntil
                ? copy.plans.activeUntil(user.email ?? user.uid, formatDate(me.premiumUntil, lang))
                : copy.terms.goesTo(user.email ?? user.uid)
              : copy.terms.signInNote}
          </li>
        </ul>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input
            aria-describedby={missing === 'accept' ? 'terms-missing' : undefined}
            aria-invalid={missing === 'accept'}
            checked={accepted}
            className={box}
            onChange={(e) => {
              setAccepted(e.target.checked);
              if (e.target.checked && missing === 'accept') setMissing(null);
            }}
            ref={acceptRef}
            type="checkbox"
          />
          <span>
            {copy.terms.accept[0]}
            <a className={link} href={subscriptionPath(lang, '/offer')} rel="noopener" target="_blank">
              {copy.terms.accept[1]}
            </a>
            {copy.terms.accept[2]}
            <a className={link} href={subscriptionPath(lang, '/payment')} rel="noopener" target="_blank">
              {copy.terms.accept[3]}
            </a>
            {copy.terms.accept[4]}
          </span>
        </label>
        {europe ? (
          <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              aria-describedby={missing === 'immediate' ? 'terms-missing' : undefined}
              aria-invalid={missing === 'immediate'}
              checked={immediate}
              className={box}
              onChange={(e) => {
                setImmediate(e.target.checked);
                if (e.target.checked && missing === 'immediate') setMissing(null);
              }}
              ref={immediateRef}
              type="checkbox"
            />
            <span>{copy.terms.immediate}</span>
          </label>
        ) : null}
        {missing ? (
          <p className="mt-3 text-sm leading-5 text-[#FCA5A5]" id="terms-missing" role="alert">
            {missing === 'accept' ? copy.terms.required : copy.terms.requiredImmediate}
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-5 text-white/55">
          {copy.terms.privacy[0]}
          <a className="underline hover:text-white" href={subscriptionPath(lang, '/privacy')} rel="noopener" target="_blank">
            {copy.terms.privacy[1]}
          </a>
          {copy.terms.privacy[2]}
        </p>

        {message ? (
          <p className="mt-4 text-sm leading-5 text-[#FCA5A5]" role="alert">
            {message}
            {offerRequest ? (
              <>
                {' '}
                <button className="font-semibold underline" onClick={() => openRequest(plan, terms)} type="button">
                  {copy.checkout.request}
                </button>
              </>
            ) : null}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            aria-busy={stage !== 'idle'}
            className={`flex-1 text-center leading-5 whitespace-normal! ${stage !== 'idle' ? 'cursor-wait' : ''}`}
            disabled={configured && !ready}
            onClick={() => void proceed()}
            variant="light"
          >
            {stage !== 'idle' ? <Spinner /> : !user && configured ? <AppleGlyph className="h-4 w-4 shrink-0" /> : null}
            {label}
          </Button>
          <Button disabled={!closable} onClick={close} variant="ghost">
            {copy.terms.cancel}
          </Button>
        </div>
        {configured && !user && stage === 'idle' ? (
          <button
            className="mt-3 w-full text-center text-sm text-white/65 underline decoration-white/30 underline-offset-2 hover:text-white disabled:opacity-60"
            disabled={!ready || busy !== null}
            onClick={() => void signIn('google.com', 'terms')}
            type="button"
          >
            {copy.terms.google}
          </button>
        ) : null}
      </dialog>
      </div>
    </div>
  );
}

// The fallback funnel step: a request instead of a mailto. The plan comes
// pre-selected, the account code is optional, and the owner answers with a
// payment link. If the worker is unreachable the form falls back to e-mail.
export function RequestForm() {
  return (
    <>
      <TermsDialog />
      <RequestDialog />
    </>
  );
}

function RequestDialog() {
  const { requestPlan, requestTerms, openRequest, user, copy, lang, currency } = useAccount();
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
        body: JSON.stringify({
          planId,
          email: email.trim(),
          accountCode: code.trim() || undefined,
          lang,
          terms: requestTerms ?? undefined,
          website: typeof honeypot === 'string' ? honeypot : '',
        }),
      });
      setStatus(res.status === 429 ? 'rate_limited' : res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field = 'mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-base text-white outline-none placeholder:text-white/35 focus:ring-4 focus:ring-white/20';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <button aria-label={copy.request.cancel} className="fixed inset-0 bg-[#0B0B1E]/70 backdrop-blur-sm" onClick={() => openRequest(null)} type="button" />
      <div className={dialogFrame}>
      <dialog aria-labelledby="request-title" className="pointer-events-auto relative z-10 m-0 w-full max-w-md rounded-[1.75rem] border border-white/15 bg-[#1E1B4B] p-6 text-white shadow-[0_40px_120px_rgb(0_0_0/50%)]" open>
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
    </div>
  );
}
