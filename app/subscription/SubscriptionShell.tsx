import type { ReactNode } from 'react';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { siteCopy, type SiteLocale } from '../i18n';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang, type SubscriptionPage } from './i18n';
import { StarField } from './StarField';

export function documentLinks(lang: Lang, web = true) {
  const copy = subscriptionCopy[lang];
  const sales = [
    { page: '/offer' as const, href: subscriptionPath(lang, '/offer'), label: copy.docs.offer },
    { page: '/payment' as const, href: subscriptionPath(lang, '/payment'), label: copy.docs.payment },
  ];
  return [
    ...(web ? sales : []),
    { page: '/terms' as const, href: subscriptionPath(lang, '/terms'), label: copy.docs.terms },
    { page: '/privacy' as const, href: subscriptionPath(lang, '/privacy'), label: copy.docs.privacy },
  ];
}

export async function SubscriptionShell({
  lang,
  // The documents are Russian and English, but the redeem flow is read by
  // whoever the buyer sent the link to. `locale` is the language of the
  // chrome; `lang` stays the language of the contract it links to.
  locale = lang,
  page = '',
  giftPaths,
  children,
}: {
  lang: Lang;
  locale?: SiteLocale;
  page?: SubscriptionPage;
  giftPaths?: { en: string; ru: string };
  children: ReactNode;
}) {
  const copy = subscriptionCopy[lang];
  const note = locale === lang ? copy.footer.medical : siteCopy(locale).articleUi.footer;

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={locale}>
      <StarField />
      <SiteHeader current="subscription" giftPaths={giftPaths} locale={locale} page={page} />

      <div className="relative z-10">{children}</div>

      <SellerFooter locale={locale} note={note} />
    </main>
  );
}

