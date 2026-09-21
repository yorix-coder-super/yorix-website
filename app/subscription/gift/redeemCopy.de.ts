import type { RedeemText } from './redeemCopy';

export const de: RedeemText = {
  eyebrow: 'Abo als Geschenk',
  cardFor: (name) => `Für ${name}`,
  cardPlan: (period) => `Yorix-Abo ${period}`,
  periods: { week: 'für eine Woche', month: 'für einen Monat', year: 'für ein Jahr' },

  redeemTitle: 'Du hast ein Yorix-Abo geschenkt bekommen',
  redeemBody: 'Das Abo gehört schon dir – es fehlt nur ein Schritt. Melde dich mit Apple an, mit demselben Konto wie in der App: Genau dort landet es.',
  redeem: 'Mit Apple einlösen',
  redeemAccept: ['Mit dem Einlösen des Geschenks akzeptierst du die ', 'Nutzungsbedingungen', '.'],
  loading: 'Wir öffnen dein Geschenk…',

  entryTitle: 'Geschenk einlösen',
  entryBody: 'Gib den Code von der Karte oder aus der Nachricht ein und melde dich dann mit Apple an – mit demselben Konto wie in der Yorix-App. Das Abo ist sofort aktiv.',
  entryLabel: 'Geschenkcode',
  entryHint: 'O und 0, I und 1 lesen wir gleich. Du kannst hier auch den ganzen Geschenklink einfügen.',
  enterCode: 'Code von Hand eingeben',

  alreadySubscribed: {
    summary: 'Ich habe schon ein Abo',
    web: 'Auf der Website bezahlt – die Geschenkzeit kommt einfach dazu.',
    store: (date) =>
      `Im App Store gekauft – das Geschenk würde parallel laufen, und du zahlst zweimal für dieselben Tage. Besser die Verlängerung abschalten und das Geschenk einlösen, wenn das Abo endet: Der Code gilt bis ${date}.`,
  },
  scamNote: 'Wir bitten dich nie, anzurufen, zu zahlen oder den Code weiterzugeben – weder vor dem Einlösen noch danach.',
  popupHint: 'Das Anmeldefenster ist nicht aufgegangen? Öffne diese Seite in Safari oder einem anderen Browser – der Link bleibt derselbe.',
  popupBlocked: 'Der Browser hat das Anmeldefenster geschlossen. Erlaube Pop-ups und versuche es noch einmal.',
  signInError: 'Die Anmeldung ist fehlgeschlagen. Bitte versuche es noch einmal.',

  ownGiftTitle: 'Das ist das Geschenk, das du gekauft hast',
  ownGiftConfirm: 'Dieses Geschenk wurde in diesem Browser gekauft. Wenn du es auf dein Konto einlöst, funktioniert der Link für die beschenkte Person nicht mehr. Für dich selbst einlösen?',
  ownGiftKeep: 'Nicht einlösen',
  ownGiftGoOn: 'Trotzdem einlösen',

  errors: {
    notFound: 'Dieses Geschenk gibt es nicht. Prüfe den Link oder den Code.',
    redeemed: 'Dieses Geschenk wurde bereits eingelöst.',
    expired: 'Dieses Geschenk ist abgelaufen.',
    cancelled: 'Dieses Geschenk wurde storniert.',
    replaced: 'Dieser Link funktioniert nicht mehr: Der Code wurde durch einen neuen ersetzt. Frag die Person, die dir das Geschenk gemacht hat, nach dem neuen Link.',
    typo: 'Im Code steckt wohl ein Tippfehler – vergleiche ihn mit der Karte oder der Nachricht.',
    locked: 'Zu viele falsche Codes: Das Einlösen ist für dieses Konto einen Tag lang pausiert. Versuch es morgen noch einmal oder schreib uns.',
    rateLimited: 'Zu viele Versuche hintereinander. Warte eine Minute und versuche es noch einmal.',
    error: 'Das Geschenk konnte nicht eingelöst werden. Versuche es in einer Minute noch einmal.',
  },

  done: {
    badge: 'Eingelöst',
    thanks: 'Danke, dass du dich für Yorix entschieden hast',
    paidLead: 'Dein Abo läuft bis',
    openApp: 'Eine Welt ruhiger Nächte wartet schon – mach auf deinem iPhone weiter.',
    badgeTop: 'Laden im',
    scan: 'Richte die Handykamera auf den Code, um Yorix im App Store zu öffnen',
    qrTitle: 'Mit dem QR-Code öffnen',
    qrHint: 'Richte die iPhone-Kamera darauf',
    features: [
      { title: 'Schlafprognosen', sub: 'schon aktiv' },
      { title: 'Alle Analysen', sub: 'ohne Grenzen' },
      { title: 'KI-Coach 24/7', sub: 'immer für dich da' },
      { title: 'Expertenratgeber', sub: 'und Empfehlungen' },
    ],
    helpTitle: 'Brauchst du Hilfe?',
    helpBody: 'Wir sind da und helfen dir, wenn etwas nicht funktioniert.',
    helpCta: 'Zum Support',
    noteTop: 'Ruhige Nächte – glückliche Tage',
    noteThanks: 'Schlaf gut!',
  },
};
