import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { subscriptionCopy } from '../../../subscription/copy';
import { ReturnPage } from '../../../subscription/ReturnPage';

export const metadata: Metadata = {
  title: subscriptionCopy['en'].ret.title,
  description: 'Yorix subscription payment status.',
  alternates: { canonical: subscriptionPath('en', '/return'), languages: subscriptionAlternates('/return') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReturnPage lang="en" />;
}
