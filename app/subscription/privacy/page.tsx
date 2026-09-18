import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { Privacy, privacyTitle } from '../legal/Privacy';

export const metadata: Metadata = {
  title: privacyTitle['en'],
  description: 'What personal data the Yorix site, app and support process, why and on what basis, who receives it, how long it is kept and how to exercise your rights.',
  alternates: { canonical: subscriptionPath('en', '/privacy'), languages: subscriptionAlternates('/privacy') },
  openGraph: {
    title: privacyTitle['en'],
    description: 'What personal data the Yorix site, app and support process, why and on what basis, who receives it, how long it is kept and how to exercise your rights.',
    url: subscriptionPath('en', '/privacy'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <Privacy lang="en" />;
}
