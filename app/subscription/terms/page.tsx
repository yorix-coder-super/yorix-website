import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { Terms, termsTitle } from '../legal/Terms';

const description = 'The terms of use of the Yorix app and website: what the service is and is not, the rules of use and the limits of liability.';

export const metadata: Metadata = {
  title: termsTitle['en'],
  description,
  alternates: { canonical: subscriptionPath('en', '/terms'), languages: subscriptionAlternates('/terms') },
  openGraph: { title: termsTitle['en'], description, url: subscriptionPath('en', '/terms'), type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <Terms lang="en" />;
}
