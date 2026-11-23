import type { SelectHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, hint, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-md text-gray-900 shadow-xs"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}
