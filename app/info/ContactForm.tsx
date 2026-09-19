'use client';

import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import type { SupportCopy } from '../i18n/types';
import { API_BASE, turnstileSiteKey } from '../subscription/config';

type State = 'idle' | 'sending' | 'sent' | 'invalid' | 'error';

// The worker accepts plain addresses only (no quotes, brackets or display names).
const EMAIL = /^[A-Za-z0-9._%+'-]{1,64}@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;

const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value : '');

// «Write to us» without a mail app: the worker mails the message to support
// with the writer as Reply-To. The hidden field and the time on the page are
// what the worker uses to drop bots without telling them.
export function ContactForm({
  copy,
  email,
  privacyHref,
  privacyLabel,
  lang,
  page,
}: {
  copy: SupportCopy['form'];
  email: string;
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
      <output className="block rounded-2xl border border-[#A7F3D0]/30 bg-[#A7F3D0]/10 px-5 py-4 text-base leading-7 text-[#D1FAE5]">
        {copy.sent}
      </output>
    );
  }

  const field = 'mt-2 w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none';
  return (
    <form className="grid gap-4" noValidate onSubmit={(event) => void submit(event)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-white/80">
          {copy.name}
          <input autoComplete="name" className={field} maxLength={80} name="name" />
        </label>
        <label className="block text-sm font-semibold text-white/80">
          {copy.email}
          <input autoComplete="email" className={field} inputMode="email" maxLength={254} name="email" required type="email" />
        </label>
      </div>
      <label className="block text-sm font-semibold text-white/80">
        {copy.message}
        <textarea className={`${field} min-h-32 resize-y`} maxLength={4000} minLength={10} name="message" placeholder={copy.messagePlaceholder} required />
      </label>
      {turnstileSiteKey ? <div className="cf-turnstile" data-language={lang} data-sitekey={turnstileSiteKey} data-theme="dark" /> : null}
      {/* Humans never see or fill this; bots do. */}
      <input aria-hidden="true" autoComplete="off" className="absolute -left-[9999px] h-px w-px opacity-0" name="website" tabIndex={-1} />
      {state === 'invalid' ? (
        <p className="rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
          {copy.invalid}
        </p>
      ) : null}
      {state === 'error' ? (
        <p className="rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
          {copy.error}{' '}
          <a className="font-semibold underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ) : null}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-white/55">
          {copy.privacy}{' '}
          <a className="font-semibold text-white/80 underline decoration-white/30 underline-offset-2 hover:decoration-white" href={privacyHref}>
            {privacyLabel}
          </a>
        </p>
        <button
          className="inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-[#1E1B4B] transition hover:bg-[#EEF2FF] disabled:opacity-60"
          disabled={state === 'sending'}
          type="submit"
        >
          {state === 'sending' ? copy.sending : copy.send}
        </button>
      </div>
    </form>
  );
}
