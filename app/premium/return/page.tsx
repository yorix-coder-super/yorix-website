import type { Metadata } from 'next';
import { premiumAlternates, premiumPath } from '../i18n';
import { premiumCopy } from '../copy';
import { ReturnPage } from '../ReturnPage';

export const metadata: Metadata = {
  title: premiumCopy['ru'].ret.title,
  description: 'Статус оплаты Yorix Premium.',
  alternates: { canonical: premiumPath('ru', '/return'), languages: premiumAlternates('/return') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReturnPage lang="ru" />;
}
