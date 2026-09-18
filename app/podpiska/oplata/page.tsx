import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../../subscription/legal/PaymentTerms';
import { subscriptionAlternates, subscriptionPath } from '../../subscription/i18n';

export const metadata: Metadata = {
  title: paymentTermsTitle['ru'],
  description: 'Как заказать и оплатить подписку Yorix картой через WebPay, когда она включается, условия возврата и как выглядит чек.',
  alternates: { canonical: subscriptionPath('ru', '/oplata'), languages: subscriptionAlternates('/oplata') },
  openGraph: {
    title: paymentTermsTitle['ru'],
    description: 'Как заказать и оплатить подписку Yorix картой через WebPay, когда она включается, условия возврата и как выглядит чек.',
    url: subscriptionPath('ru', '/oplata'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <PaymentTerms lang="ru" />;
}
