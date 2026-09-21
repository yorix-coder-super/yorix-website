import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { appDownloadUrl } from '../../../content';
import { docsLang } from '../../../i18n';
import { isLocale, locales } from '../../../locales';
import { GiftRedeemPanel } from '../../../subscription/gift/GiftRedeem';
import { redeemText } from '../../../subscription/gift/redeemCopy';
import { SubscriptionShell } from '../../../subscription/SubscriptionShell';

type Props = { params: { locale: string; code: string } };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, code: 'x' }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {};
  const text = redeemText(params.locale, docsLang(params.locale));
  return {
    formatDetection: { telephone: false, email: false, address: false },
    title: text.redeemTitle,
    description: text.redeemBody,
    // A gift link is private: it is the code. Search engines stay out of it.
    robots: { index: false, follow: false },
    openGraph: { title: text.redeemTitle, description: text.redeemBody, images: ['/art/gift-card.webp'] },
  };
}

export default function Page({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  // A code is letters, digits and dashes; anything else is noise (and never reaches a link or a URL decoder).
  const code = params.code.replace(/[^A-Za-z0-9-]/g, '').slice(0, 20);
  const lang = docsLang(params.locale);
  return (
    <SubscriptionShell giftPaths={{ en: `/gift/${code}`, ru: `/ru/gift/${code}` }} lang={lang} locale={params.locale}>
      <GiftRedeemPanel appUrl={appDownloadUrl} code={code} lang={lang} locale={params.locale} />
    </SubscriptionShell>
  );
}
