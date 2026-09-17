import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PaymentLogos } from './premium/PaymentLogos';
import { premiumCopy } from './premium/copy';
import { premiumPath, type Lang } from './premium/i18n';
import { documentLinks } from './premium/PremiumShell';
import { merchant } from './premium/merchant';

const heading = 'text-xs font-semibold uppercase tracking-wide text-white/45';
const link = 'text-white/70 transition hover:text-white';

// The acquiring bank looks for the seller and the card logos on the home
// page, so every home variant carries them — as one column of a normal site
// footer, with the full requisites one link away on the subscription page.
// The seller's name and status stay in Russian (that is what the bank
// reads); everything else follows the page language.
export function SellerFooter({ note, lang = 'en' }: { note: string; lang?: Lang }) {
  const copy = premiumCopy[lang];
  const home = premiumPath(lang);
  const subscriptionLinks = [
    { href: `${home}#tarify`, label: copy.nav.plans },
    { href: `${home}#kak-kupit`, label: copy.nav.howToBuy },
    { href: `${home}#voprosy`, label: copy.faq.eyebrow },
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
          <p className={heading}>{copy.footer.rows.seller}</p>
          <p className="mt-4 font-semibold text-white" lang="ru">
            {merchant.fullName}
          </p>
          <p className="mt-1 leading-6" lang="ru">
            {merchant.status.ru}
            {merchant.unp ? `, УНП ${merchant.unp}` : ''}
          </p>
          <a className={`mt-2 block ${link}`} href={`mailto:${merchant.email}`}>
            {merchant.email}
          </a>
          <a className="mt-4 inline-flex items-center gap-1 font-semibold text-white" href={`${home}#kontakty`}>
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
