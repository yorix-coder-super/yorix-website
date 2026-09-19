'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Auth } from 'firebase/auth';
import { AppleGlyph } from '../home/art';
import type { SiteLocale } from '../i18n';
import type { SiteTranslation } from '../i18n/types';
import { fromWire, type Wire } from '../i18n/wire';
import { API_BASE, firebaseConfig, isFirebaseConfigured } from './config';
import { subscriptionCopy, type SubscriptionCopy } from './copy';
import { currencyForVisitor, formatMoney, sellsOnWeb, type WebCurrency } from './currency';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { legalVersion } from './legal/versions';
import { rememberGift } from './gift/keys';
import { charges, merchant, planCopy, plans, prices, type Plan } from './merchant';
import { Money } from './Money';
import { Button, Spinner } from './ui';

type CheckoutMode = 'off' | 'test' | 'prod';
type WebConfig = { checkoutMode: CheckoutMode };
type Me = { premiumUntil: string | null; blocked: boolean };
// The document editions the buyer accepted — sent with the order so the
// acceptance can be proven later.
export type Terms = { offer: string; payment: string; privacy: string };
// The card on a gift order: who it is for and a short wish.
export type GiftCard = { to: string; message: string };
type ErrorKey = keyof SubscriptionCopy['checkout'] | 'popupBlocked' | 'signInError';

type State = {
  ready: boolean;
  configured: boolean;
  config: WebConfig | null;
  signedIn: boolean;
  me: Me | null;
  busy: 'signin' | 'order' | 'redirect' | null;
  error: ErrorKey | null;
  termsPlan: Plan | null;
};

// The subscription UI in the page's language; the storefront adds its hero.
export type ClientCopy = SiteTranslation['subscription'] & { hero?: SubscriptionCopy['hero'] };
type PlanTexts = SiteTranslation['plans'];

type Api = State & {
  // `lang` is the language of the documents (Russian or English); `locale`
  // is the language the page is written in.
  lang: Lang;
  locale: SiteLocale;
  copy: ClientCopy;
  plans: PlanTexts;
  docsNote: string;
  currency: WebCurrency;
  signIn: () => Promise<boolean>;
  createOrder: (planId: string, terms: Terms, gift?: GiftCard) => Promise<boolean>;
  getToken: () => Promise<string | null>;
  clearError: () => void;
  openTerms: (plan: Plan | null) => void;
};

const Ctx = createContext<Api | null>(null);

