import type { Metadata } from 'next';
import { CancelPage } from '../CancelPage';
import { premiumAlternates, premiumPath } from '../i18n';
import { premiumCopy } from '../copy';

export const metadata: Metadata = {
  title: premiumCopy['ru'].cancel.title,
  description: 'Оплата Yorix Premium отменена.',
  alternates: { canonical: premiumPath('ru', '/cancel'), languages: premiumAlternates('/cancel') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelPage lang="ru" />;
}
