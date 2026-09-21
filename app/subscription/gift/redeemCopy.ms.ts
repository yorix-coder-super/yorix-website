import type { RedeemText } from './redeemCopy';

export const ms: RedeemText = {
  eyebrow: 'Hadiahkan langganan',
  cardFor: (name) => `Untuk ${name}`,
  cardPlan: (period) => `Langganan Yorix ${period}`,
  periods: { week: 'selama seminggu', month: 'selama sebulan', year: 'selama setahun' },

  redeemTitle: 'Anda menerima langganan Yorix sebagai hadiah',
  redeemBody:
    'Langganan ini sudah pun milik anda — tinggal satu langkah lagi. Log masuk dengan Apple menggunakan akaun yang sama seperti dalam aplikasi: di situlah ia akan aktif.',
  redeem: 'Tebus dengan Apple',
  redeemAccept: ['Dengan menebus hadiah ini, anda menerima ', 'syarat penggunaan', '.'],
  loading: 'Membuka hadiah anda…',

  entryTitle: 'Tebus hadiah',
  entryBody:
    'Masukkan kod daripada kad atau mesej, kemudian log masuk dengan Apple menggunakan akaun yang sama seperti dalam aplikasi Yorix — langganan akan aktif serta-merta.',
  entryLabel: 'Kod hadiah',
  entryGo: 'Teruskan',
  entryShort: 'Kod ini terdiri daripada 12 aksara — semak sama ada semuanya lengkap.',
  enterCode: 'Masukkan kod secara manual',

  alreadySubscribed: {
    summary: 'Saya sudah ada langganan',
    web: 'Dibayar di laman web — tempoh hadiah hanya akan ditambah kepadanya.',
    store: (date) =>
      `Dibeli di App Store — hadiah ini akan berjalan serentak dan anda membayar dua kali untuk hari yang sama. Lebih baik matikan pembaharuan automatik dan tebus hadiah apabila langganan itu tamat: kod ini sah sehingga ${date}.`,
  },
  scamNote:
    'Kami tidak sekali-kali meminta anda menelefon, membayar atau menyerahkan kod kepada sesiapa — sama ada sebelum penebusan mahupun selepasnya.',
  popupHint:
    'Tetingkap log masuk tidak terbuka? Buka halaman ini dalam Safari atau pelayar lain — pautannya tetap sama.',
  popupBlocked: 'Pelayar menutup tetingkap log masuk. Benarkan pop-up dan tekan sekali lagi.',
  signInError: 'Log masuk tidak berjaya. Sila cuba lagi.',

  ownGiftTitle: 'Ini hadiah yang anda beli',
  ownGiftConfirm:
    'Hadiah ini dibeli melalui pelayar ini. Jika anda menebusnya pada akaun sendiri, pautan itu tidak lagi berfungsi untuk penerimanya. Tebus untuk diri sendiri?',
  ownGiftKeep: 'Biarkan untuk penerimanya',
  ownGiftGoOn: 'Tebus juga',

  errors: {
    notFound: 'Hadiah sebegini tidak wujud. Semak pautan atau kodnya.',
    redeemed: 'Hadiah ini sudah ditebus.',
    expired: 'Tempoh hadiah ini sudah tamat.',
    cancelled: 'Hadiah ini telah dibatalkan.',
    replaced:
      'Pautan ini tidak berfungsi lagi: kodnya telah digantikan dengan yang baharu. Mintalah pautan baharu daripada orang yang memberi hadiah ini.',
    typo: 'Nampaknya ada kesilapan menaip pada kod — bandingkan dengan kad atau mesej.',
    locked:
      'Terlalu banyak kod yang salah: penebusan bagi akaun ini dijeda selama sehari. Cuba lagi esok atau hubungi kami.',
    rateLimited: 'Terlalu banyak percubaan berturut-turut. Tunggu seminit dan cuba lagi.',
    error: 'Hadiah tidak dapat ditebus. Sila cuba lagi dalam seminit.',
  },

  done: {
    badge: 'Aktif',
    thanks: 'Terima kasih kerana memilih Yorix',
    paidLead: 'Langganan anda sah sehingga',
    openApp: 'Dunia tidur yang tenang sudah menanti — teruskan pada iPhone anda.',
    badgeTop: 'Muat turun di',
    scan: 'Halakan kamera telefon ke kod ini untuk membuka Yorix dalam App Store',
    qrTitle: 'Buka dengan kod QR',
    qrHint: 'Halakan kamera iPhone ke arahnya',
    features: [
      { title: 'Ramalan tidur', sub: 'sudah tersedia' },
      { title: 'Semua analitik', sub: 'tanpa had' },
      { title: 'Jurulatih AI 24/7', sub: 'bila-bila anda perlukan' },
      { title: 'Panduan pakar', sub: 'dan cadangan' },
    ],
    helpTitle: 'Perlukan bantuan?',
    helpBody: 'Kami sentiasa ada dan akan membantu jika ada yang tidak berfungsi.',
    helpCta: 'Ke halaman sokongan',
    noteTop: 'Malam tenang — hari gembira',
    noteThanks: 'Selamat tidur!',
  },
};
