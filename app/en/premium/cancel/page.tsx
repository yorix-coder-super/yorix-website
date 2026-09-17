import type { Metadata } from 'next';
import { CancelPage } from '../../../premium/CancelPage';
import { premiumAlternates, premiumPath } from '../../../premium/i18n';
import { premiumCopy } from '../../../premium/copy';

export const metadata: Metadata = {
  title: premiumCopy['en'].cancel.title,
  description: 'Yorix subscription payment cancelled.',
  alternates: { canonical: premiumPath('en', '/cancel'), languages: premiumAlternates('/cancel') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelPage lang="en" />;
}
