import type { Metadata } from 'next';
import { CancelPage } from '../CancelPage';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { subscriptionCopy } from '../copy';

export const metadata: Metadata = {
  title: subscriptionCopy['en'].cancel.title,
  description: 'Yorix subscription payment cancelled.',
  alternates: { canonical: subscriptionPath('en', '/cancel'), languages: subscriptionAlternates('/cancel') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelPage lang="en" />;
}
