"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * <Dzikra Althaf/>s section — full project listing for the single-page layout.
 *
 * - id="projects" for scroll-spy anchor
 * - Sticky heading below navbar while scrolling within this section
 * - All projects displayed (not just featured) with category badge on each card
 * - Viewport-triggered animation (whileInView) — animates once on scroll in
 */
export function ProjectsSection() {
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
              Project
            </motion.h2>

            {/* Project count pill */}
            <motion.span
              variants={fadeInUp}
              className="shrink-0 rounded-full bg-accent-primary/15 px-3 py-1 text-sm font-medium text-accent-secondary"
            >
              {projects.length} project
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="px-6 py-10 sm:py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
