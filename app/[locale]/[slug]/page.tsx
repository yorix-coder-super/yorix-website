import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getLocalizedTopicPage,
  getTranslatedLocalesForArticle,
  isTranslatedArticleSlug,
  translatedArticleAlternates,
  translatedArticleSlugs,
} from '../../article-localizations';
import { SeoArticlePage } from '../../SeoArticlePage';
import { siteUrl } from '../../content';
import { isLocale, localeCopy, type Locale } from '../../locales';

type LocalizedArticleRouteProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return translatedArticleSlugs.flatMap((slug) =>
    getTranslatedLocalesForArticle(slug).map((locale) => ({ locale, slug })),
  );
}

export function generateMetadata({ params }: LocalizedArticleRouteProps): Metadata {
  if (!isLocale(params.locale) || !isTranslatedArticleSlug(params.slug)) {
    return {};
  }

  const page = getLocalizedTopicPage(params.locale, params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${params.locale}/${page.slug}`,
      languages: {
        en: `/${page.slug}`,
        ...translatedArticleAlternates(page.slug),
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/${params.locale}/${page.slug}`,
      type: 'article',
      locale: localeCopy[params.locale].ogLocale,
    },
  };
}

export default function LocalizedArticleRoute({ params }: LocalizedArticleRouteProps) {
  if (!isLocale(params.locale) || !isTranslatedArticleSlug(params.slug)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const page = getLocalizedTopicPage(locale, params.slug);

  if (!page) {
    notFound();
  }

  return <SeoArticlePage page={page} locale={locale} />;
}
