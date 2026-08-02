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

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

/* ─── Shared constants ───────────────────────────────────────────────────── */
const CARD_W = 380;          // px — card width (same in hero + grid)
const IMG_H = 200;          // px — image/gradient area height
const BODY_H = 160;          // px — card body height
const CARD_H = IMG_H + BODY_H; // 360px total
const GAP = 24;           // px — grid gap

const COL_OFFSET = (CARD_W + GAP) / 2; // 202
const ROW_OFFSET = (CARD_H + GAP) / 2; // 192

// Right-column centre offset from viewport centre (≈1280px desktop)
const RIGHT_COL = 240;

/* ─── Card data — ONE definition, used everywhere ───────────────────────── */
const CARDS = [
  {
    id: 1,
    /* stacked (hero) */  startX: RIGHT_COL - 40, startY: 20, startR: -6, startS: 1.00,
    /* grid (projects) */ endX: -COL_OFFSET, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 1,
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    label: "Tracker.io",
    accent: "#a855f7",
    body: "tracker" as const,
  },
  {
    id: 2,
    startX: RIGHT_COL + 30, startY: -10, startR: 4, startS: 1.00,
    endX: COL_OFFSET, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 2,
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    label: "Project Placeholder 2",
    accent: "#38bdf8",
    body: "placeholder" as const,
  },
  {
    id: 3,
    startX: RIGHT_COL - 15, startY: -30, startR: -3, startS: 1.00,
    endX: -COL_OFFSET, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 3,
    gradient: "linear-gradient(135deg, #0d2818 0%, #14532d 100%)",
    label: "Project Placeholder 3",
    accent: "#4ade80",
    body: "placeholder" as const,
  },
  {
    id: 4,
    startX: RIGHT_COL + 10, startY: 10, startR: 2, startS: 1.05,
    endX: COL_OFFSET, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 4,
    gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
    label: "Project Placeholder 4",
    accent: "#fb923c",
    body: "placeholder" as const,
  },
] as const;

