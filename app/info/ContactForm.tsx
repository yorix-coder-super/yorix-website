'use client';

import { CircleCheck, Send } from 'lucide-react';
import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import type { SupportCopy } from '../i18n/types';
import { API_BASE, turnstileSiteKey } from '../subscription/config';
import { Spinner } from '../subscription/ui';

type State = 'idle' | 'sending' | 'sent' | 'invalid' | 'error';

// The worker accepts plain addresses only (no quotes, brackets or display names).
const EMAIL = /^[A-Za-z0-9._%+'-]{1,64}@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;

const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value : '');

// «Write to us» without a mail app and without an address on the page: the
// worker mails the message to support with the writer as Reply-To. The hidden
// field and the time on the page are what the worker uses to drop bots
// without telling them.
export function ContactForm({
  copy,
  privacyHref,
  privacyLabel,
  lang,
  page,
}: {
  copy: SupportCopy['form'];
  privacyHref: string;
  privacyLabel: string;
  lang: string;
  page: string;
}) {
  const opened = useRef(0);
  const [state, setState] = useState<State>('idle');
  useEffect(() => {
    opened.current = Date.now();
  }, []);
  // The widget writes its answer into a hidden field of this form.
  useEffect(() => {
    if (!turnstileSiteKey || document.querySelector('script[data-turnstile]')) return;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = 'true';
    document.head.appendChild(script);
  }, []);

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'sending') return;
    const form = new FormData(event.currentTarget);
    const payload = {
      name: text(form.get('name')).trim(),
      email: text(form.get('email')).trim(),
      message: text(form.get('message')).trim(),
      website: text(form.get('website')),
      turnstile: text(form.get('cf-turnstile-response')),
      lang,
      page,
      elapsedMs: Date.now() - opened.current,
    };
    if (!EMAIL.test(payload.email) || payload.message.length < 10) {
      setState('invalid');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(`${API_BASE}/v1/web/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setState('sent');
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setState(body.error === 'invalid_email' || body.error === 'invalid_message' ? 'invalid' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <output className="flex min-h-[16rem] flex-col items-center justify-center gap-4 text-center">
        <CircleCheck aria-hidden="true" className="h-14 w-14 text-[#A7F3D0]" />
        <span className="max-w-sm text-lg font-semibold leading-7 text-white">{copy.sent}</span>
      </output>
    );
  }

  const label = 'block text-sm font-semibold text-white';
  const field =
    'mt-2 w-full rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 text-base text-white placeholder:text-white/40 transition focus:border-[#FDE68A]/80 focus:bg-white/[0.12] focus:outline-none';
  const alert = 'rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm font-medium text-[#FDE68A]';
  return (
    <form className="grid gap-4" noValidate onSubmit={(event) => void submit(event)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {copy.name}
          <input autoComplete="name" className={field} maxLength={80} name="name" />
        </label>
        <label className={label}>
          {copy.email}
          <input autoComplete="email" className={field} inputMode="email" maxLength={254} name="email" required type="email" />
        </label>
      </div>
      <label className={label}>
        {copy.message}
        <textarea className={`${field} min-h-36 resize-y`} maxLength={4000} minLength={10} name="message" placeholder={copy.messagePlaceholder} required />
      </label>
      {turnstileSiteKey ? <div className="cf-turnstile" data-language={lang} data-sitekey={turnstileSiteKey} data-theme="dark" /> : null}
      {/* Humans never see or fill this; bots do. */}
      <input aria-hidden="true" autoComplete="off" className="absolute -left-[9999px] h-px w-px opacity-0" name="website" tabIndex={-1} />
      {state === 'invalid' ? (
        <p className={alert} role="alert">
          {copy.invalid}
        </p>
      ) : null}
      {state === 'error' ? (
        <p className={alert} role="alert">
          {copy.error}
        </p>
      ) : null}
      <button
        className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 text-base font-semibold text-[#1E1B4B] shadow-[0_18px_50px_rgb(255_255_255/14%)] transition hover:-translate-y-0.5 hover:bg-[#EEF2FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:translate-y-0 disabled:opacity-70"
        disabled={state === 'sending'}
        type="submit"
      >
        {state === 'sending' ? <Spinner className="h-5 w-5" /> : <Send aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />}
        {state === 'sending' ? copy.sending : copy.send}
      </button>
      <p className="text-center text-xs leading-5 text-white/60">
        {copy.privacy}{' '}
        <a className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white" href={privacyHref}>
          {privacyLabel}
        </a>
      </p>
    </form>
  );
}
