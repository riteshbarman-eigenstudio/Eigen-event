import { cx } from "@/vendor/untitledui/utils/cx";

/** Eigen Event mark: light rounded tile, serif lambda with foot serifs, small calendar (event) glyph top right. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cx("size-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id="logo-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4E7EC" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="url(#logo-tile)" stroke="#E4E7EC" />
      <path d="M14 16h3.2L30 35.5M23.3 26.2 16.5 35.5" fill="none" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 37h9M25.5 37h9" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="31" y="8.5" width="9.5" height="8.5" rx="2" fill="none" stroke="#111827" strokeWidth="1.8" />
      <path d="M31 12h9.5M34 7v2.4M37.5 7v2.4" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5 text-h3 tracking-tight text-gray-900", className)}>
      <LogoMark />
      <span>
        <span className="font-light">eigen</span>
        <span className="font-bold">event</span>
      </span>
    </span>
  );
}
