'use client';

import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

// A checklist the parent can actually tick. The ticks live in this browser
// only (localStorage), per article and language; without storage it still
// works for the visit.
export function Checklist({ title, items, storageKey }: { title: string; items: string[]; storageKey: string }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
        if (Array.isArray(saved)) setDone(items.map((_, index) => saved[index] === true));
      } catch {
        // Private mode or blocked storage: start unticked.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [items, storageKey]);

  const toggle = (index: number) => {
    const next = done.map((value, i) => (i === index ? !value : value));
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Keep the tick for this visit only.
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/80">
              <input checked={done[index]} className="peer sr-only" onChange={() => toggle(index)} type="checkbox" />
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-white/35 text-transparent transition peer-checked:border-[#6366F1] peer-checked:bg-[#6366F1] peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-[#6366F1]/40"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="transition peer-checked:text-white/40 peer-checked:line-through">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
