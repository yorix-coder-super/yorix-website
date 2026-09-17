import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CreditCard,
  LockKeyhole,
  Mail,
  MessageCircle,
  ReceiptText,
  RotateCcw,
  Smartphone,
  Sparkles,
  Sun,
} from 'lucide-react';
import type { Metadata } from 'next';
import { CopyButton } from './CopyButton';
import { MoonPhase } from './MoonPhase';
import { PaymentLogos } from './PaymentLogos';
import { MerchantRequisites, PremiumShell, documentLinks } from './PremiumShell';
import { formatByn, mailtoOrder, merchant, orderTemplate, perMonth, perWeek, plans, roundByn } from './merchant';

export const metadata: Metadata = {
  title: 'Yorix Premium — тарифы и оплата картой',
  description:
    'Yorix Premium на неделю, месяц или год: персональный план сна, ИИ-коуч и аналитика. Цены в белорусских рублях, оплата картой через WebPay.',
  alternates: { canonical: '/premium' },
  openGraph: {
    title: 'Yorix Premium — тарифы и оплата картой',
    description: 'Персональный план сна, ИИ-коуч и аналитика. Оплата картой через WebPay.',
    url: '/premium',
    type: 'website',
    locale: 'ru_RU',
  },
};

const features = [
  {
    icon: Sparkles,
    title: 'Персональный прогноз сна',
    body: 'Следующий дневной сон и отбой рассчитываются по реальным снам, окнам бодрствования и возрасту малыша и пересчитываются, когда день идёт не по плану.',
  },
  {
    icon: MessageCircle,
    title: 'ИИ-коуч по сну 24/7',
    body: 'Ответы на вопросы о коротких снах, ночных пробуждениях, переходах между снами и режиме — с учётом дневника вашего малыша.',
  },
  {
    icon: BarChart3,
    title: 'Аналитика и тренды',
    body: 'Недельная картина сна, кормлений и ухода: как меняется ночной сон, сколько длятся окна бодрствования, что влияет на отбой.',
  },
  {
    icon: Sun,
    title: 'Рекомендации на каждый день',
    body: 'Короткие подсказки на сегодня: когда начинать укладывание, как восстановиться после короткого сна, что поменять в ритуале.',
  },
];

const steps = [
  {
    icon: Mail,
    title: 'Выберите срок и напишите нам',
    body: `Кнопка «Заказать» открывает готовое письмо на ${merchant.email}. Допишите Apple ID, с которым вы вошли в Yorix через Apple.`,
  },
  {
    icon: CreditCard,
    title: 'Получите ссылку на оплату',
    body: `${capitalize(merchant.activationWindow)} мы ответим с адреса ${merchant.email} и пришлём ссылку на защищённую платёжную страницу WebPay с суммой заказа.`,
  },
  {
    icon: LockKeyhole,
    title: 'Оплатите картой',
    body: 'Введите данные карты на странице WebPay и подтвердите платёж. Данные карты получает только WebPay — мы их не видим и не храним.',
  },
  {
    icon: ReceiptText,
    title: 'Premium включится на аккаунте',
    body: `${capitalize(merchant.activationWindow)} после оплаты включим Premium и пришлём письмо с датой окончания срока и чеком.`,
  },
];

