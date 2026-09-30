import type { SubscriptionCopy } from './copy';
import type { Lang } from './i18n';

/**
 * Owner, 2026-09-30: while checkout runs on test cards the site sells with no
 * Apple ID — every plan is paid for on the owner's own account (the worker's
 * WEB_REVIEW_OPEN and WEB_REVIEW_UID). The worker stays the authority: it
 * reports `reviewOpen` in /v1/web/config and never opens this in prod, so the
 * checkout falls back to Apple sign-in there even if this flag is left on.
 * The flag shapes what the pages say. Turn both off together.
 */
export const REVIEW_OPEN = true;

const faqWithoutApple = (copy: SubscriptionCopy) =>
  copy.faq.items.filter((item) => !/Apple/.test(item.q) || /App Store/.test(item.q));

/** The same pages, with every «sign in with Apple» step taken out. */
export function withoutAppleSignIn(copy: SubscriptionCopy, lang: Lang): SubscriptionCopy {
  const ru = lang === 'ru';
  return {
    ...copy,
    plans: {
      ...copy.plans,
      steps: ru ? 'Выберите срок → оплата картой → подписка оформлена' : 'Pick a period → pay by card → done',
    },
    checkout: { ...copy.checkout, signingIn: copy.checkout.creating },
    faq: {
      ...copy.faq,
      items: faqWithoutApple(copy).map((item) =>
        /Активировать с Apple|Redeem with Apple/.test(item.a)
          ? {
              ...item,
              a: ru
                ? 'Откройте присланную ссылку или [введите код с открытки](/ru/gift) и нажмите «Активировать» — подписка включится сразу. Код действует 12 месяцев и срабатывает один раз.'
                : 'Open the link you were sent or [enter the code from the card](/gift) and press «Redeem» — the subscription turns on at once. The code is valid for 12 months and works once.',
            }
          : item,
      ),
    },
    ret: {
      ...copy.ret,
      openApp: ru ? 'Оплата прошла — подписка оформлена.' : 'Payment received — the subscription is on.',
    },
    gift: {
      ...copy.gift,
      steps: [
        copy.gift.steps[0],
        copy.gift.steps[1],
        ru ? 'Получатель откроет ссылку или введёт код — и подписка включится' : 'The recipient opens the link or enters the code — and the subscription turns on',
      ],
      shareSteps: [
        copy.gift.shareSteps[0],
        copy.gift.shareSteps[1],
        ru ? 'Нажмёт «Активировать» — и подписка включится сама.' : 'They press «Redeem» — the subscription turns itself on.',
      ],
      paidBody: ru
        ? 'Отправьте ссылку получателю или подарите открытку с кодом. Подписка включится, когда получатель откроет ссылку или введёт код.'
        : 'Send the link to the recipient or give them the card with the code. The subscription turns on once they open the link or enter the code.',
      redeemBody: ru ? 'Подписка уже ваша — остался один шаг: нажмите «Активировать».' : 'The subscription is yours — one step left: press «Redeem».',
      redeem: ru ? 'Активировать' : 'Redeem',
      openApp: ru ? 'Готово — подписка активирована.' : 'Done — the subscription is on.',
      entryBody: ru
        ? 'Введите код с открытки или из сообщения — подписка включится сразу.'
        : 'Enter the code from the card or the message — the subscription turns on at once.',
      shareText: (period) =>
        ru ? `Подарок для вас — подписка Yorix ${period}. Откройте ссылку — подписка включится сама.` : `A gift for you — a Yorix subscription ${period}. Open the link — the subscription turns on by itself.`,
    },
    terms: {
      ...copy.terms,
      signInNote: ru ? 'Подписка оформится сразу после оплаты — ничего вводить не нужно.' : 'It turns on right after payment — nothing to type in.',
      withApple: copy.terms.next,
    },
  };
}
