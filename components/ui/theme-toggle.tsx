"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle component with mounted check to prevent Next.js hydration mismatch errors.
 * Renders a neutral skeleton/placeholder before client-side hydration completes.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle theme"
        disabled
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-border",
          "text-foreground/70 opacity-70 cursor-wait",
          className
        )}
      >
        <span className="h-4 w-4 rounded-full bg-foreground/20 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-border",
        "text-foreground/70 transition-all duration-200",
        "hover:border-accent-secondary hover:text-accent-secondary hover:bg-accent-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary",
        className
      )}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={2} aria-hidden />
      ) : (
        <Moon size={16} strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
