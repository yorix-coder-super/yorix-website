import { PaymentLogos } from './premium/PaymentLogos';
import { premiumCopy } from './premium/copy';
import { premiumPath, type Lang } from './premium/i18n';
import { documentLinks } from './premium/PremiumShell';
import { merchant } from './premium/merchant';

// The acquiring bank checks the domain's home page for the seller's
// requisites and card logos, so every home variant carries this block. The
// requisites stay in Russian (that is what the bank reads); labels follow
// the page language.
export function SellerFooter({ note, lang = 'en' }: { note: string; lang?: Lang }) {
  const copy = premiumCopy[lang];
  const requisites = [
    lang === 'ru' ? merchant.fullName : `${merchant.fullName} (${merchant.latinName})`,
    merchant.status.ru.toLowerCase(),
    merchant.unp && `УНП ${merchant.unp}`,
    [merchant.country.ru, merchant.postalAddress].filter(Boolean).join(', '),
    merchant.tradeRegister,
  ].filter(Boolean);
  const contacts = [merchant.email, merchant.phone, merchant.hours.ru].filter(Boolean);

  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/80 text-sm text-white/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:px-10">
        <div className="grid content-start gap-3" lang="ru">
          <p className="font-semibold text-white">{copy.footer.rows.seller}</p>
          <p className="leading-6">{requisites.join(' · ')}</p>
          <p className="leading-6">
            {contacts.map((item, index) => (
              <span key={item}>
                {index > 0 ? ' · ' : null}
                {item === merchant.email ? (
                  <a className="underline decoration-white/25 hover:text-white" href={`mailto:${item}`}>
                    {item}
                  </a>
                ) : (
                  item
                )}
              </span>
            ))}
          </p>
        </div>
        <div className="grid content-start gap-4">
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
          <PaymentLogos />
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-white/45 sm:px-8">{note}</p>
    </footer>
  );
}
