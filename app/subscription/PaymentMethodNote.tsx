import type { Lang } from './i18n';
import { ACQUIRERS, type CheckoutProvider } from './merchant';

export function PaymentMethodNote({ provider, lang }: { provider: CheckoutProvider; lang: Lang }) {
  if (provider !== 'yoomoney') return null;
  return <p className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/80">{ACQUIRERS[provider].note?.[lang]}</p>;
}
