import { headers } from 'next/headers';
import { DocumentPage } from '../DocumentPage';
import { currencyForVisitor, formatMoney, sellsOnWeb, type WebCurrency } from '../currency';
import { subscriptionPath, type Lang } from '../i18n';
import { ACQUIRER, acquirer, chargeFor, formatByn, listJoin, planCopy, plans } from '../merchant';
import { PaymentLogos } from '../PaymentLogos';
import { SampleReceipt } from '../SampleReceipt';
import { editionLabel } from './versions';
import { visitorCountry } from '../../visitor';

export const paymentTermsTitle = { ru: 'Оплата, доставка и возврат', en: 'Payment, delivery and refunds' } as const;

// The page lists one price per plan: the amount this visitor's card would
// actually be charged, in the currency their receipt will name. The site
// sells by card to Belarus and Russia; other countries buy in the App Store
// and do not see this payment page.
export async function PaymentTerms({ lang }: { lang: Lang }) {
  const requestHeaders = await headers();
  const visitor = currencyForVisitor(visitorCountry(requestHeaders), requestHeaders.get('accept-language'));
  const region: WebCurrency = sellsOnWeb(visitor) ? visitor : 'BYN';
  // Support is reached through the site's form; the address itself stays in the offer's requisites.
  const form = <a href={`${lang === 'ru' ? '/ru' : ''}/support#contact`}>{lang === 'ru' ? 'форму «Написать нам»' : 'the “Write to us” form'}</a>;
  const cards = listJoin(acquirer.cards[lang], lang);
  const wallets = acquirer.wallets[lang].length ? listJoin(acquirer.wallets[lang], lang) : null;
  const methodNote = acquirer.note?.[lang] ?? null;
  // Every mention of a bank on this page comes from here (merchant.ts ACQUIRER).
  const bank = acquirer.name[lang];
  const offer = subscriptionPath(lang, '/offer');
  const priceOf = (planId: (typeof plans)[number]['id']) => {
    const money = chargeFor(planId, region, ACQUIRER);
    return money.currency === 'BYN' ? formatByn(money.amount, lang, 'code') : formatMoney(money.amount, 'RUB', lang);
  };
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
          the AI sleep coach, analytics and daily recommendations. The provider and its business details are identified in the <a href={`${offer}#seller`}>public offer</a>.
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
          <li>The secure {bank} payment page opens: enter your card details and confirm the payment.</li>
          <li>Right after payment the subscription turns on automatically in the Yorix app on your account — no codes, no manual activation.</li>
        </ol>
        <p>
          A month or a year can be given as a gift: on the <a href={subscriptionPath(lang, '/gift')}>gift page</a> sign the card and pay the same way.
          No account is needed, only your e-mail: after payment you see a link, a code and a card with a QR code, they stay on the gift page in the
          browser you paid in, and the link and the code also arrive at your e-mail. Pass them to the recipient only: anyone who has the link or the code can redeem the gift, and if the link went astray the code can be replaced. The
          recipient opens the link or enters the code on the <a href="/gift">“Redeem a gift”</a> page and signs in with Apple. The code is valid
          for 12 months (clauses 5.7–5.10 of the offer).
        </p>

        <h2>Payment methods</h2>
        <p>
          Online payment through the{' '}
          <a href={acquirer.site} rel="noopener noreferrer" target="_blank">
            {bank}
          </a>{' '}
          system. Accepted cards: {cards}.{wallets ? ` Also accepted: ${wallets}.` : ''}
          {methodNote ? ` ${methodNote}` : ''}
        </p>
        {logos}

        <h2>Payment rules and security</h2>
        <blockquote>
          <p>
            The secure {bank} server establishes an encrypted connection over the TLS protocol and confidentially receives the client’s card data
            (card number, cardholder name, expiry date and the CVC/CVC2 security code).
          </p>
          <p>
            After paying with a bank card, keep the card receipts (payment confirmations) you receive to reconcile them with your card statement, so
            that the operations can be confirmed in case of a dispute.
          </p>
        </blockquote>
        <p>
          If the subscription has not turned on after payment, contact support through {form}. State the date and amount of the payment — we will check it and help.
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
          <li>if paid features remain unavailable, contact us through {form}; activation issues and refunds follow sections 5 and 7 of the offer.</li>
        </ul>

        <h2>Purchases billed through the App Store</h2>
        <p>
          Apple reviews and processes monetary refunds for subscriptions, programs and AI credits billed through the App Store. Yorix does not issue these refunds, approve or decline requests, or override Apple’s decision, and cannot guarantee the outcome or timing. Submit your request at <a href="https://reportaproblem.apple.com/">reportaproblem.apple.com</a>; if unavailable, contact <a href="https://getsupport.apple.com/">Apple Support</a>. Cancelling a subscription stops future renewal and does not itself refund a charge. Mandatory consumer rights remain unaffected.
        </p>
        <h2>Cancellation and refunds for Website purchases</h2>
        <blockquote>
          <p>When paying by bank card through the {bank} system, refunds are made to the same card that was used for the payment.</p>
        </blockquote>
        <p>There is no auto-renewal: the card is not saved, nothing is charged after the payment and there is nothing to cancel.</p>
        <ul>
          <li>before the subscription is switched on, an order can be cancelled at any time — we refund the full amount;</li>
          <li>
            statutory withdrawal rights, including the 14-day right where applicable, remain in full. Outside mandatory full-refund cases, early cancellation is refunded for unused full days (section 7 of the <a href={offer}>offer</a>);
          </li>
          <li>
            we refund in full if the subscription was not switched on, if a charge was mistaken or duplicated, or if the service did not work through our
            fault (clause 7.3 of the offer).
          </li>
        </ul>
        <p>
          To request a refund, write to us through {form} and state the date and amount of the payment. For operations made in error, attach the receipt or
          confirmation showing the wrong charge. Cash refunds are not made for card payments.
        </p>
        <p>
          Refunds use the original payment method and currency within 14 calendar days of the request, or sooner where mandatory law requires. The issuing bank determines when the credit appears on the statement.
        </p>

        <h2>Liability and force majeure</h2>
        <p>
          Liability follows section 11 of the <a href={offer}>offer</a>. If a bank, the payment system, sanctions or payment restrictions, an
          outage of the App Store or our providers prevents performance, a deadline may move only where applicable law permits; if they last more than 30 days, you may withdraw and get the price of the unused days back (section 12 of the
          offer). Your consumer rights stay in full.
        </p>

        <h2>Payment confirmation document</h2>
        <p>
          Keep the {bank} transaction confirmation and your order details. Purchase documents are provided as required by applicable law and can be requested through support. The example below is illustrative and is not a fiscal receipt.
        </p>
        <SampleReceipt lang={lang} region={region} />
      </DocumentPage>
    );
  }

  return (
    <DocumentPage lang={lang} page="/payment" title={paymentTermsTitle.ru} updated={editionLabel('payment', lang)}>
      <h2>Что вы покупаете</h2>
      <p>
        Подписка Yorix — доступ к платным функциям приложения Yorix для iPhone и iPad на выбранный срок: персональный прогноз сна, ИИ-коуч по сну,
        аналитика и ежедневные рекомендации. Исполнитель и его реквизиты указаны в <a href={`${offer}#seller`}>публичном договоре</a>.
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
        <li>Откроется защищённая платёжная страница {bank}: введите данные карты и подтвердите оплату.</li>
        <li>Сразу после оплаты подписка автоматически включится в приложении Yorix на вашем аккаунте — без кодов и ручной активации.</li>
      </ol>
      <p>
        Подписку на месяц или год можно подарить: на странице <a href={subscriptionPath(lang, '/gift')}>подарка</a> подпишите открытку и оплатите так
        же. Аккаунт не нужен, только ваша почта: после оплаты вы увидите ссылку, код и открытку с QR — они останутся на странице подарка в браузере, где вы
        платили, а ссылка и код придут вам на почту. Передайте их только получателю: активировать подарок может любой, у кого есть ссылка или код, а если ссылка ушла не туда, код можно заменить.
        Получатель открывает ссылку или вводит код на странице <a href="/ru/gift">«Активировать подарок»</a> и входит через Apple. Код действует
        12 месяцев (п. 5.7–5.10 оферты).
      </p>

      <h2>Способы оплаты</h2>
      <p>
        Оплата онлайн через систему{' '}
        <a href={acquirer.site} rel="noopener noreferrer" target="_blank">
          {bank}
        </a>
        . Принимаются карты {cards}.{wallets ? ` Также принимаются: ${wallets}.` : ''}
        {methodNote ? ` ${methodNote}` : ''}
      </p>
      {logos}

      <h2>Правила оплаты и безопасность платежей</h2>
      <blockquote>
        <p>
          Безопасный сервер {bank} устанавливает шифрованное соединение по защищённому протоколу TLS и конфиденциально принимает от клиента данные
          его платёжной карты (номер карты, имя держателя, дату окончания действия и контрольный номер банковской карточки CVC/CVC2).
        </p>
        <p>
          После совершения оплаты с использованием банковской карты необходимо сохранять полученные карт-чеки (подтверждения об оплате) для сверки с
          выпиской из карт-счёта (с целью подтверждения совершённых операций в случае возникновения спорных ситуаций).
        </p>
      </blockquote>
      <p>
        Если после оплаты подписка не включилась, обратитесь в службу поддержки через {form}. Укажите дату и сумму оплаты — мы проверим платёж и поможем.
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
        <li>если платные функции остаются недоступны, напишите нам через {form}; устранение проблем активации и возврат регулируются разделами 5 и 7 оферты.</li>
      </ul>

      <h2>Покупки через App Store</h2>
      <p>
        Денежные возвраты за подписки, программы и ИИ-кредиты, оплаченные через App Store, рассматривает и осуществляет Apple. Yorix не оформляет такие возвраты, не одобряет и не отклоняет запросы, не может изменить решение Apple и не гарантирует результат или срок возврата. Запрос направляется на <a href="https://reportaproblem.apple.com/">reportaproblem.apple.com</a>; если он недоступен, обратитесь в <a href="https://getsupport.apple.com/">поддержку Apple</a>. Отмена подписки прекращает будущее продление и сама по себе не возвращает оплату. Обязательные права потребителя сохраняются.
      </p>
      <h2>Отмена заказа и возврат оплаты на Сайте</h2>
      <blockquote>
        <p>
          При оплате банковской платёжной картой через систему {bank} возврат денежных средств осуществляется на ту же карточку, с которой была
          произведена оплата.
        </p>
      </blockquote>
      <p>Автопродления нет: карта не сохраняется, после оплаты списаний не будет, и отменять ничего не нужно.</p>
      <ul>
        <li>до включения подписки заказ можно отменить в любой момент — вернём всю сумму;</li>
        <li>
          законное право на отказ, в том числе 14-дневное право в применимых случаях, сохраняется. Вне обязательных случаев полного возврата при досрочном отказе возвращается стоимость неиспользованных полных суток (раздел 7 <a href={offer}>оферты</a>);
        </li>
        <li>полностью возвращаем, если подписка не была включена, списание было ошибочным или повторным либо услуга не работала по нашей вине (п. 7.3 оферты).</li>
      </ul>
      <p>
        Для возврата напишите нам через {form} и укажите дату и сумму оплаты. По операциям, проведённым с ошибками, приложите чек или подтверждение,
        показывающее ошибочное списание. Возврат наличными при оплате картой не производится.
      </p>
      <p>
        Возврат производится на исходное средство оплаты в валюте списания в течение 14 календарных дней после заявления, если закон не требует более короткого срока. Срок отражения возврата в выписке зависит от банка.
      </p>

      <h2>Ответственность и непреодолимая сила</h2>
      <p>
        Ответственность сторон — по разделу 11 <a href={offer}>оферты</a>. Если оплату, включение подписки или возврат задерживают обстоятельства
        непреодолимой силы, продление сроков допускается только в предусмотренных законом пределах; если они длятся больше 30 дней, вы вправе отказаться от договора и получить стоимость неиспользованных суток
        (раздел 12 оферты). Ваши права потребителя сохраняются в полном объёме.
      </p>

      <h2>Документ, подтверждающий оплату</h2>
      <p>
        Сохраняйте подтверждение операции {bank} и сведения о заказе. Документы о покупке предоставляются в соответствии с применимым законодательством; их можно запросить через поддержку. Ниже приведён условный пример подтверждения операции, а не фискальный чек.
      </p>
      <SampleReceipt lang={lang} region={region} />
    </DocumentPage>
  );
}
