import { useSyncExternalStore } from 'react';
import { isCurrency, type Currency } from './currency';

// One currency for the whole page: the header menu and every plan card read
// the same store, so a choice made at the top changes the prices below. The
// server renders the geo guess; the saved choice is read after hydration.
const KEY = 'yx_currency';

let chosen: Currency | null = null;
let loaded = false;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!loaded) {
    loaded = true;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (isCurrency(saved)) chosen = saved;
    } catch {
      // Storage may be blocked; the geo guess stands.
    }
    if (chosen) listener();
  }
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => chosen;
const getServerSnapshot = () => null;

export function setCurrency(currency: Currency) {
  chosen = currency;
  try {
    window.localStorage.setItem(KEY, currency);
  } catch {
    // Not persisted; the choice still applies to this page.
  }
  notify();
}

export function useCurrency(fallback: Currency): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) ?? fallback;
}
