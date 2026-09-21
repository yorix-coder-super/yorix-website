import type { RedeemText } from './redeemCopy';

export const no: RedeemText = {
  eyebrow: 'Gi et abonnement i gave',
  cardFor: (name) => `Til ${name}`,
  cardPlan: (period) => `Yorix-abonnement ${period}`,
  periods: { week: 'i én uke', month: 'i én måned', year: 'i ett år' },

  redeemTitle: 'Du har fått et Yorix-abonnement i gave',
  redeemBody:
    'Abonnementet er allerede ditt – ett steg gjenstår. Logg inn med Apple med den samme kontoen som i appen: det er der det havner.',
  redeem: 'Løs inn med Apple',
  redeemAccept: ['Når du løser inn gaven, godtar du ', 'vilkårene for bruk', '.'],
  loading: 'Åpner gaven…',

  entryTitle: 'Løs inn en gave',
  entryBody:
    'Skriv inn koden fra kortet eller meldingen, og logg deretter inn med Apple med den samme kontoen som i Yorix-appen – abonnementet slås på med en gang.',
  entryLabel: 'Gavekode',
  entryGo: 'Fortsett',
  entryShort: 'Koden består av 12 tegn – sjekk om du har fått med alt.',
  entryHint:
    'Blander du O og 0, I og 1, gjør det ingenting – vi leser det riktig. Du kan også lime inn hele gavelenken her.',
  enterCode: 'Skriv inn koden manuelt',

  alreadySubscribed: {
    summary: 'Jeg har allerede et abonnement',
    web: 'Betalt på nettstedet – gaven legges rett og slett til den perioden.',
    store: (date) =>
      `Kjøpt i App Store – da løper gaven parallelt, og du betaler dobbelt for de samme dagene. Slå heller av fornyelsen og løs inn gaven når det abonnementet tar slutt: koden er gyldig til ${date}.`,
  },
  scamNote:
    'Vi ber deg aldri om å ringe, betale eller gi koden videre – verken før innløsningen eller etterpå.',
  popupHint:
    'Åpnet ikke innloggingsvinduet seg? Åpne denne siden i Safari eller en annen nettleser – lenken er den samme.',
  popupBlocked: 'Nettleseren lukket innloggingsvinduet. Tillat popup-vinduer og trykk på nytt.',
  signInError: 'Innloggingen mislyktes. Prøv igjen.',

  ownGiftTitle: 'Dette er gaven du kjøpte',
  ownGiftConfirm:
    'Denne gaven ble kjøpt i denne nettleseren. Løser du den inn på din egen konto, slutter lenken å virke for den som skulle få den. Vil du løse den inn til deg selv?',
  ownGiftKeep: 'La den stå til mottakeren',
  ownGiftGoOn: 'Løs den inn likevel',

  errors: {
    notFound: 'Denne gaven finnes ikke. Sjekk lenken eller koden.',
    redeemed: 'Denne gaven er allerede løst inn.',
    expired: 'Denne gaven har gått ut.',
    cancelled: 'Denne gaven er kansellert.',
    replaced:
      'Denne lenken virker ikke lenger: koden er byttet ut med en ny. Be den som ga deg gaven, om den nye lenken.',
    typo: 'Det ser ut til å være en skrivefeil i koden – sjekk den mot kortet eller meldingen.',
    locked:
      'For mange feil koder: innløsning er satt på pause for denne kontoen i ett døgn. Prøv igjen i morgen, eller skriv til oss.',
    rateLimited: 'For mange forsøk på rad. Vent et minutt og prøv igjen.',
    error: 'Gaven kunne ikke løses inn. Prøv igjen om et minutt.',
  },

  done: {
    badge: 'Aktivert',
    thanks: 'Takk for at du valgte Yorix',
    paidLead: 'Abonnementet ditt varer til',
    openApp: 'En verden av rolig søvn venter – fortsett på iPhonen din.',
    badgeTop: 'Last ned på',
    scan: 'Rett kameraet på telefonen mot koden for å åpne Yorix i App Store',
    qrTitle: 'Åpne med QR-koden',
    qrHint: 'Rett kameraet på iPhonen mot den',
    features: [
      { title: 'Søvnprognoser', sub: 'allerede på' },
      { title: 'All analyse', sub: 'uten begrensninger' },
      { title: 'AI-coach døgnet rundt', sub: 'når du trenger den' },
      { title: 'Guider fra eksperter', sub: 'og anbefalinger' },
    ],
    helpTitle: 'Trenger du hjelp?',
    helpBody: 'Vi er her, og vi hjelper deg hvis noe ikke virker.',
    helpCta: 'Gå til kundestøtte',
    noteTop: 'Rolige netter – gode dager',
    noteThanks: 'Sov godt!',
  },
};