async function getAuthInstance(): Promise<Auth> {
  const [{ getApps, initializeApp }, { getAuth, browserSessionPersistence, setPersistence }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // Session persistence: closing the tab signs the parent out, so a shared
  // family computer never stays signed in by accident. (A refresh token lifted
  // from the tab stays valid until revoked — the page's CSP is what keeps
  // scripts from reading it.)
  await setPersistence(auth, browserSessionPersistence).catch(() => {});
  return auth;
}

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

// The acquirer's hosted payment page — the only place an order may send the
// buyer — for the mode checkout runs in (the sandbox never in production).
const PAYMENT_PAGES: Record<'test' | 'prod', RegExp> = {
  test: /^https:\/\/securesandbox\.webpay\.by\//,
  prod: /^https:\/\/payment\.webpay\.by\//,
};

export function AccountProvider({
  lang,
  locale = lang,
  copy: wire,
  plans: planTexts = planCopy[lang],
  docsNote = '',
  country,
  acceptLanguage,
  children,
}: {
  lang: Lang;
  locale?: SiteLocale;
  copy?: Wire<ClientCopy>;
  plans?: PlanTexts;
  docsNote?: string;
  country?: string | null;
  acceptLanguage?: string | null;
  children: ReactNode;
}) {
  const copy = useMemo<ClientCopy>(() => (wire ? fromWire<ClientCopy>(wire) : subscriptionCopy[lang]), [wire, lang]);
  const authRef = useRef<Auth | null>(null);
  // Kept from initialisation so sign-in opens its popup synchronously inside
  // the click — Safari blocks a window opened after an awaited import.
  const authModRef = useRef<typeof import('firebase/auth') | null>(null);
  const [state, setState] = useState<State>({
    ready: !isFirebaseConfigured,
    configured: isFirebaseConfigured,
    config: null,
    signedIn: false,
    me: null,
    busy: null,
    error: null,
    termsPlan: null,
  });
  const visitorCurrency = currencyForVisitor(country, acceptLanguage);
  const currency: WebCurrency = sellsOnWeb(visitorCurrency) ? visitorCurrency : 'BYN';

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
      // Without it the dialog just doesn't mention the current period.
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
        setState((s) => ({ ...s, ready: true, signedIn: Boolean(user), me: user ? s.me : null }));
        if (user) void loadMe();
      });
    })().catch(() => setState((s) => ({ ...s, ready: true })));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [loadMe]);

  // Sign in with Apple only: the subscription is credited to the Apple
  // account the parent uses in the app. Nothing about the account is shown.
  const signIn = useCallback(async () => {
    const auth = authRef.current;
    if (!auth) return false;
    setState((s) => ({ ...s, busy: 'signin', error: null }));
    try {
      const { OAuthProvider, signInWithPopup } = authModRef.current ?? (await import('firebase/auth'));
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.setCustomParameters({ locale: lang });
      await signInWithPopup(auth, provider);
      setState((s) => ({ ...s, busy: null, signedIn: true }));
      void loadMe();
      return true;
    } catch (err) {
      const error = signInErrorFor((err as { code?: string }).code ?? '');
      setState((s) => ({ ...s, busy: null, error }));
      return false;
    }
  }, [lang, loadMe]);

  const checkoutMode = state.config?.checkoutMode;
  const createOrder = useCallback(
    async (planId: string, terms: Terms, gift?: GiftCard) => {
      const token = await getToken();
      // A gift needs no account; a plan is credited to the signed-in one.
      if (!token && !gift) return false;
      setState((s) => ({ ...s, busy: 'order', error: null }));
      let error: ErrorKey = 'error';
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(token ? { 'X-Firebase-Token': token } : {}) },
          body: JSON.stringify({ planId, lang, terms, ...(gift ? { gift } : {}) }),
        });
        const body = (await res.json().catch(() => ({}))) as { redirectUrl?: string; error?: string; orderId?: string; giftKey?: string };
        const paymentPage = checkoutMode === 'test' || checkoutMode === 'prod' ? PAYMENT_PAGES[checkoutMode] : null;
        if (res.ok && body.redirectUrl && paymentPage?.test(body.redirectUrl)) {
          // Kept before leaving for the bank: the only way back to this gift.
          if (gift && body.orderId && body.giftKey) rememberGift(body.orderId, body.giftKey);
          setState((s) => ({ ...s, busy: 'redirect' }));
          window.location.assign(body.redirectUrl);
          return true;
        }
        error = orderErrorFor(res.status, body.error, checkoutMode);
      } catch {
        // network failure: the generic message
      }
      setState((s) => ({ ...s, busy: null, error }));
      return false;
    },
    [getToken, lang, checkoutMode],
  );

  const clearError = useCallback(() => setState((s) => ({ ...s, error: null })), []);
  const openTerms = useCallback((plan: Plan | null) => setState((s) => ({ ...s, termsPlan: plan, error: null })), []);

  const api = useMemo<Api>(
    () => ({ ...state, lang, locale, copy, plans: planTexts, docsNote, currency, signIn, createOrder, getToken, clearError, openTerms }),
    [state, lang, locale, copy, planTexts, docsNote, currency, signIn, createOrder, getToken, clearError, openTerms],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const api = useContext(Ctx);
  if (!api) throw new Error('useAccount outside AccountProvider');
  return api;
}

const planIcon = { week: 'icon-moon-crescent', month: 'icon-moon-full', year: 'icon-sun' } as const;

// Centres a dialog but never wider than the screen (a minmax(0) track, so a
// long button label cannot stretch it) and, when taller than the screen,
// scrolls from its top instead of cutting it off.
const dialogFrame = 'pointer-events-none relative grid min-h-full grid-cols-[minmax(0,1fr)] place-items-center p-4';

export function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const { me, copy, lang, plans: planTexts, currency, openTerms } = useAccount();
  const text = planTexts[plan.id];
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
        <span className="absolute -top-3 start-6 rounded-full bg-[#FDE68A] px-3 py-1 text-xs font-bold text-[#1E1B4B]">{copy.plans.bestValue}</span>
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
        <Money text={plan.id === 'week' ? ' ' : copy.plans.perWeek(perWeek, base)} />
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
  const { currency, lang } = useAccount();
  return <Money text={subscriptionCopy[lang].hero.primary(formatMoney(prices.week[currency], currency, lang))} />;
}

