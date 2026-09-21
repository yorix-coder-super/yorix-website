import type { RedeemText } from './redeemCopy';

export const sv: RedeemText = {
  eyebrow: 'En prenumeration i present',
  cardFor: (name) => `Till ${name}`,
  cardPlan: (period) => `Yorix-prenumeration ${period}`,
  periods: { week: 'i en vecka', month: 'i en månad', year: 'i ett år' },

  redeemTitle: 'Någon har gett dig en Yorix-prenumeration',
  redeemBody: 'Prenumerationen är redan din – ett steg återstår. Logga in med Apple med samma konto som i appen: det är där den hamnar.',
  redeem: 'Lös in med Apple',
  redeemAccept: ['Genom att lösa in presenten godkänner du ', 'användarvillkoren', '.'],
  loading: 'Öppnar din present…',

  entryTitle: 'Lös in en present',
  entryBody: 'Skriv in koden från kortet eller meddelandet och logga in med Apple med samma konto som i Yorix-appen – prenumerationen aktiveras direkt.',
  entryLabel: 'Presentkod',
  entryGo: 'Fortsätt',
  entryShort: 'Koden består av 12 tecken – kolla att allt är med.',
  enterCode: 'Skriv in koden för hand',

  alreadySubscribed: {
    summary: 'Jag har redan en prenumeration',
    web: 'Betald på webbplatsen – presentens tid läggs helt enkelt till efter den.',
    store: (date) =>
      `Köpt i App Store – presenten skulle löpa parallellt och du betalar två gånger för samma dagar. Stäng hellre av förnyelsen och lös in presenten när den tar slut: koden gäller till ${date}.`,
  },
  scamNote: 'Vi ber dig aldrig att ringa, betala eller skicka koden vidare – varken före inlösen eller efter.',
  popupHint: 'Öppnades inte inloggningsfönstret? Öppna den här sidan i Safari eller en annan webbläsare – länken är densamma.',
  popupBlocked: 'Webbläsaren stängde inloggningsfönstret. Tillåt popup-fönster och tryck igen.',
  signInError: 'Inloggningen misslyckades. Försök igen.',

  ownGiftTitle: 'Det här är presenten du köpte',
  ownGiftConfirm: 'Den här presenten köptes i den här webbläsaren. Löser du in den på ditt konto slutar länken fungera för mottagaren. Vill du lösa in den till dig själv?',
  ownGiftKeep: 'Spara den till mottagaren',
  ownGiftGoOn: 'Lös in ändå',

  errors: {
    notFound: 'Det finns ingen sådan present. Kontrollera länken eller koden.',
    redeemed: 'Den här presenten är redan inlöst.',
    expired: 'Den här presenten har gått ut.',
    cancelled: 'Den här presenten är avbruten.',
    replaced: 'Den här länken fungerar inte längre: koden byttes mot en ny. Be om den nya länken av den som gav dig presenten.',
    typo: 'Det verkar vara ett skrivfel i koden – jämför den med kortet eller meddelandet.',
    locked: 'För många felaktiga koder: inlösen är pausad för det här kontot i ett dygn. Försök i morgon eller skriv till oss.',
    rateLimited: 'För många försök i rad. Vänta en minut och försök igen.',
    error: 'Det gick inte att lösa in presenten. Försök igen om en minut.',
  },

  done: {
    badge: 'Klart',
    thanks: 'Presenten är inlöst – välkommen till Yorix',
    paidLead: 'Prenumerationen gäller till',
    openApp: 'En värld av lugn sömn väntar – fortsätt i din iPhone.',
    badgeTop: 'Hämta i',
    scan: 'Rikta mobilkameran mot koden för att öppna Yorix i App Store',
    qrTitle: 'Öppna med QR-koden',
    qrHint: 'Rikta iPhone-kameran mot den',
    features: [
      { title: 'Sömnprognoser', sub: 'redan igång' },
      { title: 'All analys', sub: 'utan begränsningar' },
      { title: 'AI-coach dygnet runt', sub: 'när du behöver' },
      { title: 'Expertguider', sub: 'och rekommendationer' },
    ],
    helpTitle: 'Behöver du hjälp?',
    helpBody: 'Vi finns här och hjälper till om något inte fungerar.',
    helpCta: 'Gå till supporten',
    noteTop: 'Lugna nätter – glada dagar',
    noteThanks: 'Sov gott!',
  },
};
