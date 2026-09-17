import type { Metadata } from 'next';
import { Offer, offerTitle } from '../legal/Offer';
import { premiumAlternates, premiumPath } from '../i18n';

export const metadata: Metadata = {
  title: offerTitle['ru'],
  description: 'Условия предоставления доступа к Yorix Premium на неделю, месяц или год: оплата, сроки, отказ и возврат.',
  alternates: { canonical: premiumPath('ru', '/oferta'), languages: premiumAlternates('/oferta') },
  openGraph: {
    title: offerTitle['ru'],
    description: 'Условия предоставления доступа к Yorix Premium на неделю, месяц или год: оплата, сроки, отказ и возврат.',
    url: premiumPath('ru', '/oferta'),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <Offer lang="ru" />;
}
