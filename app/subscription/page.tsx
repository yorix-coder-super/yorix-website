import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from './i18n';
import { subscriptionCopy } from './copy';
import { SubscriptionStorefront } from './SubscriptionStorefront';

export const metadata: Metadata = {
  title: subscriptionCopy['en'].meta.title,
  description: subscriptionCopy['en'].meta.description,
  alternates: { canonical: subscriptionPath('en', ''), languages: subscriptionAlternates('') },
  openGraph: {
    title: subscriptionCopy['en'].meta.title,
    description: subscriptionCopy['en'].meta.description,
    url: subscriptionPath('en', ''),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <SubscriptionStorefront lang="en" />;
}
