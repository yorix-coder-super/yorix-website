import type { Metadata } from 'next';
import { appDownloadUrl } from '../../content';
import { subscriptionCopy } from '../../subscription/copy';
import { GiftRedeemPanel } from '../../subscription/gift/GiftRedeem';
import { SubscriptionShell } from '../../subscription/SubscriptionShell';

const text = subscriptionCopy['en'].gift;

// A gift link is personal: it is shared by hand and never indexed.
export const metadata: Metadata = {
  // A number or address in a card's text must not become a tap-to-call link.
  formatDetection: { telephone: false, email: false, address: false },
  title: `${text.redeemTitle}`,
  description: text.redeemBody,
  robots: { index: false, follow: false },
  openGraph: { title: text.redeemTitle, description: text.redeemBody, images: ['/art/gift-card.webp'] },
};

export default function Page({ params }: { params: { code: string } }) {
  // A code is letters, digits and dashes; anything else is noise (and never reaches a link or a URL decoder).
  const code = params.code.replace(/[^A-Za-z0-9-]/g, '').slice(0, 20);
  return (
    <SubscriptionShell giftPaths={{ en: `/gift/${code}`, ru: `/ru/gift/${code}` }} lang="en">
      <GiftRedeemPanel appUrl={appDownloadUrl} code={code} lang="en" />
    </SubscriptionShell>
  );
}
