import type { Lang } from './i18n';
import { acquirer, listJoin } from './merchant';

// The acquirer's own strip when it has one in the repo, then the «Мир» mark
// from NSPK's own pack. The columns use the strip's units — WebPay's is 7944
// wide (МТБанк 7455), then a 100 gap and Mir 1213 wide at 340 tall, next to
// Visa's 300 — so both images scale together; at 420 px Mir stays above
// NSPK's 15 px minimum. An acquirer with no strip names its cards in text
// rather than borrowing another bank's logos.
export function PaymentLogos({ lang }: { lang: Lang }) {
  const cards = listJoin(acquirer.cards[lang], lang);
  const label = `${acquirer.name[lang]}: ${cards}`;

  if (!acquirer.strip) {
    return (
      <div className="flex w-full max-w-[420px] items-center gap-3" dir="ltr">
        <span className="text-xs leading-5 text-white/60">{label}</span>
        <img src="/payments/mir-white.svg" alt="" className="ms-auto h-auto w-[72px]" width="200" height="56" loading="lazy" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      dir="ltr"
      className="grid w-full max-w-[420px] items-center"
      style={{ gridTemplateColumns: `${acquirer.strip.width}fr 1313fr` }}
    >
      <img src={acquirer.strip.src} alt="" className="h-auto w-full" width={acquirer.strip.width} height="550" loading="lazy" />
      <img src="/payments/mir-white.svg" alt="" className="ms-auto h-auto w-[92.37%]" width="200" height="56" loading="lazy" />
    </div>
  );
}
