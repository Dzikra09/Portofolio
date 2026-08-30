"use client";

/**
 * HeroProjectsSection
 *
 * SINGLE component that replaces Hero + ScrollCardTransition + ProjectsSection.
 * The 4 cards exist EXACTLY ONCE — they start stacked on the right side of
 * the hero layout, then animate into a 2×2 projects grid as the user scrolls.
 *
 * Layout
 * ──────
 *  • 300vh outer scroll container  (creates scroll "room" for the transition)
 *  • 100vh sticky inner panel       (stays in view throughout)
 *  • 3 scroll phases:
 *      0 →  0.35  Hero mode    — left text visible, cards stacked on right
 *      0.25→ 0.75  Transition  — cards move from stacked to 2×2 grid
 *      0.60→ 1.00  Projects    — heading + card bodies fade in
 *
 * Start positions (cards on right side of hero, ~1280px viewport):
 *   Right-column centre is ≈ +240px from viewport centre (max-w-7xl layout).
 *   Each card's startX = 240 + card-specific x-offset from hero.tsx.
 *
 * End positions (2×2 grid centred in viewport):
 *   Card total height: image(200px) + body(160px) = 360px
 *   Column offset: (380px card-width + 24px gap) / 2 = 202px
 *   Row    offset: (360px card-height + 24px gap) / 2 = 192px
 */

