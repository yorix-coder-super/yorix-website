import type { ReactNode } from 'react';
import { subscriptionCopy } from './copy';
import type { Lang, SubscriptionPage } from './i18n';
import { SubscriptionShell } from './SubscriptionShell';

export function DocumentPage({
  lang,
  page,
  title,
  updated,
  children,
}: {
  lang: Lang;
  page: SubscriptionPage;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const copy = subscriptionCopy[lang];
  return (
    <SubscriptionShell lang={lang} page={page}>
      <article className="relative mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#A78BFA]">{copy.legal.eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-white/50">{copy.legal.updated(updated)}</p>
        {copy.legal.binding ? (
          <p className="mt-3 rounded-xl border border-[#FDE68A]/30 bg-[#FDE68A]/10 px-4 py-3 text-sm text-[#FDE68A]">{copy.legal.binding}</p>
        ) : null}
        <div className="legal-document mt-8 rounded-[1.75rem] bg-[#F8FAFC] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/28%)] sm:p-10">
          {children}
        </div>
      </article>
    </SubscriptionShell>
  );
}
