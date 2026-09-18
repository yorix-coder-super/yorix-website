import { Star } from 'lucide-react';
import { subscriptionCopy } from './copy';
import type { Lang } from './i18n';
import { Reveal } from './Reveal';
import { testimonials } from './testimonials';
import { Eyebrow, SectionTitle } from './ui';

// Real words only: each card names its source (a published App Store review
// or parent feedback collected by support) and says when it is a translation.
export function SocialProof({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const copy = subscriptionCopy[lang];
  const items = testimonials.map((t) => ({
    ...t,
    text: t.locale === lang ? t.quote : t.translations[lang],
    isTranslation: t.locale !== lang,
  }));

  return (
    <section className={`relative mx-auto max-w-6xl px-5 ${compact ? 'py-10' : 'py-16'} sm:px-8`} id="reviews">
      <Reveal>
        <Eyebrow>{copy.proof.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-2xl">{copy.proof.title}</SectionTitle>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <Reveal className="flex" delay={index * 120} key={item.author}>
            <figure className="flex w-full flex-col rounded-[1.5rem] border border-white/15 bg-white/[0.1] p-6 backdrop-blur-xl">
              <div className="flex gap-1 text-[#F59E0B]" aria-label={`${item.stars}/5`}>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" key={i} />
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-7 text-white/85">“{item.text}”</blockquote>
              <figcaption className="mt-auto pt-5 text-sm text-white/55">
                <span className="font-semibold text-white">{item.author}</span>
                {' · '}
                {item.source === 'appstore' ? copy.proof.source : copy.proof.parents}
                {item.isTranslation ? ` · ${copy.proof.translated}` : ''}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