// The acquirer charges in BYN, so a buyer from Russia sees those amounts once,
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

// «Оформить» → this dialog: what is bought and for how much, the unticked
// acceptance box, then one button — Sign in with Apple (inside the click, so
// Safari keeps the popup) and straight on to the acquirer's page. After the
// payment the server switches the subscription on by itself; nobody types an
// Apple ID or a code, and no account detail is shown.
export function CheckoutDialog() {
  const { termsPlan, openTerms, signedIn, me, ready, configured, config, currency, lang, locale, copy, plans: planTexts, docsNote, busy, error, signIn, createOrder, clearError } =
    useAccount();
  const [accepted, setAccepted] = useState(false);
  const [missing, setMissing] = useState(false);
  const [closed, setClosed] = useState(false);
  const [stage, setStage] = useState<'idle' | 'signin' | 'order' | 'redirect'>('idle');
  const acceptRef = useRef<HTMLInputElement>(null);
  const open = termsPlan !== null;
  const openedFor = termsPlan?.id ?? null;

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      setAccepted(false);
      setMissing(false);
      setClosed(false);
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
  const text = planTexts[plan.id];
  // The worker is the authority; this only spares a sign-in when the site's
  // checkout is closed anyway.
  const live = configured && config !== null && config.checkoutMode !== 'off';
  const price = formatMoney(prices[plan.id][currency], currency, lang);
  const charge = currency === 'BYN' ? null : formatMoney(charges[plan.id][currency], 'BYN', lang);
  const active = Boolean(me?.premiumUntil && new Date(me.premiumUntil) > new Date());
  const terms: Terms = { offer: legalVersion.offer, payment: legalVersion.payment, privacy: legalVersion.privacy };

  const close = () => {
    if (!closable) return;
    clearError();
    openTerms(null);
  };

  const proceed = async () => {
    if (stage !== 'idle' || busy !== null) return;
    if (!accepted) {
      setMissing(true);
      acceptRef.current?.focus();
      return;
    }
    setMissing(false);
    if (!live) {
      setClosed(true);
      return;
    }
    if (!signedIn) {
      setStage('signin');
      const ok = await signIn();
      if (!ok) {
        setStage('idle');
        return;
      }
    }
    setStage('order');
    const redirecting = await createOrder(plan.id, terms);
    setStage(redirecting ? 'redirect' : 'idle');
  };

  const shownError = stage !== 'idle' ? null : error;
  const message = closed
    ? copy.checkout.unavailable
    : shownError === 'popupBlocked' || shownError === 'signInError'
      ? copy.account[shownError]
      : shownError === 'blocked'
        ? copy.checkout.blocked(merchant.email)
        : shownError
          ? copy.checkout[shownError]
          : null;
  const label =
    stage === 'signin' ? copy.checkout.signingIn
    : stage === 'order' ? copy.checkout.creating
    : stage === 'redirect' ? copy.checkout.redirecting
    : signedIn ? copy.terms.pay(price)
    : copy.terms.withApple;
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
            <li>{active && me?.premiumUntil ? copy.terms.active(formatDate(me.premiumUntil, locale)) : copy.terms.signInNote}</li>
          </ul>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              aria-describedby={missing ? 'terms-missing' : undefined}
              aria-invalid={missing}
              checked={accepted}
              className={box}
              onChange={(e) => {
                setAccepted(e.target.checked);
                if (e.target.checked) setMissing(false);
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
          {docsNote ? <p className="mt-2 ps-8 text-xs leading-5 text-white/55">{docsNote}</p> : null}
          {missing ? (
            <p className="mt-3 text-sm leading-5 text-[#FCA5A5]" id="terms-missing" role="alert">
              {copy.terms.required}
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
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              aria-busy={stage !== 'idle'}
              className={`flex-1 text-center leading-5 whitespace-normal! ${stage !== 'idle' ? 'cursor-wait' : ''}`}
              disabled={(configured && !ready) || closed}
              onClick={() => void proceed()}
              variant="light"
            >
              {stage !== 'idle' ? <Spinner /> : signedIn ? null : <AppleGlyph className="h-4 w-4 shrink-0" />}
              {label}
            </Button>
            <Button disabled={!closable} onClick={close} variant="ghost">
              {copy.terms.cancel}
            </Button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
