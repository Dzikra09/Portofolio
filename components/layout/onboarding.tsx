"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Onboarding / IntroLoader
 *
 * - Shown ONCE per browser session (sessionStorage flag: "intro_shown").
 * - Stage 1 : Staggered letter reveal of "Dzikraalthf"
 *             Each letter: opacity 0→1, y 36px→0, blur 8px→0, duration 0.55s
 * - Stage 2 : After all letters finish + 500ms hold, overlay slides out
 *             upward (translateY -100%) over 0.85s.
 * - Placed in root layout — independent of page-level AnimatePresence.
 * - Home content renders behind overlay; revealed instantly on exit.
 */

const LETTERS = "Dzikraalthf".split("");
const SESSION_KEY = "intro_shown";

/* ── Per-letter animation ─────────────────────────────────────────────── */
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
      ease: [0.22, 1, 0.36, 1], // ease-out-expo
    },
  },
};

/* ── Stagger container ────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
    },
  },
};

export function Onboarding() {
  // null = not yet determined (avoid flash), true = show, false = done
  const [visible, setVisible] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  /* Check sessionStorage on mount */
  useEffect(() => {
    const already = sessionStorage.getItem(SESSION_KEY);
    if (already) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  /* Schedule exit after all letters animate + hold pause
   *   stagger total : (11-1) × 0.065s = 0.65s
   *   last letter duration : 0.55s
   *   hold pause : 0.50s
   *   ─────────────────────────────────────────
   *   total before exit  ≈ 1.70s             */
  useEffect(() => {
    if (!visible) return;

    const staggerTotal = (LETTERS.length - 1) * 0.065 * 1000; // ms
    const letterDuration = 550; // ms
    const hold = 500; // ms
    const delay = staggerTotal + letterDuration + hold;

    const timer = setTimeout(() => {
      setExiting(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, delay);

    return () => clearTimeout(timer);
  }, [visible]);

  /* Hide from DOM entirely once exit animation completes */
  const handleExitComplete = () => {
    setVisible(false);
  };

  // Not yet determined — render nothing to avoid flash
  if (visible === null) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && !exiting && (
        <motion.div
          key="onboarding-overlay"
          /* Entry: already visible (no entry animation needed) */
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          /* Exit: slide upward out of viewport */
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // ease-in-out-quart
            },
          }}
          /**
           * z-[9999] — above Navbar (z-50) and any other fixed element.
           * bg-background adapts to light/dark mode automatically.
           */
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* ── Staggered letters ─────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex select-none items-end overflow-hidden"
            aria-label="Dzikraalthf"
          >
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                /**
                 * Font  : Space Grotesk (font-heading token)
                 * Color : accent-secondary — violet token from design system
                 * Size  : responsive via clamp (no overflow on narrow screens)
                 */
                className="font-heading font-bold text-accent-secondary"
                style={{
                  fontSize: "clamp(2rem, 6vw, 5rem)",
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
