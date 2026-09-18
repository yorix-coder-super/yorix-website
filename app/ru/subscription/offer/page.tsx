import type { Metadata } from 'next';
import { Offer, offerTitle } from '../../../subscription/legal/Offer';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';

export const metadata: Metadata = {
  title: offerTitle['ru'],
  description: 'Условия подписки Yorix на неделю, месяц или год: оплата, сроки, отказ и возврат.',
  alternates: { canonical: subscriptionPath('ru', '/offer'), languages: subscriptionAlternates('/offer') },
  openGraph: {
    title: offerTitle['ru'],
    description: 'Условия подписки Yorix на неделю, месяц или год: оплата, сроки, отказ и возврат.',
    url: subscriptionPath('ru', '/offer'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <Offer lang="ru" />;
}
