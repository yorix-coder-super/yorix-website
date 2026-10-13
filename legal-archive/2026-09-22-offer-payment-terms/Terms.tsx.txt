import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { sellsHere } from '../region';
import { LegalBody, type LegalSection } from './LegalBody';
import { sellerLine } from './SellerBlock';
import { editionLabel } from './versions';

export const termsTitle = { ru: 'Условия использования', en: 'Terms of use' } as const;

type Ctx = { seller: string; privacy: string; offer: string; web: boolean };

const appleEula = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

// The terms every app of this kind publishes (Napper's Terms of Service,
// Huckleberry's Terms of Use): what the service is and is not, the rules of
// use and the limits of liability. Only what the law already implies is
// promised; purchases stay with Apple's terms and, on the site, the offer.
function ru({ seller, privacy, offer, web }: Ctx): LegalSection[] {
  return [
    {
      title: '1. Общие положения',
      blocks: [
        `1.1. Эти условия определяют порядок использования мобильного приложения «Yorix» и сайта yorix-app.com (вместе — Сервис), которые предоставляет ${seller} (далее — «мы»). Устанавливая или используя Сервис, вы принимаете эти условия.`,
        `1.2. Покупки в App Store совершаются по правилам Apple, включая [стандартное лицензионное соглашение Apple](${appleEula}).${web ? ` Покупка подписки картой на сайте регулируется [публичным договором](${offer}).` : ''}`,
        `1.3. Как мы обрабатываем персональные данные, описано в [Политике обработки персональных данных](${privacy}).`,
      ],
    },
    {
      title: '2. Что такое Yorix',
      blocks: [
        '2.1. Yorix — информационный инструмент для родителей: дневник ухода за ребёнком, прогнозы сна, статьи и ИИ-коуч.',
        '2.2. **Yorix не является медицинской помощью.** Сервис не ставит диагнозы, не назначает лечение и не заменяет консультацию врача. Если жизни или здоровью ребёнка угрожает опасность, звоните в скорую помощь по номеру 103 или 112 либо по местному номеру экстренной службы.',
        '2.3. Прогнозы и ответы ИИ-коуча формируются автоматически и могут быть неточными. Решения об уходе за ребёнком принимаете вы.',
        '2.4. Мы можем изменять, добавлять и убирать функции Сервиса.',
      ],
    },
    {
      title: '3. Правила использования',
      blocks: [
        '3.1. Сервис предназначен для личного некоммерческого использования взрослыми.',
        '3.2. Нельзя нарушать работу Сервиса, обходить его защиту, автоматически собирать данные, передавать доступ третьим лицам и использовать Сервис с нарушением закона.',
        '3.3. При нарушении этих условий мы вправе ограничить или прекратить доступ к Сервису.',
      ],
    },
    {
      title: '4. Права на Сервис и ваши данные',
      blocks: [
        '4.1. Права на Сервис — приложение, сайт, тексты, иллюстрации, персонажей и алгоритмы — принадлежат нам или нашим правообладателям. Вы получаете личную непередаваемую лицензию на использование приложения на условиях Apple.',
        '4.2. Записи, которые вы вносите в дневник, принадлежат вам.',
      ],
    },
    {
      title: '5. Ответственность',
      blocks: [
        '5.1. Сервис предоставляется «как есть». В пределах, допускаемых законом, мы не отвечаем за косвенные убытки, за перерывы в работе, вызванные не зависящими от нас причинами, и за решения, принятые на основании сведений Сервиса без обращения к врачу.',
        '5.2. Эти ограничения не затрагивают прав потребителей, которые по закону нельзя ограничить.',
      ],
    },
    {
      title: '6. Изменение условий',
      blocks: ['6.1. Мы можем изменять эти условия. Новая редакция публикуется на этой странице с датой.'],
    },
    {
      title: '7. Применимое право и контакты',
      blocks: [
        '7.1. К условиям применяется право Республики Беларусь. Если вы потребитель из другой страны, это не лишает вас защиты, которую дают императивные нормы права страны вашего проживания.',
        '7.2. Вопросы об условиях направляйте через форму «Написать нам» на сайте yorix-app.com.',
      ],
    },
  ];
}

function en({ seller, privacy, offer, web }: Ctx): LegalSection[] {
  return [
    {
      title: '1. General',
      blocks: [
        `1.1. These terms govern the use of the Yorix mobile app and the yorix-app.com site (together, the “Service”) provided by ${seller} (“we”). By installing or using the Service you accept these terms.`,
        `1.2. App Store purchases follow Apple’s rules, including [Apple’s standard licence agreement](${appleEula}).${web ? ` Buying a subscription by card on the website is governed by the [public offer](${offer}).` : ''}`,
        `1.3. How we process personal data is described in the [Personal data policy](${privacy}).`,
      ],
    },
    {
      title: '2. What Yorix is',
      blocks: [
        '2.1. Yorix is an information tool for parents: a baby care diary, sleep forecasts, articles and an AI coach.',
        '2.2. **Yorix is not medical care.** The Service does not diagnose, prescribe treatment or replace a doctor’s advice. If a child’s life or health is at risk, call emergency services on 103 or 112, or your local emergency number.',
        '2.3. Forecasts and AI coach answers are generated automatically and may be inaccurate. You make the decisions about your child’s care.',
        '2.4. We may change, add and remove features of the Service.',
      ],
    },
    {
      title: '3. Rules of use',
      blocks: [
        '3.1. The Service is for personal, non-commercial use by adults.',
        '3.2. You may not disrupt the Service, circumvent its protection, scrape data automatically, share access with third parties or use the Service unlawfully.',
        '3.3. If these terms are breached, we may restrict or end access to the Service.',
      ],
    },
    {
      title: '4. Rights to the Service and your data',
      blocks: [
        '4.1. The rights to the Service — the app, the site, texts, illustrations, characters and algorithms — belong to us or our licensors. You receive a personal, non-transferable licence to use the app on Apple’s terms.',
        '4.2. The entries you make in the diary belong to you.',
      ],
    },
    {
      title: '5. Liability',
      blocks: [
        '5.1. The Service is provided “as is”. To the extent the law allows, we are not liable for indirect losses, for interruptions caused by circumstances beyond our control, or for decisions made on the basis of the Service without seeing a doctor.',
        '5.2. These limits do not affect consumer rights that cannot be limited by law.',
      ],
    },
    {
      title: '6. Changes to the terms',
      blocks: ['6.1. We may change these terms. A new edition is published on this page with its date.'],
    },
    {
      title: '7. Governing law and contact',
      blocks: [
        '7.1. These terms are governed by the law of the Republic of Belarus. If you are a consumer from another country, this does not deprive you of the protection of the mandatory rules of your country of residence.',
        '7.2. Questions about these terms: use the “Write to us” form on yorix-app.com.',
      ],
    },
  ];
}

export async function Terms({ lang }: { lang: Lang }) {
  const ctx: Ctx = {
    seller: sellerLine(lang),
    privacy: subscriptionPath(lang, '/privacy'),
    offer: subscriptionPath(lang, '/offer'),
    web: await sellsHere(),
  };
  return (
    <DocumentPage lang={lang} page="/terms" title={termsTitle[lang]} updated={editionLabel('terms', lang)}>
      <LegalBody sections={lang === 'ru' ? ru(ctx) : en(ctx)} />
    </DocumentPage>
  );
}
