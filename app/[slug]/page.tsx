import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl, topicPages } from '../content';
import { researchGuides } from '../research-guides';

type ArticleRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return researchGuides.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: ArticleRouteProps): Metadata {
  const page = getTopicPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/${page.slug}`,
      type: 'article',
    },
  };
}

export default function ArticleRoute({ params }: ArticleRouteProps) {
  const page = getTopicPage(params.slug);

  if (!page) {
    notFound();
  }

  return <SeoArticlePage page={page} />;
}
