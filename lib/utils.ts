import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts.
 * Combines clsx (conditional classes) + tailwind-merge (deduplication).
 *
 * @example cn("px-4 py-2", isActive && "bg-accent-primary", "px-6") → "py-2 bg-accent-primary px-6"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
