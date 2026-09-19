'use client';

import { useEffect, useState } from 'react';
import { AppleGlyph } from '../../home/art';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { planCopy } from '../merchant';
import { Button } from '../ui';
import { GiftShare, type BuyerGift } from './GiftShare';

// Nothing is e-mailed, so the buyer's gifts live here: sign in and every
// link and code is back, with its status.
export function GiftList() {
  const { ready, configured, signedIn, signIn, getToken, lang, copy } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [gifts, setGifts] = useState<BuyerGift[] | null>(null);

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    (async () => {
      const token = await getToken();
      if (!token || cancelled) return;
      try {
        const res = await fetch(`${API_BASE}/v1/web/gifts`, { headers: { 'X-Firebase-Token': token } });
        if (!res.ok || cancelled) return;
        const body = (await res.json()) as { gifts?: BuyerGift[] };
        if (!cancelled) setGifts(body.gifts ?? []);
      } catch {
        // The list is a convenience; the checkout above works without it.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn, getToken]);

  if (!ready || !configured) return null;
  if (!signedIn) {
    return (
      <div className="mt-10 flex flex-col items-start gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <p className="text-base leading-7 text-white/80">{text.listSignIn}</p>
        <Button className="shrink-0" onClick={() => void signIn()} variant="ghost">
          <AppleGlyph className="h-5 w-5" />
          {copy.account.signInApple}
        </Button>
      </div>
    );
  }
  if (!gifts || gifts.length === 0) return null;

  return (
    <section aria-labelledby="your-gifts" className="mt-12">
      <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]" id="your-gifts">
        {text.listTitle}
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Keyed by place, not code: a replaced code keeps its card and its «done» note. */}
        {gifts.map((gift, index) => (
          <article className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl" key={index}>
            <p className="text-lg font-semibold text-white">
              {text.cardPlan(planCopy[lang][gift.planId]?.forPeriod ?? '')}
              {gift.to ? <span className="font-normal text-white/70"> · {text.cardFor(gift.to)}</span> : null}
            </p>
            <div className="mt-3">
              <GiftShare gift={gift} onReplaced={(next) => setGifts((list) => (list ?? []).map((item, at) => (at === index ? next : item)))} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
