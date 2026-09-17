import type { Metadata } from 'next';
import { Offer, offerTitle } from '../../../premium/legal/Offer';
import { premiumAlternates, premiumPath } from '../../../premium/i18n';

export const metadata: Metadata = {
  title: offerTitle['en'],
  description: 'Terms of access to Yorix Premium for a week, a month or a year: payment, timing, withdrawal and refunds.',
  alternates: { canonical: premiumPath('en', '/oferta'), languages: premiumAlternates('/oferta') },
  openGraph: {
    title: offerTitle['en'],
    description: 'Terms of access to Yorix Premium for a week, a month or a year: payment, timing, withdrawal and refunds.',
    url: premiumPath('en', '/oferta'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <Offer lang="en" />;
}
