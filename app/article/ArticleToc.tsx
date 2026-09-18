'use client';

import { useEffect, useState, type ReactNode } from 'react';

export type TocItem = { id: string; label: string; number?: number };

// The article's side rail: reading progress on top, then the guide as a
// stepper — numbered circles for the sections, plain ones for the blocks.
// The server renders it complete (the links work without JS); on the client
// it follows the reader.
export function ArticleToc({ items, title, progressLabel, bodyId, children }: { items: TocItem[]; title: string; progressLabel: string; bodyId: string; children?: ReactNode }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = document.getElementById(bodyId);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!body) return;
      const line = window.innerHeight * 0.3;
      const rect = body.getBoundingClientRect();
      const read = (line - rect.top) / Math.max(1, rect.height);
      setProgress(Math.round(Math.min(1, Math.max(0, read)) * 100));
      let current = items[0]?.id;
      for (const item of items) {
        const top = document.getElementById(item.id)?.getBoundingClientRect().top;
        if (top !== undefined && top < line) current = item.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [items, bodyId]);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_80px_rgb(0_0_0/25%)] backdrop-blur-xl">
      <p className="flex justify-between text-sm text-white/75">
        <span>{progressLabel}</span>
        <span className="font-semibold tabular-nums text-white">{progress}%</span>
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#6366F1,#A78BFA)] transition-transform duration-300" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="my-6 h-px bg-white/10" />
      <nav aria-label={title}>
        <p className="text-lg font-semibold text-white">{title}</p>
        <ol className="mt-4 grid gap-0.5">
          {items.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  aria-current={on ? 'location' : undefined}
                  className="relative flex items-center gap-4 rounded-xl py-2 pl-1 pr-2 text-sm leading-5 transition hover:bg-white/[0.05]"
                  href={`#${item.id}`}
                >
                  {on ? <span aria-hidden="true" className="absolute -left-6 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#818CF8]" /> : null}
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition ${
                      on ? 'bg-[#6366F1] text-white shadow-[0_0_20px_rgb(99_102_241/55%)]' : 'border border-white/30 text-white/70'
                    }`}
                  >
                    {item.number ?? ''}
                  </span>
                  <span className={on ? 'font-medium text-white' : 'text-white/70'}>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
      {children}
    </div>
  );
}
