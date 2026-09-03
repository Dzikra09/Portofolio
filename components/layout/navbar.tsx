"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { navItems, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_IDS = ["home", "projects", "about", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function hrefToId(href: string): SectionId | null {
  const id = href.replace("#", "") as SectionId;
  return SECTION_IDS.includes(id) ? id : null;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isClickScrolling = useRef(false);

  // Memastikan section aktif sesuai dengan hash pada URL saat pertama kali dimuat
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId;
    if (SECTION_IDS.includes(hash)) setActiveSection(hash);
  }, []);

  // Menambahkan deteksi scroll untuk mengaktifkan perubahan tampilan navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mendeteksi area mana yang sedang dilihat pengguna untuk memperbarui menu aktif
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;
      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      const viewportH = window.innerHeight;
      const threshold = viewportH * 0.4; // 40% dari tinggi layar
      let bestId: SectionId = "home";
      let bestOffset = -Infinity;

      // Paksa aktifkan contact jika pengguna sudah menggulir hingga dasar halaman
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
        return;
      }

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.top > bestOffset) {
          bestOffset = rect.top;
          bestId = id;
        }
      }
      setActiveSection(bestId);
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });

    const resizeObserver = new ResizeObserver(() => handleScrollSpy());
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      resizeObserver.disconnect();
    };
  }, []);

  // Menyesuaikan histori browser dan judul dokumen berdasarkan menu aktif
  useEffect(() => {
    if (activeSection === "home") {
      window.history.replaceState(null, "", "/");
      document.title = siteConfig.title;
    } else {
      const formatted = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
      window.history.replaceState(null, "", `/${activeSection}`);
      document.title = `${formatted} | ${siteConfig.name}`;
    }
  }, [activeSection]);

  // Mengatur pergerakan halus saat menu diklik dan menutup menu mobile
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setMobileOpen(false);
      
      const id = href.replace("#", "") as SectionId;
      if (SECTION_IDS.includes(id)) {
        setActiveSection(id);
        isClickScrolling.current = true;
      }
      
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
          
          // Re-enable scroll spy after smooth scrolling completes (estimasi 1 detik)
          setTimeout(() => {
            isClickScrolling.current = false;
          }, 1000);
        }, 50);
      }
    },
    []
  );

  // Menutup menu drop-down secara otomatis saat pengguna melakukan aktivitas scroll
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto w-auto min-w-[240px] md:min-w-0",
          "border transition-[background-color,border-color,box-shadow] duration-300 ease-in-out",
          mobileOpen ? "rounded-[24px]" : "rounded-full",
          isDark
            ? "bg-neutral-900/50 border-white/10"
            : "bg-white/60 border-black/5",
          "backdrop-blur-xl",
          isDark
            ? "shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
            : "shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
        )}
      >
        <nav
          className="flex items-center justify-between p-2"
          aria-label="Main navigation"
        >
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              aria-label="Kembali ke atas halaman"
              className="flex items-center gap-2 pl-1 pr-3 md:pr-4 group select-none outline-none"
            >
              <span className={cn(
                "relative flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border transition-colors",
                isDark ? "border-white/10 group-hover:border-violet-400" : "border-neutral-200 group-hover:border-violet-300"
              )}>
                <Image
                  src="/avatar.png"
                  alt="Dzikra Alfiyah Althaf"
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                  unoptimized
                  fetchPriority="high"
                />
              </span>
              <span className={cn(
                "text-[14.5px] md:text-[14px] font-semibold transition-colors whitespace-nowrap",
                isDark
                  ? "text-neutral-100 group-hover:text-violet-400"
                  : "text-neutral-900 group-hover:text-violet-600"
              )}>
                {siteConfig.name}
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-0.5 pr-2 md:pr-3" role="list">
              {navItems.map((item: { label: string; href: string }) => {
                const sectionId = hrefToId(item.href);
                const isActive  = sectionId === activeSection;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "px-3.5 py-1.5 text-[14px] font-medium rounded-full transition-all duration-200 whitespace-nowrap outline-none",
                        isActive
                          ? isDark
                            ? "bg-violet-500/15 text-violet-300"
                            : "bg-violet-50 text-violet-700"
                          : isDark
                            ? "text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 pl-1 md:pl-2">
            <ThemeToggle className={cn(
              "w-8 h-8 md:w-9 md:h-9 rounded-full border bg-transparent transition-all duration-200",
              isDark
                ? "border-white/10 text-neutral-300 hover:bg-white/10"
                : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"
            )} />

            <button
              id="mobile-menu-btn"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={cn(
                "md:hidden flex items-center justify-center transition-all duration-200 outline-none w-8 h-8 md:w-9 md:h-9 rounded-full border",
                mobileOpen
                  ? isDark
                    ? "border-white/10 text-neutral-200 bg-white/5"
                    : "border-neutral-200 text-neutral-700 bg-neutral-100"
                  : isDark
                    ? "border-white/10 text-neutral-300 hover:bg-white/10"
                    : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              )}
            >
              <span className="sr-only">{mobileOpen ? "Tutup" : "Menu"}</span>
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              )}
            </button>
          </div>
        </nav>

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
              className="overflow-hidden md:hidden"
            >
              <div className={cn("mx-3 h-px", isDark ? "bg-white/10" : "bg-neutral-100")} />

              <ul className="flex flex-col p-2 gap-1 mt-1 pb-3" role="list">
                {navItems.map((item: { label: string; href: string }, i: number) => {
                  const sectionId = hrefToId(item.href);
                  const isActive  = sectionId === activeSection;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.05, duration: 0.2 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "block w-full rounded-xl px-4 py-2.5 text-[14.5px] font-medium transition-all duration-150",
                          isActive
                            ? isDark
                              ? "bg-violet-500/15 text-violet-300"
                              : "bg-violet-50 text-violet-700"
                            : isDark
                              ? "text-neutral-300 hover:bg-white/5"
                              : "text-neutral-700 hover:bg-neutral-50"
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
      </motion.div>
    </div>
  );
}
