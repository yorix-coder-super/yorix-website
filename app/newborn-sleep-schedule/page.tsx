import type { Metadata } from 'next';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl } from '../content';

const page = getTopicPage('newborn-sleep-schedule');

export const metadata: Metadata = {
  title: page?.title,
  description: page?.description,
  alternates: {
    canonical: '/newborn-sleep-schedule',
  },
  openGraph: {
    title: page?.title,
    description: page?.description,
    url: `${siteUrl}/newborn-sleep-schedule`,
    type: 'article',
  },
};

export default function NewbornSleepSchedulePage() {
  return <SeoArticlePage page={page!} />;
}
