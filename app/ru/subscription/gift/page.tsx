import type { Metadata } from 'next';
import { subscriptionCopy } from '../../../subscription/copy';
import { subscriptionAlternates, subscriptionPath } from '../../../subscription/i18n';
import { GiftPage } from '../../../subscription/gift/GiftPage';

const text = subscriptionCopy['ru'].gift;

export const metadata: Metadata = {
  title: `${text.title}`,
  description: text.body,
  alternates: { canonical: subscriptionPath('ru', '/gift'), languages: subscriptionAlternates('/gift') },
  openGraph: { title: text.title, description: text.body, url: subscriptionPath('ru', '/gift'), type: 'website', images: ['/art/gift-card.webp'] },
};

export default function Page() {
  return <GiftPage lang="ru" />;
}
