import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteUrl } from '../../content';
import { siteCopy } from '../../i18n';
import { SupportPage } from '../../info/SupportPage';
import { isLocale, localeAlternates, localeCopy, locales } from '../../locales';

type Props = { params: { locale: string } };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = siteCopy(params.locale).support;
  return {
    title: `${copy.nav}`,
    description: copy.body,
    alternates: {
      canonical: `/${params.locale}/support`,
      languages: { 'x-default': '/support', en: '/support', ...localeAlternates('/support') },
    },
    openGraph: {
      title: copy.title,
      description: copy.body,
      url: `${siteUrl}/${params.locale}/support`,
      locale: localeCopy[params.locale].ogLocale,
      type: 'website',
    },
  };
}

export default function Page({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  return <SupportPage locale={params.locale} />;
}
