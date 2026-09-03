type BrandLogoProps = {
  size?: 'sm' | 'md';
};

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  const imageSize = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';

  return (
    <span className="flex items-center gap-3">
      <img
        src="/app-icon.png"
        alt="Yorix app icon"
        className={`${imageSize} rounded-2xl shadow-sm`}
        width="1024"
        height="1024"
      />
      <span className="text-lg font-semibold text-[#1E1B4B]">Yorix</span>
    </span>
  );
}
