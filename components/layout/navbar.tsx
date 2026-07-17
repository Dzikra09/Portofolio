"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Sticky navbar with:
 * - Logo / site name on the left
 * - Anchor nav items from config/site.ts on the right
 * - Scroll-spy via Intersection Observer — highlights active section
 * - Sun/Moon theme toggle (lucide-react)
 * - Backdrop blur + border that fades in on scroll
 */

/** IDs of sections to observe — must match section id attributes on page */
const SECTION_IDS = ["home", "projects", "about", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

/** Derive section id from anchor href (e.g. "#projects" → "projects") */
function hrefToId(href: string): SectionId | null {
  const id = href.replace("#", "") as SectionId;
  return SECTION_IDS.includes(id) ? id : null;
}

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  // Initialise activeSection from URL hash on first load
  // — fixes direct-anchor URLs like /#projects being correct on page mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId;
    if (SECTION_IDS.includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  // Prevent hydration mismatch for theme icon
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show border + stronger bg after scrolling past hero fold
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy — Intersection Observer watches each section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Track which sections are currently intersecting
    const intersecting = new Map<SectionId, boolean>();

    const updateActive = () => {
      // Pick the first section (in DOM order) that is intersecting
      for (const id of SECTION_IDS) {
        if (intersecting.get(id)) {
          setActiveSection(id);
          return;
        }
      }
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          intersecting.set(id, entry.isIntersecting);
          updateActive();
        },
        {
          // Trigger when section occupies middle 40% of viewport
          rootMargin: "-10% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  /** Smooth-scroll to anchor, preventing browser default jump */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-violet-500/20 bg-violet-500/10 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Name — clicking scrolls to #home */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-heading text-lg font-bold text-foreground transition-opacity hover:opacity-75"
          aria-label="Kembali ke atas halaman"
        >
          {siteConfig.name}
        </a>

        {/* Nav items + Theme toggle */}
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex" role="list">
            {navItems.map((item) => {
              const sectionId = hrefToId(item.href);
              const isActive = sectionId === activeSection;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      "after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px",
                      "after:origin-left after:bg-violet-500 after:transition-transform after:duration-200",
                      isActive
                        ? "bg-violet-500/10 text-violet-500 after:scale-x-100"
                        : "bg-transparent text-foreground/60 hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-border",
              "text-foreground/70 transition-all duration-200",
              "hover:border-accent-secondary hover:text-accent-secondary hover:bg-accent-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
            )}
          >
            {mounted ? (
              isDark ? (
                <Sun size={16} strokeWidth={2} aria-hidden />
              ) : (
                <Moon size={16} strokeWidth={2} aria-hidden />
              )
            ) : (
              <span className="h-4 w-4 rounded-full bg-foreground/20" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
