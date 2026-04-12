"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [canTransition, setCanTransition] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Enable CSS transitions one frame after mount so the initial icon appears instantly
  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => setCanTransition(true));
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      suppressHydrationWarning
      whileTap={{ scale: 0.85 }}
      className={cn(
        "relative inline-flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-full border border-border text-fg transition-colors",
        "hover:bg-surface active:bg-surface/80",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <Sun
        size={18}
        data-toggle-sun
        className={cn("absolute", canTransition && "transition-all duration-200")}
      />
      <Moon
        size={18}
        data-toggle-moon
        className={cn("absolute", canTransition && "transition-all duration-200")}
      />
    </motion.button>
  );
}
