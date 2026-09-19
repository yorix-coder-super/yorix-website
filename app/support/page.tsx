import type { Metadata } from 'next';
import { siteUrl } from '../content';
import { siteCopy } from '../i18n';
import { SupportPage } from '../info/SupportPage';
import { localeAlternates } from '../locales';

const copy = siteCopy('en').support;

export const metadata: Metadata = {
  title: `${copy.nav} | Yorix`,
  description: copy.body,
  alternates: {
    canonical: '/support',
    languages: { 'x-default': '/support', en: '/support', ...localeAlternates('/support') },
  },
  openGraph: { title: copy.title, description: copy.body, url: `${siteUrl}/support`, type: 'website' },
};

export default function Page() {
  return <SupportPage locale="en" />;
}
