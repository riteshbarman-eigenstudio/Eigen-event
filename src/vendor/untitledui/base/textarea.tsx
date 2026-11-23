import type { TextareaHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export function Textarea({ label, hint, className, id, ...props }: TextareaProps) {
  const areaId = id ?? props.name;
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        rows={4}
        className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-md text-gray-900 shadow-xs placeholder:text-gray-400"
        {...props}
      />
      {hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}
