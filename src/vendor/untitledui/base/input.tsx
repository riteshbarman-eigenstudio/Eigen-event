import type { ComponentType, InputHTMLAttributes } from "react";
import { cx } from "../utils/cx";

type IconType = ComponentType<{ className?: string }>;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: IconType;
}

export function Input({ label, hint, error, icon: Icon, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-gray-400" />}
        <input
          id={inputId}
          className={cx(
            "h-11 w-full rounded-md border bg-white px-3.5 text-md text-gray-900 shadow-xs placeholder:text-gray-400",
            "disabled:bg-gray-50 disabled:text-gray-500",
            error ? "border-error-600" : "border-gray-300",
            Icon && "pl-10.5",
          )}
          {...props}
        />
      </div>
      {error ? <p className="text-sm text-error-600">{error}</p> : hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
    </div>
  );
}
