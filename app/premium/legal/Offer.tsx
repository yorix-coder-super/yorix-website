import { DocumentPage } from '../DocumentPage';
import { premiumPath, type Lang } from '../i18n';
import { formatByn, merchant, planCopy, plans } from '../merchant';

export const offerTitle = { ru: 'Публичный договор (оферта)', en: 'Public offer agreement' } as const;
export const offerUpdated = { ru: '17 сентября 2026 г.', en: '17 September 2026' } as const;

function Seller({ lang }: { lang: Lang }) {
  return (
    <p>
      {lang === 'ru' ? merchant.fullName : `${merchant.fullName} (${merchant.latinName})`}
      <br />
      {merchant.status[lang]}
      {merchant.unp ? (
        <>
          <br />
          {lang === 'ru' ? 'УНП' : 'Taxpayer number (УНП)'} {merchant.unp}
        </>
      ) : null}
      <br />
      {[merchant.country[lang], merchant.postalAddress].filter(Boolean).join(', ')}
      <br />
      E-mail: <a href={`mailto:${merchant.email}`}>{merchant.email}</a>
      {merchant.phone ? (
        <>
          <br />
          {lang === 'ru' ? 'Телефон' : 'Phone'}: {merchant.phone}
        </>
      ) : null}
    </p>
  );
}

