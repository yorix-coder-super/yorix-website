import { merchant } from './merchant';

type Row = { label: string; value: string };

const taxReceipt: Row[] = [
  { label: 'Уникальный номер чека', value: '1A2B3C4D5E' },
  { label: 'Дата и время формирования', value: '17.09.2026 14:35' },
  { label: 'Дата получения дохода', value: '17.09.2026' },
  { label: 'ФИО', value: merchant.fullName },
  { label: 'УНП', value: merchant.unp || 'AB1234567' },
  { label: 'Налог', value: 'Налог на профессиональный доход' },
  { label: 'Вид деятельности', value: 'Услуги, оказываемые через сеть Интернет' },
  { label: 'Сумма', value: '22,90 BYN' },
];

const cardReceipt: Row[] = [
  { label: 'Номер чека', value: '4815162342' },
  { label: 'Номер операции', value: '123456789' },
  { label: 'Код авторизации', value: '0A1B2C' },
  { label: 'Дата платежа', value: '17.09.2026 14:32' },
  { label: 'Номер карты', value: '4111 11** **** 1111' },
  { label: 'RRN', value: '526012345678' },
  { label: 'Получатель платежа', value: merchant.fullName },
  { label: 'Услуга', value: 'Yorix Premium на 30 дней' },
  { label: 'Сумма', value: '22,90 BYN' },
];

function Receipt({ title, subtitle, rows, qr }: { title: string; subtitle: string; rows: Row[]; qr?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#94A3B8] bg-white p-5 text-[13px] text-[#0F172A]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center text-4xl font-bold tracking-[0.3em] text-[#6366F1]/10 [transform:rotate(-24deg)]"
      >
        ОБРАЗЕЦ
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
            <span
              className={[0, 1, 4, 5, 7, 11, 12, 13, 15, 18, 20, 22, 23, 24].includes(index) ? 'bg-[#0F172A]' : ''}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SampleReceipt() {
  return (
    <figure className="mt-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Receipt title="Карт-чек" subtitle="подтверждение оплаты WEBPAY, приходит на e-mail" rows={cardReceipt} />
        <Receipt
          title="Чек"
          subtitle="приложение «Налог на профессиональный доход»"
          rows={taxReceipt}
          qr
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-[#64748B]">
        Образцы документов, подтверждающих оплату. Номера и данные карты условные. Сохраняйте карт-чеки для сверки с
        выпиской из карт-счёта.
      </figcaption>
    </figure>
  );
}
