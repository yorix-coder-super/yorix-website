'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

// Scroll-linked drift: as the block travels through the viewport its content
// moves from `y[0]` to `y[1]` (and scales), on a spring so wheel steps read
// as one motion. Reduced motion renders a plain wrapper.
export function Parallax({
  children,
  className = '',
  y = [72, -40],
  scale = [0.96, 1],
  offset = ['start end', 'end start'] as const,
}: {
  children: ReactNode;
  className?: string;
  y?: [number, number];
  scale?: [number, number];
  offset?: readonly [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: [offset[0], offset[1]] as never });
  const rawY = useTransform(scrollYProgress, [0, 1], y);
  const rawScale = useTransform(scrollYProgress, [0, 1], scale);
  const springY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.4 });
  const springScale = useSpring(rawScale, { stiffness: 120, damping: 24, mass: 0.4 });

  if (reduced) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={className} ref={ref} style={{ y: springY, scale: springScale }}>
      {children}
    </motion.div>
  );
}
