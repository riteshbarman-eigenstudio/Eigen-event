import type { InputHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hint?: string;
}

export function Checkbox({ label, hint, className, ...props }: CheckboxProps) {
  return (
    <label className={cx("flex cursor-pointer items-start gap-3", className)}>
      <input type="checkbox" className="mt-0.5 size-4 shrink-0 rounded-sm border-gray-300 accent-brand-600" {...props} />
      {(label || hint) && (
        <span className="flex flex-col">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {hint && <span className="text-sm text-gray-500">{hint}</span>}
        </span>
      )}
    </label>
  );
}
