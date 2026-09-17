'use client';

import { useEffect, useRef } from 'react';

// Live star field behind the hero. Loaded after the page is idle so it never
// competes with the content, and skipped entirely for reduced-motion users
// (the CSS star dots of the page stay underneath either way).
export function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let container: { destroy: () => void } | undefined;

    const start = async () => {
      const [{ tsParticles }, { loadBasic }, { loadTwinkleUpdater }] = await Promise.all([
        import('@tsparticles/engine'),
        import('@tsparticles/basic'),
        import('@tsparticles/updater-twinkle'),
      ]);
      await loadBasic(tsParticles);
      await loadTwinkleUpdater(tsParticles);
      if (cancelled) return;
      container = await tsParticles.load({
        element: host,
        options: {
          fullScreen: { enable: false },
          fpsLimit: 30,
          detectRetina: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          background: { color: 'transparent' },
          particles: {
            number: { value: 45, density: { enable: true } },
            color: { value: ['#ffffff', '#c7d2fe', '#fde68a'] },
            shape: { type: 'circle' },
            size: { value: { min: 0.6, max: 1.8 } },
            opacity: { value: { min: 0.15, max: 0.85 } },
            move: { enable: true, speed: 0.12, random: true, straight: false },
            twinkle: { particles: { enable: true, frequency: 0.03, opacity: 1 } },
          },
          interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: { enable: true } } },
        },
      });
    };

    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => void start()) : window.setTimeout(() => void start(), 400);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      container?.destroy();
    };
  }, []);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={ref} />;
}
