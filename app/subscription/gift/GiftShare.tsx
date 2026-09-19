'use client';

import { useState } from 'react';
import { useAccount } from '../account';
import { API_BASE } from '../config';
import { subscriptionCopy } from '../copy';
import { formatDate, type Lang } from '../i18n';
import { planCopy, type PlanId } from '../merchant';
import { Button, Spinner } from '../ui';
import { downloadGiftCard } from './cardImage';
import { codeFromInput, giftUrl, redeemPageUrl } from './code';

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

// What the buyer passes on while the gift waits: the link (copy, share), the
// code, a card to print, and the way out when the link went astray.
export function GiftShare({ gift, onReplaced }: { gift: BuyerGift; onReplaced: (next: BuyerGift) => void }) {
  const { lang, getToken } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<'replace' | 'card' | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const code = gift.code;
  const url = giftUrl(origin, lang, codeFromInput(code));
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const period = planCopy[lang][gift.planId]?.forPeriod ?? '';
  const support = `${lang === 'ru' ? '/ru' : ''}/support#contact`;
  const link = 'font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white';

  const replace = async () => {
    if (busy || !window.confirm(text.replaceConfirm)) return;
    setBusy('replace');
    setNotice(null);
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/v1/web/gifts/${encodeURIComponent(code)}/replace`, {
        method: 'POST',
        headers: token ? { 'X-Firebase-Token': token } : {},
      });
      if (res.ok) {
        onReplaced((await res.json()) as BuyerGift);
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

  const card = async () => {
    if (busy) return;
    setBusy('card');
    setNotice(null);
    try {
      const host = redeemPageUrl(origin, lang).replace(/^https?:\/\//, '');
      await downloadGiftCard({
        code,
        url,
        text: {
          eyebrow: text.eyebrow,
          title: gift.to ? text.cardFor(gift.to) : text.redeemTitle,
          message: gift.message ?? '',
          period: text.cardPlan(period),
          codeLabel: text.code,
          scan: text.cardScan,
          or: text.cardOr(host),
          validUntil: text.validUntil(formatDate(gift.expiresAt, lang)),
        },
      });
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
        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            void navigator.clipboard?.writeText(url).then(() => setCopied(true));
          }}
          variant="light"
        >
          {copied ? text.copied : text.copyLink}
        </Button>
        {canShare ? (
          <Button className="w-full sm:w-auto" onClick={() => void navigator.share({ title: text.eyebrow, text: text.shareText(period), url }).catch(() => {})} variant="ghost">
            {text.share}
          </Button>
        ) : null}
        <Button className="w-full sm:w-auto" disabled={busy === 'card'} onClick={() => void card()} variant="ghost">
          {busy === 'card' ? <Spinner className="h-5 w-5" /> : null}
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
