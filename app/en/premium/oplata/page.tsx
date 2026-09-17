import type { Metadata } from 'next';
import { PaymentTerms, paymentTermsTitle } from '../../../premium/legal/PaymentTerms';
import { premiumAlternates, premiumPath } from '../../../premium/i18n';

export const metadata: Metadata = {
  title: paymentTermsTitle['en'],
  description: 'How to order and pay for Yorix Premium by card via WebPay, when Premium switches on, how refunds work and what the receipt looks like.',
  alternates: { canonical: premiumPath('en', '/oplata'), languages: premiumAlternates('/oplata') },
  openGraph: {
    title: paymentTermsTitle['en'],
    description: 'How to order and pay for Yorix Premium by card via WebPay, when Premium switches on, how refunds work and what the receipt looks like.',
    url: premiumPath('en', '/oplata'),
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <PaymentTerms lang="en" />;
}
