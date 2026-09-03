import type { Metadata } from 'next';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl } from '../content';

const page = getTopicPage('4-month-old-sleep-schedule');

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: '/4-month-old-sleep-schedule',
  },
  openGraph: {
    title: page?.title,
    description: page?.description,
    url: `${siteUrl}/4-month-old-sleep-schedule`,
    type: 'article',
  },
};

export default function FourMonthOldSleepSchedulePage() {
  return <SeoArticlePage page={page!} />;
}
