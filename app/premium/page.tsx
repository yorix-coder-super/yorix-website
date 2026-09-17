import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from './i18n';
import { premiumCopy } from './copy';
import { PremiumStorefront } from './PremiumStorefront';

export const metadata: Metadata = {
  title: premiumCopy['ru'].meta.title,
  description: premiumCopy['ru'].meta.description,
  alternates: { canonical: premiumPath('ru', ''), languages: premiumAlternates('') },
  openGraph: {
    title: premiumCopy['ru'].meta.title,
    description: premiumCopy['ru'].meta.description,
    url: premiumPath('ru', ''),
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function Page() {
  return <PremiumStorefront lang="ru" />;
}
