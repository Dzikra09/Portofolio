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

type TechItem = {
  name: string;
  label: string;
  ext?: string;
  invertInDark?: boolean;
};

type TechGroup = {
  category: string;
  items: TechItem[];
};

const techStack: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "html5", label: "HTML5" },
      { name: "css3", label: "CSS3" },
      { name: "javascript", label: "JavaScript" },
      { name: "react", label: "React" },
      { name: "flutter", label: "Flutter" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "mysql", label: "MySQL" },
      { name: "oracle", label: "Oracle SQL" },
      { name: "supabase", label: "Supabase" },
      { name: "firebase", label: "Firebase", ext: "png" },
    ],
  },

];

function TechIcon({ name, label, ext = "svg", invertInDark }: { name: string; label: string; ext?: string; invertInDark?: boolean }) {
  return (
    <div className="group relative flex flex-col items-center justify-center">
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
        <img
          src={`/icons/${name}.${ext}`}
          alt={label}
          className={`h-full w-full object-contain drop-shadow-sm rounded-lg sm:rounded-xl ${
            invertInDark ? "invert-in-dark" : ""
          }`}
          loading="lazy"
        />
      </div>
      <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-foreground/90 px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-12 md:scroll-mt-8 lg:scroll-mt-4 px-6 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex h-full flex-col gap-6 lg:gap-8 lg:pr-8"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
            >
              Hi, I'm Dzikra!
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base leading-relaxed text-foreground/70"
            >
              Latar belakang di bidang Sistem Informasi membentuk cara berpikir yang tidak hanya berfokus pada bagaimana sebuah aplikasi dibangun, tetapi juga bagaimana teknologi dapat menjadi solusi bagi kebutuhan pengguna. Melalui proyek akademik, bootcamp, dan pengalaman kolaboratif, setiap proses menjadi kesempatan untuk memahami masalah, merancang solusi, dan mengembangkan aplikasi yang fungsional serta memberikan nilai bagi penggunanya.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-border text-foreground/50 transition-all duration-200 hover:border-violet-600 hover:bg-violet-600 hover:text-white"
                  >
                    {Icon && <Icon size={16} strokeWidth={1.75} aria-hidden />}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mt-12 flex h-full items-center justify-center md:mt-0 md:justify-end"
          >
            <motion.div 
              variants={fadeInUp}
              className="relative h-full min-h-[320px] w-full max-w-[360px]"
            >
              {/* Offset outline placeholder style */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-[#f4e4d4] dark:border-orange-900/30 sm:translate-x-4 sm:translate-y-4" />
              
              {/* Image Container */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[#f8f1e7] dark:bg-neutral-900">
                <img
                  src="/IconDzikraPorto.webp"
                  alt="Dzikra Alfiyah Althaf"
                  className="h-full w-full object-cover object-[center_15%] scale-[1.15] transition-transform duration-500 hover:scale-[1.2]"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -left-4 top-8 z-10 flex flex-col rounded-2xl border border-neutral-border bg-background/95 px-5 py-3 shadow-xl backdrop-blur-sm sm:-left-8">
                <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                  Based in
                </span>
                <span className="text-sm font-bold text-foreground">
                  Jakarta, Indonesia
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 md:mt-16"
        >
          <motion.div variants={fadeInUp}>
            <h3 className="mb-6 font-heading text-2xl font-bold text-foreground">
              My Stack
            </h3>
            <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10">
              {techStack.map((group) => (
                <div key={group.category}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {group.items.map((tech) => (
                      <TechIcon key={tech.name} name={tech.name} label={tech.label} ext={tech.ext} invertInDark={tech.invertInDark} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6"
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
