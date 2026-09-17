import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from '../../premium/i18n';
import { premiumCopy } from '../../premium/copy';
import { PremiumStorefront } from '../../premium/PremiumStorefront';

export const metadata: Metadata = {
  title: premiumCopy['en'].meta.title,
  description: premiumCopy['en'].meta.description,
  alternates: { canonical: premiumPath('en', ''), languages: premiumAlternates('') },
  openGraph: {
    title: premiumCopy['en'].meta.title,
    description: premiumCopy['en'].meta.description,
    url: premiumPath('en', ''),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <PremiumStorefront lang="en" />;
}
