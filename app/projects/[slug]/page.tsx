import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { projects } from "@/data/projects";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen px-6 pt-20 pb-12 sm:pt-20 sm:pb-20">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-10 -z-10 h-96 w-96 rounded-full bg-accent-primary/10 blur-[140px]"
      />

      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-accent-secondary"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden
            />
            Kembali ke Projects
          </Link>
        </div>

        {/* Header Content */}
        <header className="mb-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-accent-primary/15 px-3 py-1 text-xs font-semibold text-accent-secondary ring-1 ring-inset ring-accent-secondary/20">
              {project.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-border bg-foreground/[0.04] px-3 py-1 text-xs font-medium text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-secondary px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-accent-secondary/25 transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
              >
                <ExternalLink size={16} aria-hidden />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-border bg-background px-6 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:border-accent-secondary hover:bg-accent-primary/10 hover:text-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
              >
                <Github size={16} aria-hidden />
                GitHub Repository
              </a>
            )}
          </div>
        </header>

        {/* Large Screenshot / Preview Container */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-neutral-border bg-foreground/[0.02] p-2 sm:p-4 shadow-xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-accent-primary/10">
            <Image
              src={project.coverImage}
              alt={`Preview screenshot for ${project.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 896px"
            />
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="flex flex-col gap-12">
          {/* Section: Deskripsi Proyek */}
          <section className="rounded-2xl border border-neutral-border bg-foreground/[0.02] p-6 sm:p-8">
            <h2 className="mb-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
              Deskripsi Proyek
            </h2>
            <p className="text-base leading-relaxed text-foreground/75">
              {project.fullDescription || project.description}
            </p>
          </section>

          {/* Section: Fitur Utama */}
          {project.features && project.features.length > 0 && (
            <section className="rounded-2xl border border-neutral-border bg-foreground/[0.02] p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-accent-secondary" aria-hidden />
                <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  Fitur Utama
                </h2>
              </div>
              <ul className="flex flex-col gap-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-accent-secondary"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-foreground/75">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section: Latar Belakang Pengembangan */}
          {project.background && (
            <section className="rounded-2xl border border-neutral-border bg-foreground/[0.02] p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-accent-secondary" aria-hidden />
                <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  Latar Belakang Pengembangan
                </h2>
              </div>
              <p className="text-base leading-relaxed text-foreground/75">
                {project.background}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
