'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';

// A primary button that leans a few pixels toward the mouse. Mouse only:
// touch and pen never move it, and reduced motion keeps it still.
export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.3 });

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || reduced || event.pointerType !== 'mouse') return;
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.25;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.25;
    x.set(Math.max(-12, Math.min(12, dx)));
    y.set(Math.max(-12, Math.min(12, dy)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className={className} onPointerLeave={reset} onPointerMove={move} ref={ref} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
