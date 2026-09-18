'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { subscriptionCopy } from './copy';
import { currencies, currencyForCountry } from './currency';
import { setCurrency, useCurrency } from './currencyStore';
import type { Lang } from './i18n';

export type LanguageItem = { code: string; label: string; href: string };

const summaryClass =
  'flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold uppercase text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden';
const menuClass = 'absolute right-0 top-12 z-50 grid overflow-hidden rounded-xl border border-white/10 bg-[#1E1B4B] p-1 shadow-2xl';

// Language and currency side by side in every header. Both are <details>,
// so they work before hydration; the script only closes them on an outside
// click and applies the currency choice to the prices on the page.
export function HeaderMenus({ lang, country, current, languages }: { lang: Lang; country: string | null; current: string; languages: LanguageItem[] }) {
  const copy = subscriptionCopy[lang];
  const currency = useCurrency(currencyForCountry(country));
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      const container = root.current;
      if (!container || container.contains(event.target as Node)) return;
      for (const menu of container.querySelectorAll('details[open]')) menu.removeAttribute('open');
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  return (
    <div className="flex items-center gap-2" ref={root}>
      <details className="relative">
        <summary aria-label={copy.nav.language} className={summaryClass}>
          {current}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </summary>
        <div className={`${menuClass} w-44`}>
          {languages.map((item) => (
            <a
              aria-current={item.code === current.toLowerCase() ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm hover:bg-white/10 ${item.code === current.toLowerCase() ? 'text-white' : 'text-white/80'}`}
              href={item.href}
              hrefLang={item.code}
              key={item.code}
            >
              {item.label}
            </a>
          ))}
        </div>
      </details>
      <details className="relative">
        <summary aria-label={copy.currency.label} className={summaryClass}>
          {currency}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </summary>
        <div className={`${menuClass} w-60`}>
          {currencies.map((code) => (
            <button
              aria-pressed={code === currency}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10 ${code === currency ? 'text-white' : 'text-white/80'}`}
              key={code}
              onClick={(event) => {
                setCurrency(code);
                event.currentTarget.closest('details')?.removeAttribute('open');
              }}
              type="button"
            >
              <span>
                <span className="font-semibold">{code}</span> <span className="text-white/55">{copy.currency.names[code]}</span>
              </span>
              {code === currency ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
            </button>
          ))}
          <p className="px-3 pb-1.5 pt-2 text-xs leading-5 text-white/45">{copy.currency.note}</p>
        </div>
      </details>
    </div>
  );
}
