import type { Lang } from './i18n';
import { acquirer } from './merchant';

/**
 * The marks we actually hold, keyed by the card name in either language. Only
 * a scheme's own artwork goes here — never a redrawn one, and never another
 * acquirer's pack. A card with no mark is named in text instead, so the page
 * still says what it takes.
 *
 * Adding one is a file in public/payments and a line here; it then renders as
 * a logo everywhere the strip appears.
 */
const MARKS: Record<string, { src: string; width: number; height: number; className: string }> = {
  // NSPK's own white logo (nspk.ru/advertising, variant 05). At this size it
  // stays above NSPK's 15 px minimum.
  Мир: { src: '/payments/mir-white.svg', width: 200, height: 56, className: 'h-[18px] w-auto' },
  Mir: { src: '/payments/mir-white.svg', width: 200, height: 56, className: 'h-[18px] w-auto' },
};

/**
 * The acquirer's own strip when the repo holds one, otherwise each accepted
 * card as its own mark, falling back to its name. WebPay ships a strip per
 * bank (7944 units wide, МТБанк 7455) with «Мир» missing from its packs, so
 * the Mir mark is appended to it; ЮKassa has no strip here yet.
 */
export function PaymentLogos({ lang }: { lang: Lang }) {
  const cards = acquirer.cards[lang];
  const label = `${acquirer.name[lang]}: ${[...cards, ...acquirer.wallets[lang]].join(', ')}`;

  if (acquirer.strip?.withMirMark) {
    return (
      <div
        role="img"
        aria-label={label}
        dir="ltr"
        className="grid w-full max-w-[420px] items-center"
        style={{ gridTemplateColumns: `${acquirer.strip.width}fr 1313fr` }}
      >
        <img src={acquirer.strip.src} alt="" className="h-auto w-full" width={acquirer.strip.width} height={acquirer.strip.height} loading="lazy" />
        <img src="/payments/mir-white.svg" alt="" className="ms-auto h-auto w-[92.37%]" width="200" height="56" loading="lazy" />
      </div>
    );
  }

  if (acquirer.strip) {
    // A wordmark stands alone: the cards it takes are named in the documents.
    return (
      <div className="w-full max-w-[420px]" dir="ltr">
        <img
          alt={label}
          className="h-8 w-auto"
          height={acquirer.strip.height}
          loading="lazy"
          src={acquirer.strip.src}
          width={acquirer.strip.width}
        />
      </div>
    );
  }

  return (
    <div role="img" aria-label={label} dir="ltr" className="flex w-full max-w-[420px] flex-wrap items-center gap-x-4 gap-y-2">
      {cards.map((card) => {
        const mark = MARKS[card];
        return mark ? (
          <img alt="" className={mark.className} height={mark.height} key={card} loading="lazy" src={mark.src} width={mark.width} />
        ) : (
          <span className="text-[13px] font-medium tracking-wide text-white/70" key={card}>
            {card}
          </span>
        );
      })}
    </div>
  );
}
