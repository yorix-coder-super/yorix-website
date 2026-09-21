import { ar } from './redeemCopy.ar';
import { cs } from './redeemCopy.cs';
import { da } from './redeemCopy.da';
import { de } from './redeemCopy.de';
import { es } from './redeemCopy.es';
import { fr } from './redeemCopy.fr';
import { he } from './redeemCopy.he';
import { hi } from './redeemCopy.hi';
import { id } from './redeemCopy.id';
import { it } from './redeemCopy.it';
import { ja } from './redeemCopy.ja';
import { ms } from './redeemCopy.ms';
import { nl } from './redeemCopy.nl';
import { no } from './redeemCopy.no';
import { pl } from './redeemCopy.pl';
import { pt } from './redeemCopy.pt';
import { sv } from './redeemCopy.sv';
import { th } from './redeemCopy.th';
import { tr } from './redeemCopy.tr';
import { uk } from './redeemCopy.uk';
import { vi } from './redeemCopy.vi';
import type { SiteLang } from '../../language';
import { subscriptionCopy } from '../copy';
import type { Lang } from '../i18n';

/**
 * The redeem flow in every language the site speaks.
 *
 * Buying a gift and the documents behind it stay Russian and English — the
 * site only sells to Belarus and Russia. Redeeming does not: the recipient is
 * whoever the buyer sent the link to, anywhere, and handing them an English
 * page because the seller's contract is English was the gap this closes.
 *
 * Russian and English are not repeated here — they are read from
 * `subscriptionCopy`, which the documents already use, so the two can never
 * drift apart. This file holds the other 21 languages only.
 */
export type RedeemText = {
  /** The card above the form: «Подписка в подарок», «Вам подарили…», «Подписка Yorix на год». */
  eyebrow: string;
  cardFor: (name: string) => string;
  cardPlan: (period: string) => string;
  /** Plan periods as the card says them: «на год» / «на месяц». */
  periods: { month: string; year: string; week: string };

  /** Landing on a gift link. */
  redeemTitle: string;
  redeemBody: string;
  redeem: string;
  redeemAccept: [string, string, string];
  loading: string;

  /** Typing a code by hand. */
  entryTitle: string;
  entryBody: string;
  entryLabel: string;
  entryHint: string;
  enterCode: string;

  alreadySubscribed: { summary: string; web: string; store: (date: string) => string };
  scamNote: string;
  popupHint: string;
  popupBlocked: string;
  signInError: string;

  /** Redeeming a gift bought in this very browser. */
  ownGiftTitle: string;
  ownGiftConfirm: string;
  ownGiftKeep: string;
  ownGiftGoOn: string;

  errors: {
    notFound: string;
    redeemed: string;
    expired: string;
    cancelled: string;
    replaced: string;
    typo: string;
    locked: string;
    rateLimited: string;
    error: string;
  };

  /** The welcome once the subscription is on. */
  done: {
    badge: string;
    thanks: string;
    paidLead: string;
    openApp: string;
    badgeTop: string;
    scan: string;
    qrTitle: string;
    qrHint: string;
    features: { title: string; sub: string }[];
    helpTitle: string;
    helpBody: string;
    helpCta: string;
    noteTop: string;
    noteThanks: string;
  };
};

/** Russian and English come from the documents' own copy — never a second copy of them. */
export function baseRedeemText(docs: Lang): RedeemText {
  const c = subscriptionCopy[docs];
  const g = c.gift;
  const r = c.ret;
  return {
    eyebrow: g.eyebrow,
    cardFor: g.cardFor,
    cardPlan: g.cardPlan,
    periods: PLAN_PERIODS[docs],
    redeemTitle: g.redeemTitle,
    redeemBody: g.redeemBody,
    redeem: g.redeem,
    redeemAccept: g.redeemAccept,
    loading: g.loading,
    entryTitle: g.entryTitle,
    entryBody: g.entryBody,
    entryLabel: g.entryLabel,
    entryHint: g.entryHint,
    enterCode: g.enterCode,
    alreadySubscribed: g.alreadySubscribed,
    scamNote: g.scamNote,
    popupHint: g.popupHint,
    popupBlocked: c.account.popupBlocked,
    signInError: c.account.signInError,
    ownGiftTitle: g.ownGiftTitle,
    ownGiftConfirm: g.ownGiftConfirm,
    ownGiftKeep: g.ownGiftKeep,
    ownGiftGoOn: g.ownGiftGoOn,
    errors: g.errors,
    done: {
      badge: r.badgeGift,
      thanks: r.thanks,
      paidLead: r.paidLead,
      openApp: r.openApp,
      badgeTop: r.badgeTop,
      scan: r.scan,
      qrTitle: r.qrTitle,
      qrHint: r.qrHint,
      features: r.features,
      helpTitle: r.helpTitle,
      helpBody: r.helpBody,
      helpCta: r.helpCta,
      noteTop: r.noteTop,
      noteThanks: r.noteThanks,
    },
  };
}

const PLAN_PERIODS: Record<Lang, { week: string; month: string; year: string }> = {
  ru: { week: 'на неделю', month: 'на месяц', year: 'на год' },
  en: { week: 'for a week', month: 'for a month', year: 'for a year' },
};

/** The 21 languages the documents do not speak; ru and en come from the documents' own copy. */
export const redeemCopy: Partial<Record<SiteLang, RedeemText>> = { ar, cs, da, de, es, fr, he, hi, id, it, ja, ms, nl, no, pl, pt, sv, th, tr, uk, vi };

/** What the recipient reads: their own language when we have it, else the document language. */
export function redeemText(locale: SiteLang, docs: Lang): RedeemText {
  return redeemCopy[locale] ?? baseRedeemText(docs);
}