/* ─── Card bodies ─────────────────────────────────────────────────────────── */
function TrackerBody() {
  return (
    <div style={{ padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", background: "hsl(var(--background))" }}>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
        Tracker.io — Expense Tracker App
      </h3>
      <p style={{ fontSize: "0.8rem", color: "hsl(var(--foreground) / 0.58)", lineHeight: 1.6, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
        Aplikasi tracking pengeluaran dan pemasukan harian dengan dashboard realtime, kategorisasi transaksi, serta fitur tambah, edit, dan hapus
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {["React", "Vite", "JavaScript", "CSS3"].map((t) => (
          <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
        ))}
      </div>
      <Link
        href="/projects/expense-tracker"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none", marginTop: "0.15rem" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody() {
  return (
    <div style={{ padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", background: "hsl(var(--background))" }} aria-hidden>
      <div style={{ height: 16, width: "60%", borderRadius: 6, background: "hsl(var(--foreground) / 0.07)" }} />
      <div style={{ height: 11, width: "100%", borderRadius: 6, background: "hsl(var(--foreground) / 0.05)" }} />
      <div style={{ height: 11, width: "82%", borderRadius: 6, background: "hsl(var(--foreground) / 0.05)" }} />
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {[56, 40, 64].map((w) => (
          <div key={w} style={{ height: 18, width: w, borderRadius: 6, background: "hsl(var(--foreground) / 0.05)" }} />
        ))}
      </div>
      <div style={{ height: 14, width: "28%", borderRadius: 6, background: "hsl(var(--foreground) / 0.05)" }} />
    </div>
  );
}

/* ─── AnimatedCard — ONE per card (Rules of Hooks require component level) ─ */
interface AnimatedCardProps {
  card: (typeof CARDS)[number];
  progress: MotionValue<number>;
}

function AnimatedCard({ card, progress }: AnimatedCardProps) {
  // Movement: starts at hero position, ends at grid position
  const x = useTransform(progress, [0.25, 0.85], [card.startX, card.endX]);
  const y = useTransform(progress, [0.25, 0.85], [card.startY, card.endY + 220]);
  const rotate = useTransform(progress, [0.25, 0.85], [card.startR, card.endR]);
  const scale = useTransform(progress, [0.25, 0.85], [card.startS, card.endS]);

  // Card body is always visible — no fade-in effect

  return (
    <motion.div
      style={{
        position: "absolute",
        width: CARD_W,
        borderRadius: "0.875rem",
        overflow: "hidden",
        border: `1.5px solid ${card.accent}28`,
        boxShadow: `0 8px 28px rgba(0,0,0,0.26), 0 2px 8px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.07)`,
        zIndex: card.zIndex,
        x, y, rotate, scale,
      }}
    >
      {/* ── Image / gradient area ── */}
      <div style={{ width: "100%", height: IMG_H, background: card.gradient, position: "relative", flexShrink: 0 }}>
        {/* Frosted project-name overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0.5rem 0.8rem",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
          borderTop: `1px solid ${card.accent}20`,
        }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {card.label}
          </span>
        </div>
      </div>

      {/* ── Card body — fades in on landing ── */}
      <div style={{ height: BODY_H, overflow: "hidden" }}>
        {card.body === "tracker" ? <TrackerBody /> : <PlaceholderBody />}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */
export function HeroProjectsSection() {
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

  // ── Natural Scrolling Simulation ──
  // Instead of fading out, we move the elements vertically at the same speed as the user's scroll.
  // As the user scrolls 100vh (progress 0 -> 1), the elements move -100vh.
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);



  /**
   * z-index management for the sticky panel:
   * - Active (progress < 0.98): z-index 10 — above normal page flow
   * - Released (progress ≥ 0.98): z-index 0 — section below can surface
   * We use useMotionValueEvent to imperatively set the DOM style,
   * which is faster than a MotionValue on zIndex (avoids layout thrash).
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!stickyRef.current) return;
    stickyRef.current.style.zIndex = latest >= 0.98 ? "0" : "10";
  });

  // ── Toggle heading visibility and opacity as cards approach grid position ──
  // Smooth opacity transition between progress 0.65 and 0.80
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!headingRef.current) return;
    const opacity = latest < 0.65 ? 0 : latest > 0.80 ? 1 : (latest - 0.65) / 0.15;
    headingRef.current.style.opacity = opacity.toString();
    headingRef.current.style.visibility = latest >= 0.65 ? "visible" : "hidden";
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
          {/* ── Ambient glow blobs ── */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle, hsla(262,70%,58%,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div style={{ position: "absolute", bottom: "-5%", right: "5%", width: "40vw", height: "40vw", maxWidth: 480, maxHeight: 480, borderRadius: "50%", background: "radial-gradient(circle, hsla(210,100%,70%,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
          </div>

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
              padding: "0 clamp(1.5rem,5vw,4rem)",
              gap: "1.5rem",
            }}
          >
            {/* Availability badge */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.35rem 0.85rem", borderRadius: "9999px", border: "1px solid hsla(262,70%,58%,0.4)", background: "hsla(262,70%,58%,0.10)", fontSize: "0.78rem", fontWeight: 500, color: "hsl(262,80%,78%)", letterSpacing: "0.02em", width: "fit-content" }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "block" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
              </span>
              Available for freelance &amp; collaboration
            </span>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", margin: 0 }}>
              Web Development Enthusiast &amp;{" "}
              <span style={{ background: "linear-gradient(90deg, hsl(262,70%,58%) 0%, hsl(210,100%,65%) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Information System Student
              </span>
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: "hsl(var(--foreground) / 0.60)", lineHeight: 1.7, maxWidth: "26rem", margin: 0 }}>
              Membangun antarmuka web yang bersih, performan, dan berpusat pada pengguna — sambil terus belajar dan mengeksplorasi teknologi baru.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.7rem 1.45rem", borderRadius: "9999px", background: "hsl(262,70%,58%)", color: "#fff", fontSize: "0.88rem", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 20px hsla(262,70%,58%,0.35)" }}
              >
                Lihat Projects
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                style={{ display: "inline-flex", alignItems: "center", padding: "0.7rem 1.45rem", borderRadius: "9999px", background: "transparent", color: "hsl(var(--foreground))", fontSize: "0.88rem", fontWeight: 600, border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer" }}
              >
                Hubungi Saya
              </button>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════
              PHASE 1 — BOTTOM STRIP (badge + marquee, fades out)
          ══════════════════════════════════════════════════════ */}
          <motion.div
            style={{
              y: scrollYOffset,
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              borderTop: "1px solid hsl(var(--neutral-border) / 0.6)",
              padding: "1.1rem clamp(1.5rem,4vw,4rem)",
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

              To adjust vertical position: change the "-202px" in
              top: "calc(50% - 202px)"  →  increase = move up,
                                           decrease = move down.
              To adjust horizontal position: change the "-202px" in
              left: "calc(50% - 202px)"  to match the left card edge.
          ══════════════════════════════════════════════════════ */}
          <div
            ref={headingRef}
            style={{
              position: "absolute",
              /* ── Adjust these two values to move the heading ── */
              top: "calc(50% - 202px)", /* ↑ increase number = move up  */
              left: "max(1.5rem, calc(50% - 576px))", /* ← mirrors About section: px-6 + mx-auto max-w-6xl */
              /* ─────────────────────────────────────────────── */
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
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {CARDS.map((card) => (
              <AnimatedCard key={card.id} card={card} progress={scrollYProgress} />
            ))}
          </div>

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
      <div
        id="projects"
        aria-hidden
        style={{ height: 1, overflow: "hidden", position: "relative", opacity: 0, pointerEvents: "none" }}
      />

      {/* 
        Spacer to push the About section down.
        Since stickyRef has overflowY: "visible", the bottom cards (shifted by +220) will spill over its 100vh height.
        The bottom of the cards reach approx 50vh + 592px.
        So they overflow by (50vh + 592px) - 100vh = 592px - 50vh.
        We add 80px (5rem) extra gap -> 672px - 50vh.
      */}
      <div style={{ height: "max(5rem, calc(672px - 50vh))" }} />

      {/* AboutSection + ContactSection follow */}
    </>
  );
}
