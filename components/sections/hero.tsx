"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Hero section — 2-column split layout.
 *
 * Left column:
 *   - Availability badge pill
 *   - Large headline
 *   - Short subtext
 *   - Primary CTA (solid violet) + secondary CTA (outlined)
 *
 * Right column:
 *   - 4 stacked placeholder cards with browser-mockup style
 *     (3 traffic-light dots at top-left, category badge at bottom-right)
 *
 * Bottom strip:
 *   - Student badge  |  auto-scrolling marquee (skills)
 *
 * Responsive: single column on mobile.
 */

/* ─── Card definitions ──────────────────────────────────────────────────────
 *   Card 1 (back,   z=1): rotate(-6deg)  translate(-40px,  20px)  scale(1.00)
 *   Card 2          (z=2): rotate( 4deg)  translate( 30px, -10px)  scale(1.00)
 *   Card 3          (z=3): rotate(-3deg)  translate(-15px, -30px)  scale(1.00)
 *   Card 4 (front,  z=4): rotate( 2deg)  translate( 10px,  10px)  scale(1.05)
 * ─────────────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 1,
    rotate: -6, x: -40, y: 20, scale: 1, zIndex: 1,
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    label: "Tracker.io",
    accent: "#a855f7",
  },
  {
    id: 2,
    rotate: 4, x: 30, y: -10, scale: 1, zIndex: 2,
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    label: "Project Placeholder 2",
    accent: "#38bdf8",
  },
  {
    id: 3,
    rotate: -3, x: -15, y: -30, scale: 1, zIndex: 3,
    gradient: "linear-gradient(135deg, #0d2818 0%, #14532d 100%)",
    label: "Project Placeholder 3",
    accent: "#4ade80",
  },
  {
    id: 4,
    rotate: 2, x: 10, y: 10, scale: 1.05, zIndex: 4,
    gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
    label: "Project Placeholder 4",
    accent: "#fb923c",
  },
];

/* ─── Entrance animation helper ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});


/* ═══════════════════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════════════════ */
export function Hero() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative overflow-hidden bg-background"
    >
      {/* ── Ambient glow blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute", top: "-10%", left: "-5%",
            width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsla(262,70%,58%,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-5%", right: "5%",
            width: "40vw", height: "40vw", maxWidth: 480, maxHeight: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsla(210,100%,70%,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN 2-COLUMN GRID
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-20 pb-8 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">

        {/* ═══════════════════════════════════════════════
            LEFT COLUMN — Text + CTAs
        ═══════════════════════════════════════════════ */}
        <div className="flex flex-col gap-6">

          {/* Availability badge */}
          <motion.div {...fadeUp(0.1)}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                padding: "0.35rem 0.85rem", borderRadius: "9999px",
                border: "1px solid hsla(262,70%,58%,0.4)",
                background: "hsla(262,70%,58%,0.10)",
                fontSize: "0.78rem", fontWeight: 500,
                color: "hsl(262,80%,78%)", letterSpacing: "0.02em",
              }}
            >
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "block" }} />
                <span
                  style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background: "#4ade80",
                    animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
              </span>
              Available for freelance &amp; collaboration
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.22)}
            className="font-heading font-bold leading-tight tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Web Development Enthusiast &amp;{" "}
            <span
              style={{
                background: "linear-gradient(90deg, hsl(262,70%,58%) 0%, hsl(210,100%,65%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Information System Student
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.34)}
            className="max-w-md text-base leading-relaxed text-foreground/60 sm:text-lg"
          >
            Membangun antarmuka web yang bersih, performan, dan berpusat pada
            pengguna — sambil terus belajar dan mengeksplorasi teknologi baru.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.46)} className="flex flex-wrap items-center gap-3">
            {/* Primary — solid violet */}
            <button
              onClick={() => scrollTo("projects")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.72rem 1.5rem", borderRadius: "9999px",
                background: "hsl(262,70%,58%)", color: "#fff",
                fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.01em",
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px hsla(262,70%,58%,0.35)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Lihat Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Secondary — outlined */}
            <button
              onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.72rem 1.5rem", borderRadius: "9999px",
                background: "transparent", color: "hsl(var(--foreground))",
                fontSize: "0.9rem", fontWeight: 600,
                border: "1.5px solid hsl(var(--neutral-border))",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.borderColor = "hsl(262,70%,58%)";
                btn.style.color = "hsl(262,70%,58%)";
                btn.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.borderColor = "hsl(var(--neutral-border))";
                btn.style.color = "hsl(var(--foreground))";
                btn.style.transform = "translateY(0)";
              }}
            >
              Hubungi Saya
            </button>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            RIGHT COLUMN — Stacked browser-mockup cards
        ═══════════════════════════════════════════════ */}
        <div
          aria-hidden
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(320px, 42vw, 480px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.82, y: 60 }}
              animate={{
                opacity: 1,
                scale: card.scale,
                y: card.y,
                x: card.x,
                rotate: card.rotate,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                /* Uniform base size; card 4 scales via Framer Motion `scale` */
                width: "clamp(240px, 33vw, 400px)",
                height: "clamp(148px, 20vw, 245px)",
                borderRadius: "0.875rem",
                overflow: "hidden",
                /* Gradient fills the whole card — no dark browser-chrome base */
                background: card.gradient,
                border: `1.5px solid ${card.accent}28`,
                boxShadow: `
                  0 8px 28px rgba(0,0,0,0.28),
                  0 2px 8px  rgba(0,0,0,0.16),
                  inset 0 1px 0 rgba(255,255,255,0.07)
                `,
                zIndex: card.zIndex,
              }}
            >
              {/* Frosted project-name overlay — bottom of card */}
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  borderTop: `1px solid ${card.accent}20`,
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em",
                  }}
                >
                  {card.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM STRIP — Student badge (left) + Marquee (right)
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderTop: "1px solid hsl(var(--neutral-border) / 0.6)",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          alignItems: "center",
          /* Desktop: side-by-side; mobile: stacked */
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* ── Student badge ── */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.55rem",
            padding: "0.45rem 1rem", borderRadius: "9999px",
            border: "1px solid hsl(var(--neutral-border))",
            background: "hsl(var(--foreground) / 0.03)",
            flexShrink: 0,
          }}
        >
          {/* Graduation cap icon */}
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="hsl(262,70%,58%)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span
            style={{
              fontSize: "0.78rem", fontWeight: 500,
              color: "hsl(var(--foreground) / 0.65)",
              letterSpacing: "0.01em", whiteSpace: "nowrap",
            }}
          >
            4th Semester — Information Systems Student
          </span>
        </div>

        {/* ── Marquee skills ── */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            overflow: "hidden",
            /* Gradient fade-out on both sides */
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee-scroll 28s linear infinite",
            }}
          >
            {/* Repeat 4× so the loop is visually seamless */}
            {Array.from({ length: 4 }).map((_, gi) => (
              <span
                key={gi}
                style={{
                  display: "inline-flex", alignItems: "center",
                  gap: "2rem", paddingRight: "2rem",
                  fontSize: "0.82rem", fontWeight: 500,
                  color: "hsl(var(--foreground) / 0.38)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}
              >
                <span>Web Development</span>
                <span style={{ opacity: 0.35, fontSize: "0.55rem" }}>●</span>
                <span>Back-end Development</span>
                <span style={{ opacity: 0.35, fontSize: "0.55rem" }}>●</span>
                <span>UX Research</span>
                <span style={{ opacity: 0.35, fontSize: "0.55rem" }}>●</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
