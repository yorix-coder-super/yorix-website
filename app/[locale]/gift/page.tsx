import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteUrl } from '../../content';
import { docsLang } from '../../i18n';
import { isLocale, localeAlternates, localeCopy, locales } from '../../locales';
import { GiftEntryPage } from '../../subscription/gift/GiftEntryPage';
import { redeemText } from '../../subscription/gift/redeemCopy';

type Props = { params: { locale: string } };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {};
  const text = redeemText(params.locale, docsLang(params.locale));
  return {
    // A number or address in a card's text must not become a tap-to-call link.
    formatDetection: { telephone: false, email: false, address: false },
    title: text.entryTitle,
    description: text.entryBody,
    alternates: {
      canonical: `/${params.locale}/gift`,
      languages: { 'x-default': '/gift', en: '/gift', ru: '/ru/gift', ...localeAlternates('/gift') },
    },
    openGraph: {
      title: text.redeemTitle,
      description: text.entryBody,
      url: `${siteUrl}/${params.locale}/gift`,
      locale: localeCopy[params.locale].ogLocale,
      type: 'website',
      images: ['/art/gift-card.webp'],
    },
  };
}

// The recipient of a gift lives wherever the buyer sent the link, so this page
// exists in every language the site speaks — unlike buying one, which stays
// Russian and English with the documents.
export default function Page({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  return <GiftEntryPage lang={docsLang(params.locale)} locale={params.locale} />;
}
