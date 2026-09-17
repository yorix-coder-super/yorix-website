import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from '../i18n';
import { Privacy, privacyTitle } from '../legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['ru'],
  description: 'Какие данные мы получаем при заказе и оплате Yorix Premium, зачем и как долго храним, и как ими распорядиться.',
  alternates: { canonical: premiumPath('ru', '/konfidencialnost'), languages: premiumAlternates('/konfidencialnost') },
  openGraph: {
    title: privacyTitle['ru'],
    description: 'Какие данные мы получаем при заказе и оплате Yorix Premium, зачем и как долго храним, и как ими распорядиться.',
    url: premiumPath('ru', '/konfidencialnost'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <Privacy lang="ru" />;
}
