import type { ReactNode } from 'react';

export function AppleGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.37 1.43c0 1.14-.5 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.21-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43Zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C3.96 18.38 2.93 15.57 2.93 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.96 4.45Z" />
    </svg>
  );
}

// A real app screenshot in a dark bezel. The radii are elliptical percentages
// so the corners stay in proportion from a 150 px phone to a 280 px one.
// The four feature icons, in the order of `home.features`.
export const featureIcons = ['icon-bolt', 'icon-chart', 'icon-chat', 'icon-heart'];

export function PhoneFrame({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`rounded-[16%/7.4%] bg-[#0B0A1F] p-[3%] shadow-[0_30px_80px_rgb(0_0_0/45%)] ring-1 ring-white/20 ${className}`}>
      <img
        alt={alt}
        className="block h-auto w-full rounded-[13.5%/6.2%]"
        fetchPriority={priority ? 'high' : undefined}
        height="2622"
        loading={priority ? undefined : 'lazy'}
        src={src}
        width="1206"
      />
    </div>
  );
}

export function Art({ name, className = '', width, height, priority = false }: { name: string; className?: string; width: number; height: number; priority?: boolean }) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={className}
      fetchPriority={priority ? 'high' : undefined}
      height={height}
      loading={priority ? undefined : 'lazy'}
      src={`/art/${name}.webp`}
      width={width}
    />
  );
}

export function Sparkle({ className = '', tone = 'gold', delay = 0 }: { className?: string; tone?: 'gold' | 'lavender'; delay?: number }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <img alt="" className="twinkle block h-auto w-full" height="128" src={`/art/sparkle-${tone}.webp`} style={{ animationDelay: `${delay}ms` }} width="117" />
    </span>
  );
}

export function Hand({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-hand pointer-events-none leading-[0.95] ${className}`}>{children}</p>;
}

export function DoodleHeart({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`inline-block ${className}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 20.5s-7.5-4.6-7.5-10.4A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.7c0 5.8-7.5 10.4-7.5 10.4Z" />
    </svg>
  );
}

// A loose hand-drawn arrow with a loop, pointing up (towards the coach badge).
export function DoodleArrow({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 60 80">
      <path d="M22 76c-12-6-14-20-4-26 8-5 16 1 12 8-4 6-14 2-12-8 2-12 12-24 22-40" />
      <path d="M31 9l9-6 1 11" />
    </svg>
  );
}

// Cover art for a guide, picked from its slug so every locale's copy of an
// article gets the same picture.
const guideRules: [RegExp, string][] = [
  [/feed/, 'icon-heart'],
  [/wake/, 'icon-sun'],
  [/night/, 'icon-moon-crescent'],
  [/noise|sound/, 'icon-play'],
  [/ferber|train/, 'icon-book'],
  [/newborn/, 'star'],
  [/nap/, 'icon-moon-full'],
  [/month-old/, 'icon-calendar'],
  [/stress/, 'icon-chat'],
];

export function guideIcon(slug: string) {
  return guideRules.find(([pattern]) => pattern.test(slug))?.[1] ?? 'icon-moon-crescent';
}
