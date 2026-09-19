'use client';

import { useEffect, useState } from 'react';
import { AppleGlyph } from '../../home/art';
import { AccountProvider, useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { formatDate, subscriptionPath, type Lang } from '../i18n';
import { planCopy, type PlanId } from '../merchant';
import { Button, Spinner } from '../ui';
import { codeFromInput, formatGiftCode, giftCodeChecks } from './code';
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
  const [problem, setProblem] = useState<Problem | null>(typo ? 'typo' : null);
  const [until, setUntil] = useState<string | null>(null);

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

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
      <GiftCardView
        eyebrow={text.eyebrow}
        message={gift?.message ?? ''}
        period={period || text.eyebrow}
        title={gift?.to ? text.cardFor(gift.to) : text.redeemTitle}
      />
      <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
        {until ? (
          <>
            <h1 className="text-3xl font-semibold leading-tight text-white">{text.redeemed(formatDate(until, lang))}</h1>
            <p className="mt-3 text-base leading-7 text-white/80">{text.openApp}</p>
            <Button className="mt-6" href={appUrl} rel="noopener noreferrer" target="_blank" variant="light">
              <AppleGlyph className="h-5 w-5" />
              {text.download}
            </Button>
          </>
        ) : (
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
              <p className="mt-6 rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
                {text.errors[problem]}
              </p>
            ) : null}
            {retype ? (
              <a className={`mt-4 inline-flex text-sm ${link}`} href={`${home}/gift`}>
                {text.enterCode}
              </a>
            ) : null}
            {signInProblem && !busy ? (
              <p className="mt-6 rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
                {copy.account[signInProblem]} {text.popupHint}
              </p>
            ) : null}
            {!loading && gift?.status === 'active' && configured ? (
              <>
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
                <p className="mt-4 text-sm leading-6 text-white/70">{text.alreadySubscribed(formatDate(gift.expiresAt, lang))}</p>
              </>
            ) : null}
          </>
        )}
      </div>
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
