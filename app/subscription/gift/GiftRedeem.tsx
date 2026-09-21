'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { AppleGlyph } from '../../home/art';
import { AccountProvider, useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { formatDate, subscriptionPath, type Lang } from '../i18n';
import { planCopy, type PlanId } from '../merchant';
import { PaidScreen } from '../PaidScreen';
import { Reveal } from '../Reveal';
import { Button, Spinner } from '../ui';
import { codeFromInput, formatGiftCode, giftCodeChecks } from './code';
import { boughtHere } from './keys';
import { GiftCardView } from './GiftCardView';

type PublicGift = {
  planId: PlanId;
  to: string | null;
  message: string | null;
  status: 'active' | 'redeemed' | 'cancelled' | 'expired' | 'replaced';
  expiresAt: string;
};
type Problem = keyof (typeof subscriptionCopy)['ru']['gift']['errors'];

const problemFor: Record<string, Problem> = {
  not_found: 'notFound',
  invalid_code: 'typo',
  gift_redeemed: 'redeemed',
  gift_expired: 'expired',
  gift_cancelled: 'cancelled',
  gift_replaced: 'replaced',
  too_many_attempts: 'locked',
  rate_limited: 'rateLimited',
};

function problemOf(status: number, error: string | undefined): Problem {
  return problemFor[error ?? ''] ?? (status === 429 ? 'rateLimited' : 'error');
}

function GiftRedeem({ code: rawCode, appUrl }: { code: string; appUrl: string }) {
  const { lang, configured, signedIn, signIn, getToken, error: accountError, copy } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const code = codeFromInput(rawCode);
  // A typo in a hand-typed link is known without asking the worker.
  const typo = !giftCodeChecks(code);
  const [gift, setGift] = useState<PublicGift | null>(null);
  const [loading, setLoading] = useState(!typo);
  const [busy, setBusy] = useState(false);
  // Redeeming a gift this browser bought is almost always a mistake, and the
  // browser's own confirm() is a grey box with no way to say why it matters.
  const [ownGiftAsk, setOwnGiftAsk] = useState(false);
  const [ownGiftOk, setOwnGiftOk] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(typo ? 'typo' : null);
  const [until, setUntil] = useState<string | null>(null);

  // The code is a bearer secret: once read, it leaves the address bar, so the
  // sign-in popup (which reports the page URL to Firebase), the history and
  // any error report never see it. A reload lands on /gift with it prefilled.
  useEffect(() => {
    if (typo || !window.location.pathname.includes('/gift/')) return;
    try {
      sessionStorage.setItem('yorix-gift-code', code);
    } catch {
      // Private mode: the recipient types the code again after a reload.
    }
    window.history.replaceState(window.history.state, '', `${lang === 'ru' ? '/ru' : ''}/gift`);
  }, [code, typo, lang]);

  useEffect(() => {
    if (typo) return;
    let cancelled = false;
    fetch(`${API_BASE}/v1/web/gifts/${formatGiftCode(code)}`)
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          if (!cancelled) setProblem(problemOf(res.status, body.error));
          return;
        }
        const body = (await res.json()) as PublicGift;
        if (cancelled) return;
        setGift(body);
        if (body.status !== 'active') setProblem(body.status);
      })
      .catch(() => {
        if (!cancelled) setProblem('error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code, typo]);

  const redeem = async () => {
    if (busy) return;
    // The buyer opening their own link to check it must not use it up by accident.
    if (boughtHere(code) && !ownGiftOk) {
      setOwnGiftAsk(true);
      return;
    }
    // Sign-in first, inside the click: Safari only opens the popup from it.
    if (!signedIn) {
      const ok = await signIn();
      if (!ok) return;
    }
    setBusy(true);
    setProblem(null);
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/v1/web/gifts/${formatGiftCode(code)}/redeem`, {
        method: 'POST',
        headers: token ? { 'X-Firebase-Token': token } : {},
      });
      const body = (await res.json().catch(() => ({}))) as { premiumUntil?: string | null; error?: string };
      if (res.ok) setUntil(body.premiumUntil ?? null);
      else {
        const next = problemOf(res.status, body.error);
        setProblem(next);
        // Someone was quicker, or the gift ended meanwhile: no button to press again.
        if (next === 'redeemed' || next === 'expired' || next === 'cancelled' || next === 'replaced') setGift((current) => (current ? { ...current, status: next } : current));
      }
    } catch {
      setProblem('error');
    }
    setBusy(false);
  };

  const period = gift ? text.cardPlan(planCopy[lang][gift.planId].forPeriod) : '';
  const link = 'font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white';
  const signInProblem = accountError === 'popupBlocked' || accountError === 'signInError' ? accountError : null;
  const retype = problem === 'notFound' || problem === 'typo';
  const home = lang === 'ru' ? '/ru' : '';

  // A redeemed gift lands a parent in exactly the place a purchase does — the
  // subscription is on, and the next step is the app — so it gets the same
  // screen rather than a smaller echo of it.
  if (until) {
    return (
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-4 sm:px-8 lg:px-10">
        <PaidScreen copy={subscriptionCopy[lang]} lang={lang} until={until} />
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
      <Reveal animation="zoomIn" load>
        <GiftCardView
          eyebrow={text.eyebrow}
          message={gift?.message ?? ''}
          period={period || text.eyebrow}
          title={gift?.to ? text.cardFor(gift.to) : text.redeemTitle}
        />
      </Reveal>
      <Reveal delay={180} load>
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
          {(
            <>
              <h1 className="text-3xl font-semibold leading-tight text-white">{text.redeemTitle}</h1>
              <p className="mt-3 text-base leading-7 text-white/80">{text.redeemBody}</p>
              {loading ? (
                <p className="mt-6 inline-flex items-center gap-3 text-white/80">
                  <Spinner className="h-5 w-5" />
                  {text.loading}
                </p>
              ) : null}
              {problem ? (
                // A mistyped link is known on the server: that line is part of the page, not an arrival.
                <p className={`${problem === 'typo' ? '' : 'enter-rise '}mt-6 rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]`} role="alert">
                  {text.errors[problem]}
                </p>
              ) : null}
              {retype ? (
                <a className={`mt-4 inline-flex text-sm ${link}`} href={`${home}/gift`}>
                  {text.enterCode}
                </a>
              ) : null}
              {signInProblem && !busy ? (
                <p className="enter-rise mt-6 rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
                  {copy.account[signInProblem]} {text.popupHint}
                </p>
              ) : null}
              {!loading && gift?.status === 'active' && configured ? (
                <div className="enter-rise">
                  <Button className="mt-6 w-full whitespace-normal! text-center sm:w-auto" disabled={busy} onClick={() => void redeem()} variant="light">
                    {busy ? <Spinner className="h-5 w-5" /> : <AppleGlyph className="h-5 w-5" />}
                    {text.redeem}
                  </Button>
                  <p className="mt-4 text-xs leading-5 text-white/55">
                    {text.redeemAccept[0]}
                    <a className={link} href={subscriptionPath(lang, '/terms')} rel="noopener" target="_blank">
                      {text.redeemAccept[1]}
                    </a>
                    {text.redeemAccept[2]}
                  </p>
                  {/* An edge case for a minority, so it folds away: as a
                      paragraph it was a wall of conditionals at the exact
                      moment someone just wants their gift. */}
                  <details className="spotlight group mt-5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-white/85 transition hover:text-white">
                      {text.alreadySubscribed.summary}
                      <span aria-hidden="true" className="ms-2 inline-block transition group-open:rotate-90">›</span>
                    </summary>
                    <ul className="faq-answer mt-3 grid gap-2 text-sm leading-6 text-white/70">
                      <li>{text.alreadySubscribed.web}</li>
                      <li>{text.alreadySubscribed.store(formatDate(gift.expiresAt, lang))}</li>
                    </ul>
                  </details>
                  <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/55">
                    <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#A7F3D0]" />
                    {text.scamNote}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </Reveal>
      {ownGiftAsk ? (
        <div
          aria-labelledby="own-gift-title"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#0B0A1F]/80 p-5 backdrop-blur-sm"
          data-lenis-prevent=""
          onClick={() => setOwnGiftAsk(false)}
          role="dialog"
        >
          <div
            className="enter-pop w-full max-w-md rounded-[2rem] border border-[#FDE68A]/40 bg-[#1E1B4B] p-6 text-start shadow-[0_40px_120px_rgb(0_0_0/55%)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FDE68A]/15 text-[#FDE68A]">
              <AlertTriangle aria-hidden="true" className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-white" id="own-gift-title">
              {text.ownGiftTitle}
            </h2>
            <p className="mt-3 leading-7 text-white/80">{text.ownGiftConfirm}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={() => setOwnGiftAsk(false)} variant="light">
                {text.ownGiftKeep}
              </Button>
              <Button
                onClick={() => {
                  setOwnGiftOk(true);
                  setOwnGiftAsk(false);
                  void redeem();
                }}
                variant="ghost"
              >
                {text.ownGiftGoOn}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// The App Store link comes from the server page, so the article catalogue
// it lives next to never ships to the browser.
export function GiftRedeemPanel({ lang, code, appUrl }: { lang: Lang; code: string; appUrl: string }) {
  return (
    <AccountProvider lang={lang}>
      <GiftRedeem appUrl={appUrl} code={code} />
    </AccountProvider>
  );
}
