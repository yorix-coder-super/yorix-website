import type { RedeemText } from './redeemCopy';

export const cs: RedeemText = {
  eyebrow: 'Předplatné jako dárek',
  cardFor: (name) => `Pro ${name}`,
  cardPlan: (period) => `Předplatné Yorix ${period}`,
  periods: { week: 'na týden', month: 'na měsíc', year: 'na rok' },

  redeemTitle: 'Někdo ti daroval předplatné Yorix',
  redeemBody: 'Předplatné už je tvoje — zbývá jediný krok. Přihlas se přes Apple stejným účtem jako v aplikaci: právě na něj se zapne.',
  redeem: 'Uplatnit přes Apple',
  redeemAccept: ['Uplatněním dárku přijímáš ', 'podmínky používání', '.'],
  loading: 'Otevíráme tvůj dárek…',

  entryTitle: 'Uplatnit dárek',
  entryBody: 'Zadej kód z kartičky nebo ze zprávy a pak se přihlas přes Apple stejným účtem jako v aplikaci Yorix — předplatné se hned zapne.',
  entryLabel: 'Kód dárku',
  entryGo: 'Pokračovat',
  entryShort: 'Kód má 12 znaků — zkontroluj, jestli je celý.',
  enterCode: 'Zadat kód ručně',

  alreadySubscribed: {
    summary: 'Předplatné už mám',
    web: 'Zaplacené na webu — doba z dárku se k němu jednoduše připočte.',
    store: (date) =>
      `Koupené v App Storu — dárek by běžel souběžně a stejné dny by byly zaplacené dvakrát. Vyplatí se vypnout automatické obnovení a dárek uplatnit, až předplatné skončí: kód platí do ${date}.`,
  },
  scamNote: 'Nikdy po tobě nechceme telefonát, platbu ani přeposlání kódu — ani před uplatněním, ani po něm.',
  popupHint: 'Přihlašovací okno se neotevřelo? Otevři tuhle stránku v Safari nebo v jiném prohlížeči — odkaz zůstává stejný.',
  popupBlocked: 'Prohlížeč zavřel přihlašovací okno. Povol vyskakovací okna a klikni znovu.',
  signInError: 'Přihlášení se nezdařilo. Zkus to znovu.',

  ownGiftTitle: 'Tohle je dárek z tvého nákupu',
  ownGiftConfirm: 'Tenhle dárek byl koupený v tomhle prohlížeči. Když ho uplatníš na svůj účet, obdarovanému přestane odkaz fungovat. Uplatnit ho na sebe?',
  ownGiftKeep: 'Neuplatňovat',
  ownGiftGoOn: 'Přesto uplatnit',

  errors: {
    notFound: 'Takový dárek neexistuje. Zkontroluj odkaz nebo kód.',
    redeemed: 'Tenhle dárek už byl uplatněný.',
    expired: 'Platnost dárku vypršela.',
    cancelled: 'Dárek byl zrušený.',
    replaced: 'Tenhle odkaz už neplatí: kód byl nahrazený novým. Popros o nový odkaz toho, kdo ti dárek dal.',
    typo: 'V kódu je nejspíš překlep — porovnej ho s kartičkou nebo se zprávou.',
    locked: 'Příliš mnoho špatných kódů: uplatnění je pro tenhle účet na den pozastavené. Zkus to zítra nebo nám napiš.',
    rateLimited: 'Příliš mnoho pokusů po sobě. Počkej minutu a zkus to znovu.',
    error: 'Dárek se nepodařilo uplatnit. Zkus to znovu za minutu.',
  },

  done: {
    badge: 'Uplatněno',
    thanks: 'Děkujeme, že jsi s Yorixem',
    paidLead: 'Předplatné ti běží do',
    openApp: 'Svět klidných nocí už čeká — pokračuj na iPhonu.',
    badgeTop: 'Stáhnout v',
    scan: 'Namiř fotoaparát telefonu na kód a Yorix se otevře v App Storu',
    qrTitle: 'Otevřít přes QR kód',
    qrHint: 'Namiř na něj fotoaparát iPhonu',
    features: [
      { title: 'Předpovědi spánku', sub: 'už fungují' },
      { title: 'Všechny analýzy', sub: 'bez omezení' },
      { title: 'AI kouč 24/7', sub: 'vždycky po ruce' },
      { title: 'Odborné články', sub: 'a doporučení' },
    ],
    helpTitle: 'Potřebuješ pomoc?',
    helpBody: 'Jsme tu a pomůžeme, když něco nefunguje.',
    helpCta: 'Přejít na podporu',
    noteTop: 'Klidné noci — šťastné dny',
    noteThanks: 'Ať se ti dobře spí!',
  },
};
