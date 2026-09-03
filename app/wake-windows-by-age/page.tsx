import type { Metadata } from 'next';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl } from '../content';

const page = getTopicPage('wake-windows-by-age');

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: '/wake-windows-by-age',
  },
  openGraph: {
    title: page?.title,
    description: page?.description,
    url: `${siteUrl}/wake-windows-by-age`,
    type: 'article',
  },
};

export default function WakeWindowsByAgePage() {
  return <SeoArticlePage page={page!} />;
}
