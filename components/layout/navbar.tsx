"use client";

import { useEffect, useState, useCallback } from "react";
import { navItems, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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



  // Show border + stronger bg after scrolling past hero fold
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy — checks element positions on every scroll tick
  useEffect(() => {
    /**
     * Strategy: for each observed section, measure how far its top edge
     * is from the TOP of the viewport.  We activate whichever section's
     * top is closest to 0 (i.e. has just scrolled past the top) while
     * still being ≤ 80% down the viewport.  This handles:
     *   • #home    — large sticky container (200vh)
     *   • #projects — 1px sentinel immediately after sticky releases
     *   • #about / #contact — normal full-height sections
     */
    const handleScrollSpy = () => {
      const viewportH = window.innerHeight;
      // Threshold: a section "activates" once its top is within 80% of viewport height
      const threshold = viewportH * 0.8;

      let bestId: SectionId = "home";
      let bestOffset = -Infinity; // largest negative offset wins (most-scrolled-past)

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // rect.top < threshold means the section top is above threshold line
        if (rect.top <= threshold) {
          // Among those above threshold, pick the one with the largest top
          // (i.e. the most recently entered section)
          if (rect.top > bestOffset) {
            bestOffset = rect.top;
            bestId = id;
          }
        }
      }

      setActiveSection(bestId);
    };

    handleScrollSpy(); // run once on mount
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);




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
          ? "border-b border-violet-700/60 bg-violet-900/90 backdrop-blur-md shadow-lg"
          : "bg-violet-900/70 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between pl-0 pr-6 py-4">
        {/* Logo / Name — clicking scrolls to #home */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className={cn(
            "font-heading text-lg font-bold transition-opacity hover:opacity-75",
            "text-white"
          )}
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
                      "relative px-3 py-2 text-base font-medium rounded-full transition-all duration-200",
                      "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px",
                      "after:origin-left after:bg-violet-400 after:transition-transform after:duration-200",
                      isActive
                        ? "bg-violet-500/30 text-white after:scale-x-100"
                        : "bg-transparent text-violet-200/80 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
