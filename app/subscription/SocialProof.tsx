import { Star } from 'lucide-react';
import { subscriptionCopy } from './copy';
import type { Lang } from './i18n';
import { Reveal } from './Reveal';
import { testimonials } from './testimonials';

// Real words only: each card names its source (a published App Store review
// or parent feedback collected by support) and says when it is a translation.
export function SocialProof({ lang, title, body }: { lang: Lang; title?: string; body?: string }) {
  const copy = subscriptionCopy[lang];
  const items = testimonials.map((t) => ({
    ...t,
    text: t.locale === lang ? t.quote : t.translations[lang],
    isTranslation: t.locale !== lang,
  }));

  return (
    <section className="relative mx-auto max-w-7xl scroll-mt-6 px-5 py-8 sm:px-8 lg:px-10" id="reviews">
      <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-7 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-4">
        <Reveal className="flex flex-col justify-center lg:pr-4">
          <h2 className="text-[1.75rem] font-semibold leading-[1.15] text-white sm:text-[2rem] lg:text-[1.7rem]">{title ?? copy.proof.title}</h2>
          <p className="mt-4 text-[15px] leading-6 text-white/65">{body ?? copy.proof.eyebrow}</p>
        </Reveal>
        {items.map((item, index) => (
          <Reveal className="flex" delay={index * 120} key={item.author}>
            <figure className="flex w-full flex-col rounded-2xl border border-white/12 bg-white/[0.07] p-5 transition hover:border-white/25">
              <div aria-label={`${item.stars}/5`} className="flex gap-1 text-[#FBBF24]">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" key={i} />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] leading-6 text-white/85">“{item.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-5">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#A78BFA,#6366F1)] text-sm font-semibold text-white">
                  {item.author.charAt(0)}
                </span>
                <span className="text-sm leading-5">
                  <span className="block font-semibold text-white">{item.author}</span>
                  <span className="text-xs text-white/55">
                    {item.source === 'appstore' ? copy.proof.source : copy.proof.parents}
                    {item.isTranslation ? ` · ${copy.proof.translated}` : ''}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
