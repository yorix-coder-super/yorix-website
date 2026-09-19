import { BrandLogo } from '../../BrandLogo';

// The gift card: the generated night-sky art with the baby on a ribboned
// moon on the right, and the recipient's name, the wish and the period in the
// calm dark half on the left. The same card is the live preview while the
// buyer types and what the recipient sees when they open the link.
export function GiftCardView({ title, message, period, eyebrow }: { title: string; message: string; period?: string; eyebrow: string }) {
  return (
    <div className="relative isolate aspect-[3/2] w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#1E1B4B] shadow-[0_30px_90px_rgb(0_0_0/35%)]">
      <img alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" height={800} src="/art/gift-card.webp" width={1200} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#131132]/90 via-[#131132]/45 to-transparent" />
      <div className="flex h-full w-[62%] flex-col justify-between p-5 sm:p-7">
        <BrandLogo size="sm" tone="dark" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#FDE68A] sm:text-sm">{eyebrow}</p>
          <p className="mt-1 break-words text-2xl font-semibold leading-tight text-white sm:text-[2rem]">{title}</p>
          {message ? <p className="mt-2 line-clamp-3 break-words text-sm italic leading-6 text-white/80 sm:text-base">{message}</p> : null}
        </div>
        {period ? <p className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur sm:text-sm">{period}</p> : <span />}
      </div>
    </div>
  );
}
