'use client';

import { useEffect, useRef } from 'react';

// Live night sky behind every subscription page: a fixed layer of drifting,
// twinkling stars from tsParticles. Loaded after the page is idle so it never
// competes with the content, skipped entirely for reduced-motion readers,
// and while it runs the static CSS star dots fade out so the sky is one.
export function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let container: { destroy: () => void } | undefined;
    const main = host.closest('main');

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
          background: { color: 'transparent' },
          particles: {
            number: { value: 140, density: { enable: true, width: 1920, height: 1080 } },
            color: { value: ['#ffffff', '#e0e7ff', '#c7d2fe', '#fde68a'] },
            shape: { type: 'circle' },
            size: { value: { min: 0.8, max: 2.6 } },
            opacity: { value: { min: 0.25, max: 1 } },
            move: { enable: true, speed: 0.35, direction: 'top', random: true, straight: false, outModes: { default: 'out' } },
            twinkle: { particles: { enable: true, frequency: 0.06, opacity: 1, color: { value: '#ffffff' } } },
          },
          interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: { enable: true } } },
        },
      });
      if (!cancelled) main?.classList.add('starfield-live');
    };

    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => void start()) : window.setTimeout(() => void start(), 300);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      main?.classList.remove('starfield-live');
      container?.destroy();
    };
  }, []);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" ref={ref} />;
}
