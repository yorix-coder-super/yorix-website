import { DocumentPage } from '../DocumentPage';
import { subscriptionPath, type Lang } from '../i18n';
import { formatByn, listJoin, merchant, planCopy, plans } from '../merchant';
import { PaymentLogos } from '../PaymentLogos';
import { SampleReceipt } from '../SampleReceipt';

export const paymentTermsTitle = { ru: 'Оплата, доставка и возврат', en: 'Payment, delivery and refunds' } as const;
export const paymentTermsUpdated = { ru: '17 сентября 2026 г.', en: '17 September 2026' } as const;

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
  const logos = (
    <div className="mt-4 rounded-2xl bg-[#1E1B4B] p-4">
      <PaymentLogos />
    </div>
  );

  if (lang === 'en') {
    return (
      <DocumentPage lang={lang} page="/oplata" title={paymentTermsTitle.en} updated={paymentTermsUpdated.en}>
        <h2>What you buy</h2>
        <p>
          A Yorix subscription is access to the paid features of the Yorix app for iPhone and iPad for a chosen period: the personal sleep forecast,
          the AI sleep coach, analytics and daily recommendations. The service is provided by {merchant.fullName} ({merchant.latinName}),{' '}
          {merchant.status.en.toLowerCase()}, {merchant.country.en}.
        </p>
        {planList}
        <p>Prices are in Belarusian rubles. The payment is one-off; there is no automatic renewal.</p>

        <h2>Order procedure</h2>
        <ol>
          <li>
            On the <a href={`${subscriptionPath(lang)}#tarify`}>plans page</a>, sign in with the Apple ID or Google account you use in the Yorix app. The subscription is
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
        <p>There is no auto-renewal: nothing is charged after the payment and there is nothing to cancel. The paid period runs to its end.</p>
        <ul>
          <li>before the subscription is switched on, an order can be cancelled at any time — write to us and we refund the full amount;</li>
          <li>
            after the subscription is switched on, the paid period is not refunded, except in the cases provided for by law — the same rule as for an
            App Store subscription;
          </li>
          <li>
            if the subscription did not work through our fault, we refund the period during which the features were unavailable, or extend the
            subscription — your choice;
          </li>
          <li>a mistaken or duplicate charge is refunded in full.</li>
        </ul>
        <p>
          To request a refund, write to {email} from the address used for the order and state the date and amount of the payment. For operations made in
          error, attach the receipt or confirmation showing the wrong charge. Cash refunds are not made for card payments.
        </p>
        <p>
          We process a refund within 7 calendar days of the request. The time until the money reaches the card depends on the issuing bank and is
          usually up to 7 calendar days.
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
    <DocumentPage lang={lang} page="/oplata" title={paymentTermsTitle.ru} updated={paymentTermsUpdated.ru}>
      <h2>Что вы покупаете</h2>
      <p>
        Подписка Yorix — доступ к платным функциям приложения Yorix для iPhone и iPad на выбранный срок: персональный прогноз сна, ИИ-коуч по сну,
        аналитика и ежедневные рекомендации. Услугу оказывает {merchant.fullName}, {merchant.status.ru.toLowerCase()}, {merchant.country.ru}.
      </p>
      {planList}
      <p>Цены указаны в белорусских рублях. Платёж разовый, автоматического продления нет.</p>

      <h2>Процедура оформления заказа</h2>
      <ol>
        <li>
          На странице <a href={`${subscriptionPath(lang)}#tarify`}>тарифов</a> войдите с тем Apple ID или аккаунтом Google, которым вы пользуетесь в
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
      <p>Автопродления нет: после оплаты списаний не будет, и отменять ничего не нужно. Оплаченный срок действует до конца.</p>
      <ul>
        <li>до включения подписки заказ можно отменить в любой момент: напишите нам, и мы вернём всю сумму;</li>
        <li>
          после включения подписки оплаченный срок не возвращается, за исключением случаев, предусмотренных законодательством, — так же, как при
          подписке в App Store;
        </li>
        <li>если подписка не работала по нашей вине, вернём стоимость периода, когда функции были недоступны, или продлим срок — на ваш выбор;</li>
        <li>ошибочное или повторное списание возвращаем полностью.</li>
      </ul>
      <p>
        Для возврата напишите на {email} с того адреса, с которого оформляли заказ, и укажите дату и сумму оплаты. По операциям, проведённым с
        ошибками, приложите чек или подтверждение, показывающее ошибочное списание. Возврат наличными при оплате картой не производится.
      </p>
      <p>
        Мы оформляем возврат в течение 7 календарных дней после обращения. Срок поступления денег на карту зависит от банка, выпустившего карту, и
        обычно составляет до 7 календарных дней.
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
