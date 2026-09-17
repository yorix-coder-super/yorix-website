import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../legal/PaymentTerms';
import { premiumAlternates, premiumPath } from '../i18n';

export const metadata: Metadata = {
  title: paymentTermsTitle['ru'],
  description: 'Как заказать и оплатить Yorix Premium картой через WebPay, когда включается Premium, как вернуть деньги и как выглядит чек.',
  alternates: { canonical: premiumPath('ru', '/oplata'), languages: premiumAlternates('/oplata') },
  openGraph: {
    title: paymentTermsTitle['ru'],
    description: 'Как заказать и оплатить Yorix Premium картой через WebPay, когда включается Premium, как вернуть деньги и как выглядит чек.',
    url: premiumPath('ru', '/oplata'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <PaymentTerms lang="ru" />;
}
