import { BrandLogo } from './BrandLogo';
import { appDownloadUrl } from './content';
import { AppleGlyph } from './home/art';
import { PaymentLogos } from './subscription/PaymentLogos';
import { subscriptionCopy } from './subscription/copy';
import { subscriptionPath, type Lang } from './subscription/i18n';
import { documentLinks } from './subscription/SubscriptionShell';
import { merchant } from './subscription/merchant';

const heading = 'text-xs font-semibold uppercase tracking-wide text-white/45';
const link = 'text-white/70 transition hover:text-white';

const labels: Record<Lang, { product: string; features: string; guides: string; support: string; write: string; badgeTop: string }> = {
  ru: { product: 'Продукт', features: 'Возможности', guides: 'Гайды', support: 'Поддержка', write: 'Написать нам', badgeTop: 'Загрузите в' },
  en: { product: 'Product', features: 'Features', guides: 'Guides', support: 'Support', write: 'Write to us', badgeTop: 'Download on the' },
};

// The acquiring bank looks for the card logos and a way to the seller's
// requisites; the requisites themselves live in the public offer, so the
// footer links there instead of repeating them on every page.
export function SellerFooter({ note, lang = 'en', home }: { note: string; lang?: Lang; home?: string }) {
  const copy = subscriptionCopy[lang];
  const text = labels[lang];
  const homePath = home ?? (lang === 'ru' ? '/ru' : '/');
  const subscription = subscriptionPath(lang);
  const year = new Date().getFullYear();
  const years = year > 2026 ? `2026–${year}` : '2026';
  const columns = [
    {
      title: text.product,
      links: [
        { href: homePath === '/' ? '/#features' : `${homePath}#features`, label: text.features },
        { href: lang === 'ru' ? '/ru/guides' : '/guides', label: text.guides },
        { href: `${subscription}#plans`, label: copy.nav.plans },
        { href: `${subscription}#reviews`, label: copy.nav.reviews },
      ],
    },
    {
      title: text.support,
      links: [
        { href: `${subscription}#faq`, label: copy.nav.faq },
        { href: `mailto:${merchant.email}`, label: text.write },
        { href: subscriptionPath(lang, '/offer'), label: copy.footer.requisites },
      ],
    },
    { title: copy.footer.documents, links: documentLinks(lang) },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/70 text-sm text-white/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr_auto] lg:px-10">
        <div>
          <BrandLogo size="sm" tone="dark" />
          <p className="mt-4 max-w-xs leading-6">{copy.footer.tagline}</p>
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
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="w-full max-w-[300px]">
            <PaymentLogos />
          </div>
          <p className="text-xs leading-5 text-white/45 lg:max-w-xl lg:text-right">
            {note} © {years} Yorix.
          </p>
        </div>
      </div>
    </footer>
  );
}
