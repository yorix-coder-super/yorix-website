import type { RedeemText } from './redeemCopy';

export const pt: RedeemText = {
  eyebrow: 'Uma subscrição de presente',
  cardFor: (name) => `Para ${name}`,
  cardPlan: (period) => `Subscrição Yorix ${period}`,
  periods: { week: 'por uma semana', month: 'por um mês', year: 'por um ano' },

  redeemTitle: 'Ofereceram-lhe uma subscrição do Yorix',
  redeemBody: 'A subscrição já é sua — falta um passo. Inicie sessão com a Apple na mesma conta que usa na app: é aí que ela fica ativa.',
  redeem: 'Resgatar com a Apple',
  redeemAccept: ['Ao resgatar o presente, aceita os ', 'termos de utilização', '.'],
  loading: 'A abrir o seu presente…',

  entryTitle: 'Resgatar um presente',
  entryBody: 'Introduza o código do cartão ou da mensagem e inicie sessão com a Apple na mesma conta que usa na app Yorix — a subscrição fica ativa de imediato.',
  entryLabel: 'Código do presente',
  entryHint: 'O e 0, I e 1 são lidos da mesma forma. Também pode colar aqui o link completo do presente.',
  enterCode: 'Introduzir o código à mão',

  alreadySubscribed: {
    summary: 'Já tenho uma subscrição',
    web: 'Paga no site — o tempo do presente é simplesmente somado a seguir.',
    store: (date) =>
      `Comprada na App Store — o presente correria em paralelo e pagaria duas vezes pelos mesmos dias. É melhor desativar a renovação e resgatar o presente quando ela terminar: o código é válido até ${date}.`,
  },
  scamNote: 'Nunca lhe pedimos para ligar, pagar ou reencaminhar o código — nem antes do resgate, nem depois.',
  popupHint: 'A janela de início de sessão não abriu? Abra esta página no Safari ou noutro navegador — o link é o mesmo.',
  popupBlocked: 'O navegador fechou a janela de início de sessão. Permita janelas pop-up e clique novamente.',
  signInError: 'Não foi possível iniciar sessão. Tente novamente.',

  ownGiftTitle: 'Este é o presente que comprou',
  ownGiftConfirm: 'Este presente foi comprado neste navegador. Se o resgatar na sua conta, o link deixa de funcionar para quem o vai receber. Resgatar para si?',
  ownGiftKeep: 'Deixar para a pessoa',
  ownGiftGoOn: 'Resgatar mesmo assim',

  errors: {
    notFound: 'Não existe esse presente. Verifique o link ou o código.',
    redeemed: 'Este presente já foi resgatado.',
    expired: 'Este presente expirou.',
    cancelled: 'Este presente foi cancelado.',
    replaced: 'Este link já não funciona: o código foi substituído por um novo. Peça o link novo a quem lhe ofereceu o presente.',
    typo: 'Parece haver uma gralha no código — compare-o com o cartão ou a mensagem.',
    locked: 'Demasiados códigos errados: o resgate está suspenso nesta conta durante um dia. Tente amanhã ou escreva-nos.',
    rateLimited: 'Demasiadas tentativas seguidas. Aguarde um minuto e tente novamente.',
    error: 'Não foi possível resgatar o presente. Tente novamente daqui a um minuto.',
  },

  done: {
    badge: 'Tudo pronto',
    thanks: 'Presente resgatado — boas-vindas ao Yorix',
    paidLead: 'A sua subscrição é válida até',
    openApp: 'Um mundo de noites calmas está à espera — continue no seu iPhone.',
    badgeTop: 'Descarregar na',
    scan: 'Aponte a câmara do telemóvel ao código para abrir o Yorix na App Store',
    qrTitle: 'Abrir com o código QR',
    qrHint: 'Aponte-lhe a câmara do iPhone',
    features: [
      { title: 'Previsões de sono', sub: 'já disponíveis' },
      { title: 'Todas as análises', sub: 'sem limites' },
      { title: 'Coach de IA 24/7', sub: 'sempre consigo' },
      { title: 'Guias de especialistas', sub: 'e recomendações' },
    ],
    helpTitle: 'Precisa de ajuda?',
    helpBody: 'Estamos aqui e ajudamos se alguma coisa não funcionar.',
    helpCta: 'Ir para o apoio',
    noteTop: 'Noites calmas, dias felizes',
    noteThanks: 'Boas noites de sono!',
  },
};
