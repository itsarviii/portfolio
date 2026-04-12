import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-accent-fg hover:opacity-90 active:opacity-80",
  secondary: "border border-border bg-transparent text-fg hover:bg-surface active:bg-surface/80",
  ghost: "bg-transparent text-fg hover:bg-surface active:bg-surface/80",
};

const sizes = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

type ButtonOwnProps = {
  as?: ElementType;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonOwnProps>;

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
