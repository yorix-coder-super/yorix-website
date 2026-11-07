import { formatMoney, type WebCurrency } from './currency';
import type { Lang } from './i18n';
import { ACQUIRER, chargeFor, formatByn } from './merchant';

type Row = { label: string; value: string };

const labels = {
  ru: {
    card: { title: 'Карт-чек', subtitle: 'подтверждение оплаты картой' },
    caption: 'Образцы документов, подтверждающих оплату. Все реквизиты в образце условные. Сохраняйте карт-чеки для сверки с выпиской из карт-счёта.',
    cardRows: ['Номер чека', 'Номер операции', 'Код авторизации', 'Дата платежа', 'Номер карты', 'RRN', 'Получатель платежа', 'Услуга', 'Сумма'],
    service: 'Подписка Yorix на 30 дней',
    sample: 'ОБРАЗЕЦ',
  },
  en: {
    card: { title: 'Card receipt', subtitle: 'card payment confirmation' },
    caption: 'Sample payment documents. All details in the example are illustrative. Keep card receipts to reconcile with your card statement.',
    cardRows: ['Receipt number', 'Operation number', 'Authorization code', 'Payment date', 'Card number', 'RRN', 'Payee', 'Service', 'Amount'],
    service: 'Yorix subscription for 30 days',
    sample: 'SAMPLE',
  },
} as const;

function Receipt({ title, subtitle, rows, sample }: { title: string; subtitle: string; rows: Row[]; sample: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#94A3B8] bg-white p-5 text-[13px] text-[#0F172A]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center text-4xl font-bold tracking-[0.3em] text-[#6366F1]/10 [transform:rotate(-24deg)]"
      >
        {sample}
      </span>
      <p className="text-center text-base font-semibold">{title}</p>
      <p className="text-center text-xs text-[#64748B]">{subtitle}</p>
      <dl className="mt-4 grid gap-1.5 font-mono">
        {rows.map((row) => (
          <div className="grid grid-cols-[0.9fr_1.1fr] gap-3 border-b border-dotted border-[#CBD5E1] pb-1.5" key={row.label}>
            <dt className="text-[#64748B]">{row.label}</dt>
            <dd className="text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SampleReceipt({ lang, region }: { lang: Lang; region: WebCurrency }) {
  const t = labels[lang];
  const name = lang === 'ru' ? 'Продавец из оферты' : 'Seller named in the offer';
  const paid = chargeFor('month', region, ACQUIRER);
  const cardAmount = paid.currency === 'BYN' ? formatByn(paid.amount, lang, 'code') : formatMoney(paid.amount, 'RUB', lang);
  const cardValues = ['4815162342', '123456789', '0A1B2C', '17.09.2026 14:32', '4111 11** **** 1111', '526012345678', name, t.service, cardAmount];
  const zip = (keys: readonly string[], values: string[]) => keys.map((label, index) => ({ label, value: values[index] }));

  return (
    <figure className="mt-5">
      <div className="mx-auto max-w-lg">
        <Receipt rows={zip(t.cardRows, cardValues)} sample={t.sample} subtitle={t.card.subtitle} title={t.card.title} />
      </div>
      <figcaption className="mt-3 text-center text-sm text-[#64748B]">{t.caption}</figcaption>
    </figure>
  );
}
