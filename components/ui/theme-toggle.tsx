"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle"
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex items-center justify-center rounded-full border",
        "transition-all duration-200",
        "hover:border-accent-secondary hover:text-accent-secondary hover:bg-accent-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary",
        className
      )}
    >
      <span suppressHydrationWarning>
        {isDark ? (
          <Sun size={16} strokeWidth={2} aria-hidden />
        ) : (
          <Moon size={16} strokeWidth={2} aria-hidden />
        )}
      </span>
    </button>
  );
}
