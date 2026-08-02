"use client";

/**
 * ScrollCardTransition
 *
 * Creates a 200vh scroll container that acts as an animated bridge between
 * the Hero stacked cards and the Projects 2×2 grid.
 *
 * How it works:
 *  1. A <section> 200vh tall provides the scroll "room" for the transition.
 *  2. Inside, a sticky 100vh wrapper keeps the 4 cards on screen during scroll.
 *  3. useScroll tracks progress [0 → 1] over the 200vh container.
 *  4. useTransform maps progress to x, y, rotate, scale for each card —
 *     from their stacked Hero positions to their final grid positions.
 *
 * Start transforms (matching hero.tsx CARDS exactly):
 *   Card 1: rotate(-6deg) translate(-40px,  20px) scale(1.00)
 *   Card 2: rotate( 4deg) translate( 30px, -10px) scale(1.00)
 *   Card 3: rotate(-3deg) translate(-15px, -30px) scale(1.00)
 *   Card 4: rotate( 2deg) translate( 10px,  10px) scale(1.05)
 *
 * End transforms (2×2 grid, centered in viewport):
 *   Card size target: ~400×245 px  |  gap: 24px
 *   Column offset: (400+24)/2 = 212 px
 *   Row offset:    (245+24)/2 = 134 px
 *
 *   Card 1 → top-left:      (-212, -134) rotate(0) scale(1)
 *   Card 2 → top-right:     (+212, -134) rotate(0) scale(1)
 *   Card 3 → bottom-left:   (-212, +134) rotate(0) scale(1)
 *   Card 4 → bottom-right:  (+212, +134) rotate(0) scale(1)
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

/* ─── Card data ─────────────────────────────────────────────────────────────
 * Visual style is identical to the stacked cards in hero.tsx so the two
 * visually connect seamlessly as the user scrolls.
 * ─────────────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 1,
    /* stacked start */  startX: -40,  startY:  20,  startR: -6,  startS: 1.00,
    /* grid end */       endX:  -212,  endY: -134,   endR:   0,   endS:  1.00,
    zIndex: 1,
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    label: "Tracker.io",
    accent: "#a855f7",
  },
  {
    id: 2,
    startX:  30,  startY: -10,  startR:  4,  startS: 1.00,
    endX:   212,  endY:  -134,  endR:    0,  endS:   1.00,
    zIndex: 2,
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    label: "Project Placeholder 2",
    accent: "#38bdf8",
  },
  {
    id: 3,
    startX: -15,  startY: -30,  startR: -3,  startS: 1.00,
    endX:  -212,  endY:   134,  endR:   0,   endS:  1.00,
    zIndex: 3,
    gradient: "linear-gradient(135deg, #0d2818 0%, #14532d 100%)",
    label: "Project Placeholder 3",
    accent: "#4ade80",
  },
  {
    id: 4,
    startX:  10,  startY:  10,  startR:  2,  startS: 1.05,
    endX:   212,  endY:   134,  endR:   0,   endS:  1.00,
    zIndex: 4,
    gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
    label: "Project Placeholder 4",
    accent: "#fb923c",
  },
] as const;

/* ─── AnimatedCard sub-component ────────────────────────────────────────────
 * useTransform MUST be called at component level (not inside .map()) to
 * comply with React Rules of Hooks.
 * ─────────────────────────────────────────────────────────────────────────── */
interface AnimatedCardProps {
  card: (typeof CARDS)[number];
  progress: MotionValue<number>;
}

function AnimatedCard({ card, progress }: AnimatedCardProps) {
  const x      = useTransform(progress, [0, 1], [card.startX, card.endX]);
  const y      = useTransform(progress, [0, 1], [card.startY, card.endY]);
  const rotate = useTransform(progress, [0, 1], [card.startR,  card.endR]);
  const scale  = useTransform(progress, [0, 1], [card.startS,  card.endS]);

  return (
    <motion.div
      style={{
        /* Layout */
        position: "absolute",
        width:  "clamp(240px, 33vw, 400px)",
        height: "clamp(148px, 20vw, 245px)",
        /* Scroll-driven transforms */
        x, y, rotate, scale,
        /* Visual — identical to hero stacked cards */
        borderRadius: "0.875rem",
        overflow: "hidden",
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
            whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis", display: "block",
          }}
        >
          {card.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export function ScrollCardTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * scrollYProgress: 0 when the container's top hits the viewport top,
   *                  1 when the container's bottom hits the viewport bottom.
   */
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="scroll-transition-container"
      ref={containerRef}
      aria-hidden          /* Decorative bridge — real content is in ProjectsSection */
      style={{
        position: "relative",
        height:   "200vh",
      }}
    >
      {/* Sticky panel — stays on screen during the full 200vh scroll */}
      <div
        style={{
          position: "sticky",
          top:      0,
          height:   "100vh",
          width:    "100%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          overflow: "hidden",
          /* Match page background so cards float cleanly */
          background: "hsl(var(--background))",
        }}
      >
        {CARDS.map((card) => (
          <AnimatedCard key={card.id} card={card} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
