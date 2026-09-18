import type { ReactNode } from 'react';

// The Belarusian ruble has no Unicode sign; this is the «Б with a bar»
// glyph the owner chose, drawn in the text colour at cap height. Amounts
// arrive as the strings formatMoney/formatByn produce («11,90 Br»), so the
// sign replaces «Br» only where the amount is rendered, never in documents.
export function BynSign({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`ml-[0.14em] inline-block h-[0.8em] w-auto align-[-0.04em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="90"
      viewBox="0 0 660 800"
    >
      <path d="M160 800V45H560" />
      <path d="M160 375h270a190 190 0 0 1 0 380H160" />
      <path d="M5 565h395" />
    </svg>
  );
}

const BYN_AMOUNT = /(\d[\d  .,]*) Br/g;

export function Money({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(BYN_AMOUNT)) {
    const start = match.index ?? 0;
    parts.push(text.slice(last, start));
    parts.push(
      <span className="whitespace-nowrap" key={start}>
        {match[1]}
        <BynSign />
        <span className="sr-only">Br</span>
      </span>,
    );
    last = start + match[0].length;
  }
  parts.push(text.slice(last));
  return <span className={className}>{parts}</span>;
}
