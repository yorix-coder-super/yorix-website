import type { ReactNode } from 'react';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang, type SubscriptionPage } from './i18n';
import { StarField } from './StarField';

export function documentLinks(lang: Lang) {
  const copy = subscriptionCopy[lang];
  return [
    { href: subscriptionPath(lang, '/offer'), label: copy.docs.offer },
    { href: subscriptionPath(lang, '/payment'), label: copy.docs.payment },
    { href: subscriptionPath(lang, '/privacy'), label: copy.docs.privacy },
  ];
}

export async function SubscriptionShell({ lang, page = '', children }: { lang: Lang; page?: SubscriptionPage; children: ReactNode }) {
  const copy = subscriptionCopy[lang];

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={lang}>
      <StarField />
      <SiteHeader current="subscription" locale={lang} page={page} />

      <div className="relative z-10">{children}</div>

      <SellerFooter lang={lang} note={copy.footer.medical} />
    </main>
  );
}

