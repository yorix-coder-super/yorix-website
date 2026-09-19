import type { Metadata } from 'next';
import { subscriptionCopy } from '../copy';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { GiftPage } from '../gift/GiftPage';

const text = subscriptionCopy['en'].gift;

export const metadata: Metadata = {
  title: `${text.title} | Yorix`,
  description: text.body,
  alternates: { canonical: subscriptionPath('en', '/gift'), languages: subscriptionAlternates('/gift') },
  openGraph: { title: text.title, description: text.body, url: subscriptionPath('en', '/gift'), type: 'website', images: ['/art/gift-card.webp'] },
};

export default function Page() {
  return <GiftPage lang="en" />;
}
