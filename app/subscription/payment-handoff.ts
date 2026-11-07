import type { CheckoutProvider } from './merchant';

export type PaymentHandoff = { redirectUrl?: string; postFields?: Record<string, string> };
const PAYMENT_PAGES = {
  webpay: { test: /^https:\/\/securesandbox\.webpay\.by\//, prod: /^https:\/\/payment\.webpay\.by\// },
  yookassa: { test: /^https:\/\/yoomoney\.ru\//, prod: /^https:\/\/yoomoney\.ru\// },
  yoomoney: { test: /$a/, prod: /^https:\/\/yoomoney\.ru\/quickpay\/confirm$/ },
};

export function validPaymentHandoff(body: PaymentHandoff, provider: CheckoutProvider, mode: string | undefined): boolean {
  if ((mode !== 'test' && mode !== 'prod') || !Object.hasOwn(PAYMENT_PAGES, provider)
    || typeof body.redirectUrl !== 'string' || !PAYMENT_PAGES[provider][mode].test(body.redirectUrl)) return false;
  if (provider !== 'yoomoney') return body.postFields === undefined;
  const fields = body.postFields;
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return false;
  const keys = ['receiver', 'quickpay-form', 'paymentType', 'sum', 'label', 'successURL'];
  if (Object.keys(fields).length !== keys.length || !keys.every(k => typeof fields[k] === 'string')) return false;
  if (!/^410\d{8,17}$/.test(fields.receiver) || fields['quickpay-form'] !== 'button' || fields.paymentType !== 'AC'
    || !/^\d{1,5}\.\d{2}$/.test(fields.sum) || Number(fields.sum) < 2 || Number(fields.sum) > 15000
    || !/^[A-Z0-9-]{1,64}$/.test(fields.label)) return false;
  try {
    const url = new URL(fields.successURL);
    return url.origin === window.location.origin && /^\/(?:ru\/)?subscription\/return$/.test(url.pathname)
      && url.searchParams.get('order') === fields.label;
  } catch { return false; }
}

export function submitPaymentHandoff(body: PaymentHandoff, provider: CheckoutProvider, mode: string | undefined): void {
  if (!validPaymentHandoff(body, provider, mode)) throw new Error('Invalid payment destination');
  if (!body.postFields) { window.location.assign(body.redirectUrl!); return; }
  const form = document.createElement('form');
  form.method = 'POST'; form.action = body.redirectUrl!; form.hidden = true;
  for (const [name, value] of Object.entries(body.postFields)) {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = name; input.value = value; form.appendChild(input);
  }
  document.body.appendChild(form);
  try { HTMLFormElement.prototype.submit.call(form); } finally { form.remove(); }
}
