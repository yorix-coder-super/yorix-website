import type { RedeemText } from './redeemCopy';

export const nl: RedeemText = {
  eyebrow: 'Geef een abonnement cadeau',
  cardFor: (name) => `Voor ${name}`,
  cardPlan: (period) => `Yorix-abonnement ${period}`,
  periods: { week: 'voor een week', month: 'voor een maand', year: 'voor een jaar' },

  redeemTitle: 'Je hebt een Yorix-abonnement cadeau gekregen',
  redeemBody:
    'Het abonnement is al van jou – er is nog één stap. Log in met Apple met hetzelfde account als in de app: daar komt het te staan.',
  redeem: 'Activeren met Apple',
  redeemAccept: ['Door het cadeau te activeren ga je akkoord met de ', 'gebruiksvoorwaarden', '.'],
  loading: 'We pakken je cadeau uit…',

  entryTitle: 'Een cadeau activeren',
  entryBody:
    'Vul de code van de kaart of uit het bericht in en log daarna in met Apple met hetzelfde account als in de Yorix-app – het abonnement staat meteen aan.',
  entryLabel: 'Cadeaucode',
  entryGo: 'Doorgaan',
  entryShort: 'De code bestaat uit 12 tekens – kijk of hij compleet is.',
  enterCode: 'Code handmatig invoeren',

  alreadySubscribed: {
    summary: 'Ik heb al een abonnement',
    web: 'Op de site betaald – het cadeau komt gewoon bij die periode.',
    store: (date) =>
      `Via de App Store afgesloten – het cadeau loopt er dan naast en je betaalt twee keer voor dezelfde dagen. Zet de verlenging liever uit en activeer het cadeau als dat abonnement afloopt: de code is geldig tot ${date}.`,
  },
  scamNote:
    'We vragen je nooit om te bellen, te betalen of de code door te geven – niet vóór het activeren en niet erna.',
  popupHint:
    'Ging het inlogvenster niet open? Open deze pagina in Safari of een andere browser – de link blijft hetzelfde.',
  popupBlocked: 'De browser heeft het inlogvenster gesloten. Sta pop-ups toe en druk opnieuw.',
  signInError: 'Inloggen is niet gelukt. Probeer het opnieuw.',

  ownGiftTitle: 'Dit is het cadeau dat je zelf kocht',
  ownGiftConfirm:
    'Dit cadeau is in deze browser gekocht. Activeer je het op je eigen account, dan werkt de link niet meer voor degene voor wie het bedoeld is. Wil je het voor jezelf activeren?',
  ownGiftKeep: 'Bewaren voor de ander',
  ownGiftGoOn: 'Toch activeren',

  errors: {
    notFound: 'Dit cadeau bestaat niet. Controleer de link of de code.',
    redeemed: 'Dit cadeau is al geactiveerd.',
    expired: 'Dit cadeau is verlopen.',
    cancelled: 'Dit cadeau is geannuleerd.',
    replaced:
      'Deze link werkt niet meer: de code is vervangen door een nieuwe. Vraag degene die je het cadeau gaf om de nieuwe link.',
    typo: 'Er lijkt een typefout in de code te zitten – vergelijk hem met de kaart of het bericht.',
    locked:
      'Te veel verkeerde codes: activeren is voor dit account een dag geblokkeerd. Probeer het morgen opnieuw of neem contact op.',
    rateLimited: 'Te veel pogingen achter elkaar. Wacht een minuut en probeer het opnieuw.',
    error: 'Het cadeau kon niet worden geactiveerd. Probeer het over een minuut opnieuw.',
  },

  done: {
    badge: 'Geactiveerd',
    thanks: 'Bedankt dat je voor Yorix kiest',
    paidLead: 'Je abonnement loopt tot',
    openApp: 'Een wereld van rustige nachten wacht – ga verder op je iPhone.',
    badgeTop: 'Download in de',
    scan: 'Richt de camera van je telefoon op de code om Yorix in de App Store te openen',
    qrTitle: 'Openen met de QR-code',
    qrHint: 'Richt de camera van je iPhone erop',
    features: [
      { title: 'Slaapvoorspellingen', sub: 'staan al aan' },
      { title: 'Alle analyses', sub: 'zonder beperking' },
      { title: 'AI-coach 24/7', sub: 'wanneer je hem nodig hebt' },
      { title: 'Gidsen van experts', sub: 'en adviezen' },
    ],
    helpTitle: 'Hulp nodig?',
    helpBody: 'We zijn er, en we helpen je als er iets niet werkt.',
    helpCta: 'Naar de klantenservice',
    noteTop: 'Rustige nachten – blije dagen',
    noteThanks: 'Slaap lekker!',
  },
};
