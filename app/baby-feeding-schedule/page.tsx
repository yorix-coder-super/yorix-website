import type { Metadata } from 'next';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl } from '../content';

const page = getTopicPage('baby-feeding-schedule');

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: '/baby-feeding-schedule',
  },
  openGraph: {
    title: page?.title,
    description: page?.description,
    url: `${siteUrl}/baby-feeding-schedule`,
    type: 'article',
  },
};

export default function BabyFeedingSchedulePage() {
  return <SeoArticlePage page={page!} />;
}
