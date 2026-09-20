'use client';

import { motion, useScroll } from 'motion/react';

// A two-pixel reading-progress line for long guides. Reduced motion hides it
// in CSS: branching on the setting while rendering makes the server (which
// cannot know it) and the browser disagree, and React throws the page away.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#6366F1] motion-reduce:hidden rtl:origin-right" style={{ scaleX: scrollYProgress }} />;
}
