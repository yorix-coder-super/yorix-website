import { ArrowRight, Plus } from 'lucide-react';
import { appDownloadUrl } from '../content';
import { Reveal } from '../subscription/Reveal';
import { AppleGlyph, Art, DoodleHeart, Hand, Sparkle } from './art';

export const whitePill =
  'inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] shadow-[0_18px_50px_rgb(255_255_255/14%)] transition hover:bg-[#EEF2FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30';

// The closing band shared by the home page, guides and articles: the baby
// hugging a star breaks out of the top edge, clouds drift along the bottom.
export function CtaBand({ title, body, action, note }: { title: string; body: string; action: string; note?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-10">
      <Reveal animation="zoomIn">
        <div className="relative rounded-[2rem] bg-[linear-gradient(100deg,#4F46E5_0%,#6D6AF0_48%,#A5B4FC_100%)] shadow-[0_30px_90px_rgb(79_70_229/35%)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <Art className="drift absolute bottom-[-38%] start-[-5%] w-[110%] max-w-none opacity-45 rtl:-scale-x-100" height={511} name="cloud-bank" width={1536} />
            <Sparkle className="start-[34%] top-[16%] w-3" delay={300} tone="lavender" />
            <Sparkle className="end-[23%] top-[12%] w-2.5" delay={1200} />
            <Sparkle className="bottom-[18%] end-[7%] w-4" delay={700} />
          </div>
          <div className="relative grid items-center gap-6 px-6 pb-8 pt-2 sm:px-10 md:grid-cols-[230px_1fr_auto] md:py-10 lg:grid-cols-[260px_1fr_auto]">
            <div className="relative mx-auto -mt-24 w-[200px] md:absolute md:-top-16 md:start-6 md:mx-0 md:mt-0 md:w-[230px] lg:w-[250px]">
              <div className="float-slow">
                <Art className="h-auto w-full drop-shadow-[0_24px_40px_rgb(30_27_75/35%)] rtl:-scale-x-100" height={560} name="cta-baby-star" width={503} />
              </div>
            </div>
            <div className="hidden md:block" />
            <div className="text-center md:text-start">
              <h2 className="text-[1.65rem] font-semibold leading-[1.2] text-white sm:text-[1.9rem]">{title}</h2>
              <p className="mt-2 max-w-xl text-[15px] leading-6 text-white/85">{body}</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a className={whitePill} href={appDownloadUrl} rel="noopener noreferrer" target="_blank">
                <AppleGlyph />
                {action}
                <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </div>
          </div>
          {note ? (
            <Hand className="absolute end-8 top-[-2.4rem] hidden rotate-[-8deg] rtl:rotate-[8deg] text-[1.9rem] text-[#FDE68A] lg:block">
              {note} <DoodleHeart className="h-6 w-6" />
            </Hand>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}

// A line break right after the dash of «30–60» reads as a lone minus, so the
// word joiner keeps number ranges on one line.
const keepRanges = (text: string) => text.replace(/(\d[–-])(?=\d)/g, '$1\u2060');

// `card` is a box of its own (home, subscription); `row` is a line inside a
// topic panel (support), separated from its neighbours by the panel's rules.
export function FaqItem({ question, answer, variant = 'card' }: { question: string; answer: string; variant?: 'card' | 'row' }) {
  if (variant === 'row') {
    return (
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-medium leading-7 text-white/90 transition hover:text-white focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
          {question}
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition duration-300 group-open:rotate-45 group-open:border-[#FDE68A]/60 group-open:bg-[#FDE68A]/15">
            <Plus className="h-4 w-4 text-white transition group-open:text-[#FDE68A]" aria-hidden="true" />
          </span>
        </summary>
        <p className="max-w-3xl pb-5 pe-12 text-base leading-7 text-white/80">{keepRanges(answer)}</p>
      </details>
    );
  }
  return (
    <details className="group rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-xl transition open:bg-white/[0.09] hover:border-white/25">
      <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium leading-6 text-white focus:outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
        {question}
        <Plus className="h-5 w-5 shrink-0 text-white/70 transition duration-300 group-open:rotate-45" aria-hidden="true" />
      </summary>
      <p className="px-5 pb-5 text-[15px] leading-7 text-white/80">{keepRanges(answer)}</p>
    </details>
  );
}
