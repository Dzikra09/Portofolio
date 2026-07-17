"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Hero section — first fold of the home page.
 *
 * Structure:
 * - Badge / eyebrow text
 * - Headline (H1) with gradient accent
 * - Sub-headline paragraph
 * - Two CTA buttons: "Lihat Projects" (filled) + "Hubungi Saya" (outline)
 *
 * Animation: staggered fadeInUp via Framer Motion, triggered on page load.
 */
export function Hero() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-24"
      aria-label="Hero section"
    >
      {/* Subtle radial glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-accent-primary/20 blur-[120px]" />
      </div>

      {/* Staggered content container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/40 bg-accent-primary/10 px-4 py-1.5 text-sm font-medium text-accent-secondary">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-accent-secondary"
              aria-hidden
            />
            Available for freelance &amp; collaboration
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeInUp}>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Web Developer yang{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Membangun dengan Detail
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={fadeInUp}
          className="max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg"
        >
          Saya membangun antarmuka web yang cepat, accessible, dan terasa
          menyenangkan — dari konsep desain hingga production-ready code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Primary CTA */}
          <button
            id="cta-projects"
            onClick={() => scrollTo("projects")}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-7 py-3.5",
              "bg-accent-secondary text-white font-medium text-sm",
              "transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-accent-secondary/25",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2"
            )}
          >
            Lihat Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </button>

          {/* Outline CTA */}
          <button
            id="cta-contact"
            onClick={() => scrollTo("contact")}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-7 py-3.5",
              "border border-neutral-border text-foreground/70 font-medium text-sm",
              "transition-all duration-200 hover:border-accent-secondary hover:text-accent-secondary hover:bg-accent-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2"
            )}
          >
            <Mail
              size={16}
              className="transition-transform duration-200 group-hover:scale-110"
              aria-hidden
            />
            Hubungi Saya
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-xs text-foreground/30 tracking-widest uppercase">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-neutral-border to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
