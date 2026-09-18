'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { subscriptionCopy } from './copy';
import type { Lang } from './i18n';

export type LanguageItem = { code: string; label: string; href: string };

// The language menu in every header. It is a <details>, so it works before
// hydration; the script only closes it on an outside click. There is no
// currency menu: the price list follows the visitor's country (the same way
// the App Store does it), and letting anyone pick a cheaper region by hand
// would be a price-shopping tool.
export function HeaderMenus({ lang, current, languages }: { lang: Lang; current: string; languages: LanguageItem[] }) {
  const copy = subscriptionCopy[lang];
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
        <summary
          aria-label={copy.nav.language}
          className="flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold uppercase text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden"
        >
          {current}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </summary>
        <div className="absolute right-0 top-12 z-50 grid w-44 overflow-hidden rounded-xl border border-white/10 bg-[#1E1B4B] p-1 shadow-2xl">
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
    </div>
  );
}
