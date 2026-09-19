import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteUrl } from '../../content';
import { siteCopy } from '../../i18n';
import { AboutPage } from '../../info/AboutPage';
import { isLocale, localeAlternates, localeCopy, locales } from '../../locales';

type Props = { params: { locale: string } };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = siteCopy(params.locale).about;
  return {
    title: copy.nav,
    description: copy.body,
    alternates: {
      canonical: `/${params.locale}/about`,
      languages: { 'x-default': '/about', en: '/about', ...localeAlternates('/about') },
    },
    openGraph: {
      title: copy.title,
      description: copy.body,
      url: `${siteUrl}/${params.locale}/about`,
      locale: localeCopy[params.locale].ogLocale,
      type: 'website',
    },
  };
}

export default function Page({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  return <AboutPage locale={params.locale} />;
}
