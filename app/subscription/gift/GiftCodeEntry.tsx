'use client';

import { useState, useSyncExternalStore, type SubmitEvent } from 'react';
import { subscriptionCopy } from '../copy';
import type { Lang } from '../i18n';
import { Button } from '../ui';
import { codeFromInput, formatGiftCode, giftCodeChecks } from './code';

const noSubscription = () => () => {};

// A redeem page that was reloaded after it hid its code from the address bar.
function storedCode(): string {
  try {
    return codeFromInput(sessionStorage.getItem('yorix-gift-code') ?? '');
  } catch {
    return '';
  }
}

// For a gift that came as a printed card or a dictated code: the code is
// checked here, then the redeem page takes over exactly as from a link.
export function GiftCodeEntry({ lang }: { lang: Lang }) {
  const text = subscriptionCopy[lang].gift;
  const stored = useSyncExternalStore(noSubscription, storedCode, () => '');
  const [typed, setTyped] = useState<string | null>(null);
  const code = typed ?? stored;
  const [tried, setTried] = useState(false);
  const complete = code.length === 12;
  const valid = complete && giftCodeChecks(code);
  const problem = complete && !valid ? text.errors.typo : tried && !complete ? text.entryShort : null;

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTried(true);
    if (!valid) return;
    window.location.assign(`${lang === 'ru' ? '/ru' : ''}/gift/${formatGiftCode(code)}`);
  };

  return (
    <form className="mt-6 grid gap-3" noValidate onSubmit={submit}>
      <label className="text-sm font-semibold text-white/80" htmlFor="gift-code">
        {text.entryLabel}
      </label>
      <input
        aria-describedby="gift-code-hint"
        aria-invalid={problem ? true : undefined}
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-center font-mono text-2xl font-semibold tracking-[0.12em] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none sm:text-[1.7rem]"
        dir="ltr"
        enterKeyHint="go"
        id="gift-code"
        onChange={(event) => {
          setTyped(codeFromInput(event.target.value));
          setTried(false);
        }}
        placeholder="XXXX-XXXX-XXXX"
        spellCheck={false}
        value={formatGiftCode(code)}
      />
      <p className="text-xs leading-5 text-white/55" id="gift-code-hint">
        {text.entryHint}
      </p>
      {problem ? (
        <p className="rounded-2xl bg-[#FDE68A]/15 px-4 py-3 text-sm text-[#FDE68A]" role="alert">
          {problem}
        </p>
      ) : null}
      <Button className="mt-2 w-full" type="submit" variant="light">
        {text.entryGo}
      </Button>
    </form>
  );
}
