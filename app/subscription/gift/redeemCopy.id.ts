import type { RedeemText } from './redeemCopy';

export const id: RedeemText = {
  eyebrow: 'Hadiahkan langganan',
  cardFor: (name) => `Untuk ${name}`,
  cardPlan: (period) => `Langganan Yorix ${period}`,
  periods: { week: 'selama seminggu', month: 'selama sebulan', year: 'selama setahun' },

  redeemTitle: 'Anda mendapat hadiah langganan Yorix',
  redeemBody:
    'Langganannya sudah jadi milik Anda — tinggal satu langkah. Masuk dengan Apple memakai akun yang sama seperti di aplikasi: di situlah langganan akan aktif.',
  redeem: 'Aktifkan dengan Apple',
  redeemAccept: ['Dengan mengaktifkan hadiah ini, Anda menyetujui ', 'ketentuan penggunaan', '.'],
  loading: 'Membuka hadiah Anda…',

  entryTitle: 'Aktifkan hadiah',
  entryBody:
    'Masukkan kode dari kartu atau pesan, lalu masuk dengan Apple memakai akun yang sama seperti di aplikasi Yorix — langganan langsung aktif.',
  entryLabel: 'Kode hadiah',
  entryGo: 'Lanjutkan',
  entryShort: 'Kode ini terdiri dari 12 karakter — periksa apakah sudah lengkap.',
  entryHint:
    'Tertukar antara O dan 0, I dan 1 tidak masalah: kami membacanya dengan benar. Anda juga bisa menempelkan seluruh tautan hadiah di sini.',
  enterCode: 'Masukkan kode secara manual',

  alreadySubscribed: {
    summary: 'Saya sudah punya langganan',
    web: 'Dibayar di situs web — masa hadiah tinggal ditambahkan ke sana.',
    store: (date) =>
      `Dibeli di App Store — hadiahnya akan berjalan berbarengan dan Anda membayar dua kali untuk hari yang sama. Lebih baik matikan perpanjangan otomatisnya dan aktifkan hadiah setelah langganan itu berakhir: kodenya berlaku sampai ${date}.`,
  },
  scamNote:
    'Kami tidak pernah meminta Anda menelepon, membayar, atau meneruskan kode kepada siapa pun — baik sebelum maupun sesudah aktivasi.',
  popupHint:
    'Jendela masuk tidak terbuka? Buka halaman ini di Safari atau peramban lain — tautannya tetap sama.',
  popupBlocked: 'Peramban menutup jendela masuk. Izinkan pop-up, lalu tekan lagi.',
  signInError: 'Gagal masuk. Silakan coba lagi.',

  ownGiftTitle: 'Ini hadiah yang Anda beli',
  ownGiftConfirm:
    'Hadiah ini dibeli dari peramban ini. Kalau Anda aktifkan di akun sendiri, tautannya tidak akan berfungsi lagi untuk penerimanya. Aktifkan untuk diri sendiri?',
  ownGiftKeep: 'Biarkan untuk penerimanya',
  ownGiftGoOn: 'Tetap aktifkan',

  errors: {
    notFound: 'Hadiah seperti itu tidak ada. Periksa tautan atau kodenya.',
    redeemed: 'Hadiah ini sudah diaktifkan.',
    expired: 'Masa berlaku hadiah ini sudah habis.',
    cancelled: 'Hadiah ini dibatalkan.',
    replaced:
      'Tautan ini tidak berlaku lagi: kodenya diganti dengan yang baru. Mintalah tautan baru kepada orang yang memberi Anda hadiah ini.',
    typo: 'Sepertinya ada salah ketik pada kode — cocokkan dengan kartu atau pesannya.',
    locked:
      'Terlalu banyak kode yang salah: aktivasi untuk akun ini dijeda selama sehari. Coba lagi besok atau hubungi kami.',
    rateLimited: 'Terlalu banyak percobaan beruntun. Tunggu satu menit, lalu coba lagi.',
    error: 'Hadiah tidak berhasil diaktifkan. Coba lagi semenit lagi.',
  },

  done: {
    badge: 'Aktif',
    thanks: 'Terima kasih sudah memilih Yorix',
    paidLead: 'Langganan Anda berlaku sampai',
    openApp: 'Dunia tidur yang tenang sudah menunggu — lanjutkan dari iPhone Anda.',
    badgeTop: 'Unduh di',
    scan: 'Arahkan kamera ponsel ke kode ini untuk membuka Yorix di App Store',
    qrTitle: 'Buka dengan kode QR',
    qrHint: 'Arahkan kamera iPhone ke kode ini',
    features: [
      { title: 'Prakiraan tidur', sub: 'sudah aktif' },
      { title: 'Semua analitik', sub: 'tanpa batas' },
      { title: 'Pelatih AI 24/7', sub: 'kapan pun dibutuhkan' },
      { title: 'Panduan dari ahli', sub: 'beserta rekomendasinya' },
    ],
    helpTitle: 'Perlu bantuan?',
    helpBody: 'Kami selalu siap dan akan membantu kalau ada yang tidak berfungsi.',
    helpCta: 'Ke halaman bantuan',
    noteTop: 'Malam tenang — hari bahagia',
    noteThanks: 'Selamat tidur nyenyak!',
  },
};
