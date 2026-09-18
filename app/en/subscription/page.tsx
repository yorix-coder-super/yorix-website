import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../subscription/i18n';
import { subscriptionCopy } from '../../subscription/copy';
import { SubscriptionStorefront } from '../../subscription/SubscriptionStorefront';

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
