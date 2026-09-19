import type { Metadata } from 'next';
import { appDownloadUrl } from '../../content';
import { subscriptionCopy } from '../../subscription/copy';
import { GiftRedeemPanel } from '../../subscription/gift/GiftRedeem';
import { SubscriptionShell } from '../../subscription/SubscriptionShell';

const text = subscriptionCopy['en'].gift;

// A gift link is personal: it is shared by hand and never indexed.
export const metadata: Metadata = {
  title: `${text.redeemTitle} | Yorix`,
  description: text.redeemBody,
  robots: { index: false, follow: false },
  openGraph: { title: text.redeemTitle, description: text.redeemBody, images: ['/art/gift-card.webp'] },
};

export default function Page({ params }: { params: { code: string } }) {
  return (
    <SubscriptionShell lang="en">
      <GiftRedeemPanel appUrl={appDownloadUrl} code={decodeURIComponent(params.code)} lang="en" />
    </SubscriptionShell>
  );
}
