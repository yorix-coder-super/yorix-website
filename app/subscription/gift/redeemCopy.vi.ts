import type { RedeemText } from './redeemCopy';

export const vi: RedeemText = {
  eyebrow: 'Gói đăng ký làm quà tặng',
  cardFor: (name) => `Gửi ${name}`,
  cardPlan: (period) => `Gói đăng ký Yorix ${period}`,
  periods: { week: 'một tuần', month: 'một tháng', year: 'một năm' },

  redeemTitle: 'Bạn được tặng một gói đăng ký Yorix',
  redeemBody: 'Gói đăng ký đã là của bạn — chỉ còn một bước. Hãy đăng nhập bằng Apple với đúng tài khoản bạn dùng trong ứng dụng: gói sẽ được kích hoạt ở đó.',
  redeem: 'Đổi quà bằng Apple',
  redeemAccept: ['Khi đổi quà, bạn chấp nhận ', 'điều khoản sử dụng', '.'],
  loading: 'Đang mở món quà của bạn…',

  entryTitle: 'Đổi quà tặng',
  entryBody: 'Nhập mã trên thiệp hoặc trong tin nhắn, rồi đăng nhập bằng Apple với đúng tài khoản bạn dùng trong ứng dụng Yorix — gói đăng ký sẽ bật ngay.',
  entryLabel: 'Mã quà tặng',
  entryGo: 'Tiếp tục',
  entryShort: 'Mã gồm 12 ký tự — hãy kiểm tra xem đã nhập đủ chưa.',
  enterCode: 'Nhập mã thủ công',

  alreadySubscribed: {
    summary: 'Tôi đã có gói đăng ký',
    web: 'Nếu đã thanh toán trên trang web, thời hạn của quà tặng sẽ được cộng thêm vào sau.',
    store: (date) =>
      `Nếu mua trong App Store, quà tặng sẽ chạy song song và bạn trả tiền hai lần cho cùng những ngày đó. Tốt hơn là tắt tự động gia hạn rồi đổi quà khi gói cũ kết thúc: mã có giá trị đến ${date}.`,
  },
  scamNote: 'Chúng tôi không bao giờ yêu cầu bạn gọi điện, trả tiền hay chuyển mã cho ai — dù trước hay sau khi đổi quà.',
  popupHint: 'Cửa sổ đăng nhập không mở? Hãy mở trang này trong Safari hoặc trình duyệt khác — liên kết vẫn như cũ.',
  popupBlocked: 'Trình duyệt đã đóng cửa sổ đăng nhập. Hãy cho phép cửa sổ bật lên rồi nhấn lại.',
  signInError: 'Đăng nhập không thành công. Vui lòng thử lại.',

  ownGiftTitle: 'Đây là món quà chính bạn đã mua',
  ownGiftConfirm: 'Món quà này được mua trên trình duyệt này. Nếu bạn đổi nó vào tài khoản của mình, liên kết sẽ không còn dùng được cho người nhận. Đổi quà cho chính bạn?',
  ownGiftKeep: 'Để dành cho người nhận',
  ownGiftGoOn: 'Vẫn đổi quà',

  errors: {
    notFound: 'Không có món quà nào như vậy. Hãy kiểm tra lại liên kết hoặc mã.',
    redeemed: 'Món quà này đã được đổi rồi.',
    expired: 'Món quà này đã hết hạn.',
    cancelled: 'Món quà này đã bị hủy.',
    replaced: 'Liên kết này không còn dùng được: mã đã được thay bằng mã mới. Hãy xin liên kết mới từ người đã tặng quà cho bạn.',
    typo: 'Có vẻ mã bị gõ nhầm — hãy đối chiếu với thiệp hoặc tin nhắn.',
    locked: 'Quá nhiều mã sai: việc đổi quà trên tài khoản này tạm dừng trong một ngày. Hãy thử lại vào ngày mai hoặc viết cho chúng tôi.',
    rateLimited: 'Quá nhiều lần thử liên tiếp. Hãy đợi một phút rồi thử lại.',
    error: 'Không đổi được quà tặng. Vui lòng thử lại sau một phút.',
  },

  done: {
    badge: 'Xong',
    thanks: 'Đã đổi quà — chào mừng bạn đến với Yorix',
    paidLead: 'Gói đăng ký có hiệu lực đến',
    openApp: 'Một thế giới giấc ngủ yên bình đang chờ — hãy tiếp tục trên iPhone của bạn.',
    badgeTop: 'Tải về trên',
    scan: 'Hướng camera điện thoại vào mã để mở Yorix trong App Store',
    qrTitle: 'Mở bằng mã QR',
    qrHint: 'Hướng camera iPhone vào mã',
    features: [
      { title: 'Dự báo giấc ngủ', sub: 'đã sẵn sàng' },
      { title: 'Toàn bộ phân tích', sub: 'không giới hạn' },
      { title: 'Cố vấn AI 24/7', sub: 'luôn bên bạn' },
      { title: 'Hướng dẫn chuyên gia', sub: 'và lời khuyên' },
    ],
    helpTitle: 'Cần trợ giúp?',
    helpBody: 'Chúng tôi luôn ở đây và sẽ giúp nếu có gì đó không hoạt động.',
    helpCta: 'Đến trang hỗ trợ',
    noteTop: 'Đêm bình yên, ngày hạnh phúc',
    noteThanks: 'Ngủ ngon nhé!',
  },
};
