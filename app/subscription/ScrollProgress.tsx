'use client';

import { motion, useReducedMotion, useScroll } from 'motion/react';

// A two-pixel reading-progress line for long guides.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#6366F1]" style={{ scaleX: scrollYProgress }} />;
}
