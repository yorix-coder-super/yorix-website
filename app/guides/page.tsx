import type { Metadata } from 'next';
import { siteUrl, topicPages } from '../content';
import { siteCopy } from '../i18n';
import { GuidesIndex } from '../home/GuidesIndex';

export const metadata: Metadata = {
  title: 'Baby Sleep Guides and Parenting Blog',
  description:
    'Research-backed baby sleep guides about newborn sleep, wake windows, night wakings, feeding routines, white noise, sleep regressions, and sleep training.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Baby Sleep Guides and Parenting Blog | Yorix',
    description:
      'Research-backed baby sleep guides for tired parents who want practical, gentle routine support.',
    url: `${siteUrl}/guides`,
    type: 'website',
  },
};

export default function GuidesPage() {
  const copy = siteCopy('en');
  return (
    <GuidesIndex
      body={copy.guides.body}
      cta={copy.home.cta}
      eyebrow={copy.guides.eyebrow}
      footer={copy.home.footer}
      guides={topicPages.map((page) => ({ ...page, href: `/${page.slug}` }))}
      home="/"
      locale="en"
      title={copy.guides.title}
    />
  );
}