import React, { useRef, useCallback, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

/* ─── Cursor-following circle — injected once ───────────────────────────── */
const CURSOR_STYLE = `
  .proj-card-area, .proj-card-area * { cursor: none !important; }
`;

/** Wraps the entire card and provides a smooth custom cursor following the mouse */
function ProjectCardHoverProvider({
  children,
  slug,
  enabled = true,
}: {
  children: React.ReactNode;
  slug: string;
  enabled?: boolean;
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const handleMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    setPos({ x: e.clientX, y: e.clientY });
  }, [enabled]);

  const handleEnter = React.useCallback(() => { if (enabled) setIsHovered(true); }, [enabled]);
  const handleLeave = React.useCallback(() => setIsHovered(false), []);
  const handleClick = React.useCallback(() => {
    if (enabled) router.push(`/projects/${slug}`);
  }, [router, slug, enabled]);

  // Reset hover state when disabled (e.g. during transition)
  React.useEffect(() => {
    if (!enabled) setIsHovered(false);
  }, [enabled]);

  return (
    <div
      className={enabled ? "proj-card-area" : undefined}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
    >
      {children}
      {enabled && typeof document !== "undefined" && createPortal(
        <div
          style={{
            position: "fixed",
            left: pos?.x ?? 0,
            top: pos?.y ?? 0,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.4})`,
            opacity: isHovered ? 1 : 0,
            width: 72,
            height: 72,
            borderRadius: "9999px",
            background: "hsl(262,60%,72%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 99999,
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
          }}
        >
          <ArrowUpRight size={30} strokeWidth={2.5} color="#fff" />
        </div>,
        document.body
      )}
    </div>
  );
}
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

/* ─── Shared constants ───────────────────────────────────────────────────── */
const CARD_W = 368;          // px — card width: h-gap=24px, grid=3×368+2×24=1152=max-w-6xl ✓
const IMG_H = 200;          // px — image/gradient area height
const BODY_H = 128;          // px — card body height
const CARD_H = IMG_H + BODY_H; // 328px total
const GAP = 24;           // px — grid gap

const ROW_OFFSET = (CARD_H + GAP) / 2; // 192
const CARD_STEP = 392;         // px — col step: CARD_W+24=392 → h-gap=24px = v-gap ✓

// Right-column centre offset from viewport centre (≈1280px desktop)
const RIGHT_COL = 240;

/* ─── Card data — ONE definition, used everywhere ───────────────────────── */
const CARDS = [
  {
    id: 1,
    slug: "expense-tracker",
    /* stacked (hero) */  startX: RIGHT_COL - 40, startY: 20, startR: -6, startS: 1.00,
    /* grid: top-left  */ endX: -CARD_STEP, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 1,
    animOrder: 1,
    gradient: "hsl(262,70%,58%)",
    label: "Web App",
    accent: "#a855f7",
    body: "tracker" as const,
  },
  {
    id: 2,
    slug: "placeholder-2",
    startX: RIGHT_COL + 30, startY: -10, startR: 4, startS: 1.00,
    /* grid: top-right */ endX: CARD_STEP, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 2,
    animOrder: 3,
    gradient: "hsl(262,70%,58%)",
    label: "Landing Page",
    accent: "#38bdf8",
    body: "placeholder2" as const,
  },
  {
    id: 3,
    slug: "placeholder-3",
    startX: RIGHT_COL - 15, startY: -30, startR: -3, startS: 1.00,
    /* grid: btm-left  */ endX: -CARD_STEP, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 3,
    animOrder: 4,
    gradient: "hsl(262,70%,58%)",
    label: "Dashboard",
    accent: "#4ade80",
    body: "placeholder3" as const,
  },
  {
    id: 4,
    slug: "placeholder-4",
    startX: RIGHT_COL + 10, startY: 10, startR: 2, startS: 1.05,
    /* grid: btm-right */ endX: CARD_STEP, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 4,
    animOrder: 6,
    gradient: "hsl(262,70%,58%)",
    label: "Web App",
    accent: "#fb923c",
    body: "placeholder4" as const,
  },
  {
    id: 5,
    slug: "placeholder-5",
    startX: RIGHT_COL - 25, startY: -45, startR: -1, startS: 0.98,
    /* grid: top-ctr   */ endX: 0, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 5,
    animOrder: 2,
    gradient: "hsl(262,70%,58%)",
    label: "Landing Page",
    accent: "#06b6d4",
    body: "placeholder5" as const,
  },
  {
    id: 6,
    slug: "placeholder-6",
    startX: RIGHT_COL + 20, startY: 35, startR: 5, startS: 0.96,
    /* grid: btm-ctr   */ endX: 0, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 6,
    animOrder: 5,
    gradient: "hsl(262,70%,58%)",
    label: "Dashboard",
    accent: "#eab308",
    body: "placeholder6" as const,
  },
] as const;

/* ─── Card bodies ─────────────────────────────────────────────────────────── */
function TrackerBody() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Tracker.io — Expense Tracker App
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["React", "Vite", "JavaScript", "CSS3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/expense-tracker"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody2() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 2
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-2"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody3() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 3
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-3"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody4() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 4
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-4"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody5() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 5
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-5"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody6() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 6
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-6"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function getCardBody(bodyType: string) {
  switch (bodyType) {
    case "tracker": return <TrackerBody />;
    case "placeholder2": return <PlaceholderBody2 />;
    case "placeholder3": return <PlaceholderBody3 />;
    case "placeholder4": return <PlaceholderBody4 />;
    case "placeholder5": return <PlaceholderBody5 />;
    case "placeholder6": return <PlaceholderBody6 />;
    default: return null;
  }
}

/* ─── AnimatedCard — ONE per card (Rules of Hooks require component level) ─ */
interface AnimatedCardProps {
  card: (typeof CARDS)[number];
  progress: MotionValue<number>;
}

function AnimatedCard({ card, progress }: AnimatedCardProps) {
  // Movement: starts at hero position, ends at grid position
  const x = useTransform(progress, [0.25, 0.85], [card.startX, card.endX]);
  const y = useTransform(progress, [0.25, 0.85], [card.startY, card.endY + 140]);
  const rotate = useTransform(progress, [0.25, 0.85], [card.startR, card.endR]);
  const scale = useTransform(progress, [0.25, 0.85], [card.startS, card.endS]);

  // Only enable cursor effect once cards have fully settled into grid (progress >= 0.85)
  const [settled, setSettled] = React.useState(false);
  useMotionValueEvent(progress, "change", (latest) => {
    setSettled(latest >= 0.85);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 + card.animOrder * 0.1, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: CARD_W,
        borderRadius: "0.875rem",
        overflow: "hidden",
        border: "none",
        boxShadow: `0 8px 28px rgba(0,0,0,0.26), 0 2px 8px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.07)`,
        zIndex: card.zIndex,
        pointerEvents: "auto",
        x, y, rotate, scale,
      }}
    >
      <ProjectCardHoverProvider slug={card.slug} enabled={settled}>
        {/* ── Image / gradient area ── */}
        <div style={{ width: "100%", height: IMG_H, background: card.gradient, position: "relative", flexShrink: 0, overflow: "hidden" }}>
          {/* Frosted project-name overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0.5rem 0.8rem",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            borderTop: `1px solid ${card.accent}20`,
            zIndex: 9,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {card.label}
            </span>
          </div>
        </div>

        {/* ── Card body — fades in on landing ── */}
        <div style={{ height: BODY_H, overflow: "hidden", background: "hsl(var(--background))" }}>
          {getCardBody(card.body)}
        </div>
      </ProjectCardHoverProvider>
    </motion.div>
  );
}

/** Mobile version of a single project card (needs its own ref for CursorCircle) */
function MobileProjectCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        borderRadius: "0.875rem",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "hsl(var(--background))",
      }}
    >
      <ProjectCardHoverProvider slug={card.slug}>
        <div style={{ width: "100%", height: 160, background: card.gradient, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0.5rem 0.8rem",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            borderTop: `1px solid ${card.accent}20`,
            zIndex: 9,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em" }}>
              {card.label}
            </span>
          </div>
        </div>
        <div style={{ height: BODY_H, overflow: "hidden" }}>
          {getCardBody(card.body)}
        </div>
      </ProjectCardHoverProvider>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE / TABLET LAYOUT (< 1024px)
   A clean, static version of the hero + projects. No scroll animation.

   Spacing tokens (consistent across all elements):
   --px:      1.5rem   horizontal padding (matches px-6 / About / Contact)
   --gap-sm:  0.75rem  small gap (badge margin, button gap)
   --gap-md:  1.25rem  medium gap (between text blocks)
   --gap-lg:  2rem     large gap (section internal spacing)
   --gap-xl:  3rem     section vertical padding
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileHeroProjects() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── Hero section ── */}
      <section
        id="home"
        aria-label="Hero section"
        style={{ background: "hsl(var(--background))", position: "relative", overflow: "hidden" }}
      >

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 720, margin: "0 auto",
          /* Top: navbar height (~60px) + 2.5rem breathing room. Bottom: 2rem before strip */
          padding: "calc(60px + 2.5rem) 1.5rem 2rem",
        }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2rem, 7vw, 3rem)",
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
              margin: "0 0 2.5rem",
            }}
          >
            Web Developer &amp; <br />
            <span style={{
              fontSize: "clamp(1.55rem, 5.5vw, 2.2rem)",
              whiteSpace: "nowrap",
              background: "linear-gradient(90deg, hsl(262,70%,58%) 0%, hsl(210,100%,65%) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Database Management
            </span>
          </motion.h1>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group relative overflow-hidden inline-flex items-center gap-[0.4rem] px-[1.45rem] py-[0.72rem] rounded-full bg-[hsl(262,70%,58%)] text-white text-[0.9rem] font-semibold border-none cursor-pointer shadow-[0_4px_20px_hsla(262,70%,58%,0.35)]"
            >
              <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="relative z-10 flex items-center gap-[0.4rem]">
                Lihat Projects
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.72rem 1.45rem", borderRadius: "9999px",
                background: "transparent", color: "hsl(var(--foreground))",
                fontSize: "0.9rem", fontWeight: 600,
                border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer",
              }}
            >
              Hubungi Saya
            </button>
          </motion.div>
        </div>

        {/* ── Bottom strip: badge + marquee stacked ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderTop: "1px solid hsl(var(--neutral-border) / 0.6)",
            padding: "1rem 1.5rem",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", gap: "0.65rem",
          }}
        >
          {/* Student badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 0.9rem", borderRadius: "9999px",
            border: "1px solid hsl(var(--neutral-border))",
            background: "hsl(var(--foreground) / 0.03)",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(262,70%,58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span style={{ fontSize: "0.77rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.65)", whiteSpace: "nowrap" }}>
              4th Semester — Information Systems Student
            </span>
          </div>
          {/* Discipline marquee — full-width, below badge */}
          <div style={{
            width: "100%", position: "relative", overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}>
            <div style={{ display: "flex", width: "max-content", animation: "marquee-scroll 22s linear infinite" }}>
              {Array.from({ length: 4 }).map((_, gi) => (
                <span key={gi} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", paddingRight: "1.5rem", fontSize: "0.75rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.38)", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  <span>Web Development</span>
                  <span style={{ opacity: 0.35, fontSize: "0.5rem" }}>●</span>
                  <span>Back-end Development</span>
                  <span style={{ opacity: 0.35, fontSize: "0.5rem" }}>●</span>
                  <span>UX Research</span>
                  <span style={{ opacity: 0.35, fontSize: "0.5rem" }}>●</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          ${CURSOR_STYLE}
        `}</style>
      </section>

      {/* ── Projects section ── */}
      <section
        id="projects"
        aria-label="Projects section"
        style={{ background: "hsl(var(--background))", padding: "3rem 1.5rem 4rem", scrollMarginTop: "2.5rem" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
            style={{ marginBottom: "1.5rem" }}
          >
            Project
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{
              display: "grid",
              /* 1 col on mobile, 2 cols when ≥ 480px, up to 300px per card */
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "1rem",
            }}
          >
            {CARDS.map((card) => (
              <MobileProjectCard key={card.id} card={card} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Responsive switcher: renders MobileHeroProjects on screens < 1024px,
 * or DesktopHeroProjects on screens >= 1024px.
 * Returns null on first render to avoid SSR/hydration mismatch.
 */
export function HeroProjectsSection() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Ensure scroll restoration to deep links (like /#projects) works after hydration
  useEffect(() => {
    if (isDesktop !== null) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "instant" });
          }
        }, 50);
      }
    }
  }, [isDesktop]);

  if (isDesktop === null) {
    return (
      <div id="home" style={{ position: "relative", height: "calc(200vh + max(0px, 512px - 50vh))", width: "100%" }}>
        <div id="projects" style={{ position: "absolute", top: "162vh", scrollMarginTop: "67vh", width: 1, height: 1 }} aria-hidden />
      </div>
    );
  }
  return isDesktop ? <DesktopHeroProjects /> : <MobileHeroProjects />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESKTOP LAYOUT (≥ 1024px) — Full scroll animation
   ═══════════════════════════════════════════════════════════════════════════ */
function DesktopHeroProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Force framer-motion useScroll to sync with browser scroll restoration
  // (Fixes issue where cards/heading stay hidden/stacked until user manually scrolls)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // ── Natural Scrolling Simulation ──
  // Instead of fading out, we move the elements vertically at the same speed as the user's scroll.
  // As the user scrolls 100vh (progress 0 -> 1), the elements move -100vh.
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);



  /**
   * We previously lowered zIndex at progress >= 0.98, but that caused the section
   * to disappear when scrolling up from the About section (due to stacking context).
   * IntersectionObserver doesn't require zIndex changes to detect the sentinel.
   */

  // ── Show heading with fadeInUp effect once cards are fully settled ──
  // Starts at progress 0.82 (cards finish at 0.85), fully visible at 0.95
  // Mimics About section's fadeInUp: opacity 0→1 + translateY 20px→0
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!headingRef.current) return;
    const t = latest < 0.82 ? 0 : latest > 0.95 ? 1 : (latest - 0.82) / 0.13;
    headingRef.current.style.opacity = t.toString();
    headingRef.current.style.visibility = latest >= 0.82 ? "visible" : "hidden";
    headingRef.current.style.transform = `translateY(${(1 - t) * 20}px)`;
  });

  return (
    <>
      {/*
        ══════════════════════════════════════════════════════════
        SCROLL CONTAINER

        Height = 200vh
        ─────────────────────────────────────────────────────────
        Scroll distance = containerHeight − viewportHeight
                        = 200vh − 100vh = 100vh

        Animation timeline (scrollYProgress × 100vh):
          0    →  8vh   Hero fade-in
          8vh  → 28vh   Hero text visible
          25vh → 78vh   Cards move from stacked → 2×2 grid
          58vh → 76vh   Projects heading fades in
          74vh → 94vh   Card bodies fade in  ← animation done at 94vh
          94vh → 100vh  6vh of clean "resting" state before sticky releases

        Sticky releases at exactly 100vh of scroll (container end),
        which is 6vh after everything is settled — no blank overhang.
        ══════════════════════════════════════════════════════════
      */}
      <div
        ref={containerRef}
        id="home"
        style={{ position: "relative", height: "200vh" }}
      >
        {/* 
          Sentinel for Navbar scroll-spy.
          Placed at 162vh so it crosses the 80vh viewport threshold exactly
          when scroll progress is 82vh (0.82), syncing perfectly with the
          heading fade-in animation.
        */}
        <div id="projects" style={{ position: "absolute", top: "162vh", scrollMarginTop: "67vh", width: 1, height: 1 }} aria-hidden />

        {/*
          ══════════════════════════════════════════════════════════
          STICKY PANEL — stays on screen for the 200vh scroll
          z-index starts at 10, drops to 0 at progress ≥ 0.98
          so the #projects sentinel below can be detected by
          the Intersection Observer once the sticky releases.
          ══════════════════════════════════════════════════════════
        */}
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflowX: "clip",
            overflowY: "visible",
            background: "hsl(var(--background))",
            zIndex: 10, /* initial; imperatively lowered at progress >= 0.98 */
          }}
        >

          {/* ══════════════════════════════════════════════════════
              LAYOUT WRAPPER — matches max-w-6xl bounds of other sections
          ══════════════════════════════════════════════════════ */}
          <div className="mx-auto h-full w-full max-w-6xl relative px-6">

            {/* ══════════════════════════════════════════════════════
                PHASE 1 — HERO CONTENT (left column, fades out)
            ══════════════════════════════════════════════════════ */}
            <motion.div
              style={{
                y: scrollYOffset,
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: "47%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0",
                gap: "2.5rem",
              }}
            >
              {/* Availability badge */}
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", margin: 0 }}
              >
                Web Developer &amp; <br />
                <span style={{ 
                  fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)", 
                  whiteSpace: "nowrap",
                  background: "linear-gradient(90deg, hsl(262,70%,58%) 0%, hsl(210,100%,65%) 100%)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent", 
                  backgroundClip: "text" 
                }}>
                  Database Management
                </span>
              </motion.h1>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
              >
                <button
                  onClick={() => scrollTo("projects")}
                  className="group relative overflow-hidden inline-flex items-center gap-[0.4rem] px-[1.45rem] py-[0.7rem] rounded-full bg-[hsl(262,70%,58%)] text-white text-[0.88rem] font-semibold border-none cursor-pointer shadow-[0_4px_20px_hsla(262,70%,58%,0.35)]"
                >
                  <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                  <span className="relative z-10 flex items-center gap-[0.4rem]">
                    Lihat Projects
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  style={{ display: "inline-flex", alignItems: "center", padding: "0.7rem 1.45rem", borderRadius: "9999px", background: "transparent", color: "hsl(var(--foreground))", fontSize: "0.88rem", fontWeight: 600, border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer" }}
                >
                  Hubungi Saya
                </button>
              </motion.div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════
              PHASE 1 — BOTTOM STRIP (badge + marquee, fades out)
          ══════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                y: scrollYOffset,
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                borderTop: "1px solid hsl(var(--neutral-border) / 0.6)",
                padding: "1.1rem 0",
                display: "flex", alignItems: "center",
                flexDirection: "row", flexWrap: "wrap", gap: "1rem",
                pointerEvents: "none",
              }}
            >
              {/* Student badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", padding: "0.4rem 0.95rem", borderRadius: "9999px", border: "1px solid hsl(var(--neutral-border))", background: "hsl(var(--foreground) / 0.03)", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(262,70%,58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span style={{ fontSize: "0.77rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.65)", whiteSpace: "nowrap" }}>
                  4th Semester — Information Systems Student
                </span>
              </div>

              {/* Marquee */}
              <div style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
                <div style={{ display: "flex", width: "max-content", animation: "marquee-scroll 28s linear infinite" }}>
                  {Array.from({ length: 4 }).map((_, gi) => (
                    <span key={gi} style={{ display: "inline-flex", alignItems: "center", gap: "2rem", paddingRight: "2rem", fontSize: "0.81rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.38)", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      <span>Web Development</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                      <span>Back-end Development</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                      <span>UX Research</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* ══════════════════════════════════════════════════════
              PHASE 3 — PROJECTS HEADING (above cards grid)
              Positioned absolutely above the 2×2 grid centre.
              Fades in as cards arrive at their grid positions.

              To adjust vertical position: change the "-282px" in
              top: "calc(50% - 282px)"  →  increase = move up,
                                           decrease = move down.
          ══════════════════════════════════════════════════════ */}
            <div
              ref={headingRef}
              style={{
                position: "absolute",
                /* ── Adjust this value to move the heading vertically ── */
                top: "calc(50% - 282px)",
                left: 0, /* Aligned to wrapper's px-6 edge */
                visibility: "hidden", /* shown imperatively via headingRef */
                opacity: 0,
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
                >
                  Project
                </motion.h2>
              </motion.div>
            </div>

            {/* ══════════════════════════════════════════════════════
              ALL 4 ANIMATED CARDS — the single source of truth
              Centred in the panel; x/y push them right in hero
              phase and distribute to 2×2 grid in projects phase.
          ══════════════════════════════════════════════════════ */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              {CARDS.map((card) => (
                <AnimatedCard key={card.id} card={card} progress={scrollYProgress} />
              ))}
            </div>

          </div> {/* End layout wrapper */}

          {/* Keyframes */}
          <style>{`
            @keyframes ping {
              75%, 100% { transform: scale(2.2); opacity: 0; }
            }
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>

      {/*
        ══════════════════════════════════════════════════════════
        #projects SCROLL-SPY ANCHOR

        This zero-height div lives in normal document flow, placed
        immediately after the sticky container ends (at the 200vh
        mark). The Intersection Observer in navbar.tsx targets this
        real DOM element — NOT the absolutely-positioned heading
        inside the sticky panel (which was unreliable).

        Why this works:
        • When the sticky panel releases (scroll = 100vh), this
          sentinel scrolls into view at the top of the viewport.
        • The navbar observer fires → activeSection = "projects".
        • z-index on the sticky has already dropped to 0 by this
          point (progress ≥ 0.98), so nothing is blocked.
        ══════════════════════════════════════════════════════════
      */}
      {/* (The #projects sentinel was moved inside the #home container above) */}

      {/* 
        Spacer to push the About section down.
        Since stickyRef has overflowY: "visible", the bottom cards will spill over its 100vh height.
        The center of the bottom cards is at 50vh + 192px (ROW_OFFSET) + 140px (y-shift) = 50vh + 332px.
        Card height is 360px, so the bottom edge is at 50vh + 332px + 180px = 50vh + 512px.
        So they overflow the 100vh container by (50vh + 512px) - 100vh = 512px - 50vh.
        We add exactly this overflow. The visual gap is naturally handled by AboutSection's padding.
      */}
      <div style={{ height: "max(0px, calc(512px - 50vh))" }} />

      {/* Hover overlay styles for project cards */}
      <style>{CURSOR_STYLE}</style>

      {/* AboutSection + ContactSection follow */}
    </>
  );
}
