import type { RedeemText } from './redeemCopy';

export const fr: RedeemText = {
  eyebrow: 'Un abonnement en cadeau',
  cardFor: (name) => `Pour ${name}`,
  cardPlan: (period) => `Abonnement Yorix ${period}`,
  periods: { week: 'pour une semaine', month: 'pour un mois', year: 'pour un an' },

  redeemTitle: 'On vous a offert un abonnement Yorix',
  redeemBody: 'L’abonnement est déjà à vous — il ne reste qu’une étape. Connectez-vous avec Apple, avec le même compte que dans l’app : c’est là qu’il s’activera.',
  redeem: 'Activer avec Apple',
  redeemAccept: ['En activant le cadeau, vous acceptez les ', 'conditions d’utilisation', '.'],
  loading: 'Ouverture de votre cadeau…',

  entryTitle: 'Activer un cadeau',
  entryBody: 'Saisissez le code de la carte ou du message, puis connectez-vous avec Apple avec le même compte que dans l’app Yorix — l’abonnement s’active aussitôt.',
  entryLabel: 'Code cadeau',
  entryGo: 'Continuer',
  entryShort: 'Le code compte 12 caractères — vérifiez qu’il est complet.',
  enterCode: 'Saisir le code à la main',

  alreadySubscribed: {
    summary: 'J’ai déjà un abonnement',
    web: 'Payé sur le site — la durée du cadeau s’y ajoutera simplement.',
    store: (date) =>
      `Acheté sur l’App Store — le cadeau courrait en parallèle et vous paieriez deux fois les mêmes jours. Mieux vaut désactiver le renouvellement et activer le cadeau à la fin de l’abonnement : le code est valable jusqu’au ${date}.`,
  },
  scamNote: 'Nous ne vous demandons jamais d’appeler, de payer ou de transmettre le code — ni avant l’activation, ni après.',
  popupHint: 'La fenêtre de connexion ne s’est pas ouverte ? Ouvrez cette page dans Safari ou un autre navigateur — le lien reste le même.',
  popupBlocked: 'Le navigateur a fermé la fenêtre de connexion. Autorisez les fenêtres pop-up et appuyez à nouveau.',
  signInError: 'La connexion a échoué. Veuillez réessayer.',

  ownGiftTitle: 'C’est le cadeau que vous avez acheté',
  ownGiftConfirm: 'Ce cadeau a été acheté depuis ce navigateur. Si vous l’activez sur votre compte, le lien cessera de fonctionner pour la personne à qui il est destiné. L’activer pour vous ?',
  ownGiftKeep: 'Ne pas activer',
  ownGiftGoOn: 'Activer quand même',

  errors: {
    notFound: 'Ce cadeau n’existe pas. Vérifiez le lien ou le code.',
    redeemed: 'Ce cadeau a déjà été activé.',
    expired: 'Ce cadeau a expiré.',
    cancelled: 'Ce cadeau a été annulé.',
    replaced: 'Ce lien ne fonctionne plus : le code a été remplacé par un nouveau. Demandez le nouveau lien à la personne qui vous a offert l’abonnement.',
    typo: 'Le code semble comporter une faute de frappe — comparez-le avec la carte ou le message.',
    locked: 'Trop de codes erronés : l’activation est suspendue pendant 24 heures pour ce compte. Réessayez demain ou écrivez-nous.',
    rateLimited: 'Trop de tentatives d’affilée. Patientez une minute, puis réessayez.',
    error: 'Le cadeau n’a pas pu être activé. Veuillez réessayer dans une minute.',
  },

  done: {
    badge: 'Activé',
    thanks: 'Merci d’avoir choisi Yorix',
    paidLead: 'Votre abonnement est actif jusqu’au',
    openApp: 'Un monde de nuits calmes vous attend — continuez sur votre iPhone.',
    badgeTop: 'Télécharger sur',
    scan: 'Pointez l’appareil photo de votre téléphone sur le code pour ouvrir Yorix dans l’App Store',
    qrTitle: 'Ouvrir avec le QR code',
    qrHint: 'Pointez l’appareil photo de votre iPhone',
    features: [
      { title: 'Prévisions de sommeil', sub: 'déjà actives' },
      { title: 'Toutes les analyses', sub: 'sans limite' },
      { title: 'Coach IA 24h/24', sub: 'quand vous voulez' },
      { title: 'Guides d’experts', sub: 'et recommandations' },
    ],
    helpTitle: 'Besoin d’aide ?',
    helpBody: 'Nous sommes là et nous vous aiderons si quelque chose ne fonctionne pas.',
    helpCta: 'Aller à l’assistance',
    noteTop: 'Nuits calmes — journées heureuses',
    noteThanks: 'Belles nuits à vous !',
  },
};
