'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Animation = 'riseIn' | 'fadeIn' | 'zoomIn' | 'driftInLeft' | 'driftInRight';

const hiddenBy: Record<Animation, Record<string, number>> = {
  riseIn: { opacity: 0, y: 36 },
  fadeIn: { opacity: 0 },
  zoomIn: { opacity: 0, scale: 0.92 },
  driftInLeft: { opacity: 0, x: -48 },
  driftInRight: { opacity: 0, x: 48 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Entrance animation on Motion. The server renders every block visible and
// nothing is hidden until React has mounted; then a block still below the
// fold is parked (instantly, off-screen) and plays its entrance the moment
// it scrolls into view. `load` plays the hero's opening sequence at once —
// only when hydration was quick, so a slow load never re-animates visible
// text. Reduced motion: no hiding, no movement.
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
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2, margin: '0px 0px -5% 0px' });
  const [mode, setMode] = useState<'static' | 'pending' | 'armed' | 'load'>('static');

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    // Decide on the next frame: the block is measured after layout, and the
    // state change is not synchronous with the effect body.
    let play = 0;
    const frame = requestAnimationFrame(() => {
      if (load) {
        // Park the block for one frame so the entrance has a pose to start from.
        if (performance.now() < 2500) {
          setMode('armed');
          play = requestAnimationFrame(() => setMode('load'));
        }
        return;
      }
      if (node.getBoundingClientRect().top >= window.innerHeight * 0.9) setMode('pending');
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(play);
    };
  }, [load, reduced]);

  const variants: Variants = {
    hidden: hiddenBy[animation],
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
  const shown = mode === 'static' || (mode === 'pending' && inView) || mode === 'load';
  // A parked block jumps to its hidden pose with no transition; the entrance
  // itself is the only thing that eases.
  const transition = shown ? { duration: 0.8, ease: EASE, delay: delay / 1000 } : { duration: 0 };

  return (
    <motion.div
      animate={shown ? 'visible' : 'hidden'}
      className={className}
      data-reveal=""
      data-reveal-state={mode === 'static' ? 'static' : shown ? 'shown' : 'pending'}
      initial={false}
      ref={ref}
      transition={transition}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
