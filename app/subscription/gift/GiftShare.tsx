'use client';

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from 'react';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { formatDate, type Lang } from '../i18n';
import { planCopy, type PlanId } from '../merchant';
import { Button, Spinner } from '../ui';
import { giftCardImage, saveBlob, type CardImageText } from './cardImage';
import { giftUrl, redeemPageUrl } from './code';
import { rememberCode } from './keys';

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

type Notice = 'replaced' | 'redeemed' | 'rateLimited' | 'error' | 'cardError';

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
export function GiftShare({
  gift,
  giftKey,
  order,
  onReplaced,
}: {
  gift: BuyerGift;
  giftKey?: string | null;
  order?: string;
  onReplaced: (next: BuyerGift) => void;
}) {
  const { lang, getToken } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<'replace' | 'card' | null>(null);
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

  const replace = async () => {
    if (busy || !window.confirm(text.replaceConfirm)) return;
    setBusy('replace');
    setNotice(null);
    try {
      const token = giftKey ? null : await getToken();
      const res = await fetch(`${API_BASE}/v1/web/gifts/${encodeURIComponent(code)}/replace`, {
        method: 'POST',
        headers: giftKey ? { 'X-Gift-Key': giftKey } : token ? { 'X-Firebase-Token': token } : {},
      });
      if (res.ok) {
        const next = (await res.json()) as BuyerGift;
        if (order) rememberCode(order, next.code);
        onReplaced(next);
        setCopied(false);
        setNotice('replaced');
      } else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setNotice(body.error === 'gift_redeemed' ? 'redeemed' : res.status === 429 ? 'rateLimited' : 'error');
      }
    } catch {
      setNotice('error');
    }
    setBusy(null);
  };

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

  return (
    <div className="grid gap-3 text-start">
      <GiftStatus gift={gift} lang={lang} />
      <div>
        <p className="text-sm font-semibold text-white/70">{text.link}</p>
        <p className="mt-1 break-all rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 font-mono text-sm text-white">{url}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {shareFiles ? (
          <Button className="w-full sm:w-auto" disabled={busy === 'card'} onClick={() => void sendCard()} variant="light">
            {busy === 'card' ? <Spinner className="h-5 w-5" /> : null}
            {text.shareCard}
          </Button>
        ) : null}
        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            void navigator.clipboard?.writeText(url).then(() => setCopied(true));
          }}
          variant={shareFiles ? 'ghost' : 'light'}
        >
          {copied ? text.copied : text.copyLink}
        </Button>
        <Button className="w-full sm:w-auto" disabled={busy === 'card'} onClick={() => void downloadCard()} variant="ghost">
          {!shareFiles && busy === 'card' ? <Spinner className="h-5 w-5" /> : null}
          {text.cardDownload}
        </Button>
      </div>
      <p className="text-sm text-white/70">
        {text.code}: <span className="font-mono text-base font-semibold tracking-wider text-white">{code}</span>
      </p>
      <p className="text-xs leading-5 text-white/55">
        {text.safety[0]}
        <a className={link} href={support}>
          {text.safety[1]}
        </a>
        {text.safety[2]}
      </p>
      <div>
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-2 hover:decoration-white disabled:opacity-60"
          disabled={busy === 'replace'}
          onClick={() => void replace()}
          type="button"
        >
          {busy === 'replace' ? <Spinner className="h-4 w-4" /> : null}
          {text.replace}
        </button>
      </div>
      {notice ? (
        <p className={`rounded-2xl px-4 py-3 text-sm ${notice === 'replaced' ? 'bg-[#A7F3D0]/10 text-[#D1FAE5]' : 'bg-[#FDE68A]/15 text-[#FDE68A]'}`} role={notice === 'replaced' ? 'status' : 'alert'}>
          {notice === 'replaced' ? text.replaceDone
            : notice === 'redeemed' ? text.errors.redeemed
            : notice === 'rateLimited' ? text.errors.rateLimited
            : notice === 'cardError' ? text.cardError
            : text.errors.error}
        </p>
      ) : null}
    </div>
  );
}
