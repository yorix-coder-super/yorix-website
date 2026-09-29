'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Art, Sparkle } from '../home/art';
import { AccountProvider, reviewKey, useAccount, useReviewing } from './account';
import { Reveal } from './Reveal';
import { API_BASE } from './config';
import { whitePill } from '../home/CtaBand';
import { subscriptionCopy, type PaymentFailure } from './copy';
import { GiftShare, type BuyerGift } from './gift/GiftShare';
import { PaidScreen } from './PaidScreen';
import { giftKeyFor, rememberCode } from './gift/keys';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { Button, Spinner } from './ui';

type Status = 'checking' | 'pending' | 'slow' | 'late' | 'paid' | 'declined' | 'expired' | 'refunded' | 'missing';

// Every 2 s for the first half-minute, then every 5 s: a bank that takes
// minutes is normal, and the page keeps waiting for ten of them.
const FAST_POLLS = 15;
const WAIT_MS = 10 * 60 * 1000;
const FAILURES: readonly PaymentFailure[] = ['insufficient_funds', 'declined', 'card', '3ds', 'expired'];
const failureOf = (value: unknown): PaymentFailure =>
  FAILURES.includes(value as PaymentFailure) ? (value as PaymentFailure) : 'declined';

const noSubscription = () => () => {};
const orderInUrl = () => new URLSearchParams(window.location.search).get('order') ?? '';
// The acquirer returns gift buyers with `gift=1`: they have no account to sign in with.
const giftInUrl = () => new URLSearchParams(window.location.search).get('gift') === '1';

