import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { formatMoney, type Currency } from '../currency';
import { charges, formatByn, listJoin, merchant, planCopy, plans, prices } from '../merchant';
import { PaymentLogos } from '../PaymentLogos';
import { SampleReceipt } from '../SampleReceipt';
import { editionLabel } from './versions';

export const paymentTermsTitle = { ru: 'Оплата, доставка и возврат', en: 'Payment, delivery and refunds' } as const;

export function PaymentTerms({ lang }: { lang: Lang }) {
  const email = <a href={`mailto:${merchant.email}`}>{merchant.email}</a>;
  const cards = listJoin(merchant.cards, lang);
  const planList = (
    <ul>
      {plans.map((plan) => (
        <li key={plan.id}>
          {lang === 'ru' ? `Подписка ${planCopy.ru[plan.id].forPeriod} (${planCopy.ru[plan.id].days})` : `Subscription ${planCopy.en[plan.id].forPeriod} (${planCopy.en[plan.id].days})`} —{' '}
          {formatByn(plan.priceByn, lang, 'code')}
        </li>
      ))}
    </ul>
  );
  const regions: { currency: Currency; label: Record<Lang, string> }[] = [
    { currency: 'EUR', label: { ru: 'Европа — базовая цена', en: 'Europe — base price' } },
    { currency: 'BYN', label: { ru: 'Беларусь', en: 'Belarus' } },
    { currency: 'RUB', label: { ru: 'Россия', en: 'Russia' } },
    { currency: 'USD', label: { ru: 'Другие страны', en: 'Other countries' } },
  ];
  const priceTable = (
    <div className="legal-table">
      <table>
        <thead>
          <tr>
            <th>{lang === 'ru' ? 'Регион покупателя' : 'Buyer’s region'}</th>
            {plans.map((plan) => (
              <th key={plan.id}>{planCopy[lang][plan.id].days}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.currency}>
              <td>{region.label[lang]}</td>
              {plans.map((plan) => (
                <td data-label={planCopy[lang][plan.id].days} key={plan.id}>
                  <strong>{formatByn(charges[plan.id][region.currency], lang, 'code')}</strong>
                  {region.currency === 'BYN' ? null : <> ({formatMoney(prices[plan.id][region.currency], region.currency, lang)})</>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const logos = (
    <div className="mt-4 rounded-2xl bg-[#1E1B4B] p-4">
      <PaymentLogos />
    </div>
  );

  if (lang === 'en') {
    return (
      <DocumentPage lang={lang} page="/payment" title={paymentTermsTitle.en} updated={editionLabel('payment', lang)}>
        <h2>What you buy</h2>
        <p>
          A Yorix subscription is access to the paid features of the Yorix app for iPhone and iPad for a chosen period: the personal sleep forecast,
          the AI sleep coach, analytics and daily recommendations. The service is provided by {merchant.fullName} ({merchant.latinName}),{' '}
          {merchant.status.en.toLowerCase()}, {merchant.country.en}.
        </p>
        {planList}
        <p>Prices are in Belarusian rubles. The payment is one-off; there is no automatic renewal.</p>

        <h2>Prices for different regions</h2>
        <p>
          The price depends on the buyer’s region, which the site detects from the connection country and the browser language. The contract price is the
          amount in Belarusian rubles charged to the card; the price in the local currency in brackets is for reference, and the amount in the card’s currency is
          set by the card-issuing bank.
        </p>
        {priceTable}
        <p>
          The prices for Belarus, Russia and other countries are discounts for categories of consumers by location, set by the seller’s decision of
          18 September 2026 (Article 396(2) of the Civil Code of the Republic of Belarus). A price is fixed at the moment of payment.
        </p>

        <h2>Order procedure</h2>
        <ol>
          <li>
            On the <a href={`${subscriptionPath(lang)}#plans`}>plans page</a>, sign in with the Apple ID or Google account you use in the Yorix app. The subscription is
            tied to that account.
          </li>
          <li>Choose a period and press “Pay”. We create the order and open the secure payment page of the WebPay processing system.</li>
          <li>Enter your bank card details on the WebPay page and confirm the payment with the “Pay” button.</li>
          <li>Right after payment the subscription is switched on for your account; a confirmation with the end date and a receipt are sent by e-mail.</li>
        </ol>
        <p>
          If payment on the site is unavailable, write to {email}, stating the period and your account code (shown after signing in on the site and in the
          app under Settings → Account). We reply with a payment link to the same WebPay page, and switch the subscription on within 24 hours of payment.
        </p>

        <h2>Payment methods</h2>
        <p>
          Online payment by bank card through the{' '}
          <a href="https://www.webpay.by" rel="noopener noreferrer" target="_blank">
            WEBPAY
          </a>{' '}
          system. Accepted cards: {cards}. There are no other payment methods.
        </p>
        {logos}

        <h2>Payment rules and security</h2>
        <blockquote>
          <p>
            The secure WEBPAY server establishes an encrypted connection over the TLS protocol and confidentially receives the client’s card data
            (card number, cardholder name, expiry date and the CVC/CVC2 security code).
          </p>
          <p>
            After paying with a bank card, keep the card receipts (payment confirmations) you receive to reconcile them with your card statement, so
            that the operations can be confirmed in case of a dispute.
          </p>
        </blockquote>
        <p>
          If the subscription is not switched on, or no confirmation e-mail arrives after payment, contact support at {email}
          {merchant.phone ? ` or by phone ${merchant.phone}` : ''}. State the date and amount of the payment — we will check it and help.
        </p>

        <h2>Receiving the service (delivery)</h2>
        <p>
          Nothing is shipped. The subscription is switched on remotely for your Yorix account: immediately after paying on the site, or within 24 hours for an
          e-mail order. Delivery is free of charge.
        </p>
        <p>
          The period starts when the subscription is switched on. You need the Yorix app from the App Store on an iPhone or iPad with iOS 18 or later and to be
          signed in to your Yorix account.
        </p>

        <h2>Service control</h2>
        <ul>
          <li>after the subscription is switched on, we send an e-mail with the start and end dates of the period;</li>
          <li>the subscription features become available in the Yorix app — restart the app if needed;</li>
          <li>
            if the features have not opened within 24 hours of payment, write to {email} — we will switch the subscription on or refund the payment.
          </li>
        </ul>

        <h2>Cancellation and refunds</h2>
        <blockquote>
          <p>When paying by bank card through the WEBPAY system, refunds are made to the same card that was used for the payment.</p>
        </blockquote>
        <p>There is no auto-renewal: the card is not saved, nothing is charged after the payment and there is nothing to cancel.</p>
        <ul>
          <li>before the subscription is switched on, an order can be cancelled at any time — we refund the full amount;</li>
          <li>
            after it is switched on you may withdraw at any time: we refund the price of the unused full days of the period, less our documented actual
            costs (clause 7.2 of the <a href={subscriptionPath(lang, '/offer')}>offer</a>);
          </li>
          <li>
            we refund in full if the subscription was not switched on, if a charge was mistaken or duplicated, or if the service did not work through our
            fault (clause 7.3 of the offer);
          </li>
          <li>consumers in the EU, EEA and UK also have a 14-day right of withdrawal (Annex 1 to the offer).</li>
        </ul>
        <p>
          To request a refund, write to {email} from the account’s e-mail address and state the order number, date and amount of the payment. For operations
          made in error, attach the receipt or confirmation showing the wrong charge. Cash refunds are not made for card payments.
        </p>
        <p>
          We make the refund within 7 days of receiving the request (for consumers in Russia — within 10 days at the latest). The time until the money
          reaches the card depends on the issuing bank.
        </p>

        <h2>Payment confirmation document</h2>
        <p>
          After payment you receive two documents: the WEBPAY card receipt confirming the card payment, and a receipt from the “Professional income
          tax” app confirming that the seller received the payment. Personal data in the samples is illustrative.
        </p>
        <SampleReceipt lang={lang} />
      </DocumentPage>
    );
  }

  return (
    <DocumentPage lang={lang} page="/payment" title={paymentTermsTitle.ru} updated={editionLabel('payment', lang)}>
      <h2>Что вы покупаете</h2>
      <p>
        Подписка Yorix — доступ к платным функциям приложения Yorix для iPhone и iPad на выбранный срок: персональный прогноз сна, ИИ-коуч по сну,
        аналитика и ежедневные рекомендации. Услугу оказывает {merchant.fullName}, {merchant.status.ru.toLowerCase()}, {merchant.country.ru}.
      </p>
      {planList}
      <p>Цены указаны в белорусских рублях. Платёж разовый, автоматического продления нет.</p>

      <h2>Цены для разных регионов</h2>
      <p>
        Цена зависит от региона покупателя, который сайт определяет по стране подключения и языку браузера. Цена договора — сумма в белорусских рублях,
        которая списывается с карты; цена в местной валюте в скобках справочная, а сумму в валюте карты определяет банк, выпустивший карту.
      </p>
      {priceTable}
      <p>
        Цены для Беларуси, России и других стран — льготы для категорий потребителей по месту нахождения, установленные решением продавца от
        18 сентября 2026 г. (п. 2 ст. 396 Гражданского кодекса Республики Беларусь). Цена фиксируется в момент оплаты.
      </p>

      <h2>Процедура оформления заказа</h2>
      <ol>
        <li>
          На странице <a href={`${subscriptionPath(lang)}#plans`}>тарифов</a> войдите с тем Apple ID или аккаунтом Google, которым вы пользуетесь в
          приложении Yorix. Подписка привязывается к этому аккаунту.
        </li>
        <li>Выберите срок и нажмите «Оплатить». Мы создадим заказ и откроем защищённую платёжную страницу процессинговой системы WebPay.</li>
        <li>Введите данные банковской карты на странице WebPay и подтвердите платёж, нажав кнопку «Оплатить».</li>
        <li>Сразу после оплаты подписка включается на вашем аккаунте; письмо с датой окончания срока и чек приходят на e-mail.</li>
      </ol>
      <p>
        Если оплата на сайте недоступна, напишите на {email}, указав срок и код аккаунта (он показан после входа на сайте и в приложении в разделе
        «Настройки → Аккаунт»). В ответ мы пришлём ссылку на ту же платёжную страницу WebPay, а после оплаты включим подписку в течение 24 часов.
      </p>

      <h2>Способы оплаты</h2>
      <p>
        Оплата банковской платёжной картой онлайн через систему{' '}
        <a href="https://www.webpay.by" rel="noopener noreferrer" target="_blank">
          WEBPAY
        </a>
        . Принимаются карты {cards}. Других способов оплаты нет.
      </p>
      {logos}

      <h2>Правила оплаты и безопасность платежей</h2>
      <blockquote>
        <p>
          Безопасный сервер WEBPAY устанавливает шифрованное соединение по защищённому протоколу TLS и конфиденциально принимает от клиента данные
          его платёжной карты (номер карты, имя держателя, дату окончания действия и контрольный номер банковской карточки CVC/CVC2).
        </p>
        <p>
          После совершения оплаты с использованием банковской карты необходимо сохранять полученные карт-чеки (подтверждения об оплате) для сверки с
          выпиской из карт-счёта (с целью подтверждения совершённых операций в случае возникновения спорных ситуаций).
        </p>
      </blockquote>
      <p>
        Если подписка не включена, в том числе после оплаты не пришло письмо-подтверждение, обратитесь в службу поддержки по e-mail {email}
        {merchant.phone ? ` или по телефону ${merchant.phone}` : ''}. Укажите дату и сумму оплаты — мы проверим платёж и поможем.
      </p>

      <h2>Получение услуги (доставка)</h2>
      <p>
        Физической доставки нет. Подписка включается удалённо на вашем аккаунте Yorix: сразу после оплаты на сайте или в течение 24 часов после оплаты
        по заказу письмом. Стоимость доставки не взимается.
      </p>
      <p>
        Срок подписки начинается с момента включения. Для работы нужны приложение Yorix из App Store на iPhone или iPad с iOS 18 и новее и вход в
        аккаунт Yorix.
      </p>

      <h2>Контроль оказания услуги</h2>
      <ul>
        <li>после включения подписки мы присылаем письмо с датой начала и окончания срока;</li>
        <li>в приложении Yorix становятся доступны функции подписки — при необходимости перезапустите приложение;</li>
        <li>если функции подписки не открылись в течение 24 часов после оплаты, напишите на {email} — мы включим подписку или вернём деньги.</li>
      </ul>

      <h2>Отмена заказа и возврат денежных средств</h2>
      <blockquote>
        <p>
          При оплате банковской платёжной картой через систему WEBPAY возврат денежных средств осуществляется на ту же карточку, с которой была
          произведена оплата.
        </p>
      </blockquote>
      <p>Автопродления нет: карта не сохраняется, после оплаты списаний не будет, и отменять ничего не нужно.</p>
      <ul>
        <li>до включения подписки заказ можно отменить в любой момент — вернём всю сумму;</li>
        <li>
          после включения от подписки можно отказаться в любой момент: вернём стоимость неиспользованных полных суток срока за вычетом подтверждённых
          фактических расходов (п. 7.2 <a href={subscriptionPath(lang, '/offer')}>оферты</a>);
        </li>
        <li>полностью возвращаем, если подписка не была включена, списание было ошибочным или повторным либо услуга не работала по нашей вине (п. 7.3 оферты);</li>
        <li>у потребителей из ЕС, ЕЭЗ и Великобритании есть также 14-дневное право отказа (Приложение 1 к оферте).</li>
      </ul>
      <p>
        Для возврата напишите на {email} с адреса электронной почты аккаунта и укажите номер заказа, дату и сумму оплаты. По операциям, проведённым с
        ошибками, приложите чек или подтверждение, показывающее ошибочное списание. Возврат наличными при оплате картой не производится.
      </p>
      <p>
        Мы возвращаем деньги в течение 7 дней после получения заявления (потребителям из России — не позднее 10 дней). Срок поступления денег на карту
        зависит от банка, выпустившего карту.
      </p>

      <h2>Документ, подтверждающий оплату</h2>
      <p>
        После оплаты вы получаете два документа: карт-чек WEBPAY — подтверждение оплаты картой, и чек из приложения «Налог на профессиональный
        доход» — документ, подтверждающий получение оплаты продавцом. Персональные данные в образцах условные.
      </p>
      <SampleReceipt lang={lang} />
    </DocumentPage>
  );
}
