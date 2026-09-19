'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { planCopy } from '../merchant';
import { GiftShare, type BuyerGift } from './GiftShare';
import { rememberCode, storedGifts } from './keys';

type Bought = { order: string; key: string; gift: BuyerGift };

// Nothing is e-mailed and no account is needed, so the gifts this device paid
// for are listed from the keys it keeps: every link and code is back.
export function GiftList() {
  const { lang } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [gifts, setGifts] = useState<Bought[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const found = await Promise.all(
        storedGifts()
          .slice(0, 12)
          .map(async (entry): Promise<Bought | null> => {
            try {
              const res = await fetch(`${API_BASE}/v1/web/orders/${entry.order}`, { headers: { 'X-Gift-Key': entry.key } });
              if (!res.ok) return null;
              const body = (await res.json()) as { status?: string; gift?: BuyerGift | null };
              if (body.status !== 'paid' || !body.gift) return null;
              rememberCode(entry.order, body.gift.code);
              return { ...entry, gift: body.gift };
            } catch {
              return null;
            }
          }),
      );
      if (!cancelled) setGifts(found.filter((item): item is Bought => item !== null));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (gifts.length === 0) return null;

  return (
    <section aria-labelledby="your-gifts" className="mt-12">
      <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]" id="your-gifts">
        {text.listTitle}
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {gifts.map((item) => (
          <article className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl" key={item.order}>
            <p className="text-lg font-semibold text-white">
              {text.cardPlan(planCopy[lang][item.gift.planId]?.forPeriod ?? '')}
              {item.gift.to ? <span className="font-normal text-white/70"> · {text.cardFor(item.gift.to)}</span> : null}
            </p>
            <div className="mt-3">
              <GiftShare
                gift={item.gift}
                giftKey={item.key}
                onReplaced={(next) => setGifts((list) => list.map((other) => (other.order === item.order ? { ...other, gift: next } : other)))}
                order={item.order}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
