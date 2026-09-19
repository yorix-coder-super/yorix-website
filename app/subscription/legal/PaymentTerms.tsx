import { headers } from 'next/headers';
import { DocumentPage } from '../DocumentPage';
import { currencyForVisitor, formatMoney } from '../currency';
import { subscriptionPath, type Lang } from '../i18n';
import { charges, formatByn, listJoin, merchant, planCopy, plans, prices } from '../merchant';
import { PaymentLogos } from '../PaymentLogos';
import { SampleReceipt } from '../SampleReceipt';
import { editionLabel } from './versions';

export const paymentTermsTitle = { ru: 'Оплата, доставка и возврат', en: 'Payment, delivery and refunds' } as const;

// The page lists the prices in the visitor's own currency only — roubles for
// Russia (with the amount the card is charged), Belarusian rubles for
// everyone else; the site sells by card to Belarus and Russia, other
// countries buy in the App Store.
export async function PaymentTerms({ lang }: { lang: Lang }) {
  const requestHeaders = await headers();
  const russia = currencyForVisitor(requestHeaders.get('cf-ipcountry'), requestHeaders.get('accept-language')) === 'RUB';
  const email = <a href={`mailto:${merchant.email}`}>{merchant.email}</a>;
  const cards = listJoin(merchant.cards[lang], lang);
  const offer = subscriptionPath(lang, '/offer');
  const priceOf = (planId: (typeof plans)[number]['id']) =>
    russia
      ? `${formatMoney(prices[planId].RUB, 'RUB', lang)} (${lang === 'ru' ? 'к списанию' : 'charged as'} ${formatByn(charges[planId].RUB, lang, 'code')})`
      : formatByn(prices[planId].BYN, lang, 'code');
  const planList = (
    <ul>
      {plans.map((plan) => (
        <li key={plan.id}>
          {lang === 'ru' ? `Подписка ${planCopy.ru[plan.id].forPeriod} (${planCopy.ru[plan.id].days})` : `Subscription ${planCopy.en[plan.id].forPeriod} (${planCopy.en[plan.id].days})`} —{' '}
          {priceOf(plan.id)}
        </li>
      ))}
    </ul>
  );
  const logos = (
    <div className="mt-4 rounded-2xl bg-[#1E1B4B] p-4">
      <PaymentLogos lang={lang} />
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
        <p>The payment is one-off; there is no automatic renewal and the card is not saved.</p>

        <h2>Order procedure</h2>
        <ol>
          <li>
            On the <a href={`${subscriptionPath(lang)}#plans`}>plans page</a>, choose a period and press “Subscribe”.
          </li>
          <li>
            Tick that you accept the <a href={offer}>public offer</a> and these terms, and press “Continue with Apple”: sign in with the Apple
            account you use in the Yorix app.
          </li>
          <li>The secure WEBPAY payment page opens: enter your card details and confirm the payment.</li>
          <li>Right after payment the subscription turns on automatically in the Yorix app on your account — no codes, no manual activation.</li>
        </ol>

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
          If the subscription has not turned on after payment, contact support at {email}
          {merchant.phone ? ` or by phone ${merchant.phone}` : ''}. State the date and amount of the payment — we will check it and help.
        </p>

        <h2>Receiving the service (delivery)</h2>
        <p>
          Nothing is shipped. The subscription turns on remotely in the Yorix app on your account right after payment. Delivery is free of charge.
        </p>
        <p>
          The period starts when the subscription is switched on. You need the Yorix app from the App Store on an iPhone or iPad with iOS 18 or later,
          signed in with the same Apple account.
        </p>

        <h2>Service control</h2>
        <ul>
          <li>restart the Yorix app if the paid features have not appeared yet;</li>
          <li>if the features have not opened within 3 days of payment, write to {email} — we will switch the subscription on or refund the payment.</li>
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
            costs (clause 7.2 of the <a href={offer}>offer</a>);
          </li>
          <li>
            we refund in full if the subscription was not switched on, if a charge was mistaken or duplicated, or if the service did not work through our
            fault (clause 7.3 of the offer).
          </li>
        </ul>
        <p>
          To request a refund, write to {email} and state the date and amount of the payment. For operations made in error, attach the receipt or
          confirmation showing the wrong charge. Cash refunds are not made for card payments.
        </p>
        <p>
          We make the refund within 10 days of receiving the request (7 days where the service had defects). The time until the money
          reaches the card depends on the issuing bank.
        </p>

        <h2>Payment confirmation document</h2>
        <p>
          Two documents confirm the payment: the WEBPAY card receipt confirming the card payment, and a receipt from the “Professional income
          tax” app confirming that the seller received the payment, which we send within the time set by tax law. Personal data in the samples is illustrative.
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
      <p>Платёж разовый: автоматического продления нет, карта не сохраняется.</p>

      <h2>Процедура оформления заказа</h2>
      <ol>
        <li>
          На странице <a href={`${subscriptionPath(lang)}#plans`}>тарифов</a> выберите срок и нажмите «Оформить».
        </li>
        <li>
          Отметьте, что принимаете <a href={offer}>публичный договор</a> и эти условия, и нажмите «Продолжить с Apple»: войдите тем же аккаунтом
          Apple, что и в приложении Yorix.
        </li>
        <li>Откроется защищённая платёжная страница WEBPAY: введите данные карты и подтвердите оплату.</li>
        <li>Сразу после оплаты подписка автоматически включится в приложении Yorix на вашем аккаунте — без кодов и ручной активации.</li>
      </ol>

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
        Если после оплаты подписка не включилась, обратитесь в службу поддержки по e-mail {email}
        {merchant.phone ? ` или по телефону ${merchant.phone}` : ''}. Укажите дату и сумму оплаты — мы проверим платёж и поможем.
      </p>

      <h2>Получение услуги (доставка)</h2>
      <p>
        Физической доставки нет. Подписка включается удалённо в приложении Yorix на вашем аккаунте сразу после оплаты. Стоимость доставки не
        взимается.
      </p>
      <p>
        Срок подписки начинается с момента включения. Для работы нужны приложение Yorix из App Store на iPhone или iPad с iOS 18 и новее и вход тем же
        аккаунтом Apple.
      </p>

      <h2>Контроль оказания услуги</h2>
      <ul>
        <li>если функции подписки ещё не появились, перезапустите приложение Yorix;</li>
        <li>если функции подписки не открылись в течение 3 дней после оплаты, напишите на {email} — мы включим подписку или вернём деньги.</li>
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
          фактических расходов (п. 7.2 <a href={offer}>оферты</a>);
        </li>
        <li>полностью возвращаем, если подписка не была включена, списание было ошибочным или повторным либо услуга не работала по нашей вине (п. 7.3 оферты).</li>
      </ul>
      <p>
        Для возврата напишите на {email} и укажите дату и сумму оплаты. По операциям, проведённым с ошибками, приложите чек или подтверждение,
        показывающее ошибочное списание. Возврат наличными при оплате картой не производится.
      </p>
      <p>
        Мы возвращаем деньги в течение 10 дней после получения заявления (при недостатках услуги — в течение 7 дней). Срок поступления денег на карту
        зависит от банка, выпустившего карту.
      </p>

      <h2>Документ, подтверждающий оплату</h2>
      <p>
        Оплату подтверждают два документа: карт-чек WEBPAY — подтверждение оплаты картой, и чек из приложения «Налог на профессиональный
        доход» — документ, подтверждающий получение оплаты продавцом; его направляем в срок, установленный налоговым законодательством. Персональные данные в образцах условные.
      </p>
      <SampleReceipt lang={lang} />
    </DocumentPage>
  );
}
