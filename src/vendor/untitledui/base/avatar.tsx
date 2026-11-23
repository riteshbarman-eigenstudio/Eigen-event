import { cx } from "../utils/cx";

const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-md" } as const;

export function Avatar({ name, size = "md", className }: { name: string; size?: keyof typeof sizes; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 font-semibold text-gray-600",
        sizes[size],
        className,
      )}
      aria-label={name}
    >
      {initials}
    </span>
  );
}
