import type { ReactNode } from 'react';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
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
  page = '',
  giftPaths,
  children,
}: {
  lang: Lang;
  page?: SubscriptionPage;
  giftPaths?: { en: string; ru: string };
  children: ReactNode;
}) {
  const copy = subscriptionCopy[lang];

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={lang}>
      <StarField />
      <SiteHeader current="subscription" giftPaths={giftPaths} locale={lang} page={page} />

      <div className="relative z-10">{children}</div>

      <SellerFooter locale={lang} note={copy.footer.medical} />
    </main>
  );
}

