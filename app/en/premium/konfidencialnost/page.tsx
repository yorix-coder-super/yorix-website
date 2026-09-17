import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from '../../../premium/i18n';
import { Privacy, privacyTitle } from '../../../premium/legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['en'],
  description: 'What data we receive when you order and pay for a Yorix subscription, why and how long we keep it, and how to exercise your rights.',
  alternates: { canonical: premiumPath('en', '/konfidencialnost'), languages: premiumAlternates('/konfidencialnost') },
  openGraph: {
    title: privacyTitle['en'],
    description: 'What data we receive when you order and pay for a Yorix subscription, why and how long we keep it, and how to exercise your rights.',
    url: premiumPath('en', '/konfidencialnost'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <Privacy lang="en" />;
}
