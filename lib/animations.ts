import type { Variants } from "framer-motion";

/**
 * Reusable Framer Motion animation variants for portfolio sections.
 * Import these into any component that needs entrance animations.
 */

/** Fade in + slide up from below — for individual elements */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // smoother cubic bezier
    },
  },
};

/** Simple fade in — for overlays, images */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // increased from 0.12 for more noticeable sequence
      delayChildren: 0.1,
    },
  },
};

/** Slide in from left — for decorative elements */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scale up — for cards / hover reveal */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Shared viewport options — trigger when 20% visible, animate once */
export const viewportOnce = { once: true, amount: 0.2 } as const;
