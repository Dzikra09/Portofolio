"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard
   Real project data — shows gradient OR image cover, full card body.
   ─────────────────────────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: Project;
  /** Index used for stagger delay when inside a stagger container */
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accent = project.accent ?? "#a855f7";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover="hover"
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-border bg-background transition-shadow duration-300 hover:shadow-xl hover:shadow-accent-primary/10"
    >
      {/* ── Cover area ── */}
      <div className="relative h-48 w-full overflow-hidden sm:h-52">
        {project.gradient ? (
          /* Gradient placeholder — visually identical to Hero stacked cards */
          <div
            style={{ height: "100%", background: project.gradient }}
            aria-hidden
          />
        ) : (
          /* Fallback: real cover image */
          <motion.div
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <Image
              src={project.coverImage}
              alt={`Cover image for ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        {/* Hover gradient overlay */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
        />

        {/* Frosted project-name overlay — bottom of cover (replaces category badge) */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0.55rem 0.85rem",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            borderTop: `1px solid ${accent}20`,
          }}
        >
          <span
            style={{
              fontSize: "0.75rem", fontWeight: 600,
              color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Hover action buttons (top-right) */}
        <motion.div
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute right-3 top-3 flex gap-2"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-colors hover:text-accent-secondary"
            >
              <ExternalLink size={14} aria-hidden />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository of ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-colors hover:text-accent-secondary"
            >
              <Github size={14} aria-hidden />
            </a>
          )}
        </motion.div>
      </div>

      {/* ── Card Body — full project details ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title */}
        <h3 className="font-heading text-base font-bold leading-snug text-foreground transition-colors group-hover:text-accent-secondary sm:text-lg">
          {project.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/60">
          {project.description}
        </p>

        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-foreground/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer link */}
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-sm font-medium",
            "text-foreground/50 transition-colors duration-200",
            "group-hover:text-accent-secondary"
          )}
          aria-label={`View details for ${project.title}`}
        >
          Lihat Detail
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>

      {/* Animated border highlight on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent-primary/40"
      />
    </motion.article>
  );
}

