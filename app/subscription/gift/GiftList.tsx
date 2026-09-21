'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { planCopy } from '../merchant';
import { Art } from '../../home/art';
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
      {/* Columns, not a grid: one unredeemed gift carries buttons and a code
          and is three times the height of a redeemed one, and in a grid that
          tall card sets the whole row, leaving a hole under its short
          neighbour. Columns pack each card against the one above it. */}
      <div className="mt-5 gap-4 lg:columns-2">
        {gifts.map((item, index) => (
          <Reveal className="mb-4 break-inside-avoid" delay={(index % 2) * 110} key={item.order}>
            <article className="spotlight flex w-full flex-col gap-4 rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25">
              {/* min-w-0 and wrapping, because a recipient's name is whatever
                  they typed — one long unbroken word would otherwise push the
                  card's own edge out from the inside. */}
              <div className="flex items-start gap-3">
                <Art className="h-11 w-11 shrink-0" height={192} name="icon-gift" width={192} />
                <div className="min-w-0">
                  <p className="break-words text-lg font-semibold leading-snug text-white">
                    {text.cardPlan(planCopy[lang][item.gift.planId]?.forPeriod ?? '')}
                  </p>
                  {item.gift.to ? <p className="mt-0.5 line-clamp-2 break-words text-sm leading-6 text-white/65">{text.cardFor(item.gift.to)}</p> : null}
                </div>
              </div>
              <GiftShare compact gift={item.gift} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
