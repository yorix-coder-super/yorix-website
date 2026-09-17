import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../legal/PaymentTerms';
import { premiumAlternates, premiumPath } from '../i18n';

export const metadata: Metadata = {
  title: paymentTermsTitle['ru'],
  description: 'Как заказать и оплатить подписку Yorix картой через WebPay, когда она включается, условия возврата и как выглядит чек.',
  alternates: { canonical: premiumPath('ru', '/oplata'), languages: premiumAlternates('/oplata') },
  openGraph: {
    title: paymentTermsTitle['ru'],
    description: 'Как заказать и оплатить подписку Yorix картой через WebPay, когда она включается, условия возврата и как выглядит чек.',
    url: premiumPath('ru', '/oplata'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <PaymentTerms lang="ru" />;
}
