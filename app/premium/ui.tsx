import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'light' | 'ghost' | 'dark';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition focus:outline-none focus-visible:ring-4 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100';

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-6 text-base',
  sm: 'min-h-10 px-4 text-sm',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[#6366F1] text-white shadow-[0_18px_45px_rgb(99_102_241/32%)] hover:bg-[#4F46E5] focus-visible:ring-[#818CF8]/40',
  light: 'bg-white text-[#1E1B4B] hover:bg-[#EEF2FF] focus-visible:ring-white/30',
  ghost: 'border border-white/15 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/25',
  dark: 'bg-[#1E1B4B] text-white hover:bg-[#312E81] focus-visible:ring-[#1E1B4B]/30',
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AnchorProps = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;
type ButtonProps = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if ('href' in props && props.href) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as ButtonProps;
  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`mb-3 text-sm font-semibold uppercase tracking-wide text-[#A78BFA] ${center ? 'text-center' : ''}`}>
      {children}
    </p>
  );
}

export function SectionTitle({ children, center = false, className = '' }: { children: ReactNode; center?: boolean; className?: string }) {
  return (
    <h2 className={`text-4xl font-semibold leading-tight text-white sm:text-5xl ${center ? 'text-center' : ''} ${className}`}>
      {children}
    </h2>
  );
}

export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-block animate-spin rounded-full border-2 border-current border-r-transparent`}
    />
  );
}
