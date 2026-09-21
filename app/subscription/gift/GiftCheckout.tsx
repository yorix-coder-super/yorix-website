'use client';

import { useEffect, useRef, useState } from 'react';
import { AppleGlyph } from '../../home/art';
import { useAccount, type Terms } from '../account';
import { subscriptionCopy } from '../copy';
import { formatMoney } from '../currency';
import { subscriptionPath } from '../i18n';
import { legalVersion } from '../legal/versions';
import { ACQUIRER, chargeToSpellOut, planCopy, prices } from '../merchant';
import { Money } from '../Money';
import { Reveal } from '../Reveal';
import { Button, Spinner } from '../ui';
import { cardHasContact } from './cardText';
import { GiftCardView } from './GiftCardView';

const GIFT_PLANS = ['year', 'month'] as const;
type GiftPlan = (typeof GIFT_PLANS)[number];

// Napper-style gift checkout: the card on the left follows what the buyer
// types; on the right the period, the card text and the one acceptance box.
// No account: the buyer may have no iPhone at all. After payment the return
// page shows the link, the code and the card — nothing is sent by e-mail.
export function GiftCheckout() {
  const { lang, currency, configured, config, signedIn, error, signIn, createOrder, copy, warmAuth } = useAccount();
  const text = subscriptionCopy[lang].gift;
  const [planId, setPlanId] = useState<GiftPlan>('year');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [missing, setMissing] = useState(false);
  const [contact, setContact] = useState(false);
  const [closed, setClosed] = useState(false);
  const [stage, setStage] = useState<'idle' | 'signin' | 'order' | 'redirect'>('idle');
  const acceptRef = useRef<HTMLInputElement>(null);
  // No terms dialog here to warm from, and paying needs a signed-in tester
  // while checkout is in test mode — so this page asks for Firebase itself.
  useEffect(() => {
    void warmAuth();
  }, [warmAuth]);

  const price = formatMoney(prices[planId][currency], currency, lang);
  const spelled = chargeToSpellOut(planId, currency, config?.provider ?? ACQUIRER);
  const charge = spelled === null ? null : formatMoney(spelled, 'BYN', lang);
  // The worker is the authority; this only spares a sign-in when the checkout
  // is KNOWN to be closed. A config we could not load — a blocked origin, a
  // network blink — is not a closed shop, and saying «coming soon» to a buyer
  // who could have paid is the worse of the two mistakes.
  const live = configured && config?.checkoutMode !== 'off';
  const testing = config?.checkoutMode === 'test';
  const terms: Terms = { offer: legalVersion.offer, payment: legalVersion.payment, privacy: legalVersion.privacy };

  const proceed = async () => {
    if (stage !== 'idle') return;
    if (cardHasContact(to, message)) {
      setContact(true);
      return;
    }
    if (!accepted) {
      setMissing(true);
      acceptRef.current?.focus();
      return;
    }
    setMissing(false);
    if (!live) {
      setClosed(true);
      return;
    }
    // A gift needs no account. Only while checkout runs on test cards does a
    // tester sign in first (the worker refuses anyone else).
    if (testing && !signedIn) {
      setStage('signin');
      const ok = await signIn();
      if (!ok) {
        setStage('idle');
        return;
      }
    }
    setStage('order');
    const redirecting = await createOrder(planId, terms, { to: to.trim(), message: message.trim() });
    setStage(redirecting ? 'redirect' : 'idle');
  };

  const shownError = stage !== 'idle' ? null : error;
  const alert = closed
    ? copy.checkout.unavailable
    : shownError === 'popupBlocked' || shownError === 'signInError'
      ? copy.account[shownError]
      : shownError === 'blocked'
        ? copy.checkout.blocked
        : shownError
          ? copy.checkout[shownError]
          : null;
  const label =
    stage === 'signin' ? copy.checkout.signingIn
    : stage === 'order' ? copy.checkout.creating
    : stage === 'redirect' ? copy.checkout.redirecting
    : testing && !signedIn ? copy.terms.withApple
    : text.pay(price);
  const field = 'mt-2 w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none';
  const link = 'font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white';

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      {/* Sticky on the Reveal itself: a wrapper as tall as the card would leave it no room to stick. */}
      <Reveal animation="zoomIn" className="lg:sticky lg:top-6" delay={340} load="visible">
        <GiftCardView
          eyebrow={text.eyebrow}
          message={message.trim()}
          period={text.cardPlan(planCopy[lang][planId].forPeriod)}
          title={to.trim() ? text.cardFor(to.trim()) : text.title}
        />
        <ol className="mt-6 grid gap-3">
          {text.steps.map((step, index) => (
            <li className="flex items-start gap-3 text-sm leading-6 text-white/80" key={step}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={460} load="visible">
        <form
          className="grid gap-5 rounded-[2rem] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            void proceed();
          }}
        >
          <fieldset>
            <legend className="text-sm font-semibold text-white/80">{text.plan}</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {GIFT_PLANS.map((id) => {
                const selected = id === planId;
                return (
                  <label
                    className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${selected ? 'border-[#FDE68A] bg-white/[0.12]' : 'border-white/15 bg-white/[0.04] hover:border-white/30'}`}
                    key={id}
                  >
                    <input checked={selected} className="sr-only" name="plan" onChange={() => setPlanId(id)} type="radio" value={id} />
                    <span className="text-base font-semibold text-white">{planCopy[lang][id].title}</span>
                    <span className="mt-1 text-lg font-semibold text-white">
                      <Money text={formatMoney(prices[id][currency], currency, lang)} />
                    </span>
                  </label>
                );
              })}
            </div>
            {charge ? (
              <p className="mt-2 text-xs text-white/55">
                <Money text={copy.terms.charge(charge)} />
              </p>
            ) : null}
          </fieldset>

          <label className="block text-sm font-semibold text-white/80">
            {text.to}
            <input
              className={field}
              maxLength={40}
              onChange={(event) => {
                setTo(event.target.value);
                setContact(false);
              }}
              placeholder={text.toPlaceholder}
              value={to}
            />
          </label>
          <label className="block text-sm font-semibold text-white/80">
            {text.message}
            <textarea
              className={`${field} min-h-24 resize-y`}
              maxLength={200}
              onChange={(event) => {
                setMessage(event.target.value);
                setContact(false);
              }}
              placeholder={text.messagePlaceholder}
              value={message}
            />
          </label>

          <label className="flex items-start gap-3 text-sm leading-6 text-white/80">
            <input
              checked={accepted}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#A78BFA]"
              onChange={(event) => {
                setAccepted(event.target.checked);
                if (event.target.checked) setMissing(false);
              }}
              ref={acceptRef}
              type="checkbox"
            />
            <span>
              {copy.terms.accept[0]}
              <a className={link} href={subscriptionPath(lang, '/offer')} rel="noopener" target="_blank">
                {copy.terms.accept[1]}
              </a>
              {copy.terms.accept[2]}
              <a className={link} href={subscriptionPath(lang, '/payment')} rel="noopener" target="_blank">
                {copy.terms.accept[3]}
              </a>
              {copy.terms.accept[4]}
            </span>
          </label>
          <p className="text-xs leading-5 text-white/55">
            {copy.terms.privacy[0]}
            <a className={link} href={subscriptionPath(lang, '/privacy')} rel="noopener" target="_blank">
              {copy.terms.privacy[1]}
            </a>
            {copy.terms.privacy[2]}
          </p>

          {contact ? (
            <p className="enter-rise rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
              {text.cardContact}
            </p>
          ) : null}
          {missing ? (
            <p className="enter-rise rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
              {copy.terms.required}
            </p>
          ) : null}
          {alert ? (
            <p className="enter-rise rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
              {alert}
            </p>
          ) : null}

          <Button className="w-full whitespace-normal! text-center" disabled={stage !== 'idle'} type="submit" variant="light">
            {stage !== 'idle' ? <Spinner className="h-5 w-5" /> : testing && !signedIn ? <AppleGlyph className="h-5 w-5" /> : null}
            <Money text={label} />
          </Button>
          <p className="text-xs leading-5 text-white/55">{text.note}</p>
        </form>
      </Reveal>
    </div>
  );
}
