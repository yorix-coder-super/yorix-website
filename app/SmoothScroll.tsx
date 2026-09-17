'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

// Inertial smooth scrolling for the whole site. Anchor links still work
// (Lenis intercepts them) and reduced-motion readers keep native scrolling.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1, smoothWheel: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
