import type { Lang } from './i18n';
import { ReturnStatusPanel } from './ReturnStatus';
import { SubscriptionShell } from './SubscriptionShell';

export function ReturnPage({ lang }: { lang: Lang }) {
  return (
    <SubscriptionShell lang={lang} page="/return">
      <ReturnStatusPanel lang={lang} />
    </SubscriptionShell>
  );
}
