import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { Art, Sparkle } from './home/art';
import { homeCopy } from './home/copy';
import { whitePill } from './home/CtaBand';
import { SellerFooter } from './SellerFooter';
import { SiteHeader } from './SiteHeader';
import { StarField } from './subscription/StarField';

export const metadata: Metadata = { title: '404', robots: { index: false, follow: false } };

// One 404 for every path, in Russian: the site sells to Belarus and Russia,
// and a second language on this page read as a translation artefact rather
// than a courtesy (owner, 2026-09-22).
export default function NotFound() {
  return (
    <main className="home-page relative flex min-h-screen flex-col overflow-hidden text-white">
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
        <div className="mt-8 flex justify-center">
          <a className={whitePill} href="/ru">
            На главную
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>
      <SellerFooter locale="ru" note={homeCopy('ru').footer} />
    </main>
  );
}
