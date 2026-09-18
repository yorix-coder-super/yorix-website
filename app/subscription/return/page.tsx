import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { subscriptionCopy } from '../copy';
import { ReturnPage } from '../ReturnPage';

export const metadata: Metadata = {
  title: subscriptionCopy['en'].ret.checking,
  description: 'Yorix subscription payment status.',
  alternates: { canonical: subscriptionPath('en', '/return'), languages: subscriptionAlternates('/return') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReturnPage lang="en" />;
}
