'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export type LanguageItem = { code: string; label: string; href: string };

// The language menu in every header. It is a <details>, so it works before
// hydration; the script only closes it — on a click or a tap anywhere else,
// on Escape, when the focus leaves it and when the page scrolls away. There
// is no currency menu: the price list follows the visitor's country (the same
// way the App Store does it), and letting anyone pick a cheaper region by
// hand would be a price-shopping tool.
export function HeaderMenus({ label, current, languages }: { label: string; current: string; languages: LanguageItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opened = () => root.current?.querySelectorAll<HTMLDetailsElement>('details[open]') ?? [];
    const close = () => {
      for (const menu of opened()) menu.removeAttribute('open');
    };
    const outside = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || opened().length === 0) return;
      const summary = opened()[0]?.querySelector('summary');
      close();
      summary?.focus();
    };
    let openedAt = 0;
    const toggled = () => {
      openedAt = window.scrollY;
    };
    const scrolled = () => {
      if (opened().length > 0 && Math.abs(window.scrollY - openedAt) > 80) close();
    };
    // Capture phase: a handler that stops the event further down cannot keep the menu open.
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('click', outside, true);
    document.addEventListener('focusin', outside, true);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', scrolled, { passive: true });
    const container = root.current;
    container?.addEventListener('toggle', toggled, true);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('click', outside, true);
      document.removeEventListener('focusin', outside, true);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', scrolled);
      container?.removeEventListener('toggle', toggled, true);
    };
  }, []);

  return (
    <div className="flex items-center gap-2" ref={root}>
      <details className="relative">
        <summary
          aria-label={label}
          className="flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold uppercase text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden"
        >
          {current}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </summary>
        {/* data-lenis-prevent: the page's smooth scrolling would otherwise take the wheel and the trackpad away from this list. */}
        <div className="absolute end-0 top-12 z-50 grid max-h-[70vh] w-44 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#1E1B4B] p-1 shadow-2xl" data-lenis-prevent="">
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
