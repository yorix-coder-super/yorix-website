import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedGuidesPage } from '../../LocalizedGuidesPage';
import { siteUrl } from '../../content';
import { isLocale, localeAlternates, localeCopy, locales, type Locale } from '../../locales';

type LocalizedGuidesRouteProps = {
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: LocalizedGuidesRouteProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale;
  const copy = localeCopy[locale];

  return {
    title: `${copy.guides.title} | Yorix`,
    description: copy.guides.body,
    alternates: {
      canonical: `/${locale}/guides`,
      languages: {
        en: '/guides',
        ...localeAlternates('/guides'),
      },
    },
    openGraph: {
      title: `${copy.guides.title} | Yorix`,
      description: copy.guides.body,
      url: `${siteUrl}/${locale}/guides`,
      type: 'website',
      locale: copy.ogLocale,
    },
  };
}

export default function LocalizedGuidesRoute({ params }: LocalizedGuidesRouteProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return <LocalizedGuidesPage locale={params.locale as Locale} />;
}
