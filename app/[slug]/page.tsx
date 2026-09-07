import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedHome } from '../LocalizedHome';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl, topicPages } from '../content';
import { isLocale, localeAlternates, localeCopy, locales } from '../locales';
import { researchGuides } from '../research-guides';

type ArticleRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return [
    ...researchGuides.map((page) => ({ slug: page.slug })),
    ...locales.map((slug) => ({ slug })),
  ];
}

export function generateMetadata({ params }: ArticleRouteProps): Metadata {
  if (isLocale(params.slug)) {
    const copy = localeCopy[params.slug];

    return {
      title: `Yorix | ${copy.hero.title}`,
      description: copy.hero.body,
      alternates: {
        canonical: `/${params.slug}`,
        languages: {
          en: '/',
          ...localeAlternates(),
        },
      },
      openGraph: {
        title: `Yorix | ${copy.hero.title}`,
        description: copy.hero.body,
        url: `${siteUrl}/${params.slug}`,
        type: 'website',
        locale: copy.ogLocale,
      },
    };
  }

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
  if (isLocale(params.slug)) {
    return <LocalizedHome locale={params.slug} />;
  }

  const page = getTopicPage(params.slug);

  if (!page) {
    notFound();
  }

  return <SeoArticlePage page={page} />;
}
