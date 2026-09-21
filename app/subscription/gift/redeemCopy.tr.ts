import type { RedeemText } from './redeemCopy';

export const tr: RedeemText = {
  eyebrow: 'Hediye abonelik',
  cardFor: (name) => `${name} için`,
  cardPlan: (period) => `${period} Yorix aboneliği`,
  periods: { week: '1 haftalık', month: '1 aylık', year: '1 yıllık' },

  redeemTitle: 'Size bir Yorix aboneliği hediye edildi',
  redeemBody: 'Abonelik artık sizin — geriye tek bir adım kaldı. Uygulamada kullandığınız Apple hesabıyla giriş yapın: abonelik o hesaba tanımlanır.',
  redeem: 'Hediyeyi Apple ile kullan',
  redeemAccept: ['Hediyeyi kullanarak ', 'kullanım koşullarını', ' kabul etmiş olursunuz.'],
  loading: 'Hediyeniz açılıyor…',

  entryTitle: 'Hediye kodunu kullan',
  entryBody: 'Karttaki ya da mesajdaki kodu girin, ardından Yorix uygulamasında kullandığınız Apple hesabıyla giriş yapın — abonelik hemen açılır.',
  entryLabel: 'Hediye kodu',
  entryGo: 'Devam et',
  entryShort: 'Kod 12 karakterden oluşur — hepsini girdiğinizden emin olun.',
  entryHint: 'O ile 0, I ile 1 aynı şekilde okunur. Hediye bağlantısının tamamını da buraya yapıştırabilirsiniz.',
  enterCode: 'Kodu elle gir',

  alreadySubscribed: {
    summary: 'Zaten aboneliğim var',
    web: 'Sitede ödendiyse hediyenin süresi mevcut sürenin üzerine eklenir.',
    store: (date) =>
      `App Store’dan alındıysa hediye onunla paralel işler ve aynı günler için iki kez ödeme yaparsınız. Yenilemeyi kapatıp abonelik bitince hediyeyi kullanmanız daha iyi olur: kod ${date} tarihine kadar geçerli.`,
  },
  scamNote: 'Sizden asla aramanızı, ödeme yapmanızı ya da kodu başkasına iletmenizi istemeyiz — ne kullanmadan önce ne de sonra.',
  popupHint: 'Giriş penceresi açılmadı mı? Bu sayfayı Safari’de ya da başka bir tarayıcıda açın — bağlantı aynı kalır.',
  popupBlocked: 'Tarayıcı giriş penceresini kapattı. Açılır pencerelere izin verip tekrar basın.',
  signInError: 'Giriş yapılamadı. Lütfen tekrar deneyin.',

  ownGiftTitle: 'Bu, sizin satın aldığınız hediye',
  ownGiftConfirm: 'Bu hediye bu tarayıcıdan satın alındı. Kendi hesabınızda kullanırsanız bağlantı, hediyeyi alacak kişi için çalışmaz olur. Hediyeyi kendiniz için kullanmak istiyor musunuz?',
  ownGiftKeep: 'Alıcıya bırak',
  ownGiftGoOn: 'Yine de kullan',

  errors: {
    notFound: 'Böyle bir hediye yok. Bağlantıyı ya da kodu kontrol edin.',
    redeemed: 'Bu hediye daha önce kullanılmış.',
    expired: 'Bu hediyenin süresi dolmuş.',
    cancelled: 'Bu hediye iptal edilmiş.',
    replaced: 'Bu bağlantı artık çalışmıyor: kod yenisiyle değiştirildi. Hediyeyi veren kişiden yeni bağlantıyı isteyin.',
    typo: 'Kodda bir yazım hatası var gibi görünüyor — kartla ya da mesajla karşılaştırın.',
    locked: 'Çok fazla hatalı kod girildi: bu hesap için hediye kullanımı bir gün boyunca durduruldu. Yarın tekrar deneyin ya da bize yazın.',
    rateLimited: 'Arka arkaya çok fazla deneme yapıldı. Bir dakika bekleyip tekrar deneyin.',
    error: 'Hediye kullanılamadı. Lütfen bir dakika sonra tekrar deneyin.',
  },

  done: {
    badge: 'Hazır',
    thanks: 'Hediye kullanıldı — Yorix’e hoş geldiniz',
    paidLead: 'Aboneliğiniz şu tarihe kadar geçerli:',
    openApp: 'Huzurlu uykular dünyası sizi bekliyor — iPhone’unuzdan devam edin.',
    badgeTop: 'Şuradan indirin',
    scan: 'Yorix’i App Store’da açmak için telefonunuzun kamerasını koda tutun',
    qrTitle: 'QR kodla aç',
    qrHint: 'iPhone kameranızı koda tutun',
    features: [
      { title: 'Uyku tahminleri', sub: 'şimdiden açık' },
      { title: 'Tüm analizler', sub: 'sınırsız' },
      { title: '7/24 yapay zekâ koçu', sub: 'her zaman yanınızda' },
      { title: 'Uzman rehberleri', sub: 've öneriler' },
    ],
    helpTitle: 'Yardım mı lazım?',
    helpBody: 'Buradayız; bir şey çalışmazsa yardımcı oluruz.',
    helpCta: 'Desteğe git',
    noteTop: 'Sakin geceler — mutlu günler',
    noteThanks: 'İyi uykular!',
  },
};
