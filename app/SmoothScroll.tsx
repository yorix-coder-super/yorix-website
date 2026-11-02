'use client';

import type Lenis from 'lenis';
import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('[data-native-scroll]')) return;
    let disposed = false;
    let scroll: Lenis | undefined;
    // Short campaign screens keep native scrolling without downloading a frame-loop library.
    void import('lenis').then(({ default: Lenis }) => {
      if (!disposed) scroll = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1, smoothWheel: true, allowNestedScroll: true });
    }).catch(() => {});
    return () => {
      disposed = true;
      scroll?.destroy();
    };
  }, []);
  return null;
}
