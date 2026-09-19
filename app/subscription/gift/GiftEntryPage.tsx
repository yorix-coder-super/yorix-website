import { subscriptionCopy } from '../copy';
import type { Lang } from '../i18n';
import { SubscriptionShell } from '../SubscriptionShell';
import { GiftCardView } from './GiftCardView';
import { GiftCodeEntry } from './GiftCodeEntry';

// yorix.website/gift — where a code from a card is typed, like the
// «redeem» pages of Calm or Headspace. Open from every country: the
// recipient may live anywhere.
export function GiftEntryPage({ lang }: { lang: Lang }) {
  const text = subscriptionCopy[lang].gift;
  return (
    <SubscriptionShell giftPaths={{ en: '/gift', ru: '/ru/gift' }} lang={lang}>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <GiftCardView eyebrow={text.eyebrow} message="" title={text.redeemTitle} />
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight text-white">{text.entryTitle}</h1>
          <p className="mt-3 text-base leading-7 text-white/80">{text.entryBody}</p>
          <GiftCodeEntry lang={lang} />
        </div>
      </section>
    </SubscriptionShell>
  );
}
