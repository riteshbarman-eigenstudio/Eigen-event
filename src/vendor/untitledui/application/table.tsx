import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50">
        {columns.map((c) => (
          <th key={c} className="px-6 py-3 text-xs font-medium whitespace-nowrap text-gray-500">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-gray-200 last:border-0 hover:bg-gray-25">{children}</tr>;
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cx("px-6 py-4 text-gray-600", className)}>{children}</td>;
}