export function Offer({ lang }: { lang: Lang }) {
  const priceList = (
    <ul>
      {plans.map((plan) => (
        <li key={plan.id}>
          {lang === 'ru' ? `на ${planCopy.ru[plan.id].days}` : `for ${planCopy.en[plan.id].days}`} — {formatByn(plan.priceByn, lang, 'code')}
        </li>
      ))}
    </ul>
  );
  const payment = premiumPath(lang, '/oplata');
  const privacy = premiumPath(lang, '/konfidencialnost');

  if (lang === 'en') {
    return (
      <DocumentPage lang={lang} page="/oferta" title={offerTitle.en} updated={offerUpdated.en}>
        <h2>1. General</h2>
        <p>
          1.1. This document is a public offer by {merchant.fullName} ({merchant.latinName}), {merchant.status.en.toLowerCase()}, {merchant.country.en}
          {merchant.unp ? `, taxpayer number ${merchant.unp}` : ''} (the Provider), addressed to any individual (the Customer), to conclude an agreement on
          a Yorix Subscription on the terms below.
        </p>
        <p>
          1.2. The agreement is concluded when the order is paid (acceptance of the offer) under Article 408(3) of the Civil Code of the Republic of
          Belarus. By paying, the Customer confirms having read and accepted these terms, the payment and refund rules and the personal data policy.
        </p>
        <h2>2. Definitions</h2>
        <p>2.1. App — the Yorix mobile app for iPhone and iPad, distributed through the App Store.</p>
        <p>2.2. Account — the Customer’s account in the App, created by signing in with Apple or Google; on the website it is identified by the same sign-in.</p>
        <p>
          2.3. Subscription — the paid features of the App for a chosen Period: the personal sleep forecast, the AI sleep coach, analytics and daily
          recommendations. Programs from the “Programs” section are not part of the Subscription.
        </p>
        <p>2.4. Period — the length of the Subscription: 7, 30 or 365 calendar days.</p>
        <h2>3. Subject</h2>
        <p>3.1. The Provider grants the Customer the Subscription on the Account for the chosen Period, and the Customer pays for it.</p>
        <p>3.2. The service is provided remotely over the Internet. No physical media are delivered.</p>
        <h2>4. Price and payment</h2>
        <p>4.1. Price of access:</p>
        {priceList}
        <p>
          4.2. Prices are in Belarusian rubles. Payment is made by bank card through the WEBPAY system on a payment page opened from the website after
          signing in to the Account, or by a payment link the Provider sends by e-mail. The order procedure is described on the{' '}
          <a href={payment}>“Payment, delivery and refunds”</a> page.
        </p>
        <p>4.3. The payment is one-off. No automatic charges or renewals are made. To extend access the Customer places a new order.</p>
        <p>4.4. The payment confirmation document is the receipt issued by the Provider in the “Professional income tax” app and sent to the Customer by e-mail.</p>
        <h2>5. Provision of the service</h2>
        <p>5.1. The Provider switches the Subscription on for the Account immediately after the payment is received, and no later than 24 hours after it.</p>
        <p>5.2. The Period runs from the moment the Subscription is switched on. The Provider informs the Customer of the end date by e-mail.</p>
        <p>5.3. The service is deemed duly provided when the Subscription features are available on the Customer’s Account during the Period.</p>
        <p>5.4. When the Period ends, the Subscription stops; it does not renew and nothing is charged. The data the Customer entered in the App is kept.</p>
        <h2>6. Rights and obligations</h2>
        <p>6.1. The Provider shall:</p>
        <ul>
          <li>switch the Subscription on within the time stated in clause 5.1;</li>
          <li>keep the Subscription features available during the Period, except for the interruptions described in clause 8.2;</li>
          <li>answer the Customer’s requests sent to {merchant.email}.</li>
        </ul>
        <p>6.2. The Customer shall:</p>
        <ul>
          <li>sign in with the Account that is to receive the Subscription;</li>
          <li>not hand the Account to third parties in order to resell the Subscription.</li>
        </ul>
        <p>6.3. The Provider may change and develop the App’s features while keeping the essential purpose of the Subscription.</p>
        <h2>7. Withdrawal and refunds</h2>
        <p>
          7.1. Before the Subscription is switched on, the Customer may withdraw from the agreement at any time and the full amount is refunded. After
          the Subscription is switched on, the paid Period is not refunded, except in the cases provided for by the legislation of the Republic of
          Belarus.
        </p>
        <p>7.2. If the Subscription was unavailable through the Provider’s fault, the Customer may claim a refund for the unavailable time or a proportional extension.</p>
        <p>
          7.3. Refunds go to the bank card used for the payment. The procedure and timing are described on the <a href={payment}>“Payment, delivery and refunds”</a> page.
        </p>
        <h2>8. Liability</h2>
        <p>8.1. The App helps parents with the child’s daily routine and is not a medical service. Its recommendations do not replace a doctor’s advice.</p>
        <p>
          8.2. The Provider is not liable for interruptions caused by Apple, telecom operators, Internet outages or force majeure, but takes reasonable
          steps to resolve them.
        </p>
        <p>8.3. The parties are liable under the law of the Republic of Belarus, including the Law “On Consumer Protection”.</p>
        <h2>9. Personal data</h2>
        <p>
          9.1. The Provider processes the Customer’s personal data to perform the agreement, as described in the <a href={privacy}>personal data policy</a>.
        </p>
        <h2>10. Disputes</h2>
        <p>10.1. Claims are sent to {merchant.email} and considered within the time set by consumer protection law.</p>
        <p>10.2. Disputes not settled by claim are resolved in court under the law of the Republic of Belarus.</p>
        <h2>11. Term and changes</h2>
        <p>
          11.1. The offer is valid from its publication at yorix.website/premium/oferta until withdrawn. Changes do not apply to orders paid before they
          were published.
        </p>
        <h2>12. Provider</h2>
        <Seller lang={lang} />
      </DocumentPage>
    );
  }

  return (
    <DocumentPage lang={lang} page="/oferta" title={offerTitle.ru} updated={offerUpdated.ru}>
      <h2>1. Общие положения</h2>
      <p>
        1.1. Настоящий документ является публичной офертой {merchant.fullName}, {merchant.status.ru.toLowerCase()}, {merchant.country.ru}
        {merchant.unp ? `, УНП ${merchant.unp}` : ''} (далее — Исполнитель), адресованной любому физическому лицу (далее — Заказчик), заключить договор на
        предоставление Подписки Yorix на условиях, изложенных ниже.
      </p>
      <p>
        1.2. Договор считается заключённым с момента оплаты заказа (акцепта оферты) в соответствии с пунктом 3 статьи 408 Гражданского кодекса
        Республики Беларусь. Оплачивая заказ, Заказчик подтверждает, что ознакомился и согласен с условиями договора, правилами оплаты и возврата и
        политикой обработки персональных данных.
      </p>
      <h2>2. Термины</h2>
      <p>2.1. Приложение — мобильное приложение Yorix для iPhone и iPad, распространяемое через App Store.</p>
      <p>2.2. Аккаунт — учётная запись Заказчика в Приложении, созданная при входе через Apple или Google; на сайте определяется тем же входом.</p>
      <p>
        2.3. Подписка — доступ к платным функциям Приложения на выбранный Срок: персональный прогноз сна, ИИ-коуч по сну, аналитика и ежедневные
        рекомендации. Отдельные программы из раздела «Программы» в Подписку не входят.
      </p>
      <p>2.4. Срок — период действия Подписки: 7, 30 или 365 календарных дней.</p>
      <h2>3. Предмет договора</h2>
      <p>3.1. Исполнитель предоставляет Заказчику Подписку на Аккаунте на выбранный Срок, а Заказчик оплачивает её.</p>
      <p>3.2. Услуга оказывается дистанционно, через сеть Интернет. Физические носители не передаются.</p>
      <h2>4. Стоимость и порядок оплаты</h2>
      <p>4.1. Стоимость доступа:</p>
      {priceList}
      <p>
        4.2. Цены указаны в белорусских рублях. Оплата производится банковской платёжной картой через систему WEBPAY на платёжной странице, которая
        открывается с сайта после входа в Аккаунт, либо по ссылке, которую Исполнитель направляет Заказчику по e-mail. Порядок оформления заказа
        описан на странице <a href={payment}>«Оплата, доставка и возврат»</a>.
      </p>
      <p>4.3. Платёж разовый. Автоматическое списание и продление не производятся. Для продления Заказчик оформляет новый заказ.</p>
      <p>
        4.4. Документом, подтверждающим оплату, является чек, сформированный Исполнителем в приложении «Налог на профессиональный доход» и
        направленный Заказчику по e-mail.
      </p>
      <h2>5. Порядок оказания услуги</h2>
      <p>5.1. Исполнитель включает Подписку на Аккаунте Заказчика сразу после поступления оплаты и не позднее 24 часов после него.</p>
      <p>5.2. Срок исчисляется с момента включения Подписки. Дату окончания Срока Исполнитель сообщает Заказчику по e-mail.</p>
      <p>5.3. Услуга считается оказанной надлежащим образом, если в течение Срока функции Подписки доступны на Аккаунте Заказчика.</p>
      <p>5.4. По окончании Срока Подписка прекращается; она не продлевается, и оплата не списывается. Данные, внесённые Заказчиком в Приложение, сохраняются.</p>
      <h2>6. Права и обязанности сторон</h2>
      <p>6.1. Исполнитель обязуется:</p>
      <ul>
        <li>включить Подписку в срок, указанный в пункте 5.1;</li>
        <li>обеспечивать доступ к функциям Подписки в течение Срока, за исключением перерывов, указанных в пункте 8.2;</li>
        <li>отвечать на обращения Заказчика по e-mail {merchant.email}.</li>
      </ul>
      <p>6.2. Заказчик обязуется:</p>
      <ul>
        <li>входить с тем Аккаунтом, на котором должна быть включена Подписка;</li>
        <li>не передавать доступ к Аккаунту третьим лицам с целью перепродажи Подписки.</li>
      </ul>
      <p>6.3. Исполнитель вправе изменять и развивать функции Приложения, сохраняя основное назначение Подписки.</p>
      <h2>7. Отказ от договора и возврат</h2>
      <p>
        7.1. До включения Подписки Заказчик вправе отказаться от договора в любое время — уплаченная сумма возвращается полностью. После включения
        Подписки оплаченный Срок не возвращается, за исключением случаев, предусмотренных законодательством Республики Беларусь.
      </p>
      <p>7.2. Если Подписка была недоступна по вине Исполнителя, Заказчик вправе потребовать возврата стоимости периода недоступности или соразмерного продления Срока.</p>
      <p>
        7.3. Возврат производится на банковскую карту, с которой была произведена оплата. Порядок и сроки возврата указаны на странице{' '}
        <a href={payment}>«Оплата, доставка и возврат»</a>.
      </p>
      <h2>8. Ответственность</h2>
      <p>8.1. Приложение помогает родителям с режимом дня ребёнка и не является медицинской услугой. Рекомендации Приложения не заменяют консультацию врача.</p>
      <p>
        8.2. Исполнитель не отвечает за перерывы в работе, вызванные действиями Apple, операторов связи, сбоями сети Интернет или обстоятельствами
        непреодолимой силы, но принимает разумные меры для их устранения.
      </p>
      <p>8.3. Стороны несут ответственность в соответствии с законодательством Республики Беларусь, в том числе Законом Республики Беларусь «О защите прав потребителей».</p>
      <h2>9. Персональные данные</h2>
      <p>
        9.1. Исполнитель обрабатывает персональные данные Заказчика в целях исполнения договора в соответствии с{' '}
        <a href={privacy}>политикой обработки персональных данных</a>.
      </p>
      <h2>10. Разрешение споров</h2>
      <p>10.1. Претензии направляются на e-mail {merchant.email} и рассматриваются в сроки, установленные законодательством о защите прав потребителей.</p>
      <p>10.2. Споры, не урегулированные в претензионном порядке, разрешаются в суде по законодательству Республики Беларусь.</p>
      <h2>11. Срок действия и изменение оферты</h2>
      <p>
        11.1. Оферта действует с даты публикации на странице yorix.website/premium/oferta до её отзыва. Изменения не распространяются на заказы,
        оплаченные до их публикации.
      </p>
      <h2>12. Исполнитель</h2>
      <Seller lang={lang} />
    </DocumentPage>
  );
}
