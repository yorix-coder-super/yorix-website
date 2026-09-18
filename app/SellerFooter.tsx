import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PaymentLogos } from './subscription/PaymentLogos';
import { subscriptionCopy } from './subscription/copy';
import { subscriptionPath, type Lang } from './subscription/i18n';
import { documentLinks } from './subscription/SubscriptionShell';
import { merchant } from './subscription/merchant';

const heading = 'text-xs font-semibold uppercase tracking-wide text-white/45';
const link = 'text-white/70 transition hover:text-white';

// The acquiring bank looks for the card logos and a way to the seller's
// requisites; the requisites themselves live in the public offer, so the
// footer links there instead of repeating them on every page.
export function SellerFooter({ note, lang = 'en' }: { note: string; lang?: Lang }) {
  const copy = subscriptionCopy[lang];
  const home = subscriptionPath(lang);
  const subscriptionLinks = [
    { href: `${home}#plans`, label: copy.nav.plans },
    { href: `${home}#reviews`, label: copy.nav.reviews },
    { href: `${home}#faq`, label: copy.nav.faq },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/80 text-sm text-white/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr] lg:px-10">
        <div>
          <BrandLogo size="sm" tone="dark" />
          <p className="mt-4 max-w-xs leading-6">{copy.footer.tagline}</p>
        </div>
        <div>
          <p className={heading}>{copy.footer.subscription}</p>
          <ul className="mt-4 grid gap-2.5">
            {subscriptionLinks.map((item) => (
              <li key={item.href}>
                <a className={link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={heading}>{copy.footer.documents}</p>
          <ul className="mt-4 grid gap-2.5">
            {documentLinks(lang).map((item) => (
              <li key={item.href}>
                <a className={link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={heading}>{copy.footer.seller}</p>
          <a className={`mt-4 block ${link}`} href={`mailto:${merchant.email}`}>
            {merchant.email}
          </a>
          <a className="mt-3 inline-flex items-center gap-1 font-semibold text-white" href={subscriptionPath(lang, '/offer')}>
            {copy.footer.requisites}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="w-full max-w-[300px]">
            <PaymentLogos />
          </div>
          <p className="text-xs leading-5 text-white/45 lg:max-w-xl lg:text-right">{note}</p>
        </div>
      </div>
    </footer>
  );
}
