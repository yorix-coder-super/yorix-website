import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { Privacy, privacyTitle } from '../../../subscription/legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['ru'],
  description: 'Какие данные мы получаем при заказе и оплате подписки Yorix, зачем и как долго храним, и как ими распорядиться.',
  alternates: { canonical: subscriptionPath('ru', '/konfidencialnost'), languages: subscriptionAlternates('/konfidencialnost') },
  openGraph: {
    title: privacyTitle['ru'],
    description: 'Какие данные мы получаем при заказе и оплате подписки Yorix, зачем и как долго храним, и как ими распорядиться.',
    url: subscriptionPath('ru', '/konfidencialnost'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <Privacy lang="ru" />;
}
