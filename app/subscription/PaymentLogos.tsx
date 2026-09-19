import type { Lang } from './i18n';
import { listJoin, merchant } from './merchant';

// WebPay's official strip, then the «Мир» mark from NSPK's own pack (WebPay's
// packs have none). The columns use the strip's own units — 7944 wide (МТБанк
// 7455), then a 100 gap and Mir 1213 wide at 340 tall, next to Visa's 300 —
// so both images scale together; at 420 px Mir stays above NSPK's 15 px minimum.
export function PaymentLogos({ lang }: { lang: Lang }) {
  const mtbank = merchant.acquirer === 'mtbank';

  return (
    <div
      role="img"
      aria-label={`WebPay: ${listJoin(merchant.cards[lang], lang)}`}
      dir="ltr"
      className={`grid w-full max-w-[420px] items-center ${mtbank ? 'grid-cols-[7455fr_1313fr]' : 'grid-cols-[7944fr_1313fr]'}`}
    >
      <img
        src={`/payments/webpay-${mtbank ? 'mtbank' : 'banks'}-white.svg`}
        alt=""
        className="h-auto w-full"
        width={mtbank ? 7455 : 7944}
        height="550"
        loading="lazy"
      />
      <img src="/payments/mir-white.svg" alt="" className="ms-auto h-auto w-[92.37%]" width="200" height="56" loading="lazy" />
    </div>
  );
}
