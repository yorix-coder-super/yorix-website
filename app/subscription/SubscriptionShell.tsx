import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import { SellerFooter } from '../SellerFooter';
import { SiteHeader } from '../SiteHeader';
import { subscriptionCopy } from './copy';
import { subscriptionPath, type Lang, type SubscriptionPage } from './i18n';
import { merchant } from './merchant';
import { PaymentLogos } from './PaymentLogos';
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
  const requestHeaders = await headers();
  const country = requestHeaders.get('cf-ipcountry');
  const acceptLanguage = requestHeaders.get('accept-language');

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={lang}>
      <StarField />
      <SiteHeader acceptLanguage={acceptLanguage} country={country} current="subscription" locale={lang} />

      <div className="relative z-10">{children}</div>

      {page === '' ? <SellerContacts lang={lang} /> : null}
      <SellerFooter lang={lang} note={copy.footer.medical} />
    </main>
  );
}

function MerchantRequisites({ lang }: { lang: Lang }) {
  const labels = subscriptionCopy[lang].footer.rows;
  const rows = [
    { label: labels.seller, value: lang === 'ru' ? merchant.fullName : `${merchant.fullName} (${merchant.latinName})` },
    { label: labels.status, value: merchant.status[lang] },
    { label: labels.unp, value: merchant.unp },
    { label: labels.address, value: [merchant.country[lang], merchant.postalAddress].filter(Boolean).join(', ') },
    { label: labels.register, value: merchant.tradeRegister },
    { label: labels.email, value: merchant.email, href: `mailto:${merchant.email}` },
    { label: labels.phone, value: merchant.phone, href: `tel:${merchant.phone.replace(/[^+\d]/g, '')}` },
    { label: labels.hours, value: `${merchant.hours[lang]}, ${merchant.hoursNote[lang]}` },
  ].filter((row) => row.value);

  return (
    <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-white/45">{row.label}</dt>
          <dd className="mt-0.5 text-white/80">
            {row.href ? (
              <a className="underline decoration-white/30 hover:decoration-white" href={row.href}>
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// The bank checks the seller's requisites and the card logos on the page it
// is given; the shared site footer names the seller, this block carries all
// of it, right above the footer of the storefront.
function SellerContacts({ lang }: { lang: Lang }) {
  const copy = subscriptionCopy[lang];
  return (
    <section id="contacts" className="relative z-10 scroll-mt-6 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="mb-4 text-sm font-semibold text-white">{copy.footer.seller}</p>
          <MerchantRequisites lang={lang} />
        </div>
        <div className="grid content-start gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-white">{copy.footer.documents}</p>
            <ul className="grid gap-2 text-sm">
              {documentLinks(lang).map((link) => (
                <li key={link.href}>
                  <a className="text-white/70 underline decoration-white/20 hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <PaymentLogos />
        </div>
      </div>
    </section>
  );
}
