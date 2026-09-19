import { codeFromInput } from './code';

// The gifts this browser paid for. A gift is bought without an account, so
// the key the worker hands back once is the only way to read the order, its
// code and to replace the code; it lives here, on the buyer's device.
const STORE = 'yorix-gifts';

export type StoredGift = { order: string; key: string; code?: string };

function read(): StoredGift[] {
  try {
    const list: unknown = JSON.parse(localStorage.getItem(STORE) ?? '[]');
    if (!Array.isArray(list)) return [];
    return list.filter(
      (item): item is StoredGift =>
        typeof item?.order === 'string' && /^Y-[0-9A-Z]{10,32}$/.test(item.order) && typeof item?.key === 'string' && /^[A-Za-z0-9_-]{43}$/.test(item.key),
    );
  } catch {
    return [];
  }
}

function write(list: StoredGift[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(list.slice(0, 30)));
  } catch {
    // Private mode or full storage: the return page still shows the gift once.
  }
}

export function storedGifts(): StoredGift[] {
  return read();
}

export function rememberGift(order: string, key: string) {
  write([{ order, key }, ...read().filter((item) => item.order !== order)]);
}

export function rememberCode(order: string, code: string) {
  write(read().map((item) => (item.order === order ? { ...item, code: codeFromInput(code) } : item)));
}

export function giftKeyFor(order: string): string | null {
  return read().find((item) => item.order === order)?.key ?? null;
}

export function boughtHere(code: string): boolean {
  const wanted = codeFromInput(code);
  return read().some((item) => item.code === wanted);
}
