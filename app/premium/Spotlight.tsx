'use client';

import { useEffect } from 'react';

// One listener for every `.spotlight` card on the page: the pointer position
// becomes --x/--y on the card, and the CSS draws the light (globals.css).
// Only for a real mouse; touch screens never see the effect.
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
  return null;
}
