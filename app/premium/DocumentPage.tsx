import type { ReactNode } from 'react';
import { PremiumShell } from './PremiumShell';

export function DocumentPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <PremiumShell>
      <article className="relative mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
        <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">{eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-white/50">Редакция от {updated}</p>
        <div className="legal-document mt-8 rounded-[1.75rem] bg-[#F8FAFC] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/28%)] sm:p-10">
          {children}
        </div>
      </article>
    </PremiumShell>
  );
}
