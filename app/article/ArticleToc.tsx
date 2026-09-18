'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; label: string };

// The server renders the whole list (the links work without JS); on the
// client it follows the reader: the section in view is marked and the bar
// shows how much of the article body has been read.
export function ArticleToc({ items, title, progressLabel, bodyId }: { items: TocItem[]; title: string; progressLabel: string; bodyId: string }) {
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
    <nav aria-label={title} className="rounded-3xl border border-[#E7E5FB] bg-white p-5 shadow-[0_10px_40px_rgb(30_27_75/6%)]">
      <p className="text-sm font-semibold text-[#1E1B4B]">{title}</p>
      <ol className="mt-3 grid border-l border-[#E7E5FB]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              aria-current={active === item.id ? 'location' : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-3 text-[13px] leading-5 transition ${
                active === item.id ? 'border-[#6366F1] font-semibold text-[#4F46E5]' : 'border-transparent text-[#64748B] hover:text-[#1E1B4B]'
              }`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF2FF]">
          <div className="h-full origin-left rounded-full bg-[#6366F1] transition-transform duration-300" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="mt-2 flex justify-between text-xs text-[#64748B]">
          <span>{progressLabel}</span>
          <span className="tabular-nums">{progress}%</span>
        </p>
      </div>
    </nav>
  );
}
