import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { appDownloadUrl, type TopicPage, topicPages } from './content';

type SeoArticlePageProps = {
  page: TopicPage;
};

export function SeoArticlePage({ page }: SeoArticlePageProps) {
  const relatedPages = topicPages.filter((item) => item.slug !== page.slug).slice(0, 3);

  return (
    <main className="brand-page min-h-screen text-[#1E1B4B]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a
          className="flex items-center gap-3 text-sm font-semibold text-[#1E1B4B]"
          href="/"
          aria-label="Back to Yorix home"
        >
          <BrandLogo size="sm" />
        </a>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1E1B4B] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#312E81] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25"
          href={appDownloadUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Get the app
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      <article>
        <section className="mx-auto max-w-5xl px-5 pb-12 pt-6 sm:px-8 lg:px-10 lg:pb-16">
          <a
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1] transition hover:text-[#4F46E5]"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to baby schedule app
          </a>
          <p className="mb-4 text-sm font-semibold uppercase text-[#8B5CF6]">
            {page.eyebrow}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-[#1E1B4B] sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-[#64748B]">
            {page.intro}
          </p>
        </section>

        <section className="border-y border-[#E2E8F0] bg-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10">
            <div className="grid gap-7">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-[#64748B]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5">
              <h2 className="text-lg font-semibold">Quick routine checklist</h2>
              <ul className="mt-4 grid gap-3">
                {page.checklist.map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-[#1E1B4B]" key={item}>
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="night-gradient rounded-lg p-7 text-white shadow-[0_22px_70px_rgb(49_46_129/22%)] sm:p-9">
            <p className="mb-2 text-sm font-semibold uppercase text-[#C7D2FE]">
              Personalized support
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold">
              Yorix turns baby sleep and feeding logs into a schedule that adapts.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#E0E7FF]">
              Track naps, wake windows, night wakings, feeds, diapers, and routines
              in one app, then get clearer next steps for the day ahead.
            </p>
            <a
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-4 focus:ring-white/25"
              href={appDownloadUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Download Yorix
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-14 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold text-[#1E1B4B]">Related guides</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {relatedPages.map((related) => (
              <a
                className="rounded-lg border border-[#E2E8F0] bg-white p-5 transition hover:border-[#C7D2FE] hover:shadow-sm"
                href={`/${related.slug}`}
                key={related.slug}
              >
                <h3 className="font-semibold text-[#1E1B4B]">{related.shortTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {related.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-[#E2E8F0] px-5 py-8 text-center text-sm text-[#64748B] sm:px-8">
        <p>
          Yorix is a routine helper for parents. It does not provide medical
          diagnosis or emergency advice.
        </p>
      </footer>
    </main>
  );
}
