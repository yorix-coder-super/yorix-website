import type { Metadata } from 'next';
import { ArrowRight, Search } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { appDownloadUrl, siteUrl, topicPages } from '../content';

const categories = [
  'All posts',
  'Baby Sleep',
  'Feeding',
  'Routines',
  'Sleep Training',
];

export const metadata: Metadata = {
  title: 'Baby Sleep Guides and Parenting Blog',
  description:
    'Research-backed baby sleep guides about newborn sleep, wake windows, night wakings, feeding routines, white noise, sleep regressions, and sleep training.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Baby Sleep Guides and Parenting Blog | Yorix',
    description:
      'Research-backed baby sleep guides for tired parents who want practical, gentle routine support.',
    url: `${siteUrl}/guides`,
    type: 'website',
  },
};

export default function GuidesPage() {
  return (
    <main className="brand-page min-h-screen bg-[#0F1022] text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a className="flex items-center gap-3" href="/" aria-label="Yorix home">
          <BrandLogo size="sm" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/60 md:flex">
          <a className="transition hover:text-white" href="/">
            Home
          </a>
          <a className="transition hover:text-white" href="/#features">
            Features
          </a>
          <a className="transition hover:text-white" href="/#faq">
            FAQ
          </a>
        </nav>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Get the app
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 lg:px-10 lg:pt-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#C7D2FE]">
            <Search className="h-4 w-4" aria-hidden="true" />
            Yorix guides
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Baby sleep answers parents search for at 3 a.m.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Practical, evidence-aware guides about newborn sleep, naps, wake
            windows, night wakings, feeding routines, white noise, regressions,
            and sleep training decisions.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-5 border-b border-white/15 pb-4 text-sm font-medium text-white/45">
          {categories.map((category, index) => (
            <span
              className={
                index === 0 ? 'border-b-2 border-white pb-4 text-white' : ''
              }
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topicPages.map((page) => (
            <a
              className="overflow-hidden rounded-lg bg-[#161628] shadow-[0_20px_60px_rgb(0_0_0/18%)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(0_0_0/26%)]"
              href={`/${page.slug}`}
              key={page.slug}
            >
              <div className={`bg-gradient-to-br ${page.coverClass} p-6`}>
                <img
                  src="/app-icon.png"
                  alt=""
                  className="h-24 w-24 rounded-[26px] shadow-2xl"
                  width="1024"
                  height="1024"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-[#C7D2FE]">
                  {page.date} · {page.category}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {page.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  {page.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-[#A78BFA]">
                  {page.readTime}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/50 sm:px-8">
        <p>
          Yorix is a routine helper for parents. It does not provide medical
          diagnosis or emergency advice.
        </p>
      </footer>
    </main>
  );
}