function ReturnStatus() {
  const { ready, configured, signedIn, lang, getToken, signIn } = useAccount();
  const copy = subscriptionCopy[lang];
  const [status, setStatus] = useState<Status>('checking');
  const [until, setUntil] = useState<string | null>(null);
  const [gift, setGift] = useState<BuyerGift | null>(null);
  const [failure, setFailure] = useState<PaymentFailure>('declined');
  // A gift is read with the key this browser kept when it paid; a plan with the account.
  const giftKey = useSyncExternalStore(noSubscription, () => giftKeyFor(orderInUrl()), () => null);
  const giftOrder = useSyncExternalStore(noSubscription, giftInUrl, () => false);
  const lostGift = giftOrder && !giftKey;
  // A reviewer's link reads the account it bought for, with no sign-in.
  const reviewing = useReviewing();
  const needsSignIn = !giftKey && !lostGift && !reviewing && ready && (!configured || !signedIn);
  // A paid subscription (not a gift) gets its own welcome screen below.
  const paidPlan = status === 'paid' && until !== null && !gift;

  useEffect(() => {
    if (!giftKey && !reviewing && (!ready || !configured || !signedIn)) return;
    let cancelled = false;
    let attempts = 0;
    const started = Date.now();
    // Everything below runs after an await, so state updates never cascade
    // out of the effect body itself.
    const poll = async () => {
      const token = giftKey ? null : await getToken();
      // A reviewer's link reads the orders of the account it bought for.
      const review = giftKey || token ? null : reviewKey();
      if ((!giftKey && !token && !review) || cancelled) return;
      const orderId = orderInUrl();
      if (!/^Y-[0-9A-Z]{10,32}$/.test(orderId)) {
        setStatus('missing');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders/${orderId}`, {
          headers: giftKey ? { 'X-Gift-Key': giftKey } : review ? { 'X-Review-Key': review } : { 'X-Firebase-Token': token ?? '' },
        });
        if (cancelled) return;
        if (res.ok) {
          const body = (await res.json()) as { status: string; premiumUntil?: string | null; gift?: BuyerGift | null; failure?: string };
          // A gift order is done once its code exists; the buyer gets no pass of their own.
          if (body.status === 'paid' && body.gift) {
            rememberCode(orderId, body.gift.code);
            setGift(body.gift);
            setStatus('paid');
            return;
          }
          if (body.status === 'paid' && body.premiumUntil) {
            setUntil(body.premiumUntil);
            setStatus('paid');
            return;
          }
          if (body.status === 'failed') {
            setFailure(failureOf(body.failure));
            setStatus('declined');
            return;
          }
          if (body.status === 'expired' || body.status === 'refunded') {
            setStatus(body.status);
            return;
          }
        } else if (res.status === 404 || res.status === 403) {
          setStatus('missing');
          return;
        }
      } catch {
        // Network hiccup: keep polling.
      }
      attempts += 1;
      if (Date.now() - started >= WAIT_MS) {
        setStatus('late');
        return;
      }
      setStatus(attempts < FAST_POLLS ? 'pending' : 'slow');
      window.setTimeout(() => {
        if (!cancelled) void poll();
      }, attempts < FAST_POLLS ? 2000 : 5000);
    };
    void poll();
    return () => {
      cancelled = true;
    };
  }, [ready, configured, signedIn, getToken, giftKey, reviewing]);

  const titles: Partial<Record<Status, string>> = {
    slow: copy.ret.slowTitle,
    late: copy.ret.lateTitle,
    declined: copy.ret.declinedTitle,
    expired: copy.ret.expiredTitle,
    refunded: copy.ret.refundedTitle,
    missing: copy.ret.missingTitle,
  };
  const heading = gift ? copy.gift.paidTitle : status === 'paid' && until ? copy.ret.paid(formatDate(until, lang)) : titles[status] ?? copy.ret.checking;
  const waiting = status === 'checking' || status === 'pending' || status === 'slow';
  // A payment that did not happen is tried again from where it started.
  const retryHref = giftOrder ? `${lang === 'ru' ? '/ru' : ''}/gift` : `${subscriptionPath(lang)}#plans`;
  const canRetry = status === 'declined' || status === 'expired' || status === 'late';
  const closed = canRetry || status === 'missing' || status === 'refunded';

  return (
    // A paid gift needs room for the card beside its instructions; every other
    // state is a short column.
    <section className={`relative mx-auto px-5 pb-24 pt-6 text-center sm:px-8 ${gift || paidPlan ? 'max-w-6xl' : 'max-w-2xl'}`}>
      {paidPlan ? null : (
      <Reveal animation="zoomIn" load>
        <div className="relative mx-auto w-40 sm:w-48">
          {status === 'paid' ? (
            <div className="enter-pop">
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/40%)]" height={560} name="cta-baby-star" priority width={503} />
              </div>
            </div>
          ) : (
            <div className="bob">
              <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(15_16_34/40%)]" height={420} name="star-mascot" priority width={410} />
            </div>
          )}
          <Sparkle className="-left-6 top-4 w-3" delay={300} tone="lavender" />
          <Sparkle className="-right-4 top-10 w-4" delay={1100} />
        </div>
      </Reveal>
      )}
      {paidPlan ? null : (
      <Reveal delay={140} load>
        {/* Keyed by what it says: «checking» → «paid» eases in instead of swapping. */}
        <h1 className={`${waiting ? '' : 'enter-rise '}mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl`} key={heading}>
          {heading}
        </h1>
      </Reveal>
      )}
      {/* The buyer just spent money on someone else; say thank you before the
          instructions start. */}
      {gift ? (
      <Reveal delay={200} load>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/75">{copy.gift.paidLead}</p>
      </Reveal>
      ) : null}
      {/* A paid gift replaces this panel with its own; the panel is for the
          states that are still one short message. */}
      {gift || paidPlan ? null : (
      <Reveal delay={260} load>
        <div className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-xl">
          {!needsSignIn && !lostGift && waiting ? (
            <p className="flex flex-col items-center justify-center gap-3 text-lg text-white/80 sm:flex-row">
              <Spinner className="h-5 w-5 shrink-0" />
              {/* The heading already says we are checking; this line only adds
                  what the heading does not, so it stays empty until it can. */}
              {status === 'pending' ? copy.ret.pending : status === 'slow' ? copy.ret.slow : null}
            </p>
          ) : null}
          {status === 'paid' && until ? <p className="enter-rise text-lg leading-8 text-white/85">{copy.ret.openApp}</p> : null}
          {status === 'declined' ? (
            <div className="enter-rise">
              <p className="text-lg leading-8 text-white/85">{copy.ret.declined[failure]}</p>
              <p className="mt-2 text-base font-semibold text-[#FDE68A]">{copy.ret.notCharged}</p>
            </div>
          ) : null}
          {status === 'expired' || status === 'late' || status === 'refunded' || status === 'missing' ? (
            <p className="enter-rise text-base leading-7 text-white/80">
              {{ expired: copy.ret.expired, late: copy.ret.late, refunded: copy.ret.refunded, missing: copy.ret.failed }[status]}
            </p>
          ) : null}
          {lostGift ? <p className="text-base leading-7 text-white/80">{copy.gift.lostKey}</p> : null}
          {needsSignIn ? (
            <>
              <p className="text-base leading-7 text-white/80">{copy.ret.signIn}</p>
              {configured ? (
                <Button className="mt-5" onClick={() => void signIn()} variant="light">
                  {copy.account.signInApple}
                </Button>
              ) : null}
            </>
          ) : null}
        </div>
      </Reveal>
      )}
      {gift ? (
        <div className="mt-8">
          <GiftShare gift={gift} />
        </div>
      ) : null}
      {paidPlan ? (
        <div className="mt-2">
          <PaidScreen copy={copy} lang={lang} until={until!} />
        </div>
      ) : null}
      {/* «Try again» and «Back to plans» belong to one state only: the order that did not
          work out. After a purchase it reads as if the purchase did not count,
          and while the payment is still being checked it invites the buyer to
          walk away from it. */}
      {!closed ? null : (
        <div className="enter-rise mt-8 flex flex-col items-center gap-4">
          {canRetry ? (
            <a className={whitePill} href={retryHref}>
              {copy.ret.retry}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          ) : (
            <Button href={`${subscriptionPath(lang)}#plans`} variant="ghost">
              {copy.ret.back}
            </Button>
          )}
          <a className="text-sm font-medium text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white" href={`${lang === 'ru' ? '/ru' : ''}/support#contact`}>
            {copy.ret.write}
          </a>
        </div>
      )}
    </section>
  );
}

// The client half of the return page: status polling and sign-in. The shell
// around it stays a server component, so the header and footer (and every
// language they know) never ship to the browser.
export function ReturnStatusPanel({ lang }: { lang: Lang }) {
  return (
    // This page reads the order through the account, so it needs Firebase at once.
    <AccountProvider eagerAuth lang={lang}>
      <ReturnStatus />
    </AccountProvider>
  );
}
