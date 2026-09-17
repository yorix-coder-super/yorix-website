'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Animation = 'riseIn' | 'fadeIn' | 'zoomIn';

// Entrance animation. Nothing is hidden before JavaScript runs, and nothing
// already on screen when it runs is hidden either: sections the reader has
// not scrolled to yet get the entrance when they arrive, and a long safety
// timer guarantees a stalled observer can never leave one blank.
//
// `load` plays the entrance at once (the hero's opening sequence) — only
// when hydration was quick, so a slow load never re-animates visible text.
export function Reveal({
  children,
  animation = 'riseIn',
  delay = 0,
  className = '',
  load = false,
}: {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  load?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    if (load) {
      if (performance.now() > 2500) return;
      node.classList.add('animated', animation);
      return () => node.classList.remove('animated', animation);
    }
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    node.classList.add('reveal-pending');
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      node.classList.remove('reveal-pending');
      node.classList.add('animated', animation);
      observer.disconnect();
      window.clearTimeout(timer);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { threshold: 0.1, rootMargin: '0px 0px 5% 0px' },
    );
    observer.observe(node);
    const timer = window.setTimeout(show, 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      node.classList.remove('reveal-pending');
    };
  }, [animation, load]);

  return (
    <div className={className} data-reveal="" ref={ref} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
