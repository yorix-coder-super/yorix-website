import type { ReactNode } from 'react';
import { Art } from '../home/art';
import { subscriptionCopy } from './copy';
import { Reveal } from './Reveal';
import { subscriptionPath, type Lang, type SubscriptionPage } from './i18n';
import { sellsHere } from './region';
import { documentLinks, SubscriptionShell } from './SubscriptionShell';

const docIcons: Partial<Record<SubscriptionPage, string>> = { '/offer': 'icon-document', '/payment': 'icon-card', '/terms': 'icon-check', '/privacy': 'icon-lock' };

export async function DocumentPage({
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
  // Outside Belarus and Russia only the terms and the privacy policy are reachable.
  const links = documentLinks(lang, await sellsHere());
  const current = subscriptionPath(lang, page);
  const icon = docIcons[page] ?? 'icon-document';

  return (
    <SubscriptionShell lang={lang} page={page}>
      <article className="relative mx-auto max-w-4xl px-5 pb-20 pt-4 sm:px-8">
        {links.length ? (
        <Reveal animation="fadeIn" load>
        <nav aria-label={copy.footer.documents} className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active = link.href === current;
            return (
              <a
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-4 text-sm font-medium transition ${
                  active ? 'border-white/35 bg-white/[0.14] text-white' : 'border-white/12 bg-white/[0.05] text-white/70 hover:border-white/25 hover:text-white'
                }`}
                href={link.href}
                key={link.href}
              >
                <Art className="h-6 w-6 object-contain" height={192} name={docIcons[link.page] ?? 'icon-document'} width={192} />
                {link.label}
              </a>
            );
          })}
        </nav>
        </Reveal>
        ) : null}
        <Reveal delay={120} load>
        <header className={`${links.length ? 'mt-8' : 'mt-2'} flex items-center gap-5`}>
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-[radial-gradient(circle_at_32%_28%,#5B55E8,#2E2A7A_70%)] shadow-[0_0_50px_rgb(99_102_241/40%)] ring-1 ring-white/15">
            <Art className="h-12 w-12 object-contain" height={192} name={icon} priority width={192} />
          </span>
          <div className="min-w-0">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#A78BFA]">{copy.legal.eyebrow}</p>
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-[2.6rem]">{title}</h1>
          </div>
        </header>
        </Reveal>
        <p className="mt-5 text-sm text-white/50">{copy.legal.updated(updated)}</p>
        {copy.legal.binding ? (
          <p className="mt-3 rounded-2xl border border-[#FDE68A]/30 bg-[#FDE68A]/10 px-4 py-3 text-sm text-[#FDE68A]">{copy.legal.binding}</p>
        ) : null}
        <Reveal delay={240} load>
          <div className="legal-document mt-8 rounded-[2rem] bg-[#F8FAFC] p-6 text-[#1E1B4B] shadow-[0_28px_90px_rgb(0_0_0/28%)] sm:p-10">{children}</div>
        </Reveal>
      </article>
    </SubscriptionShell>
  );
}
