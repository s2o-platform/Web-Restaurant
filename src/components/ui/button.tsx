import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  block?: boolean;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-800 disabled:bg-slate-400",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 disabled:text-slate-300",
  danger:
    "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300",
};

export function Button({
  className,
  variant = "primary",
  block = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        block && "w-full",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
