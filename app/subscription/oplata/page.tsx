import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../legal/PaymentTerms';
import { subscriptionAlternates, subscriptionPath } from '../i18n';

export const metadata: Metadata = {
  title: paymentTermsTitle['en'],
  description: 'How to order and pay for a Yorix subscription by card via WebPay, when it switches on, the refund terms and what the receipt looks like.',
  alternates: { canonical: subscriptionPath('en', '/oplata'), languages: subscriptionAlternates('/oplata') },
  openGraph: {
    title: paymentTermsTitle['en'],
    description: 'How to order and pay for a Yorix subscription by card via WebPay, when it switches on, the refund terms and what the receipt looks like.',
    url: subscriptionPath('en', '/oplata'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <PaymentTerms lang="en" />;
}
