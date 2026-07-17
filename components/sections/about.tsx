"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Code2, Layers, Zap } from "lucide-react";
import { socialLinks } from "@/config/site";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

const techStack = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "SQLite", "REST API"] },
  { category: "Tools", items: ["Git", "Figma", "Vercel", "VS Code", "Postman"] },
];

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Menulis kode yang mudah dibaca, dirawat, dan dikembangkan oleh tim.",
  },
  {
    icon: Layers,
    title: "Detail-Oriented",
    desc: "Setiap piksel, transisi, dan interaksi dirancang dengan penuh perhatian.",
  },
  {
    icon: Zap,
    title: "Performance-First",
    desc: "Membangun antarmuka yang cepat, ringan, dan terasa responsif di semua perangkat.",
  },
];

/**
 * About section — bio, tech stack, highlights, social links.
 * id="about" for scroll-spy anchor.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About section"
      className="relative px-6 py-16 sm:py-24"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-accent-primary/10 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent-secondary"
          >
            Tentang Saya
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
          >
            Developer yang Peduli Detail
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left — Bio */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-base leading-relaxed text-foreground/70"
            >
              Halo, saya{" "}
              <span className="font-semibold text-foreground">Dzikra Althaf</span>{" "}
              — seorang web developer yang berfokus pada pembangunan antarmuka
              web yang cepat, accessible, dan menyenangkan untuk digunakan.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base leading-relaxed text-foreground/70"
            >
              Saya percaya bahwa desain yang baik bukan hanya soal tampilan,
              melainkan juga tentang bagaimana pengguna merasakannya. Setiap
              project yang saya bangun dimulai dari pemahaman mendalam tentang
              kebutuhan pengguna, lalu diwujudkan dengan kode yang bersih dan
              dapat di-maintain.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base leading-relaxed text-foreground/70"
            >
              Saat tidak coding, saya senang mengeksplorasi desain UI terbaru,
              berkontribusi ke open-source, atau sekadar membuat secangkir kopi
              dan membaca tentang teknologi web terkini.
            </motion.p>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-2">
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
            </motion.div>
          </motion.div>

          {/* Right — Tech Stack */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {techStack.map((group) => (
              <motion.div key={group.category} variants={fadeInUp}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-neutral-border bg-foreground/5 px-3 py-1 text-sm text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group rounded-2xl border border-neutral-border bg-foreground/[0.02] p-6 transition-colors duration-200 hover:border-accent-primary/40 hover:bg-accent-primary/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/15 text-accent-secondary">
                <item.icon size={20} aria-hidden />
              </div>
              <h3 className="mb-2 font-heading text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
