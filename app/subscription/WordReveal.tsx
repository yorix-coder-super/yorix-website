'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// The hero headline, word by word. Same contract as Reveal's `load`: the
// server renders the whole sentence, the words only replay their entrance
// when hydration was quick, and reduced motion means no movement at all.
// A visually hidden copy carries the sentence for assistive tech; the
// words are presentation. `tones` optionally colours words by index.
export function WordReveal({ text, delay = 0, tones }: { text: string; delay?: number; tones?: string[] }) {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<'static' | 'armed' | 'play'>('static');

  useEffect(() => {
    if (reduced) return;
    let play = 0;
    const arm = requestAnimationFrame(() => {
      if (performance.now() >= 2500) return;
      setMode('armed');
      play = requestAnimationFrame(() => setMode('play'));
    });
    return () => {
      cancelAnimationFrame(arm);
      cancelAnimationFrame(play);
    };
  }, [reduced]);

  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span aria-hidden="true" key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}
          <motion.span
            animate={mode === 'armed' ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
            className={`inline-block ${tones?.[index] ?? ''}`}
            initial={false}
            transition={mode === 'play' ? { duration: 0.6, ease: EASE, delay: delay / 1000 + index * 0.045 } : { duration: 0 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}
