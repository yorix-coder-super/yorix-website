import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AppleGlyph } from './home/art';
import { appDownloadUrl } from './content';
import { localeCopy, locales, type Locale } from './locales';
import { subscriptionCopy } from './subscription/copy';
import { HeaderMenus, type LanguageItem } from './subscription/HeaderMenus';
import { subscriptionPath, type Lang, type SubscriptionPage } from './subscription/i18n';

const enNav = { plan: 'Plan', features: 'Features', guides: 'Guides', faq: 'FAQ', download: 'Get the app' };

const item = 'rounded-full px-3.5 py-2 transition hover:text-white';

// One header for every page: the same five items, the same menus and the
// same app button whether the visitor is on a home page, a guide or the
// subscription page — so the site never feels like two sites.
export function SiteHeader({ locale, current, page = '' }: { locale: Locale | 'en'; current?: 'subscription'; page?: SubscriptionPage }) {
  const isRoot = locale === 'en';
  const nav = isRoot ? enNav : localeCopy[locale].nav;
  const home = isRoot ? '/' : `/${locale}`;
  const lang: Lang = locale === 'ru' ? 'ru' : 'en';
  const subscription = subscriptionPath(lang);
  // On a subscription page the language links keep the visitor on the same
  // document; everywhere else they go to that language's home. `?lang=` makes
  // the choice stick over the automatic one (see proxy.ts).
  const languages: LanguageItem[] = [
    { code: 'en', label: 'English', href: `${current === 'subscription' ? subscriptionPath('en', page) : '/'}?lang=en` },
    ...locales.map((code) => ({
      code,
      label: localeCopy[code].nativeName,
      href: `${current === 'subscription' && code === 'ru' ? subscriptionPath('ru', page) : `/${code}`}?lang=${code}`,
    })),
  ];
  const links = [
    { href: `${home}#plan`, label: nav.plan },
    { href: `${home}#features`, label: nav.features },
    { href: isRoot ? '/guides' : `/${locale}/guides`, label: nav.guides },
    { href: subscription, label: subscriptionCopy[lang].home.nav, current: current === 'subscription' },
    { href: `${home}#faq`, label: nav.faq },
  ];

  return (
    <header className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
      <a className="flex items-center gap-3" href={home} aria-label="Yorix home">
        <BrandLogo size="sm" tone="dark" />
      </a>
      <nav className="hidden items-center gap-1 text-sm font-medium text-white/75 md:flex">
        {links.map((link) => (
          <a aria-current={link.current ? 'page' : undefined} className={`${item} ${link.current ? 'text-white underline decoration-[#A78BFA] decoration-2 underline-offset-8' : ''}`} href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <HeaderMenus current={locale.toUpperCase()} lang={lang} languages={languages} />
        <a
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#1E1B4B] shadow-[0_18px_45px_rgb(255_255_255/18%)] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25 sm:px-5"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AppleGlyph className="h-4 w-4" />
          <span className="hidden lg:inline">{nav.download}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
