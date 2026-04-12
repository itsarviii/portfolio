import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export default function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
