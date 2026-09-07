import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedHome } from '../LocalizedHome';
import { SeoArticlePage } from '../SeoArticlePage';
import { getTopicPage, siteUrl, topicPages } from '../content';
import { isLocale, localeAlternates, localeCopy, locales } from '../locales';
import { researchGuides } from '../research-guides';

type ArticleRouteProps = {
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return [
    ...researchGuides.map((page) => ({ locale: page.slug })),
    ...locales.map((locale) => ({ locale })),
  ];
}

export function generateMetadata({ params }: ArticleRouteProps): Metadata {
  if (isLocale(params.locale)) {
    const copy = localeCopy[params.locale];

    return {
      title: `Yorix | ${copy.hero.title}`,
      description: copy.hero.body,
      alternates: {
        canonical: `/${params.locale}`,
        languages: {
          en: '/',
          ...localeAlternates(),
        },
      },
      openGraph: {
        title: `Yorix | ${copy.hero.title}`,
        description: copy.hero.body,
        url: `${siteUrl}/${params.locale}`,
        type: 'website',
        locale: copy.ogLocale,
      },
    };
  }

  const page = getTopicPage(params.locale);

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
  if (isLocale(params.locale)) {
    return <LocalizedHome locale={params.locale} />;
  }

  const page = getTopicPage(params.locale);

  if (!page) {
    notFound();
  }

  return <SeoArticlePage page={page} />;
}
