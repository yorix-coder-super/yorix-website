'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Animation = 'fadeInUp' | 'fadeIn' | 'zoomIn';

// Entrance animation from animate.css, played once when the element scrolls
// into view. Without JavaScript the element is simply visible: the hiding
// rule in globals.css is gated on `@media (scripting: enabled)`.
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
    const show = () => node.classList.add('animated', animation);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      show();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animation]);

  return (
    <div className={className} data-reveal="" ref={ref} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
