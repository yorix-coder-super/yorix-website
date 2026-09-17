import { merchant } from './merchant';

export function PaymentLogos() {
  const bank = merchant.acquirer === 'mtbank' ? 'mtbank' : 'banks';

  return (
    <img
      src={`/payments/webpay-${bank}-white.svg`}
      alt={`WebPay: ${merchant.cards.join(', ')}`}
      className="h-auto w-full max-w-[420px]"
      width="7944"
      height="550"
      loading="lazy"
    />
  );
}
