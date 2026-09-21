import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../../../subscription/legal/PaymentTerms';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { acquirer } from '../../../subscription/merchant';

const description = `Как заказать и оплатить подписку Yorix картой через ${acquirer.name.ru}, когда она включается, условия возврата и как выглядит чек.`;

export const metadata: Metadata = {
  title: paymentTermsTitle['ru'],
  description,
  alternates: { canonical: subscriptionPath('ru', '/payment'), languages: subscriptionAlternates('/payment') },
  openGraph: {
    title: paymentTermsTitle['ru'],
    description,
    url: subscriptionPath('ru', '/payment'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <PaymentTerms lang="ru" />;
}
