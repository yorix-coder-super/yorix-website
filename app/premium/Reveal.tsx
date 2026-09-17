'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Animation = 'fadeInUp' | 'fadeIn' | 'zoomIn';

// Entrance animation for content below the fold. Nothing is hidden before
// JavaScript runs, and nothing already on screen when it runs is hidden
// either: only sections the reader has not scrolled to yet get the entrance,
// and a timeout guarantees a stalled observer can never leave one blank.
export function Reveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
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
    const timer = window.setTimeout(show, 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      node.classList.remove('reveal-pending');
    };
  }, [animation]);

  return (
    <div className={className} data-reveal="" ref={ref} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
