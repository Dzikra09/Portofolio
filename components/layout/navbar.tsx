"use client";

import { useEffect, useState, useCallback } from "react";
import { navItems, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mobileOpen, setMobileOpen] = useState(false);

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

    // Re-run scroll spy when page height changes (e.g., after Hero hydration)
    const resizeObserver = new ResizeObserver(() => handleScrollSpy());
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      resizeObserver.disconnect();
    };
  }, []);

  // Sync URL hash with the active section as user scrolls
  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash !== activeSection) {
      window.history.replaceState(null, "", `#${activeSection}`);
    }
  }, [activeSection]);




  /** Smooth-scroll to anchor, preventing browser default jump */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        // Defer scroll slightly to allow mobile menu closing animation/state update
        // to not interrupt the smooth scrolling calculation.
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          // Update URL to reflect the current section
          window.history.pushState(null, "", href);
        }, 50);
      }
    },
    []
  );

  // Close mobile menu on scroll
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[hsl(262,70%,58%)] backdrop-blur-md shadow-lg"
          : "bg-[hsl(262,70%,58%)]"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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

        {/* Right side: desktop nav + theme toggle + hamburger */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Desktop nav links — hidden on mobile */}
          <ul className="hidden items-center gap-1.5 md:flex" role="list">
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
                      "relative px-4 py-2 text-[15px] font-medium rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-transparent text-white/80 hover:bg-white/15 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <ThemeToggle className="border-transparent bg-transparent text-white/90 hover:bg-white/15 hover:text-white hover:border-transparent focus-visible:ring-white/50" />

          {/* Hamburger button — visible only on mobile */}
          <button
            id="mobile-menu-btn"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/40 text-white transition-all duration-200 hover:bg-white/20 md:hidden"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">{mobileOpen ? "Tutup" : "Menu"}</span>
            {/* Animated hamburger / X icon */}
            <svg
              width="18" height="18" viewBox="0 0 18 18"
              fill="none" aria-hidden
            >
              <motion.path
                d="M 2 4.5 L 16 4.5"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                animate={{ d: mobileOpen ? "M 4 4 L 14 14" : "M 2 4.5 L 16 4.5" }}
                transition={{ duration: 0.22 }}
              />
              <motion.path
                d="M 2 9 L 16 9"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                style={{ transformOrigin: "center" }}
                transition={{ duration: 0.18 }}
              />
              <motion.path
                d="M 2 13.5 L 16 13.5"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                animate={{ d: mobileOpen ? "M 4 14 L 14 4" : "M 2 13.5 L 16 13.5" }}
                transition={{ duration: 0.22 }}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/20 bg-[hsl(262,70%,58%)] md:hidden"
          >
            <ul
              className="flex flex-col gap-1 px-4 py-3"
              role="list"
            >
              {navItems.map((item, i) => {
                const sectionId = hrefToId(item.href);
                const isActive = sectionId === activeSection;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05, duration: 0.22 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block w-full rounded-xl px-4 py-3 text-base font-medium transition-all duration-150",
                        isActive
                          ? "bg-white/20 text-white shadow-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
