import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import { BrandLogo } from '../BrandLogo';
import { premiumCopy } from './copy';
import { HeaderMenus } from './HeaderMenus';
import { premiumLangs, premiumPath, type Lang, type PremiumPage } from './i18n';
import { merchant } from './merchant';
import { PaymentLogos } from './PaymentLogos';
import { StarField } from './StarField';
import { Button } from './ui';

export function documentLinks(lang: Lang) {
  const copy = premiumCopy[lang];
  return [
    { href: premiumPath(lang, '/oferta'), label: copy.docs.offer },
    { href: premiumPath(lang, '/oplata'), label: copy.docs.payment },
    { href: premiumPath(lang, '/konfidencialnost'), label: copy.docs.privacy },
  ];
}

export async function PremiumShell({ lang, page = '', children }: { lang: Lang; page?: PremiumPage; children: ReactNode }) {
  const copy = premiumCopy[lang];
  const home = premiumPath(lang);
  const country = (await headers()).get('cf-ipcountry');
  const navItems = [
    { href: `${home}#tarify`, label: copy.nav.plans },
    { href: `${home}#kak-kupit`, label: copy.nav.howToBuy },
    { href: premiumPath(lang, '/oplata'), label: copy.nav.payment },
    { href: '#kontakty', label: copy.nav.contacts },
  ];

  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white" lang={lang}>
      <StarField />
      <header className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <a href={home} aria-label={`Yorix — ${copy.home.nav}`}>
          <BrandLogo size="sm" tone="dark" />
        </a>
        <nav
          aria-label={copy.nav.plans}
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1.5 text-sm font-semibold text-white/70 backdrop-blur-xl md:flex"
        >
          {navItems.map((item) => (
            <a
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <HeaderMenus
            country={country}
            current={lang.toUpperCase()}
            lang={lang}
            languages={premiumLangs.map((item) => ({ code: item.code, label: item.label, href: premiumPath(item.code, page) }))}
          />
          <Button href={`${home}#tarify`} size="sm" variant="light">
            <span className="hidden sm:inline">{copy.nav.choosePlan}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <MerchantFooter lang={lang} />
    </main>
  );
}

function MerchantRequisites({ lang }: { lang: Lang }) {
  const labels = premiumCopy[lang].footer.rows;
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

function MerchantFooter({ lang }: { lang: Lang }) {
  const copy = premiumCopy[lang];
  return (
    <footer id="kontakty" className="relative z-10 scroll-mt-6 border-t border-white/10 bg-[#0F1022]/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
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
      <p className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">{copy.footer.medical}</p>
    </footer>
  );
}
