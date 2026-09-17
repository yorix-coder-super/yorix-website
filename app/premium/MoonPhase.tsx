import type { PlanId } from './merchant';

// A week is a quarter of the lunar cycle, a month is the whole cycle, a year
// is twelve of them — the plan length drawn in the brand's own moon.
export function MoonPhase({ plan, className }: { plan: PlanId; className?: string }) {
  if (plan === 'year') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <g className="moon-slow-spin">
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <circle
              key={index}
              cx={32 + Math.cos(angle) * 26}
              cy={32 + Math.sin(angle) * 26}
              r="3.2"
              fill="#FDE68A"
              opacity={0.55 + (index / 12) * 0.45}
            />
          );
        })}
        </g>
        <circle cx="32" cy="32" r="13" fill="#FEF3C7" />
        <circle cx="27" cy="29" r="2.4" fill="#FDE68A" />
        <circle cx="36" cy="36" r="1.8" fill="#FDE68A" />
      </svg>
    );
  }

  if (plan === 'month') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <circle cx="32" cy="32" r="27" fill="none" stroke="#C7D2FE" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 4" />
        <circle cx="32" cy="32" r="19" fill="#FEF3C7" />
        <circle cx="25" cy="27" r="3.4" fill="#FDE68A" />
        <circle cx="38" cy="37" r="2.6" fill="#FDE68A" />
        <circle cx="37" cy="24" r="1.6" fill="#FDE68A" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="27" fill="none" stroke="#C7D2FE" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="32" cy="32" r="19" fill="#C7D2FE" fillOpacity="0.14" />
      <path d="M32 13a19 19 0 0 1 0 38Z" fill="#FEF3C7" />
    </svg>
  );
}
