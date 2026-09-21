'use client';

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from 'react';
import { useAccount } from '../account';
import { subscriptionCopy } from '../copy';
import { formatDate, type Lang } from '../i18n';
import { planCopy, type PlanId } from '../merchant';
import { Reveal } from '../Reveal';
import { Button, Spinner } from '../ui';
import { giftCardImage, saveBlob, type CardImageText } from './cardImage';
import { giftUrl, redeemPageUrl } from './code';
import { GiftCardView } from './GiftCardView';

// A gift as its buyer sees it (the worker's publicGift with the code).
export type BuyerGift = {
  code: string;
  planId: PlanId;
  to: string | null;
  message: string | null;
  status: 'active' | 'redeemed' | 'cancelled' | 'expired' | 'replaced';
  expiresAt: string;
  redeemedAt: string | null;
};

type Notice = 'cardError';

export function GiftStatus({ gift, lang }: { gift: BuyerGift; lang: Lang }) {
  const status = subscriptionCopy[lang].gift.status;
  const label =
    gift.status === 'active' ? status.active(formatDate(gift.expiresAt, lang))
    : gift.status === 'redeemed' ? status.redeemed(formatDate(gift.redeemedAt ?? gift.expiresAt, lang))
    : status[gift.status];
  const tone =
    gift.status === 'active' ? 'bg-[#FDE68A]/15 text-[#FDE68A]'
    : gift.status === 'redeemed' ? 'bg-[#A7F3D0]/15 text-[#A7F3D0]'
    : 'bg-white/10 text-white/70';
  return <p className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>{label}</p>;
}

const noSubscription = () => () => {};

function canShareFiles(): boolean {
  try {
    return typeof navigator !== 'undefined' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [new File([''], 'card.png', { type: 'image/png' })] });
  } catch {
    return false;
  }
}

// What the buyer passes on while the gift waits: the card (a picture with the
// QR code, sent straight into a messenger), the link, the code, and the way
// out when the link went astray. `giftKey` is the order's key on this device.
export function GiftShare({ gift, compact = false }: { gift: BuyerGift; compact?: boolean }) {
  const { lang } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<'card' | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  // Known in the browser only; the server renders the copy-first layout.
  const shareFiles = useSyncExternalStore(noSubscription, canShareFiles, () => false);
  const card = useRef<{ code: string; blob: Promise<Blob> } | null>(null);
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const code = gift.code;
  const url = giftUrl(origin, code);
  const period = planCopy[lang][gift.planId]?.forPeriod ?? '';
  const support = `${lang === 'ru' ? '/ru' : ''}/support#contact`;
  const link = 'font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white';
  const fileName = `yorix-gift-${code}.png`;

  const cardText: CardImageText = {
    eyebrow: text.eyebrow,
    title: gift.to ? text.cardFor(gift.to) : text.redeemTitle,
    message: gift.message ?? '',
    period: text.cardPlan(period),
    codeLabel: text.code,
    scan: text.cardScan,
    or: text.cardOr(redeemPageUrl(origin, lang).replace(/^https?:\/\//, '')),
    validUntil: text.validUntil(formatDate(gift.expiresAt, lang)),
  };
  // Drawn ahead of the tap: a share sheet opens only while the tap is fresh.
  const cardBlob = () => {
    if (card.current?.code !== code) card.current = { code, blob: giftCardImage({ code, url, text: cardText }) };
    return card.current.blob;
  };
  const warmCard = useEffectEvent(() => {
    if (gift.status === 'active') cardBlob().catch(() => {});
  });
  useEffect(() => warmCard(), [code, gift.status]);

  const sendCard = async () => {
    if (busy) return;
    setBusy('card');
    setNotice(null);
    try {
      const blob = await cardBlob();
      const file = new File([blob], fileName, { type: 'image/png' });
      if (shareFiles && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text.shareText(period)} ${url}` });
      } else {
        saveBlob(blob, fileName);
      }
    } catch (error) {
      // Closing the share sheet is not a failure.
      if ((error as { name?: string })?.name !== 'AbortError') setNotice('cardError');
    }
    setBusy(null);
  };

  const downloadCard = async () => {
    if (busy) return;
    setBusy('card');
    setNotice(null);
    try {
      saveBlob(await cardBlob(), fileName);
    } catch {
      setNotice('cardError');
    }
    setBusy(null);
  };

  if (gift.status !== 'active') return <GiftStatus gift={gift} lang={lang} />;

  const actions = (
    <div className="grid gap-3">
      {shareFiles ? (
        <Button disabled={busy === 'card'} onClick={() => void sendCard()} variant="light">
          {busy === 'card' ? <Spinner className="h-5 w-5" /> : null}
          {text.shareCard}
        </Button>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          onClick={() => {
            void navigator.clipboard?.writeText(url).then(() => setCopied(true));
          }}
          variant={shareFiles ? 'ghost' : 'light'}
        >
          {copied ? text.copied : text.copyLink}
        </Button>
        <Button disabled={busy === 'card'} onClick={() => void downloadCard()} variant="ghost">
          {!shareFiles && busy === 'card' ? <Spinner className="h-5 w-5" /> : null}
          {text.cardDownload}
        </Button>
      </div>
    </div>
  );

  // The ticket: what to dictate down a phone when sending the link is not an
  // option. The link itself is behind the copy button — spelled out it is a
  // wall of characters nobody reads or types.
  const ticket = (
    <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.04] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45">{text.code}</p>
      <p className="mt-1 break-all font-mono text-xl font-semibold tracking-[0.18em] text-white sm:text-2xl">{code}</p>
    </div>
  );

  const alert = notice ? (
    <p className="enter-rise rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
      {text.cardError}
    </p>
  ) : null;

  /**
   * In a list every gift is one card among several, and the card's own header
   * already names the plan and who it is for — so the picture, the numbered
   * steps and the warning (printed once for the whole page) would only repeat
   * themselves and push the buttons off the card.
   */
  if (compact) {
    return (
      <div className="grid gap-4 text-start">
        <GiftStatus gift={gift} lang={lang} />
        {actions}
        {ticket}
        {alert}
      </div>
    );
  }

  return (
    <div className="grid gap-6 text-start lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
      {/* What they made, exactly as the recipient will see it. */}
      <Reveal animation="zoomIn" delay={80} load="visible">
        <GiftCardView eyebrow={cardText.eyebrow} message={gift.message ?? ''} period={cardText.period} title={cardText.title} />
        <div className="mt-5 flex justify-center lg:justify-start">
          <GiftStatus gift={gift} lang={lang} />
        </div>
      </Reveal>

      <Reveal delay={200} load="visible">
        <div className="spotlight rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#A78BFA]">{text.shareTitle}</p>
          <ol className="mt-4 grid gap-3">
            {text.shareSteps.map((step, index) => (
              <li className="flex items-start gap-3 text-sm leading-6 text-white/80" key={step}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-6">{actions}</div>
          <div className="mt-6">{ticket}</div>
          {alert ? <div className="mt-4">{alert}</div> : null}
        </div>
      </Reveal>

      {/* The quiet half: what the link and the code are worth. */}
      <Reveal delay={320} load="visible" className="lg:col-span-2">
        <p className="max-w-3xl border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
          {text.safety[0]}
          <a className={link} href={support}>
            {text.safety[1]}
          </a>
          {text.safety[2]}
        </p>
      </Reveal>
    </div>
  );
}
