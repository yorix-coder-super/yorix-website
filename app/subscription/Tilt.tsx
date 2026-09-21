'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };
const MAX_DEGREES = 6;

// A card that leans toward the mouse like one held in the hand. One object
// per page, never a grid. Mouse only: touch and pen leave it flat, and so
// does reduced motion.
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || reduced || event.pointerType !== 'mouse') return;
    const rect = node.getBoundingClientRect();
    const across = (event.clientX - rect.left) / rect.width - 0.5;
    const down = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(across * 2 * MAX_DEGREES);
    rotateX.set(-down * 2 * MAX_DEGREES);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <motion.div onPointerLeave={reset} onPointerMove={move} ref={ref} style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  );
}
