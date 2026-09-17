import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from '../../../premium/i18n';
import { premiumCopy } from '../../../premium/copy';
import { ReturnPage } from '../../../premium/ReturnPage';

export const metadata: Metadata = {
  title: premiumCopy['en'].ret.title,
  description: 'Yorix subscription payment status.',
  alternates: { canonical: premiumPath('en', '/return'), languages: premiumAlternates('/return') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReturnPage lang="en" />;
}
