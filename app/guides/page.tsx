import type { Metadata } from 'next';
import { siteUrl, topicPages } from '../content';
import { homeCopy } from '../home/copy';
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
  const copy = homeCopy('en');
  return (
    <GuidesIndex
      body="Practical, evidence-aware guides about newborn sleep, naps, wake windows, night wakings, feeding routines, white noise, regressions, and sleep training decisions."
      cta={copy.cta}
      eyebrow="Yorix guides"
      footer={copy.footer}
      guides={topicPages.map((page) => ({ ...page, href: `/${page.slug}` }))}
      home="/"
      locale="en"
      title="Baby sleep answers parents search for at 3 a.m."
    />
  );
}
