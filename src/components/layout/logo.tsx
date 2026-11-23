import { cx } from "@/vendor/untitledui/utils/cx";

/** Eigen Event mark: charcoal tile, white lambda, grey up-right arrow. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cx("size-8", className)} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#262A32" />
      <path d="M14.5 11.5 33.5 37M25.3 25.6 14.5 37" fill="none" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.5 18.5 36.5 11.5M30.5 11.5h6v6" fill="none" stroke="#A3A2A9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
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
