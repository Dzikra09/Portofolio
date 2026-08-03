"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Projects section — 2×2 grid layout.
 *
 * - 1 real ProjectCard (Tracker.io) with full details
 * - 3 PlaceholderProjectCards with skeleton body
 * - Grid: 2 columns desktop, 1 column mobile
 */

export function ProjectsSection() {
  const totalCount = projects.length + PLACEHOLDER_CARDS.length;

  return (
    <section
      id="projects"
      aria-label="Projects section"
      className="relative min-h-screen"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-accent-primary/10 blur-[120px]"
      />

      {/* Section heading */}
      <div className="relative px-6 py-8 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-accent-primary/10 blur-[80px]"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-6xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
            >
              Latest Projects
            </motion.h2>

            {/* Project count pill */}
            <motion.span
              variants={fadeInUp}
              className="shrink-0 rounded-full bg-accent-primary/15 px-3 py-1 text-sm font-medium text-accent-secondary"
            >
              {totalCount} projects
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Projects grid — 2×2 */}
      <div className="px-6 py-10 sm:py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Real project cards */}
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}

            {/* Placeholder cards */}
            {PLACEHOLDER_CARDS.map((card, i) => (
              <PlaceholderProjectCard
                key={card.label}
                label={card.label}
                gradient={card.gradient}
                accent={card.accent}
                index={projects.length + i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
