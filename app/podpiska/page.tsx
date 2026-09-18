import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../subscription/i18n';
import { subscriptionCopy } from '../subscription/copy';
import { SubscriptionStorefront } from '../subscription/SubscriptionStorefront';

export const metadata: Metadata = {
  title: subscriptionCopy['ru'].meta.title,
  description: subscriptionCopy['ru'].meta.description,
  alternates: { canonical: subscriptionPath('ru', ''), languages: subscriptionAlternates('') },
  openGraph: {
    title: subscriptionCopy['ru'].meta.title,
    description: subscriptionCopy['ru'].meta.description,
    url: subscriptionPath('ru', ''),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <SubscriptionStorefront lang="ru" />;
}
