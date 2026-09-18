'use client';

import { useEffect, useState } from 'react';
import { AccountProvider, useAccount } from './account';
import { API_BASE } from './config';
import { formatDate, subscriptionPath, type Lang } from './i18n';
import { SubscriptionShell } from './SubscriptionShell';
import { Button, Spinner } from './ui';

type Status = 'checking' | 'paid' | 'pending' | 'failed';

function ReturnStatus() {
  const { ready, configured, user, copy, lang, getToken, signIn } = useAccount();
  const [status, setStatus] = useState<Status>('checking');
  const [until, setUntil] = useState<string | null>(null);
  const needsSignIn = ready && (!configured || !user);

  useEffect(() => {
    if (!ready || !configured || !user) return;
    let cancelled = false;
    let attempts = 0;
    // Everything below runs after an await, so state updates never cascade
    // out of the effect body itself.
    const poll = async () => {
      const token = await getToken();
      if (!token || cancelled) return;
      const orderId = new URLSearchParams(window.location.search).get('order') ?? '';
      if (!/^Y-[0-9A-Z]{10,32}$/.test(orderId)) {
        setStatus('failed');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/v1/web/orders/${orderId}`, { headers: { 'X-Firebase-Token': token } });
        if (cancelled) return;
        if (res.ok) {
          const body = (await res.json()) as { status: string; premiumUntil?: string | null };
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
  }, [ready, configured, user, getToken]);

  return (
    <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-10 text-center sm:px-8">
      <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{status === 'paid' ? copy.ret.title : copy.ret.checking}</h1>
      <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.1] p-8 backdrop-blur-xl">
        {!needsSignIn && (status === 'checking' || status === 'pending') ? (
          <p className="inline-flex items-center gap-3 text-lg text-white/80">
            <Spinner className="h-5 w-5" />
            {status === 'pending' ? copy.ret.pending : copy.ret.checking}
          </p>
        ) : null}
        {status === 'paid' && until ? (
          <>
            <p className="text-2xl font-semibold text-[#FDE68A]">{copy.ret.paid(formatDate(until, lang))}</p>
            <p className="mt-3 text-base leading-7 text-white/75">{copy.ret.openApp}</p>
          </>
        ) : null}
        {!needsSignIn && status === 'failed' ? <p className="text-base leading-7 text-white/80">{copy.ret.failed}</p> : null}
        {needsSignIn ? (
          <>
            <p className="text-base leading-7 text-white/80">{copy.ret.signIn}</p>
            {configured ? (
              <Button className="mt-5" onClick={() => void signIn('apple.com')} variant="light">
                {copy.account.signInApple}
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
      <Button className="mt-8" href={`${subscriptionPath(lang)}#tarify`} variant="ghost">
        {copy.ret.back}
      </Button>
    </section>
  );
}

export function ReturnPage({ lang }: { lang: Lang }) {
  return (
    <SubscriptionShell lang={lang} page="/return">
      <AccountProvider lang={lang}>
        <ReturnStatus />
      </AccountProvider>
    </SubscriptionShell>
  );
}