function listJoin(items: string[]) {
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} и ${items[items.length - 1]}` : items.join('');
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const faqs = [
  {
    question: 'Premium продлится автоматически?',
    answer:
      'Нет. Каждый тариф — разовый платёж за выбранный срок, карта не привязывается. Когда срок закончится, Premium отключится, а все записи о малыше останутся в приложении. Продлить можно новым заказом.',
  },
  {
    question: 'С какого момента считается срок?',
    answer:
      'С момента, когда мы включили Premium на вашем аккаунте. Дату окончания пишем в письме-подтверждении.',
  },
  {
    question: 'Какой e-mail указать в заказе?',
    answer:
      'Apple ID, с которым вы вошли в Yorix через Apple. Если вход не выполнен, войдите в приложении: «Настройки → Аккаунт → Войти». Premium привязывается к аккаунту, а не к телефону. Не уверены, какой адрес указать, — напишите, поможем найти аккаунт.',
  },
  {
    question: 'Как убедиться, что ссылка на оплату настоящая?',
    answer: `Мы пишем только с адреса ${merchant.email}, а ссылка ведёт на платёжную страницу WebPay в домене webpay.by. Мы никогда не просим прислать данные карты в письме или мессенджере.`,
  },
  {
    question: 'Какие карты принимаются?',
    answer: `${listJoin(merchant.cards)} — банковской картой через систему WebPay. Других способов оплаты нет. Цена указана в белорусских рублях; если счёт карты в другой валюте, сумму пересчитает ваш банк по своему курсу.`,
  },
  {
    question: 'У меня уже есть подписка на Premium в App Store. Что делать?',
    answer:
      'Premium, купленный на сайте, не отменяет подписку Apple. Чтобы не платить дважды, отключите автопродление в настройках iPhone: «Настройки → ваше имя → Подписки». Подписка Apple будет работать до конца оплаченного периода.',
  },
  {
    question: 'Письмо со ссылкой не пришло. Что делать?',
    answer: `Проверьте папку «Спам» и «Промоакции». Если письма нет дольше суток, напишите ещё раз на ${merchant.email} — ответим в первую очередь.`,
  },
  {
    question: 'Можно ли вернуть деньги?',
    answer:
      'Да. До включения Premium вернём всю сумму. Если откажетесь позже, вернём стоимость неиспользованных дней. Например, Premium на год за 109 BYN, отказ через 30 дней: 109 ÷ 365 × 335 ≈ 100,04 BYN. Деньги возвращаются на карту, с которой была оплата.',
  },
  {
    question: 'Входят ли в Premium программы из раздела «Программы»?',
    answer: 'Нет. Программы покупаются отдельно и в Premium не входят.',
  },
];

export default function PremiumPage() {
  const week = plans[0];

  return (
    <PremiumShell>
      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20">
        <div className="relative z-20 min-w-0">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-[#C7D2FE] backdrop-blur-xl">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Yorix Premium · оплата банковской картой
          </p>
          <h1 className="max-w-2xl text-[2.35rem] font-semibold leading-[1.06] text-white sm:text-6xl">
            Режим сна малыша, который подстраивается под ваш день.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Premium открывает в приложении Yorix персональный прогноз сна, ИИ-коуча и аналитику. Выберите срок — неделю,
            месяц или год, — оплатите картой через WebPay, и мы включим Premium на вашем аккаунте.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#6366F1] px-7 text-base font-semibold text-white shadow-[0_22px_55px_rgb(99_102_241/34%)] transition hover:bg-[#4F46E5] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#818CF8]/40"
              href="#tarify"
            >
              Выбрать тариф от {formatByn(week.priceByn)}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 text-base font-semibold text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
              href="#kak-kupit"
            >
              Как проходит покупка
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2 text-sm text-white/70">
            <li className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Разовый платёж, без автопродления
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              Premium на аккаунте {merchant.activationWindow}
            </li>
          </ul>
        </div>
        <div className="relative z-10 mx-auto hidden h-[560px] w-full max-w-[460px] sm:block">
          <div className="absolute inset-x-6 bottom-10 top-16 rounded-full bg-[#6366F1]/25 blur-3xl" />
          <img
            src="/screen-coach.png"
            alt="ИИ-коуч по сну в приложении Yorix"
            className="absolute left-0 top-16 z-10 w-[46%] rotate-[-6deg] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
            width="1206"
            height="2622"
          />
          <img
            src="/screen-plan.png"
            alt="План дня с прогнозом снов в приложении Yorix"
            className="absolute right-0 top-0 z-20 w-[54%] rounded-[2rem] shadow-[0_34px_90px_rgb(0_0_0/42%)] ring-1 ring-white/15"
            width="1206"
            height="2622"
            fetchPriority="high"
          />
        </div>
      </section>

      <section id="tarify" className="relative mx-auto max-w-6xl scroll-mt-6 px-5 py-14 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Тарифы</p>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Один Premium — три срока.</h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Возможности одинаковые, отличаются срок и цена. Цены в белорусских рублях.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
          {plans.map((plan) => {
            const featured = plan.id === 'year';
            const month = plans[1];
            const weekly = formatByn(roundByn(perWeek(plan)));
            const anchor =
              plan.id === 'week'
                ? `${formatByn(plan.priceByn)} за 7 дней`
                : plan.id === 'month'
                  ? `≈ ${weekly} в неделю · на ${Math.round((1 - perWeek(plan) / perWeek(week)) * 100)}% дешевле недели`
                  : `≈ ${weekly} в неделю · ≈ ${formatByn(roundByn(perMonth(plan)))} в месяц · на ${Math.round((1 - perMonth(plan) / perMonth(month)) * 100)}% дешевле месяца`;
            return (
              <article
                className={`relative flex flex-col rounded-[1.75rem] border p-6 backdrop-blur-xl ${
                  featured
                    ? 'order-first border-[#FDE68A]/50 bg-white/[0.14] shadow-[0_28px_80px_rgb(99_102_241/30%)] md:order-none md:-mt-3 md:mb-3'
                    : 'border-white/10 bg-white/[0.07] md:mt-3'
                }`}
                key={plan.id}
              >
                {featured ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#FDE68A] px-3 py-1 text-xs font-bold text-[#1E1B4B]">
                    Выгоднее всего
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Premium на {plan.accusative}</h3>
                    <p className="mt-1 text-sm text-white/55">Доступ на {plan.period}</p>
                  </div>
                  <MoonPhase plan={plan.id} className="h-14 w-14 shrink-0" />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">{plan.useCase}</p>
                <p className="mt-6 text-4xl font-semibold tabular-nums text-white">{formatByn(plan.priceByn)}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">{anchor}</p>
                <a
                  className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition focus:outline-none focus-visible:ring-4 ${
                    featured
                      ? 'bg-white text-[#1E1B4B] hover:bg-[#EEF2FF] focus-visible:ring-white/30'
                      : 'border border-white/15 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/25'
                  }`}
                  href={mailtoOrder(plan)}
                >
                  Заказать за {formatByn(plan.priceByn)}
                </a>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm leading-6 text-white/60">
          Во всех тарифах — полный Premium. Разовый платёж без автопродления, срок начинается с включения Premium на
          аккаунте. Оплачивая заказ, вы принимаете{' '}
          <a className="text-white underline decoration-white/30 hover:decoration-white" href="/premium/oferta">
            публичный договор
          </a>{' '}
          и{' '}
          <a className="text-white underline decoration-white/30 hover:decoration-white" href="/premium/oplata">
            условия возврата
          </a>
          .
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Что входит</p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Что откроется в приложении.</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Premium превращает дневник сна, кормлений и ухода в план на сегодня: прогноз, коуч и аналитика в одном
              приложении.
            </p>
            <p className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/55">
              <Smartphone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              Для iPhone и iPad с iOS 18 и новее. Premium привязывается к аккаунту Yorix и работает на всех устройствах, где
              выполнен вход.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl" key={feature.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{feature.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="kak-kupit" className="relative scroll-mt-6 border-y border-white/10 bg-[#161628]/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Как купить</p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Четыре шага от заказа до Premium.
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-6" key={step.title}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#6366F1] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <Icon className="h-5 w-5 text-[#C7D2FE]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{step.body}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 grid gap-6 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-3 text-sm leading-6 text-white/65">
              <p className="text-base text-white">
                Почта не открывается по кнопке? Напишите на{' '}
                <a className="font-semibold underline decoration-white/30 hover:decoration-white" href={mailtoOrder()}>
                  {merchant.email}
                </a>{' '}
                с любого ящика — шаблон письма можно скопировать.
              </p>
              <p className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-[#C7D2FE]" aria-hidden="true" />
                {merchant.hours}. {merchant.hoursNote}. Если ответа нет дольше суток, проверьте «Спам» и напишите ещё раз.
              </p>
              <p>
                Пока заказ оформляется письмом: так мы точно включим Premium на том аккаунте, с которым вы входите в
                приложение.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              <CopyButton label="Скопировать адрес" value={merchant.email} />
              <CopyButton label="Скопировать шаблон" value={orderTemplate()} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl lg:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Оплата</p>
            <h2 className="text-3xl font-semibold leading-tight text-white">Банковской картой через WebPay.</h2>
            <p className="mt-4 text-base leading-7 text-white/65">
              Оплата проходит на защищённой странице процессинговой системы{' '}
              <a className="text-white underline decoration-white/30 hover:decoration-white" href="https://www.webpay.by" rel="noopener noreferrer" target="_blank">
                WebPay
              </a>
              . Соединение шифруется по протоколу TLS, данные карты получает только WebPay. Сохраняйте карт-чек после оплаты
              для сверки с выпиской по карт-счёту.
            </p>
            <div className="mt-6">
              <PaymentLogos />
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Возврат</p>
            <h2 className="text-2xl font-semibold leading-tight text-white">На ту же карту.</h2>
            <p className="mt-4 text-base leading-7 text-white/65">
              Если Premium не был активирован, вернём всю сумму. Условия возврата, доставки и образец чека — на отдельной
              странице.
            </p>
            <a className="mt-5 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 hover:decoration-white" href="/premium/oplata">
              Оплата, доставка и возврат
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section id="voprosy" className="relative mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <p className="mb-3 text-center text-sm font-semibold uppercase text-[#A78BFA]">Вопросы</p>
        <h2 className="text-center text-4xl font-semibold text-white sm:text-5xl">Частые вопросы об оплате.</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((faq) => (
            <details className="group rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl open:bg-white/10" key={faq.question}>
              <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:hidden focus:outline-none focus-visible:underline">
                {faq.question}
              </summary>
              <p className="mt-3 text-base leading-7 text-white/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="kontakty" className="relative mx-auto max-w-6xl scroll-mt-6 px-5 pb-20 pt-10 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#A78BFA]">Контакты</p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Продавец и поддержка.</h2>
            <p className="mt-4 text-base leading-7 text-white/65">
              Если вы оплатили заказ, но Premium не появился, напишите нам — укажите дату оплаты и e-mail, с которым
              входите в Yorix.
            </p>
            <ul className="mt-6 grid gap-2 text-sm">
              {documentLinks.map((link) => (
                <li key={link.href}>
                  <a className="text-white/75 underline decoration-white/25 hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <MerchantRequisites />
        </div>
      </section>
    </PremiumShell>
  );
}
