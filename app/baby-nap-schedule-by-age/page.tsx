import type { Metadata } from 'next';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl } from '../content';

const page = getTopicPage('baby-nap-schedule-by-age');

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: '/baby-nap-schedule-by-age',
  },
  openGraph: {
    title: page?.title,
    description: page?.description,
    url: `${siteUrl}/baby-nap-schedule-by-age`,
    type: 'article',
  },
};

export default function BabyNapScheduleByAgePage() {
  return <SeoArticlePage page={page!} />;
}
