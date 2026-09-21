import type { RedeemText } from './redeemCopy';

export const pl: RedeemText = {
  eyebrow: 'Subskrypcja w prezencie',
  cardFor: (name) => `Dla ${name}`,
  cardPlan: (period) => `Subskrypcja Yorix ${period}`,
  periods: { week: 'na tydzień', month: 'na miesiąc', year: 'na rok' },

  redeemTitle: 'Ktoś podarował Ci subskrypcję Yorix',
  redeemBody: 'Subskrypcja jest już Twoja — został jeden krok. Zaloguj się przez Apple tym samym kontem, którego używasz w aplikacji: właśnie tam się włączy.',
  redeem: 'Zrealizuj przez Apple',
  redeemAccept: ['Realizując prezent, akceptujesz ', 'warunki korzystania', '.'],
  loading: 'Otwieramy prezent…',

  entryTitle: 'Zrealizuj prezent',
  entryBody: 'Wpisz kod z kartki lub z wiadomości, a potem zaloguj się przez Apple tym samym kontem, którego używasz w aplikacji Yorix — subskrypcja włączy się od razu.',
  entryLabel: 'Kod prezentu',
  entryGo: 'Dalej',
  entryShort: 'Kod ma 12 znaków — sprawdź, czy jest cały.',
  enterCode: 'Wpisz kod ręcznie',

  alreadySubscribed: {
    summary: 'Mam już subskrypcję',
    web: 'Opłacona na stronie — czas z prezentu po prostu się do niej doliczy.',
    store: (date) =>
      `Kupiona w App Store — prezent biegłby równolegle i zapłacisz dwa razy za te same dni. Lepiej wyłączyć automatyczne odnawianie i zrealizować prezent, gdy subskrypcja się skończy: kod jest ważny do ${date}.`,
  },
  scamNote: 'Nigdy nie prosimy o telefon, płatność ani przesłanie kodu — ani przed realizacją, ani po niej.',
  popupHint: 'Okno logowania się nie otworzyło? Otwórz tę stronę w Safari lub innej przeglądarce — link pozostaje ten sam.',
  popupBlocked: 'Przeglądarka zamknęła okno logowania. Zezwól na wyskakujące okienka i kliknij ponownie.',
  signInError: 'Nie udało się zalogować. Spróbuj ponownie.',

  ownGiftTitle: 'To prezent kupiony przez Ciebie',
  ownGiftConfirm: 'Ten prezent został kupiony w tej przeglądarce. Jeśli zrealizujesz go na swoim koncie, link przestanie działać dla osoby, dla której był. Zrealizować go dla siebie?',
  ownGiftKeep: 'Nie realizuj',
  ownGiftGoOn: 'Zrealizuj mimo to',

  errors: {
    notFound: 'Nie ma takiego prezentu. Sprawdź link albo kod.',
    redeemed: 'Ten prezent został już zrealizowany.',
    expired: 'Ten prezent stracił ważność.',
    cancelled: 'Ten prezent został anulowany.',
    replaced: 'Ten link już nie działa: kod został zastąpiony nowym. Poproś o nowy link osobę, która dała Ci prezent.',
    typo: 'Wygląda na to, że w kodzie jest literówka — porównaj go z kartką lub wiadomością.',
    locked: 'Zbyt wiele błędnych kodów: realizacja dla tego konta jest wstrzymana na dobę. Spróbuj jutro albo napisz do nas.',
    rateLimited: 'Zbyt wiele prób pod rząd. Odczekaj minutę i spróbuj ponownie.',
    error: 'Nie udało się zrealizować prezentu. Spróbuj ponownie za minutę.',
  },

  done: {
    badge: 'Gotowe',
    thanks: 'Prezent zrealizowany — witamy w Yorix',
    paidLead: 'Subskrypcja działa do',
    openApp: 'Świat spokojnego snu już czeka — kontynuuj na iPhonie.',
    badgeTop: 'Pobierz w',
    scan: 'Zeskanuj kod aparatem telefonu, aby otworzyć Yorix w App Store',
    qrTitle: 'Otwórz kodem QR',
    qrHint: 'Skieruj na niego aparat iPhone’a',
    features: [
      { title: 'Prognozy snu', sub: 'już dostępne' },
      { title: 'Cała analityka', sub: 'bez ograniczeń' },
      { title: 'Trener AI 24/7', sub: 'zawsze pod ręką' },
      { title: 'Eksperckie poradniki', sub: 'i rekomendacje' },
    ],
    helpTitle: 'Potrzebujesz pomocy?',
    helpBody: 'Jesteśmy pod ręką i pomożemy, jeśli coś nie działa.',
    helpCta: 'Przejdź do wsparcia',
    noteTop: 'Spokojne noce — szczęśliwe dni',
    noteThanks: 'Dobrych nocy!',
  },
};
