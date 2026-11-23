import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { cx } from "../utils/cx";

type IconType = ComponentType<{ className?: string }>;

export type ButtonColor = "primary" | "secondary" | "tertiary" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const colors: Record<ButtonColor, string> = {
  primary: "bg-brand-600 text-white border border-brand-600 shadow-xs hover:bg-brand-700",
  secondary: "bg-white text-gray-700 border border-gray-300 shadow-xs hover:bg-gray-50",
  tertiary: "bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 hover:text-gray-900",
  destructive: "bg-error-600 text-white border border-error-600 shadow-xs hover:bg-error-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-1 px-3 text-sm",
  md: "h-10 gap-1.5 px-4 text-sm",
  lg: "h-11 gap-2 px-5 text-md",
};

export interface ButtonProps {
  children?: ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  href?: string;
  iconLeading?: IconType;
  iconTrailing?: IconType;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export function Button({
  children,
  color = "primary",
  size = "md",
  href,
  iconLeading: Leading,
  iconTrailing: Trailing,
  className,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const cls = cx(
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-semibold whitespace-nowrap transition",
    "disabled:pointer-events-none disabled:opacity-50",
    colors[color],
    sizes[size],
    className,
  );
  const content = (
    <>
      {Leading && <Leading className="size-5" />}
      {children}
      {Trailing && <Trailing className="size-5" />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls} {...rest}>
      {content}
    </button>
  );
}
