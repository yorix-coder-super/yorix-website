import type { Metadata } from 'next';
import { subscriptionCopy } from '../../subscription/copy';
import { GiftEntryPage } from '../../subscription/gift/GiftEntryPage';

const text = subscriptionCopy['ru'].gift;

export const metadata: Metadata = {
  title: `${text.entryTitle} | Yorix`,
  description: text.entryBody,
  alternates: { canonical: '/ru/gift', languages: { en: '/gift', ru: '/ru/gift', 'x-default': '/gift' } },
  openGraph: { title: text.redeemTitle, description: text.entryBody, url: '/ru/gift', type: 'website', images: ['/art/gift-card.webp'] },
};

export default function Page() {
  return <GiftEntryPage lang="ru" />;
}
