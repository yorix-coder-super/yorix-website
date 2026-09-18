import type { Metadata } from 'next';
import { CancelPage } from '../../subscription/CancelPage';
import { subscriptionAlternates, subscriptionPath } from '../../subscription/i18n';
import { subscriptionCopy } from '../../subscription/copy';

export const metadata: Metadata = {
  title: subscriptionCopy['ru'].cancel.title,
  description: 'Оплата подписки Yorix отменена.',
  alternates: { canonical: subscriptionPath('ru', '/cancel'), languages: subscriptionAlternates('/cancel') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelPage lang="ru" />;
}
