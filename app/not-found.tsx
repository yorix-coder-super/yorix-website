import { ArrowRight } from 'lucide-react';
import { Art, Sparkle } from './home/art';
import { homeCopy } from './home/copy';
import { whitePill } from './home/CtaBand';
import { SellerFooter } from './SellerFooter';
import { SiteHeader } from './SiteHeader';
import { StarField } from './subscription/StarField';

// One 404 for every path. The site has no locale here, so it speaks Russian
// (the paying audience) with an English line underneath.
export default function NotFound() {
  return (
    <main className="home-page relative min-h-screen overflow-hidden text-white">
      <StarField />
      <SiteHeader locale="ru" />
      <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-6 text-center sm:px-8">
        <p aria-hidden="true" className="flex items-center justify-center gap-1 text-[7rem] font-semibold leading-none tracking-tight text-white/90 sm:text-[9rem]">
          4
          <span className="bob relative inline-block w-28 sm:w-36">
            <Art className="h-auto w-full" height={420} name="star-mascot" priority width={410} />
          </span>
          4
        </p>
        <Sparkle className="left-[18%] top-[8%] w-4" delay={200} />
        <Sparkle className="right-[16%] top-[30%] w-3" delay={1100} tone="lavender" />
        <h1 className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-5xl">Эта страница уснула</h1>
        <p className="mt-4 text-lg leading-8 text-white/75">Похоже, ссылка устарела или в адресе опечатка.</p>
        <p className="mt-2 text-sm leading-6 text-white/55" lang="en">
          This page is fast asleep — the link may be old or mistyped.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a className={whitePill} href="/ru">
            На главную
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 text-base font-semibold text-white transition hover:bg-white/[0.12]" href="/?lang=en" lang="en">
            Home in English
          </a>
        </div>
      </section>
      <SellerFooter lang="ru" note={homeCopy('ru').footer} />
    </main>
  );
}
