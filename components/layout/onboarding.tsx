"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Onboarding / Intro Loader
 *
 * - Shown once per browser session (sessionStorage flag: "intro_shown").
 * - Stage 1 : Staggered letter reveal of "DZIKRAALTHF" (translateY + blur + opacity).
 * - Stage 2 : Aft  er letters finish, the full overlay slides out upward (translateY -100%).
 * - Placed in root layout so it is independent of page-level AnimatePresence.
 * - Home page content renders behind the overlay; revealed instantly when overlay leaves.
 */

const LETTERS = "Dzikraalthf".split("");
const SESSION_KEY = "intro_shown";

/** Per-letter animation variants */
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // custom ease-out-expo
    },
  },
};

/** Stagger container */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
    },
  },
};

/** Overlay exit — slides up out of view */
const overlayExit = {
  y: "-100%",
  transition: {
    duration: 0.85,
    ease: [0.76, 0, 0.24, 1], // ease-in-out-quart — smooth, decisive
  },
};

export function Onboarding() {
  // null = undetermined (avoid flash), true = show, false = hidden
  const [visible, setVisible] = useState<boolean | null>(null);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem(SESSION_KEY);
    if (already) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  // Calculate total duration before triggering exit:
  // stagger delay for last letter = (LETTERS.length - 1) × 0.065s ≈ 0.65s
  // + letter transition duration 0.55s + hold pause 0.5s → ~1.7s total
  useEffect(() => {
    if (!visible) return;

    const totalLettersDuration =
      (LETTERS.length - 1) * 0.065 * 1000 + 550 + 500;

    const timer = setTimeout(() => {
      setExit(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, totalLettersDuration);

    return () => clearTimeout(timer);
  }, [visible]);

  // Not yet determined — render nothing to avoid flash
  if (visible === null) return null;

  return (
    <AnimatePresence>
      {visible && !exit && (
        <motion.div
          key="onboarding-overlay"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={overlayExit}
          /**
           * z-[9999] — above Navbar (z-50) and any custom cursor (assumed z-[9998] or lower).
           * Adjust if your cursor uses a higher z-index.
           */
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          // Remove from DOM only after exit animation fully completes
          onAnimationComplete={(def) => {
            if ((def as { y?: string }).y === "-100%") {
              setVisible(false);
            }
          }}
        >
          {/* Staggered letter row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex select-none items-end overflow-hidden"
            aria-label="Dzikra Althaf"
          >
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                /**
                 * Font: Space Grotesk (font-heading token)
                 * Color: accent-secondary (hsl(262 70% 58%) — same violet used sitewide)
                 * Size: responsive — clamp between 2.5rem (mobile) and 6rem (desktop)
                 */
                className="font-heading font-bold text-accent-secondary"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
