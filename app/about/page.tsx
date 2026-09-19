import type { Metadata } from 'next';
import { siteUrl } from '../content';
import { siteCopy } from '../i18n';
import { AboutPage } from '../info/AboutPage';
import { localeAlternates } from '../locales';

const copy = siteCopy('en').about;

export const metadata: Metadata = {
  title: copy.nav,
  description: copy.body,
  alternates: {
    canonical: '/about',
    languages: { 'x-default': '/about', en: '/about', ...localeAlternates('/about') },
  },
  openGraph: { title: copy.title, description: copy.body, url: `${siteUrl}/about`, type: 'website' },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
