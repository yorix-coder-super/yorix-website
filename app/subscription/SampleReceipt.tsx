import type { Lang } from './i18n';
import { merchant } from './merchant';

type Row = { label: string; value: string };

const labels = {
  ru: {
    card: { title: 'Карт-чек', subtitle: 'подтверждение оплаты картой' },
    tax: { title: 'Чек', subtitle: 'приложение «Налог на профессиональный доход»' },
    caption: 'Образцы документов, подтверждающих оплату. Номера и данные карты условные. Сохраняйте карт-чеки для сверки с выпиской из карт-счёта.',
    cardRows: ['Номер чека', 'Номер операции', 'Код авторизации', 'Дата платежа', 'Номер карты', 'RRN', 'Получатель платежа', 'Услуга', 'Сумма'],
    taxRows: ['Уникальный номер чека', 'Дата и время формирования', 'Дата получения дохода', 'ФИО', 'УНП', 'Налог', 'Вид деятельности', 'Сумма'],
    service: 'Подписка Yorix на 30 дней',
    taxName: 'Налог на профессиональный доход',
    activity: 'Услуги, оказываемые через сеть Интернет',
    sample: 'ОБРАЗЕЦ',
  },
  en: {
    card: { title: 'Card receipt', subtitle: 'card payment confirmation' },
    tax: { title: 'Receipt', subtitle: '“Professional income tax” app' },
    caption: 'Sample payment documents. Numbers and card data are illustrative. Keep card receipts to reconcile with your card statement.',
    cardRows: ['Receipt number', 'Operation number', 'Authorization code', 'Payment date', 'Card number', 'RRN', 'Payee', 'Service', 'Amount'],
    taxRows: ['Unique receipt number', 'Issued at', 'Income date', 'Full name', 'Taxpayer number', 'Tax', 'Activity', 'Amount'],
    service: 'Yorix subscription for 30 days',
    taxName: 'Professional income tax',
    activity: 'Services provided over the Internet',
    sample: 'SAMPLE',
  },
} as const;

function Receipt({ title, subtitle, rows, qr, sample }: { title: string; subtitle: string; rows: Row[]; qr?: boolean; sample: string }) {
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
      {qr ? (
        <div aria-hidden="true" className="mx-auto mt-4 grid h-16 w-16 grid-cols-5 gap-0.5">
          {Array.from({ length: 25 }).map((_, index) => (
            <span className={[0, 1, 4, 5, 7, 11, 12, 13, 15, 18, 20, 22, 23, 24].includes(index) ? 'bg-[#0F172A]' : ''} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SampleReceipt({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const name = lang === 'ru' ? merchant.fullName : merchant.latinName;
  const cardValues = ['4815162342', '123456789', '0A1B2C', '17.09.2026 14:32', '4111 11** **** 1111', '526012345678', name, t.service, '22,90 BYN'];
  const taxValues = ['1A2B3C4D5E', '17.09.2026 14:35', '17.09.2026', name, merchant.unp || 'AB1234567', t.taxName, t.activity, '22,90 BYN'];
  const zip = (keys: readonly string[], values: string[]) => keys.map((label, index) => ({ label, value: values[index] }));

  return (
    <figure className="mt-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Receipt rows={zip(t.cardRows, cardValues)} sample={t.sample} subtitle={t.card.subtitle} title={t.card.title} />
        <Receipt qr rows={zip(t.taxRows, taxValues)} sample={t.sample} subtitle={t.tax.subtitle} title={t.tax.title} />
      </div>
      <figcaption className="mt-3 text-center text-sm text-[#64748B]">{t.caption}</figcaption>
    </figure>
  );
}
