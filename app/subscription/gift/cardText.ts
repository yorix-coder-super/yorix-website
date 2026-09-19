// The card text is shown on the official gift page, so it may carry no way to
// reach anyone — no links, domains, e-mails, handles or phone numbers. The
// worker applies the same rules (CloudflareWorker/src/web/routes.ts, giftCard).
const CARD_CONTACT: RegExp[] = [
  /https?:\/\/|www\./i,
  /(?<![\p{L}\p{N}-])[\p{L}\p{N}-]+\.(?:com|net|org|info|io|me|app|site|online|xyz|link|shop|store|pro|biz|club|top|cc|co|ly|ru|by|su|ua|kz|рф|бел)(?![\p{L}\p{N}])/iu,
  /[^\s@]+@[^\s@]+\.[^\s@]+/u,
  /(?:^|\s)@[\p{L}\p{N}_]{3,}/u,
  /(?:\d[\s().+-]*){9,}/,
];

export function cardHasContact(to: string, message: string): boolean {
  const text = `${to} ${message}`.normalize('NFKC');
  return CARD_CONTACT.some((pattern) => pattern.test(text));
}
