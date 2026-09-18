import type { Metadata } from 'next';
import { subscriptionAlternates, subscriptionPath } from '../../subscription/i18n';
import { subscriptionCopy } from '../../subscription/copy';
import { ReturnPage } from '../../subscription/ReturnPage';

export const metadata: Metadata = {
  title: subscriptionCopy['ru'].ret.title,
  description: 'Статус оплаты подписки Yorix.',
  alternates: { canonical: subscriptionPath('ru', '/return'), languages: subscriptionAlternates('/return') },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReturnPage lang="ru" />;
}
