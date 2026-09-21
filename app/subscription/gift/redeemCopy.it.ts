import type { RedeemText } from './redeemCopy';

export const it: RedeemText = {
  eyebrow: 'Regala un abbonamento',
  cardFor: (name) => `Per ${name}`,
  cardPlan: (period) => `Abbonamento Yorix ${period}`,
  periods: { week: 'per una settimana', month: 'per un mese', year: 'per un anno' },

  redeemTitle: 'Ti hanno regalato un abbonamento Yorix',
  redeemBody:
    'L’abbonamento è già tuo: manca un passaggio. Accedi con Apple usando lo stesso account dell’app: è lì che arriverà.',
  redeem: 'Attiva con Apple',
  redeemAccept: ['Attivando il regalo accetti le ', 'condizioni d’uso', '.'],
  loading: 'Stiamo aprendo il regalo…',

  entryTitle: 'Attiva un regalo',
  entryBody:
    'Inserisci il codice che trovi sul biglietto o nel messaggio, poi accedi con Apple usando lo stesso account dell’app Yorix: l’abbonamento si attiva subito.',
  entryLabel: 'Codice regalo',
  entryGo: 'Continua',
  entryShort: 'Il codice è di 12 caratteri: controlla che ci siano tutti.',
  enterCode: 'Inserisci il codice a mano',

  alreadySubscribed: {
    summary: 'Ho già un abbonamento',
    web: 'Pagato sul sito: il periodo del regalo si aggiunge semplicemente a quello.',
    store: (date) =>
      `Attivato nell’App Store: il regalo andrebbe in parallelo e pagheresti due volte gli stessi giorni. Conviene disattivare il rinnovo e attivare il regalo quando l’abbonamento finisce: il codice è valido fino al ${date}.`,
  },
  scamNote:
    'Non ti chiediamo mai di chiamare, di pagare o di passare il codice a qualcuno — né prima dell’attivazione né dopo.',
  popupHint:
    'La finestra di accesso non si è aperta? Apri questa pagina in Safari o in un altro browser: il link resta lo stesso.',
  popupBlocked: 'Il browser ha chiuso la finestra di accesso. Consenti i pop-up e premi di nuovo.',
  signInError: 'Accesso non riuscito. Riprova.',

  ownGiftTitle: 'Questo è il regalo che hai comprato',
  ownGiftConfirm:
    'Questo regalo è stato comprato da questo browser. Se lo attivi sul tuo account, il link smette di funzionare per chi doveva riceverlo. Vuoi attivarlo per te?',
  ownGiftKeep: 'Lascialo a chi lo aspetta',
  ownGiftGoOn: 'Attivalo comunque',

  errors: {
    notFound: 'Questo regalo non esiste. Controlla il link o il codice.',
    redeemed: 'Questo regalo è già stato attivato.',
    expired: 'Questo regalo è scaduto.',
    cancelled: 'Questo regalo è stato annullato.',
    replaced:
      'Questo link non funziona più: il codice è stato sostituito con uno nuovo. Chiedi il nuovo link a chi ti ha fatto il regalo.',
    typo: 'Sembra che nel codice ci sia un errore di battitura: confrontalo con il biglietto o con il messaggio.',
    locked:
      'Troppi codici sbagliati: per questo account l’attivazione è sospesa per un giorno. Riprova domani oppure scrivici.',
    rateLimited: 'Troppi tentativi di fila. Aspetta un minuto e riprova.',
    error: 'Non è stato possibile attivare il regalo. Riprova tra un minuto.',
  },

  done: {
    badge: 'Attivato',
    thanks: 'Grazie per aver scelto Yorix',
    paidLead: 'Il tuo abbonamento è attivo fino al',
    openApp: 'Un mondo di sonno sereno ti aspetta: continua dal tuo iPhone.',
    badgeTop: 'Scaricala su',
    scan: 'Inquadra il codice con la fotocamera del telefono per aprire Yorix nell’App Store',
    qrTitle: 'Apri con il codice QR',
    qrHint: 'Inquadralo con la fotocamera dell’iPhone',
    features: [
      { title: 'Previsioni del sonno', sub: 'già attive' },
      { title: 'Tutte le analisi', sub: 'senza limiti' },
      { title: 'Coach AI 24/7', sub: 'sempre al tuo fianco' },
      { title: 'Guide degli esperti', sub: 'e consigli' },
    ],
    helpTitle: 'Ti serve una mano?',
    helpBody: 'Ci siamo sempre e ti aiutiamo se qualcosa non funziona.',
    helpCta: 'Vai all’assistenza',
    noteTop: 'Notti serene — giornate felici',
    noteThanks: 'Sogni d’oro!',
  },
};
