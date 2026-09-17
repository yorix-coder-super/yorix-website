import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { BrandLogo } from '../BrandLogo';
import { merchant } from './merchant';
import { PaymentLogos } from './PaymentLogos';

const navItems = [
  { href: '/premium#tarify', label: 'Тарифы' },
  { href: '/premium#kak-kupit', label: 'Как купить' },
  { href: '/premium/oplata', label: 'Оплата и возврат' },
  { href: '/premium#kontakty', label: 'Контакты' },
];

export const documentLinks = [
  { href: '/premium/oferta', label: 'Публичный договор (оферта)' },
  { href: '/premium/oplata', label: 'Оплата, доставка и возврат' },
  { href: '/premium/konfidencialnost', label: 'Политика обработки персональных данных' },
];

export function PremiumShell({ children }: { children: ReactNode }) {
  return (
    <main className="home-page min-h-screen overflow-hidden text-white" lang="ru">
      <header className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="/premium" aria-label="Yorix Premium — главная">
          <BrandLogo size="sm" tone="dark" />
        </a>
        <nav
          aria-label="Разделы"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1.5 text-sm font-semibold text-white/70 backdrop-blur-xl md:flex"
        >
          {navItems.map((item) => (
            <a
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
          href="/premium#tarify"
        >
          Выбрать тариф
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>

      {children}

      <MerchantFooter />
    </main>
  );
}

export function MerchantRequisites({ compact = false }: { compact?: boolean }) {
  const rows = [
    { label: 'Продавец', value: merchant.fullName },
    { label: 'Статус', value: merchant.status },
    { label: 'УНП', value: merchant.unp },
    {
      label: 'Адрес',
      value: [merchant.country, merchant.postalAddress].filter(Boolean).join(', '),
    },
    { label: 'Регистрация в Торговом реестре', value: merchant.tradeRegister },
    { label: 'E-mail', value: merchant.email, href: `mailto:${merchant.email}` },
    { label: 'Телефон', value: merchant.phone, href: `tel:${merchant.phone.replace(/[^+\d]/g, '')}` },
    { label: 'Режим работы', value: `${merchant.hours}. ${merchant.hoursNote}` },
  ].filter((row) => row.value);

  return (
    <dl className={compact ? 'grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2' : 'grid gap-x-10 gap-y-4 sm:grid-cols-2'}>
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-white/45">{row.label}</dt>
          <dd className={compact ? 'mt-0.5 text-white/80' : 'mt-1 text-base text-white'}>
            {row.href ? (
              <a className="underline decoration-white/30 hover:decoration-white" href={row.href}>
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function MerchantFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0F1022]/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Сведения о продавце</p>
          <MerchantRequisites compact />
        </div>
        <div className="grid content-start gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Документы</p>
            <ul className="grid gap-2 text-sm">
              {documentLinks.map((link) => (
                <li key={link.href}>
                  <a className="text-white/70 underline decoration-white/20 hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <PaymentLogos />
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">
        Yorix помогает с режимом дня и не оказывает медицинских услуг.
      </p>
    </footer>
  );
}
