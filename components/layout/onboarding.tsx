"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const LETTERS = "Dzikraalthf".split("");
const SESSION_KEY = "intro_shown";

const letterVariants: Variants = {
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
    },
  },
};

export function Onboarding() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  // Memeriksa status intro pada sesi browser agar tidak ditampilkan berulang kali
  useEffect(() => {
    const already = sessionStorage.getItem(SESSION_KEY);
    if (already) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  // Mengatur penundaan sebelum menyembunyikan intro setelah animasi selesai
  useEffect(() => {
    if (!visible) return;

    const staggerTotal = (LETTERS.length - 1) * 0.065 * 1000;
    const letterDuration = 550;
    const hold = 500;
    const delay = staggerTotal + letterDuration + hold;

    const timer = setTimeout(() => {
      setExiting(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, delay);

    return () => clearTimeout(timer);
  }, [visible]);

  const handleExitComplete = () => {
    setVisible(false);
  };

  if (visible === null) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && !exiting && (
        <motion.div
          key="onboarding-overlay"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
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
