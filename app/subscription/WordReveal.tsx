'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;
const UNSPACED = /[\u0E00-\u0E7F\u3040-\u30FF\u3400-\u9FFF\uF900-\uFAFF]/;

// The hero headline, word by word. Same contract as Reveal's `load`: the
// server renders the whole sentence, the words only replay their entrance
// when hydration was quick, and reduced motion means no movement at all.
// A visually hidden copy carries the sentence for assistive tech; the
// words are presentation. `tones` optionally colours words by index.
export function WordReveal({ text, delay = 0, tones, parts }: { text: string; delay?: number; tones?: string[]; parts?: { text: string; tone: string }[] }) {
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

  // Japanese and Thai have no spaces between words: split into blocks, a
  // line could only break between pieces. There the headline enters as one
  // block and the browser breaks lines by the language's own rules.
  if (parts && UNSPACED.test(text)) {
    return (
      <>
        <span className="sr-only">{text}</span>
        <motion.span
          animate={mode === 'armed' ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
          aria-hidden="true"
          className="block"
          initial={false}
          transition={mode === 'play' ? { duration: 0.7, ease: EASE, delay: delay / 1000 } : { duration: 0 }}
        >
          {parts.map((part, index) => (
            <span className={part.tone} key={`${index}-${part.text}`}>
              {part.text}
            </span>
          ))}
        </motion.span>
      </>
    );
  }

  // Coloured pieces split into words where the script has spaces.
  const words = parts
    ? parts.flatMap((part) => part.text.split(/(?<=\s)/).map((chunk) => ({ word: chunk.trimEnd(), space: chunk !== chunk.trimEnd(), tone: part.tone })))
    : text.split(' ').map((word, index, all) => ({ word, space: index < all.length - 1, tone: tones?.[index] ?? '' }));
  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map(({ word, space, tone }, index) => (
        <span aria-hidden="true" key={`${index}-${word}`}>
          {word ? (
            <motion.span
              animate={mode === 'armed' ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
              className={`inline-block ${tone}`}
              initial={false}
              transition={mode === 'play' ? { duration: 0.6, ease: EASE, delay: delay / 1000 + index * 0.045 } : { duration: 0 }}
            >
              {word}
            </motion.span>
          ) : null}
          {space ? ' ' : null}
        </span>
      ))}
    </>
  );
}
