"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Thin wrapper around next-themes ThemeProvider.
 * Must be a Client Component — placed in layout.tsx above all children.
 *
 * Defaults:
 * - attribute="class" → dark mode via `.dark` class on <html>
 * - defaultTheme="light"
 * - enableSystem → respects OS preference on first visit
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
