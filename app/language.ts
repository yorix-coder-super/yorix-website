import { getLocalizedTopicPage, isTranslatedArticleSlug } from './article-localizations';
import { isLocale, type Locale } from './locales';

// The visitor's language, picked the way the price region is: automatically,
// with the header menu as the override. The menu links carry `?lang=`, the
// proxy stores that choice in this cookie and never second-guesses it.
export const LANG_COOKIE = 'yorix-lang';

export type SiteLang = Locale | 'en';

export function isSiteLang(value: string | null | undefined): value is SiteLang {
  return value === 'en' || (typeof value === 'string' && isLocale(value));
}

// Legacy and regional codes that should land on a language we publish:
// Belarusian browsers read the Russian site, Norwegian Bokmål/Nynorsk the
// Norwegian one, old Hebrew/Indonesian codes their current ones.
const aliases: Record<string, SiteLang> = { be: 'ru', nb: 'no', nn: 'no', iw: 'he', in: 'id' };

// Used only when the browser names no language we publish (or none at all).
const countryLang: Record<string, SiteLang> = { BY: 'ru', RU: 'ru', KZ: 'ru', KG: 'ru', UA: 'uk' };

// The browser's preference wins over the country: a Russian speaker abroad
// reads Russian, someone in Minsk with an English browser reads English.
export function preferredLanguage(acceptLanguage: string | null | undefined, country: string | null | undefined): SiteLang {
  const ranked = (acceptLanguage ?? '')
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { tag, q: q ? Number(q.slice(2)) : 1, index };
    })
    .filter((entry) => entry.tag && entry.tag !== '*' && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { tag } of ranked) {
    const primary = tag.split('-')[0];
    const code = aliases[primary] ?? primary;
    if (isSiteLang(code)) return code;
  }
  return countryLang[(country ?? '').toUpperCase()] ?? 'en';
}

// Where an English default URL lives in `lang`, or null when that page has
// no translation (the visitor then simply stays on the English page).
export function localizedPath(pathname: string, lang: Locale): string | null {
  if (pathname === '/') return `/${lang}`;
  if (pathname === '/guides') return `/${lang}/guides`;
  if (pathname === '/support' || pathname === '/about') return `/${lang}${pathname}`;
  if (pathname === '/subscription' || /^\/subscription\/(offer|payment|terms|privacy|gift)$/.test(pathname)) {
    return lang === 'ru' ? `/ru${pathname}` : null;
  }
  // Gift pages exist in Russian and English only.
  if (/^\/gift(\/[A-Za-z0-9-]{12,20})?$/.test(pathname)) return lang === 'ru' ? `/ru${pathname}` : null;
  const slug = pathname.slice(1);
  if (/^[a-z0-9-]+$/.test(slug) && isTranslatedArticleSlug(slug) && getLocalizedTopicPage(lang, slug)) {
    return `/${lang}/${slug}`;
  }
  return null;
}
