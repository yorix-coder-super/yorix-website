'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Art, Sparkle } from '../home/art';
import { AccountProvider, useAccount } from './account';
import { Reveal } from './Reveal';
import { API_BASE } from './config';
import { subscriptionCopy } from './copy';
import { GiftShare, type BuyerGift } from './gift/GiftShare';
import { giftKeyFor, rememberCode } from './gift/keys';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { Button, Spinner } from './ui';

type Status = 'checking' | 'paid' | 'pending' | 'failed';

const noSubscription = () => () => {};
const orderInUrl = () => new URLSearchParams(window.location.search).get('order') ?? '';
// WEBPAY returns gift buyers with `gift=1`: they have no account to sign in with.
const giftInUrl = () => new URLSearchParams(window.location.search).get('gift') === '1';

function ReturnStatus() {
  const { ready, configured, signedIn, lang, getToken, signIn } = useAccount();
  const copy = subscriptionCopy[lang];
  const [status, setStatus] = useState<Status>('checking');
  const [until, setUntil] = useState<string | null>(null);
  const [gift, setGift] = useState<BuyerGift | null>(null);
  // A gift is read with the key this browser kept when it paid; a plan with the account.
  const giftKey = useSyncExternalStore(noSubscription, () => giftKeyFor(orderInUrl()), () => null);
  const giftOrder = useSyncExternalStore(noSubscription, giftInUrl, () => false);
  const lostGift = giftOrder && !giftKey;
  const needsSignIn = !giftKey && !lostGift && ready && (!configured || !signedIn);

  useEffect(() => {
    if (!giftKey && (!ready || !configured || !signedIn)) return;
    let cancelled = false;
    let attempts = 0;
    // Everything below runs after an await, so state updates never cascade
    // out of the effect body itself.
    const poll = async () => {
      const token = giftKey ? null : await getToken();
      if ((!giftKey && !token) || cancelled) return;
      const orderId = orderInUrl();
      if (!/^Y-[0-9A-Z]{10,32}$/.test(orderId)) {
        setStatus('failed');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders/${orderId}`, {
          headers: giftKey ? { 'X-Gift-Key': giftKey } : { 'X-Firebase-Token': token ?? '' },
        });
        if (cancelled) return;
        if (res.ok) {
          const body = (await res.json()) as { status: string; premiumUntil?: string | null; gift?: BuyerGift | null };
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
          if (body.status === 'expired' || body.status === 'refunded') {
            setStatus('failed');
            return;
          }
        } else if (res.status === 404 || res.status === 403) {
          setStatus('failed');
          return;
        }
      } catch {
        // Network hiccup: keep polling.
      }
      attempts += 1;
      if (attempts >= 45) {
        setStatus('failed');
        return;
      }
      setStatus('pending');
      window.setTimeout(() => {
        if (!cancelled) void poll();
      }, 2000);
    };
    void poll();
    return () => {
      cancelled = true;
    };
  }, [ready, configured, signedIn, getToken, giftKey]);

  return (
    <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-6 text-center sm:px-8">
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
      <Reveal delay={140} load>
        {/* Keyed by what it says: «checking» → «paid» eases in instead of swapping. */}
        <h1 className={`${status === 'paid' ? 'enter-rise ' : ''}mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl`} key={gift ? 'gift' : status === 'paid' && until ? 'paid' : 'checking'}>
          {gift ? copy.gift.paidTitle : status === 'paid' && until ? copy.ret.paid(formatDate(until, lang)) : copy.ret.checking}
        </h1>
      </Reveal>
      <Reveal delay={260} load>
        <div className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-xl">
          {!needsSignIn && !lostGift && (status === 'checking' || status === 'pending') ? (
            <p className="inline-flex items-center gap-3 text-lg text-white/80">
              <Spinner className="h-5 w-5" />
              {status === 'pending' ? copy.ret.pending : copy.ret.checking}
            </p>
          ) : null}
          {status === 'paid' && until ? <p className="enter-rise text-lg leading-8 text-white/85">{copy.ret.openApp}</p> : null}
          {gift ? (
            <div className="enter-rise text-start">
              <p className="mb-5 text-base leading-7 text-white/85">{copy.gift.paidBody}</p>
              <GiftShare gift={gift} giftKey={giftKey} onReplaced={setGift} order={orderInUrl()} />
            </div>
          ) : null}
          {!needsSignIn && !lostGift && status === 'failed' ? <p className="text-base leading-7 text-white/80">{copy.ret.failed}</p> : null}
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
      <Reveal delay={380} load>
        <Button className="mt-8" href={`${subscriptionPath(lang)}#plans`} variant="ghost">
          {copy.ret.back}
        </Button>
      </Reveal>
    </section>
  );
}

// The client half of the return page: status polling and sign-in. The shell
// around it stays a server component, so the header and footer (and every
// language they know) never ship to the browser.
export function ReturnStatusPanel({ lang }: { lang: Lang }) {
  return (
    <AccountProvider lang={lang}>
      <ReturnStatus />
    </AccountProvider>
  );
}
