import type { Metadata } from 'next';
import { Offer, offerTitle } from '../../../subscription/legal/Offer';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';

export const metadata: Metadata = {
  title: offerTitle['en'],
  description: 'Terms of the Yorix subscription for a week, a month or a year: payment, timing, withdrawal and refunds.',
  alternates: { canonical: subscriptionPath('en', '/oferta'), languages: subscriptionAlternates('/oferta') },
  openGraph: {
    title: offerTitle['en'],
    description: 'Terms of the Yorix subscription for a week, a month or a year: payment, timing, withdrawal and refunds.',
    url: subscriptionPath('en', '/oferta'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <Offer lang="en" />;
}
