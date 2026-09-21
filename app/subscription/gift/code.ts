// Gift codes as the worker mints them (CloudflareWorker/src/web/orders.ts):
// 11 random Crockford characters and a Luhn mod 32 check character. Checking
// here tells a typo apart from a wrong code before anything is sent, so a
// slip of the finger never counts toward the worker's lockout.
const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/**
 * What the person typed or pasted — a whole link included — as up to 12 code
 * characters.
 *
 * Both link shapes, because both exist: the short `/g/<code>` is the one the
 * buyer actually shares, and `/gift/<code>` is the page it opens. Reading only
 * the long one turned a pasted short link into `HTTPSY0R1XAP` — the domain
 * itself, stripped of punctuation — and the page called it a typo.
 */
export function codeFromInput(input: string): string {
  const fromLink = /\/(?:g|gift)\/([^/?#\s]+)/i.exec(input)?.[1];
  return (fromLink ? decodeURIComponent(fromLink) : input)
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '')
    .replace(/O/g, '0')
    .replace(/[IL]/g, '1')
    .slice(0, 12);
}

function checkChar(body: string): string | null {
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    const value = CROCKFORD.indexOf(body[i]);
    if (value < 0) return null;
    const product = value * factor;
    sum += Math.floor(product / 32) + (product % 32);
    factor = factor === 2 ? 1 : 2;
  }
  return CROCKFORD[(32 - (sum % 32)) % 32];
}

export function giftCodeChecks(code: string): boolean {
  return code.length === 12 && checkChar(code.slice(0, 11)) === code[11];
}

/** «ABCD-EFGH-JKMN», also while it is still being typed. */
export function formatGiftCode(code: string): string {
  return code.replace(/(.{4})(?=.)/g, '$1-');
}

/** The short link that is shared: yorix-app.com/g/<code>; the site opens it in the visitor's language. */
export function giftUrl(origin: string, code: string): string {
  return `${origin}/g/${codeFromInput(code)}`;
}

export function redeemPageUrl(origin: string, lang: 'ru' | 'en'): string {
  return `${origin}${lang === 'ru' ? '/ru' : ''}/gift`;
}
