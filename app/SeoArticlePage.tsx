import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { appDownloadUrl, type TopicPage, topicPages } from './content';

type SeoArticlePageProps = {
  page: TopicPage;
};

export function SeoArticlePage({ page }: SeoArticlePageProps) {
  const relatedPages = topicPages.filter((item) => item.slug !== page.slug).slice(0, 3);
  const articleAnchors = page.sections.map((section) => ({
    id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    label: section.heading,
  }));

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
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <a
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1] transition hover:text-[#4F46E5]"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to baby schedule app
          </a>
          <p className="mb-4 text-sm font-semibold uppercase text-[#8B5CF6]">
            {page.category} · {page.readTime}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-[#1E1B4B] sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 text-sm font-medium text-[#64748B]">
            Published {page.date}
          </p>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-[#64748B]">
            {page.intro}
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-10 sm:px-8 lg:px-10">
          <div
            className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${page.coverClass} p-6 text-white shadow-[0_24px_80px_rgb(49_46_129/20%)] sm:p-8`}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_190px] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-white/70">
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight">
                  A practical guide for tired parents who want less guessing.
                </h2>
              </div>
              <img
                src="/app-icon.png"
                alt="Yorix app icon"
                className="mx-auto h-36 w-36 rounded-[34px] shadow-2xl md:h-44 md:w-44"
                width="1024"
                height="1024"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#E2E8F0] bg-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-10">
            <div className="grid gap-7">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <h2 className="text-xl font-semibold text-[#1E1B4B]">
                  In this article
                </h2>
                <ol className="mt-4 grid gap-2">
                  {articleAnchors.map((anchor) => (
                    <li key={anchor.id}>
                      <a
                        className="text-sm font-medium leading-6 text-[#6366F1] transition hover:text-[#4F46E5]"
                        href={`#${anchor.id}`}
                      >
                        {anchor.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-5 text-sm leading-7 text-[#1E1B4B]">
                This guide is for general routine support for healthy babies and
                families. It does not replace medical advice. If you are worried
                about feeding, growth, breathing, fever, symptoms, or your own
                wellbeing, contact a qualified healthcare professional.
              </p>

              {page.sections.map((section, index) => (
                <section key={section.heading} id={articleAnchors[index].id}>
                  <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p className="mt-3 text-base leading-8 text-[#64748B]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                  Quick reference
                </h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-[#E2E8F0]">
                  {page.sampleRows.map((row) => (
                    <div
                      className="grid gap-2 border-b border-[#E2E8F0] bg-white p-4 last:border-b-0 sm:grid-cols-[150px_160px_1fr]"
                      key={row.label}
                    >
                      <strong className="text-sm text-[#1E1B4B]">{row.label}</strong>
                      <span className="text-sm font-semibold text-[#6366F1]">
                        {row.value}
                      </span>
                      <span className="text-sm leading-6 text-[#64748B]">
                        {row.note}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                  Common questions
                </h2>
                <div className="mt-4 grid gap-3">
                  {page.faqs.map((faq) => (
                    <article
                      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5"
                      key={faq.question}
                    >
                      <h3 className="font-semibold text-[#1E1B4B]">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        {faq.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
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
