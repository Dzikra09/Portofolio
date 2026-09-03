"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { socialLinks } from "@/config/site";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="relative scroll-mt-12 md:scroll-mt-8 lg:scroll-mt-4 px-6 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent-secondary"
          >
            Hubungi Saya
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
          >
            Mari Berkolaborasi
          </motion.h2>
        </motion.div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col gap-8 items-center text-center w-full max-w-lg"
          >
            <motion.div variants={fadeInUp}>
              <a
                href="mailto:dzikraalfiyahalthaf@gmail.com"
                className={cn(
                  "group relative overflow-hidden inline-flex items-center gap-2.5 rounded-full text-sm font-semibold tracking-wide text-white",
                  "shadow-[0_4px_20px_hsla(262,70%,58%,0.35)] bg-[hsl(262,70%,58%)]",
                  "px-8 py-3.5 justify-center"
                )}
              >
                <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="relative z-10 flex items-center gap-2.5">
                  <Mail size={16} aria-hidden />
                  dzikraalfiyahalthaf@gmail.com
                </span>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 justify-center">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center justify-center rounded-full border border-neutral-border text-foreground/50 transition-all duration-200 hover:border-accent-secondary hover:bg-accent-primary/10 hover:text-accent-secondary h-12 w-12"
                    >
                      {Icon && <Icon size={18} strokeWidth={1.75} aria-hidden />}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
