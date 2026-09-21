import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../legal/PaymentTerms';
import { subscriptionAlternates, subscriptionPath } from '../i18n';
import { acquirer } from '../merchant';

const description = `How to order and pay for a Yorix subscription by card via ${acquirer.name.en}, when it switches on, the refund terms and what the receipt looks like.`;

export const metadata: Metadata = {
  title: paymentTermsTitle['en'],
  description,
  alternates: { canonical: subscriptionPath('en', '/payment'), languages: subscriptionAlternates('/payment') },
  openGraph: {
    title: paymentTermsTitle['en'],
    description,
    url: subscriptionPath('en', '/payment'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <PaymentTerms lang="en" />;
}
