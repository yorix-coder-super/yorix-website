import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { Privacy, privacyTitle } from '../legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['en'],
  description: 'What data we receive when you order and pay for a Yorix subscription, why and how long we keep it, and how to exercise your rights.',
  alternates: { canonical: subscriptionPath('en', '/konfidencialnost'), languages: subscriptionAlternates('/konfidencialnost') },
  openGraph: {
    title: privacyTitle['en'],
    description: 'What data we receive when you order and pay for a Yorix subscription, why and how long we keep it, and how to exercise your rights.',
    url: subscriptionPath('en', '/konfidencialnost'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <Privacy lang="en" />;
}
