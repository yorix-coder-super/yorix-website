import { BrandLogo } from './BrandLogo';
import { appDownloadUrl, socialLinks } from './content';
import { AppleGlyph, AppQr, Art } from './home/art';
import { docsLang, siteCopy, type SiteLocale } from './i18n';
import { PaymentLogos } from './subscription/PaymentLogos';
import { subscriptionPath } from './subscription/i18n';
import { subscriptionCopy } from './subscription/copy';
import { sellsHere } from './subscription/region';

const heading = 'text-xs font-semibold uppercase tracking-wide text-white/45';
const link = 'text-white/70 transition hover:text-white';

// The acquiring bank looks for the card logos and a way to the seller's
// requisites; the requisites themselves live in the public offer, so the
// footer links there instead of repeating them on every page. The documents
// exist in Russian and English; every other language links the English ones.
export async function SellerFooter({ note, locale = 'en', home }: { note: string; locale?: SiteLocale; home?: string }) {
  const site = siteCopy(locale);
  const copy = site.subscription;
  const text = site.footerLabels;
  const docs = docsLang(locale);
  const homePath = home ?? (locale === 'en' ? '/' : `/${locale}`);
  const subscription = subscriptionPath(docs);
  const year = new Date().getFullYear();
  const years = year > 2026 ? `2026–${year}` : '2026';
  const web = await sellsHere();
  const supportPage = locale === 'en' ? '/support' : `/${locale}/support`;
  const columns = [
    {
      title: text.product,
      links: [
        { href: homePath === '/' ? '/#features' : `${homePath}#features`, label: text.features },
        { href: locale === 'en' ? '/guides' : `/${locale}/guides`, label: text.guides },
        { href: locale === 'en' ? '/about' : `/${locale}/about`, label: site.about.nav },
        ...(web
          ? [
              { href: `${subscription}#plans`, label: copy.nav.plans },
              { href: subscriptionPath(docs, '/gift'), label: subscriptionCopy[docs].gift.eyebrow },
              { href: `${subscription}#reviews`, label: copy.nav.reviews },
            ]
          : []),
      ],
    },
    {
      title: text.support,
      links: [
        { href: supportPage, label: copy.nav.faq },
        { href: `${supportPage}#contact`, label: text.write },
        // A recipient can live anywhere, so this one is shown to everyone.
        { href: docs === 'ru' ? '/ru/gift' : '/gift', label: text.redeem },
        ...(web ? [{ href: subscriptionPath(docs, '/offer'), label: copy.footer.requisites }] : []),
      ],
    },
    {
      title: copy.footer.documents,
      links: [
        ...(web
          ? [
              { href: subscriptionPath(docs, '/offer'), label: copy.docs.offer },
              { href: subscriptionPath(docs, '/payment'), label: copy.docs.payment },
            ]
          : []),
        { href: subscriptionPath(docs, '/terms'), label: copy.docs.terms },
        { href: subscriptionPath(docs, '/privacy'), label: copy.docs.privacy },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/70 text-sm text-white/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr_auto] lg:px-10">
        <div>
          <BrandLogo size="sm" tone="dark" />
          <p className="mt-4 max-w-xs leading-6">{copy.footer.tagline}</p>
          <p className={`mt-7 ${heading}`}>{text.social}</p>
          <ul className="mt-3 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  aria-label={social.name}
                  className="group block rounded-2xl transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/25 active:translate-y-0 active:scale-95"
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={social.name}
                >
                  <Art
                    className="h-12 w-12 object-contain drop-shadow-[0_10px_18px_rgb(79_70_229/45%)] transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                    height={192}
                    name={social.icon}
                    width={192}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className={heading}>{column.title}</p>
            <ul className="mt-4 grid gap-2.5">
              {column.links.map((item) => (
                <li key={item.href}>
                  <a className={link} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <a
            className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2 text-white transition hover:border-white/50"
            href={appDownloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <AppleGlyph className="h-7 w-7" />
            <span className="leading-tight">
              <span className="block text-[11px] text-white/80">{text.badgeTop}</span>
              <span className="block text-lg font-semibold">App Store</span>
            </span>
          </a>
          {/* A phone has the badge above; the code is for a visitor at a desk. */}
          <AppQr className="mt-5 hidden w-28 sm:block" label={`${text.scan} — ${text.scanHint}`} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          {web ? (
            <div className="w-full max-w-[420px]">
              <PaymentLogos lang={docs} />
            </div>
          ) : null}
          <p className={`text-xs leading-5 text-white/45 lg:max-w-xl ${web ? 'lg:text-end' : ''}`}>
            {note} © {years} Yorix.
          </p>
        </div>
      </div>
    </footer>
  );
}
