import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type BadgeColor = "gray" | "brand" | "success" | "warning" | "error";

const colors: Record<BadgeColor, string> = {
  gray: "bg-gray-50 text-gray-700 border-gray-200",
  brand: "bg-brand-600 text-white border-brand-600",
  success: "bg-success-50 text-success-700 border-success-600/20",
  warning: "bg-warning-50 text-warning-700 border-warning-600/20",
  error: "bg-error-50 text-error-700 border-error-600/20",
};

export function Badge({ children, color = "gray", className }: { children: ReactNode; color?: BadgeColor; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        colors[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
