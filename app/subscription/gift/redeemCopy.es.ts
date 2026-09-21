import type { RedeemText } from './redeemCopy';

export const es: RedeemText = {
  eyebrow: 'Una suscripción de regalo',
  cardFor: (name) => `Para ${name}`,
  cardPlan: (period) => `Suscripción Yorix ${period}`,
  periods: { week: 'por una semana', month: 'por un mes', year: 'por un año' },

  redeemTitle: 'Te han regalado una suscripción a Yorix',
  redeemBody: 'La suscripción ya es tuya; solo queda un paso. Inicia sesión con Apple con la misma cuenta que usas en la app: ahí es donde se activará.',
  redeem: 'Canjear con Apple',
  redeemAccept: ['Al canjear el regalo, aceptas las ', 'condiciones de uso', '.'],
  loading: 'Abriendo tu regalo…',

  entryTitle: 'Canjear un regalo',
  entryBody: 'Introduce el código de la tarjeta o del mensaje y después inicia sesión con Apple con la misma cuenta que usas en la app Yorix; la suscripción se activa al momento.',
  entryLabel: 'Código del regalo',
  entryHint: 'Confundir O y 0, I y 1 no es problema: los leemos bien. También puedes pegar aquí el enlace del regalo entero.',
  enterCode: 'Introducir el código a mano',

  alreadySubscribed: {
    summary: 'Ya tengo una suscripción',
    web: 'Pagada en la web: el periodo del regalo se suma sin más.',
    store: (date) =>
      `Comprada en el App Store: el regalo correría en paralelo y pagarías dos veces por los mismos días. Es mejor desactivar la renovación y canjear el regalo cuando termine; el código es válido hasta el ${date}.`,
  },
  scamNote: 'Nunca te pedimos que llames, que pagues ni que reenvíes el código, ni antes del canje ni después.',
  popupHint: '¿No se ha abierto la ventana de inicio de sesión? Abre esta página en Safari o en otro navegador: el enlace es el mismo.',
  popupBlocked: 'El navegador cerró la ventana de inicio de sesión. Permite las ventanas emergentes y vuelve a pulsar.',
  signInError: 'No se pudo iniciar sesión. Inténtalo de nuevo.',

  ownGiftTitle: 'Este es el regalo que compraste',
  ownGiftConfirm: 'Este regalo se compró en este navegador. Si lo canjeas en tu cuenta, el enlace dejará de funcionar para quien iba a recibirlo. ¿Canjearlo para ti?',
  ownGiftKeep: 'No canjearlo',
  ownGiftGoOn: 'Canjearlo igualmente',

  errors: {
    notFound: 'Ese regalo no existe. Revisa el enlace o el código.',
    redeemed: 'Este regalo ya se ha canjeado.',
    expired: 'Este regalo ha caducado.',
    cancelled: 'Este regalo se ha cancelado.',
    replaced: 'Este enlace ya no funciona: el código se sustituyó por uno nuevo. Pídele el enlace nuevo a quien te hizo el regalo.',
    typo: 'Parece que hay una errata en el código; compáralo con la tarjeta o con el mensaje.',
    locked: 'Demasiados códigos incorrectos: el canje queda en pausa un día para esta cuenta. Inténtalo mañana o escríbenos.',
    rateLimited: 'Demasiados intentos seguidos. Espera un minuto y vuelve a intentarlo.',
    error: 'No se pudo canjear el regalo. Inténtalo de nuevo en un minuto.',
  },

  done: {
    badge: 'Canjeado',
    thanks: 'Gracias por elegir Yorix',
    paidLead: 'Tu suscripción está activa hasta el',
    openApp: 'Un mundo de noches tranquilas te espera: sigue desde tu iPhone.',
    badgeTop: 'Descárgalo en el',
    scan: 'Apunta con la cámara del teléfono al código para abrir Yorix en el App Store',
    qrTitle: 'Abrir con el código QR',
    qrHint: 'Apunta con la cámara del iPhone',
    features: [
      { title: 'Pronósticos de sueño', sub: 'ya disponibles' },
      { title: 'Todos los análisis', sub: 'sin límites' },
      { title: 'Coach con IA 24/7', sub: 'siempre contigo' },
      { title: 'Guías de expertos', sub: 'y recomendaciones' },
    ],
    helpTitle: '¿Necesitas ayuda?',
    helpBody: 'Estamos aquí y te ayudamos si algo no funciona.',
    helpCta: 'Ir a soporte',
    noteTop: 'Noches tranquilas, días felices',
    noteThanks: '¡Que descanses!',
  },
};
