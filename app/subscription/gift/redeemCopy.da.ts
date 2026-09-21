import type { RedeemText } from './redeemCopy';

export const da: RedeemText = {
  eyebrow: 'Et abonnement i gave',
  cardFor: (name) => `Til ${name}`,
  cardPlan: (period) => `Yorix-abonnement ${period}`,
  periods: { week: 'på en uge', month: 'på en måned', year: 'på et år' },

  redeemTitle: 'Du har fået et Yorix-abonnement i gave',
  redeemBody: 'Abonnementet er allerede dit – der mangler kun ét skridt. Log ind med Apple med den samme konto som i appen: det er der, det lander.',
  redeem: 'Indløs med Apple',
  redeemAccept: ['Når du indløser gaven, accepterer du ', 'brugsvilkårene', '.'],
  loading: 'Åbner din gave…',

  entryTitle: 'Indløs en gave',
  entryBody: 'Indtast koden fra kortet eller beskeden, og log så ind med Apple med den samme konto som i Yorix-appen – abonnementet slås til med det samme.',
  entryLabel: 'Gavekode',
  entryGo: 'Fortsæt',
  entryShort: 'Koden er på 12 tegn – tjek, om du har fået det hele med.',
  entryHint: 'O og 0, I og 1 læser vi ens. Du kan også indsætte hele gavelinket her.',
  enterCode: 'Indtast koden manuelt',

  alreadySubscribed: {
    summary: 'Jeg har allerede et abonnement',
    web: 'Betalt på siden – gavens periode lægges bare oveni.',
    store: (date) =>
      `Købt i App Store – gaven ville løbe sideløbende, og du ville betale dobbelt for de samme dage. Det er bedre at slå fornyelsen fra og indløse gaven, når abonnementet slutter: koden gælder til ${date}.`,
  },
  scamNote: 'Vi beder dig aldrig om at ringe, betale eller sende koden videre – hverken før indløsningen eller efter.',
  popupHint: 'Åbnede loginvinduet sig ikke? Åbn denne side i Safari eller en anden browser – linket er det samme.',
  popupBlocked: 'Browseren lukkede loginvinduet. Tillad pop op-vinduer, og tryk igen.',
  signInError: 'Login mislykkedes. Prøv igen.',

  ownGiftTitle: 'Det er den gave, du selv har købt',
  ownGiftConfirm: 'Denne gave er købt i denne browser. Hvis du indløser den på din konto, holder linket op med at virke for modtageren. Vil du indløse den til dig selv?',
  ownGiftKeep: 'Gem den til modtageren',
  ownGiftGoOn: 'Indløs den alligevel',

  errors: {
    notFound: 'Der findes ingen gave med den kode. Tjek linket eller koden.',
    redeemed: 'Denne gave er allerede indløst.',
    expired: 'Denne gave er udløbet.',
    cancelled: 'Denne gave er annulleret.',
    replaced: 'Dette link virker ikke længere: koden er erstattet af en ny. Bed den, der gav dig gaven, om det nye link.',
    typo: 'Der ser ud til at være en tastefejl i koden – tjek den mod kortet eller beskeden.',
    locked: 'For mange forkerte koder: indløsning er sat på pause for denne konto et døgn. Prøv igen i morgen, eller skriv til os.',
    rateLimited: 'For mange forsøg i træk. Vent et minut, og prøv igen.',
    error: 'Gaven kunne ikke indløses. Prøv igen om et minut.',
  },

  done: {
    badge: 'Indløst',
    thanks: 'Tak, fordi du valgte Yorix',
    paidLead: 'Dit abonnement løber til',
    openApp: 'En verden af rolige nætter venter – fortsæt på din iPhone.',
    badgeTop: 'Hent i',
    scan: 'Ret telefonens kamera mod koden for at åbne Yorix i App Store',
    qrTitle: 'Åbn med QR-koden',
    qrHint: 'Ret din iPhones kamera mod den',
    features: [
      { title: 'Søvnprognoser', sub: 'allerede klar' },
      { title: 'Alle analyser', sub: 'uden begrænsninger' },
      { title: 'AI-coach 24/7', sub: 'når du har brug for det' },
      { title: 'Ekspertguider', sub: 'og anbefalinger' },
    ],
    helpTitle: 'Brug for hjælp?',
    helpBody: 'Vi er her og hjælper, hvis noget ikke virker.',
    helpCta: 'Gå til support',
    noteTop: 'Rolige nætter – glade dage',
    noteThanks: 'Sov godt!',
  },
};
