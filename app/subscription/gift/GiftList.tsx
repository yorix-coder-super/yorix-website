'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { planCopy } from '../merchant';
import { Reveal } from '../Reveal';
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
      <Reveal>
        <h2 className="text-2xl font-semibold text-white sm:text-[1.7rem]" id="your-gifts">
          {text.listTitle}
        </h2>
      </Reveal>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {gifts.map((item, index) => (
          <Reveal className="flex" delay={(index % 2) * 110} key={item.order}>
            <article className="spotlight w-full rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl transition-colors duration-500 hover:border-white/25">
              <p className="text-lg font-semibold text-white">
                {text.cardPlan(planCopy[lang][item.gift.planId]?.forPeriod ?? '')}
                {item.gift.to ? <span className="font-normal text-white/70"> · {text.cardFor(item.gift.to)}</span> : null}
              </p>
              <div className="mt-3">
                <GiftShare gift={item.gift} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
