import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AppleGlyph } from './home/art';
import { appDownloadUrl } from './content';
import { docsLang, siteCopy, type SiteLocale } from './i18n';
import { localeCopy, locales } from './locales';
import { HeaderMenus, type LanguageItem } from './subscription/HeaderMenus';
import { subscriptionPath, type SubscriptionPage } from './subscription/i18n';
import { subscriptionCopy } from './subscription/copy';
import { sellsHere } from './subscription/region';

const item = 'rounded-full px-3.5 py-2 transition hover:text-white';

// One header for every page: the same five items, the same menus and the
// same app button whether the visitor is on a home page, a guide or the
// subscription page — so the site never feels like two sites.
export async function SiteHeader({ locale, current, page = '' }: { locale: SiteLocale; current?: 'subscription' | 'support' | 'about'; page?: SubscriptionPage }) {
  const isRoot = locale === 'en';
  const site = siteCopy(locale);
  const nav = site.home.nav;
  const home = isRoot ? '/' : `/${locale}`;
  const subscription = subscriptionPath(docsLang(locale));
  const web = await sellsHere();
  const gift = subscriptionPath(docsLang(locale), '/gift');
  // On a subscription page the language links keep the visitor on the same
  // document; everywhere else they go to that language's home. `?lang=` makes
  // the choice stick over the automatic one (see proxy.ts).
  const languages: LanguageItem[] = [
    { code: 'en', label: 'English', href: `${current === 'subscription' ? subscriptionPath('en', page) : current ? `/${current}` : '/'}?lang=en` },
    ...locales.map((code) => ({
      code,
      label: localeCopy[code].nativeName,
      href: `${current === 'subscription' && code === 'ru' ? subscriptionPath('ru', page) : current && current !== 'subscription' ? `/${code}/${current}` : `/${code}`}?lang=${code}`,
    })),
  ];
  const links = [
    { href: `${home}#features`, label: nav.features },
    { href: isRoot ? '/guides' : `/${locale}/guides`, label: nav.guides },
    { href: subscription, label: site.subscription.home.nav, current: current === 'subscription' && page !== '/gift' },
    { href: gift, label: subscriptionCopy[docsLang(locale)].gift.nav, current: current === 'subscription' && page === '/gift', wide: true },
    { href: isRoot ? '/about' : `/${locale}/about`, label: site.about.nav, current: current === 'about', wide: true },
    { href: isRoot ? '/support' : `/${locale}/support`, label: site.support.nav, current: current === 'support' },
  ].filter((link) => (link.href !== subscription && link.href !== gift) || web);

  return (
    <header className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
      <a className="flex items-center gap-3" href={home} aria-label="Yorix home">
        <BrandLogo size="sm" tone="dark" />
      </a>
      <nav className="hidden items-center gap-1 text-sm font-medium text-white/75 md:flex">
        {links.map((link) => (
          <a
            aria-current={link.current ? 'page' : undefined}
            className={`${item} ${'wide' in link && link.wide ? 'hidden xl:inline-flex' : ''} ${link.current ? 'text-white underline decoration-[#A78BFA] decoration-2 underline-offset-8' : ''}`}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <HeaderMenus current={locale.toUpperCase()} label={site.subscription.nav.language} languages={languages} />
        <a
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#1E1B4B] shadow-[0_18px_45px_rgb(255_255_255/18%)] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25 sm:px-5"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AppleGlyph className="h-4 w-4" />
          <span className="hidden lg:inline">{nav.download}</span>
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
