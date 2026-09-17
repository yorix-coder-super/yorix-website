import { PaymentLogos } from './premium/PaymentLogos';
import { premiumCopy } from './premium/copy';
import { premiumPath, type Lang } from './premium/i18n';
import { documentLinks } from './premium/PremiumShell';
import { merchant } from './premium/merchant';

// The acquiring bank looks for the seller and the card logos on the home
// page, so every home variant names the seller in one line and links to
// the full requisites on the subscription page. The name and status stay
// in Russian (that is what the bank reads); labels follow the page language.
export function SellerFooter({ note, lang = 'en' }: { note: string; lang?: Lang }) {
  const copy = premiumCopy[lang];
  const seller = [merchant.fullName, merchant.status.ru.toLowerCase(), merchant.unp && `УНП ${merchant.unp}`].filter(Boolean).join(', ');

  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/80 text-sm text-white/55">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
        <div className="grid gap-3">
          <p className="leading-6" lang="ru">
            {copy.footer.rows.seller}: {seller} ·{' '}
            <a className="underline decoration-white/25 hover:text-white" href={`mailto:${merchant.email}`}>
              {merchant.email}
            </a>{' '}
            ·{' '}
            <a className="underline decoration-white/25 hover:text-white" href={`${premiumPath(lang)}#kontakty`} lang={lang}>
              {copy.footer.requisites}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a className="font-semibold text-white underline decoration-white/30 hover:decoration-white" href={premiumPath(lang)}>
                {lang === 'ru' ? 'Подписка Yorix: тарифы и оплата картой' : 'Yorix subscription: plans and card payment'}
              </a>
            </li>
            {documentLinks(lang).map((link) => (
              <li key={link.href}>
                <a className="underline decoration-white/20 hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full max-w-[320px]">
          <PaymentLogos />
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-white/45 sm:px-8">{note}</p>
    </footer>
  );
}
