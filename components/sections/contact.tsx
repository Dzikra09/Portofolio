"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Instagram, CheckCircle2 } from "lucide-react";
import { socialLinks, siteConfig } from "@/config/site";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

type FormState = "idle" | "sending" | "sent";

/**
 * Contact section — email CTA, social links, and contact form.
 * id="contact" for scroll-spy anchor.
 * Form is UI-only (no backend); replace action with a real handler when ready.
 */
export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    // TODO: Replace with real API call / Resend / Formspree
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("sent");
  }

  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="relative px-6 py-24 sm:py-32"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-1/3 -z-10 h-80 w-80 rounded-full bg-accent-primary/10 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 text-center"
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
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/60"
          >
            Punya project menarik atau peluang kerja sama? Saya terbuka untuk
            freelance, kolaborasi, dan diskusi ide.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left — Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-8 lg:col-span-2"
          >
            {/* Email CTA */}
            <motion.div variants={fadeInUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                Email
              </p>
              <a
                href="mailto:dzikraalfiyahalthaf@gmail.com"
                className="group inline-flex items-center gap-3 rounded-xl border border-neutral-border px-4 py-3 text-sm font-medium text-foreground/70 transition-all duration-200 hover:border-accent-secondary hover:bg-accent-primary/5 hover:text-accent-secondary"
              >
                <Mail size={16} aria-hidden />
                dzikraalfiyahalthaf@gmail.com
              </a>
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeInUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                Sosial Media
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-foreground/50 transition-all duration-200 hover:border-accent-secondary hover:bg-accent-primary/10 hover:text-accent-secondary"
                    >
                      {Icon && <Icon size={16} strokeWidth={1.75} aria-hidden />}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/40 bg-accent-primary/10 px-4 py-1.5 text-sm font-medium text-accent-secondary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-secondary" aria-hidden />
                Available for freelance &amp; collaboration
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-3"
          >
            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-border bg-foreground/[0.02] px-8 py-16 text-center"
              >
                <CheckCircle2
                  size={48}
                  className="text-accent-secondary"
                  aria-hidden
                />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Pesan Terkirim!
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
                  Terima kasih sudah menghubungi saya. Saya akan membalas
                  secepatnya.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-border bg-foreground/[0.02] p-6 sm:p-8"
                noValidate
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
                    >
                      Nama
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dzikra Althaf"
                      className={cn(
                        "rounded-xl border border-neutral-border bg-background px-4 py-2.5 text-sm text-foreground",
                        "placeholder:text-foreground/30",
                        "transition-colors duration-150 focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/20"
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="kamu@example.com"
                      className={cn(
                        "rounded-xl border border-neutral-border bg-background px-4 py-2.5 text-sm text-foreground",
                        "placeholder:text-foreground/30",
                        "transition-colors duration-150 focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/20"
                      )}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Ceritakan project atau ide kamu..."
                    className={cn(
                      "resize-none rounded-xl border border-neutral-border bg-background px-4 py-2.5 text-sm text-foreground",
                      "placeholder:text-foreground/30",
                      "transition-colors duration-150 focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/20"
                    )}
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={formState === "sending"}
                  className={cn(
                    "group mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium",
                    "bg-accent-secondary text-white transition-all duration-200",
                    "hover:opacity-90 hover:shadow-lg hover:shadow-accent-secondary/25",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-60"
                  )}
                >
                  {formState === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
