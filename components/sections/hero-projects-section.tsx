"use client";

// Komponen utama yang menggabungkan bagian Hero, animasi transisi kartu, dan daftar proyek ke dalam satu kesatuan layout responsif.

import React, { useRef, useCallback, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
=======
import { useRouter } from "next/navigation";
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
import { ArrowUpRight } from "lucide-react";

// Menambahkan gaya CSS untuk kursor melayang khusus pada elemen proyek
const CURSOR_STYLE = `
  .proj-card-area, .proj-card-area * { cursor: none !important; }
`;

// Membungkus kartu proyek dan memberikan kursor melayang khusus saat di-hover
function ProjectCardHoverProvider({
  children,
  slug,
  enabled = true,
}: {
  children: React.ReactNode;
  slug: string;
  enabled?: boolean;
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const handleMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    setPos({ x: e.clientX, y: e.clientY });
  }, [enabled]);

  const handleEnter = React.useCallback(() => { if (enabled) setIsHovered(true); }, [enabled]);
  const handleLeave = React.useCallback(() => setIsHovered(false), []);
  const handleClick = React.useCallback(() => {
    if (enabled) router.push(`/projects/${slug}`);
  }, [router, slug, enabled]);

  // Reset hover state when disabled (e.g. during transition)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!enabled) setIsHovered(false);
  }, [enabled]);

  return (
    <div
      className={enabled ? "proj-card-area" : undefined}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
    >
      {children}
      {enabled && typeof document !== "undefined" && pos !== null && createPortal(
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.4})`,
            opacity: isHovered ? 1 : 0,
            width: 72,
            height: 72,
            borderRadius: "9999px",
            background: "hsl(262,60%,72%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 99999,
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
          }}
        >
          <ArrowUpRight size={30} strokeWidth={2.5} color="#fff" />
        </div>,
        document.body
      )}
    </div>
  );
}
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { projects } from "@/data/projects";

const trackerProject = projects.find((p) => p.slug === "expense-tracker");

// Variabel konfigurasi ukuran dan posisi untuk animasi grid kartu proyek
const CARD_W = 368;          // px — card width: h-gap=24px, grid=3×368+2×24=1152=max-w-6xl ✓
const IMG_H = 200;          // px — image/gradient area height
const BODY_H = 128;          // px — card body height
const CARD_H = IMG_H + BODY_H; // 328px total
const GAP = 24;           // px — grid gap

const ROW_OFFSET = (CARD_H + GAP) / 2; // 192
const CARD_STEP = 392;         // px — col step: CARD_W+24=392 → h-gap=24px = v-gap ✓

// Right-column centre offset from viewport centre (≈1280px desktop)
const RIGHT_COL = 240;

// Data konfigurasi setiap kartu proyek termasuk posisi awal dan akhir animasi
const CARDS = [
  {
    id: 1,
    slug: "expense-tracker",
    /* stacked (hero) */  startX: RIGHT_COL - 40, startY: 20, startR: -6, startS: 1.00,
    /* grid: top-left  */ endX: -CARD_STEP, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 1,
    animOrder: 1,
<<<<<<< HEAD
    project: projects[0],
=======
    gradient: "hsl(262,70%,58%)",
    label: "Web App",
    accent: "#a855f7",
    body: "tracker" as const,
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
  {
    id: 2,
    slug: "placeholder-2",
    startX: RIGHT_COL + 30, startY: -10, startR: 4, startS: 1.00,
    /* grid: top-right */ endX: CARD_STEP, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 2,
    animOrder: 3,
<<<<<<< HEAD
    project: projects[1],
=======
    gradient: "hsl(262,70%,58%)",
    label: "Landing Page",
    accent: "#38bdf8",
    body: "placeholder2" as const,
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
  {
    id: 3,
    slug: "placeholder-3",
    startX: RIGHT_COL - 15, startY: -30, startR: -3, startS: 1.00,
    /* grid: btm-left  */ endX: -CARD_STEP, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 3,
    animOrder: 4,
<<<<<<< HEAD
    project: projects[2],
=======
    gradient: "hsl(262,70%,58%)",
    label: "Dashboard",
    accent: "#4ade80",
    body: "placeholder3" as const,
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
  {
    id: 4,
    slug: "placeholder-4",
    startX: RIGHT_COL + 10, startY: 10, startR: 2, startS: 1.05,
    /* grid: btm-right */ endX: CARD_STEP, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 4,
    animOrder: 6,
<<<<<<< HEAD
    project: projects[3],
=======
    gradient: "hsl(262,70%,58%)",
    label: "Web App",
    accent: "#fb923c",
    body: "placeholder4" as const,
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
  {
    id: 5,
    slug: "placeholder-5",
    startX: RIGHT_COL - 25, startY: -45, startR: -1, startS: 0.98,
    /* grid: top-ctr   */ endX: 0, endY: -ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 5,
    animOrder: 2,
<<<<<<< HEAD
    project: projects[4],
=======
    gradient: "hsl(262,70%,58%)",
    label: "Landing Page",
    accent: "#06b6d4",
    body: "placeholder5" as const,
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
  {
    id: 6,
    slug: "placeholder-6",
    startX: RIGHT_COL + 20, startY: 35, startR: 5, startS: 0.96,
    /* grid: btm-ctr   */ endX: 0, endY: ROW_OFFSET, endR: 0, endS: 1.00,
    zIndex: 6,
    animOrder: 5,
<<<<<<< HEAD
    project: projects[5],
  },
] as const;

/* ─── Card bodies ─────────────────────────────────────────────────────────── */
function ProjectBody({ project }: { project?: (typeof projects)[0] }) {
  if (!project) return null;
  return (
    <div style={{ padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", background: "hsl(var(--background))" }}>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.8rem", color: "hsl(var(--foreground) / 0.58)", lineHeight: 1.6, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {project.techStack?.slice(0, 4).map((t) => (
          <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none", marginTop: "0.15rem" }}
=======
    gradient: "hsl(262,70%,58%)",
    label: "Dashboard",
    accent: "#eab308",
    body: "placeholder6" as const,
  },
] as const;

// Komponen antarmuka untuk isi detail dari masing-masing kartu proyek
function TrackerBody() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Tracker.io — Expense Tracker App
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["React", "Vite", "JavaScript", "CSS3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/expense-tracker"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

<<<<<<< HEAD
/* ─── AnimatedCard — ONE per card (Rules of Hooks require component level) ─ */
=======
function PlaceholderBody2() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 2
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-2"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody3() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 3
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-3"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody4() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 4
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-4"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody5() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 5
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-5"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function PlaceholderBody6() {
  return (
    <div style={{ height: "100%", padding: "1rem 1.1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "hsl(var(--background))" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3, margin: 0 }}>
          Judul Proyek 6
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {["Tech 1", "Tech 2", "Tech 3"].map((t) => (
            <span key={t} style={{ padding: "0.1rem 0.5rem", borderRadius: 6, background: "hsl(var(--foreground) / 0.06)", fontSize: "0.72rem", color: "hsl(var(--foreground) / 0.48)" }}>{t}</span>
          ))}
        </div>
      </div>
      <Link
        href="/projects/placeholder-6"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.45)", textDecoration: "none" }}
      >
        Lihat Detail <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}

function getCardBody(bodyType: string) {
  switch (bodyType) {
    case "tracker": return <TrackerBody />;
    case "placeholder2": return <PlaceholderBody2 />;
    case "placeholder3": return <PlaceholderBody3 />;
    case "placeholder4": return <PlaceholderBody4 />;
    case "placeholder5": return <PlaceholderBody5 />;
    case "placeholder6": return <PlaceholderBody6 />;
    default: return null;
  }
}

// Komponen kartu animasi individu yang mengatur posisi dan status hover-nya sendiri
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
interface AnimatedCardProps {
  card: (typeof CARDS)[number];
  progress: MotionValue<number>;
}

function AnimatedCard({ card, progress }: AnimatedCardProps) {
  // Movement: starts at hero position, ends at grid position
  const x = useTransform(progress, [0.25, 0.85], [card.startX, card.endX]);
  const y = useTransform(progress, [0.25, 0.85], [card.startY, card.endY + 140]);
  const rotate = useTransform(progress, [0.25, 0.85], [card.startR, card.endR]);
  const scale = useTransform(progress, [0.25, 0.85], [card.startS, card.endS]);

  // Only enable cursor effect once cards have fully settled into grid (progress >= 0.85)
  const [settled, setSettled] = React.useState(false);
  useMotionValueEvent(progress, "change", (latest) => {
    setSettled(latest >= 0.85);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 + card.animOrder * 0.1, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: CARD_W,
        borderRadius: "0.875rem",
        overflow: "hidden",
        border: "none",
        boxShadow: `0 8px 28px rgba(0,0,0,0.26), 0 2px 8px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.07)`,
        zIndex: card.zIndex,
        pointerEvents: "auto",
        x, y, rotate, scale,
      }}
    >
<<<<<<< HEAD
      {/* ── Image / gradient area ── */}
      <div style={{ width: "100%", height: IMG_H, background: card.project?.gradient || "hsl(262,70%,58%)", position: "relative", flexShrink: 0 }}>
        {card.project?.coverImage && (
          <Image
            src={card.project.coverImage}
            alt={card.project?.title || "Project"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Frosted project-name overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0.5rem 0.8rem",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
          borderTop: `1px solid ${card.project?.accent || "#a855f7"}20`,
        }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {card.project?.title || "Project"}
          </span>
=======
      <ProjectCardHoverProvider slug={card.slug} enabled={settled}>
        {/* ── Image / gradient area ── */}
        <div style={{ width: "100%", height: IMG_H, background: card.gradient, position: "relative", flexShrink: 0, overflow: "hidden" }}>
          {/* Frosted project-name overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0.5rem 0.8rem",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            borderTop: `1px solid ${card.accent}20`,
            zIndex: 9,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {card.label}
            </span>
          </div>
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
        </div>

<<<<<<< HEAD
      {/* ── Card body — fades in on landing ── */}
      <div style={{ height: BODY_H, overflow: "hidden", background: "hsl(var(--background))" }}>
        <ProjectBody project={card.project} />
      </div>
=======
        {/* ── Card body — fades in on landing ── */}
        <div style={{ height: BODY_H, overflow: "hidden", background: "hsl(var(--background))" }}>
          {getCardBody(card.body)}
        </div>
      </ProjectCardHoverProvider>
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
    </motion.div>
  );
}

// Komponen kartu proyek statis yang dioptimalkan untuk tampilan mobile
function MobileProjectCard({ card, imgHeight = 160 }: { card: (typeof CARDS)[number]; imgHeight?: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        borderRadius: "0.875rem",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "hsl(var(--background))",
      }}
    >
      <ProjectCardHoverProvider slug={card.slug}>
        <div style={{ width: "100%", height: imgHeight, background: card.gradient, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0.5rem 0.8rem",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            borderTop: `1px solid ${card.accent}20`,
            zIndex: 9,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em" }}>
              {card.label}
            </span>
          </div>
        </div>
        <div style={{ height: BODY_H, overflow: "hidden" }}>
          {getCardBody(card.body)}
        </div>
      </ProjectCardHoverProvider>
    </motion.div>
  );
}

// Layout utama untuk layar berukuran mobile dengan jarak elemen yang lebih padat
function MobileHeroProjects() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── Hero section ── */}
      <section
        id="home"
        aria-label="Hero section"
        style={{ background: "hsl(var(--background))", position: "relative", overflow: "hidden" }}
      >
        {/* Subtle radial glow in the background */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "60%",
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(262,70%,58%,0.07) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 720, margin: "0 auto",
          /* Top: floating navbar (~56px) + 12px top offset + 2rem breathing room. Bottom: 1rem */
          padding: "calc(68px + 2rem) 1.25rem 1rem",
        }}>


          {/* ── Headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(1.9rem, 8vw, 2.8rem)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "hsl(var(--foreground))",
              margin: "0 0 1rem",
            }}
          >
            Web Developer &amp; <br />
            <span style={{
              fontSize: "clamp(1.45rem, 6vw, 2.1rem)",
              color: "hsl(262,70%,58%)",
            }}>
              Database Management
            </span>
          </motion.h1>

          {/* ── Short Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "0.95rem", lineHeight: 1.65,
              color: "hsl(var(--foreground) / 0.75)",
              margin: "0 0 1rem",
              maxWidth: "95%",
            }}
          >
            Merancang dan membangun antarmuka web modern yang interaktif, serta menyusun arsitektur basis data yang terstruktur untuk menjamin performa aplikasi berjalan secara optimal.
          </motion.p>



          {/* ── CTA buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group relative overflow-hidden inline-flex items-center gap-[0.4rem] px-[1.35rem] py-[0.65rem] rounded-full bg-[hsl(262,70%,58%)] text-white text-[0.875rem] font-semibold border-none cursor-pointer shadow-[0_4px_20px_hsla(262,70%,58%,0.35)]"
            >
              <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-[0.4rem]">
                Lihat Projects
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.65rem 1.35rem", borderRadius: "9999px",
                background: "transparent", color: "hsl(var(--foreground))",
                fontSize: "0.875rem", fontWeight: 600,
                border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer",
              }}
            >
              Hubungi Saya
            </button>
          </motion.div>
        </div>

        {/* ── Bottom marquee strip (no duplicate badge) ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            borderTop: "1px solid hsl(var(--neutral-border) / 0.5)",
            padding: "0.6rem 0",
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div style={{ display: "flex", width: "max-content", animation: "marquee-scroll 22s linear infinite" }}>
            {Array.from({ length: 4 }).map((_, gi) => (
              <span key={gi} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", paddingRight: "1.5rem", fontSize: "0.72rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.35)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                <span>Web Development</span>
                <span style={{ opacity: 0.4, fontSize: "0.45rem" }}>●</span>
                <span>Back-end Development</span>
                <span style={{ opacity: 0.4, fontSize: "0.45rem" }}>●</span>
                <span>UX Research</span>
                <span style={{ opacity: 0.4, fontSize: "0.45rem" }}>●</span>
              </span>
            ))}
          </div>
        </motion.div>

        <style>{`
          @keyframes badge-ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          ${CURSOR_STYLE}
        `}</style>
      </section>

      {/* ── Projects section ── */}
      <section
        id="projects"
        aria-label="Projects section"
        className="relative scroll-mt-12 md:scroll-mt-8 lg:scroll-mt-4 px-6 pt-6 pb-12 md:py-16 lg:py-20"
        style={{ background: "hsl(var(--background))" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ marginBottom: "1rem" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl font-bold text-foreground"
              style={{ margin: 0 }}
            >
              Project
            </motion.h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{
              display: "grid",
              /* 1 col on xs, 2 cols when ≥ 440px */
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "0.875rem",
            }}
          >
            {CARDS.map((card) => (
<<<<<<< HEAD
              <motion.div
                key={card.id}
                variants={fadeInUp}
                style={{
                  borderRadius: "0.875rem",
                  overflow: "hidden",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  background: "hsl(var(--background))",
                }}
              >
                {/* Gradient image area */}
                <div style={{ width: "100%", height: 160, background: card.project?.gradient || "hsl(262,70%,58%)", position: "relative" }}>
                  {card.project?.coverImage && (
                    <Image
                      src={card.project.coverImage}
                      alt={card.project?.title || "Project"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  )}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "0.5rem 0.8rem",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(6px)",
                    borderTop: `1px solid ${card.project?.accent || "#a855f7"}20`,
                  }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em" }}>
                      {card.project?.title || "Project"}
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div style={{ height: BODY_H, overflow: "hidden" }}>
                  <ProjectBody project={card.project} />
                </div>
              </motion.div>
=======
              <MobileProjectCard key={card.id} card={card} imgHeight={175} />
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Layout statis tanpa animasi scroll untuk layar tablet (768px – 1023px)
function TabletHeroProjects() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── Hero section ── */}
      <section
        id="home"
        aria-label="Hero section"
        style={{
          background: "hsl(var(--background))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "55%",
            background: "radial-gradient(ellipse 70% 55% at 50% -5%, hsl(262,70%,58%,0.08) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1152, margin: "0 auto",
          /* Top: floating navbar (~56px) + 12px top offset + 4.5rem breathing room */
          padding: "calc(68px + 4.5rem) 1.5rem 2.5rem",
        }}>


          {/* ── Headline — larger clamp for tablet ── */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.6rem, 6vw, 4rem)",
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: "-0.028em",
              color: "hsl(var(--foreground))",
              margin: "0 0 1.2rem",
            }}
          >
            Web Developer &amp; <br />
            <span style={{
              fontSize: "clamp(1.9rem, 4.5vw, 2.9rem)",
              color: "hsl(262,70%,58%)",
            }}>
              Database Management
            </span>
          </motion.h1>

          {/* ── Short Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "1.1rem", lineHeight: 1.65,
              color: "hsl(var(--foreground) / 0.75)",
              margin: "0 0 1.8rem",
              maxWidth: "85%",
            }}
          >
            Merancang dan membangun antarmuka web modern yang interaktif, serta menyusun arsitektur basis data yang terstruktur untuk menjamin performa aplikasi berjalan secara optimal.
          </motion.p>



          {/* ── CTA buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group relative overflow-hidden inline-flex items-center gap-[0.4rem] px-[1.6rem] py-[0.78rem] rounded-full bg-[hsl(262,70%,58%)] text-white text-[0.95rem] font-semibold border-none cursor-pointer shadow-[0_4px_24px_hsla(262,70%,58%,0.35)]"
            >
              <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-[0.4rem]">
                Lihat Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.78rem 1.6rem", borderRadius: "9999px",
                background: "transparent", color: "hsl(var(--foreground))",
                fontSize: "0.95rem", fontWeight: 600,
                border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer",
              }}
            >
              Hubungi Saya
            </button>
          </motion.div>
        </div>

        {/* ── Bottom strip: marquee only ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            borderTop: "1px solid hsl(var(--neutral-border) / 0.5)",
            padding: "1rem 0",
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", width: "max-content", animation: "marquee-scroll 28s linear infinite" }}>
            {Array.from({ length: 4 }).map((_, gi) => (
              <span key={gi} style={{ display: "inline-flex", alignItems: "center", gap: "2rem", paddingRight: "2rem", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.35)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                <span>Web Development</span>
                <span style={{ opacity: 0.4, fontSize: "0.5rem" }}>●</span>
                <span>Back-end Development</span>
                <span style={{ opacity: 0.4, fontSize: "0.5rem" }}>●</span>
                <span>UX Research</span>
                <span style={{ opacity: 0.4, fontSize: "0.5rem" }}>●</span>
              </span>
            ))}
          </div>
        </motion.div>

        <style>{`
          @keyframes badge-ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          ${CURSOR_STYLE}
        `}</style>
      </section>

      {/* ── Projects section (3-col grid on tablet) ── */}
      <section
        id="projects"
        aria-label="Projects section"
        style={{ background: "hsl(var(--background))", padding: "3rem 1.5rem 4.5rem", scrollMarginTop: "2rem" }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
            style={{ marginBottom: "1.5rem" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-foreground"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", margin: 0 }}
            >
              Project
            </motion.h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{
              display: "grid",
              /* 2 cols at 768px, 3 cols when ≥ 900px */
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "1.1rem",
            }}
          >
            {CARDS.map((card) => (
              <MobileProjectCard key={card.id} card={card} imgHeight={165} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Komponen utama yang mengatur transisi antara mode mobile, tablet, dan desktop secara otomatis
export function HeroProjectsSection() {
  const [layout, setLayout] = useState<"mobile" | "tablet" | "desktop" | null>(null);

  useEffect(() => {
    const getLayout = (): "mobile" | "tablet" | "desktop" => {
      if (window.innerWidth > 1024) return "desktop";
      if (window.innerWidth >= 768) return "tablet";
      return "mobile";
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLayout(getLayout());

    const handler = () => setLayout(getLayout());
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Ensure scroll restoration to deep links (like /#projects) works after hydration
  useEffect(() => {
    if (layout !== null) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "instant" });
          }
        }, 50);
      }
    }
  }, [layout]);

  if (layout === null) {
    return (
      <div id="home" style={{ position: "relative", height: "calc(200vh + max(0px, 512px - 50vh))", width: "100%" }}>
        <div id="projects" style={{ position: "absolute", top: "122vh", scrollMarginTop: "22vh", width: 1, height: 1 }} aria-hidden />
      </div>
    );
  }
  if (layout === "desktop") return <DesktopHeroProjects />;
  if (layout === "tablet")  return <TabletHeroProjects />;
  return <MobileHeroProjects />;
}

// Layout untuk layar desktop (≥ 1024px) yang dilengkapi dengan animasi scroll penuh
function DesktopHeroProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Force framer-motion useScroll to sync with browser scroll restoration
  // (Fixes issue where cards/heading stay hidden/stacked until user manually scrolls)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // ── Natural Scrolling Simulation ──
  // Instead of fading out, we move the elements vertically at the same speed as the user's scroll.
  // As the user scrolls 100vh (progress 0 -> 1), the elements move -100vh.
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);



  /**
   * We previously lowered zIndex at progress >= 0.98, but that caused the section
   * to disappear when scrolling up from the About section (due to stacking context).
   * IntersectionObserver doesn't require zIndex changes to detect the sentinel.
   */

  // ── Show heading with fadeInUp effect once cards are fully settled ──
  // Starts at progress 0.82 (cards finish at 0.85), fully visible at 0.95
  // Mimics About section's fadeInUp: opacity 0→1 + translateY 20px→0
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!headingRef.current) return;
    const t = latest < 0.82 ? 0 : latest > 0.95 ? 1 : (latest - 0.82) / 0.13;
    headingRef.current.style.opacity = t.toString();
    headingRef.current.style.visibility = latest >= 0.82 ? "visible" : "hidden";
    headingRef.current.style.transform = `translateY(${(1 - t) * 20}px)`;
  });

  return (
    <>
      {/* Kontainer utama untuk mengatur durasi dan posisi animasi berdasarkan scroll */}
      <div
        ref={containerRef}
        id="home"
        style={{ position: "relative", height: "200vh" }}
      >
        {/* 
          Sentinel for Navbar scroll-spy.
          Placed at 122vh so it crosses the 40vh viewport threshold exactly
          when scroll progress is 82vh (0.82), syncing perfectly with the
          heading fade-in animation.
        */}
        <div id="projects" style={{ position: "absolute", top: "122vh", scrollMarginTop: "22vh", width: 1, height: 1 }} aria-hidden />

        {/* Panel statis yang menjaga konten tetap berada di layar saat animasi scroll berlangsung */}
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflowX: "clip",
            overflowY: "visible",
            background: "hsl(var(--background))",
            zIndex: 10, /* initial; imperatively lowered at progress >= 0.98 */
          }}
        >

          {/* Pembungkus layout untuk membatasi ukuran maksimal area konten utama */}
          <div className="mx-auto h-full w-full max-w-6xl relative px-6">

            {/* Fase 1: Konten hero di sebelah kiri yang akan memudar saat pengguna mulai menggulir */}
            <motion.div
              style={{
                y: scrollYOffset,
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: "47%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0",
                gap: "2.5rem",
              }}
            >
              {/* Availability badge */}
              {/* Headline */}
              {/* Headline & Description Group */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", margin: 0 }}
                >
                  Web Developer &amp; <br />
                  <span style={{ 
                    fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)", 
                    whiteSpace: "nowrap",
                    color: "hsl(262,70%,58%)",
                  }}>
                    Database Management
                  </span>
                </motion.h1>

                {/* ── Short Description ── */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "1.05rem", lineHeight: 1.65,
                    color: "hsl(var(--foreground) / 0.75)",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  Merancang dan membangun antarmuka web modern yang interaktif, serta menyusun arsitektur basis data yang terstruktur untuk menjamin performa aplikasi berjalan secara optimal.
                </motion.p>
              </div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
              >
                <button
                  onClick={() => scrollTo("projects")}
                  className="group relative overflow-hidden inline-flex items-center gap-[0.4rem] px-[1.45rem] py-[0.7rem] rounded-full bg-[hsl(262,70%,58%)] text-white text-[0.88rem] font-semibold border-none cursor-pointer shadow-[0_4px_20px_hsla(262,70%,58%,0.35)]"
                >
                  <div className="absolute inset-0 bg-[#5b21b6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                  <span className="relative z-10 flex items-center gap-[0.4rem]">
                    Lihat Projects
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  style={{ display: "inline-flex", alignItems: "center", padding: "0.7rem 1.45rem", borderRadius: "9999px", background: "transparent", color: "hsl(var(--foreground))", fontSize: "0.88rem", fontWeight: 600, border: "1.5px solid hsl(var(--neutral-border))", cursor: "pointer" }}
                >
                  Hubungi Saya
                </button>
              </motion.div>
            </motion.div>

            {/* Fase 1 (bawah): Menampilkan teks berjalan (marquee) dan badge yang akan memudar */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                y: scrollYOffset,
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                borderTop: "1px solid hsl(var(--neutral-border) / 0.6)",
                padding: "1.1rem 0",
                display: "flex", alignItems: "center",
                flexDirection: "row", flexWrap: "wrap", gap: "1rem",
                pointerEvents: "none",
              }}
            >


              {/* Marquee */}
              <div style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
                <div style={{ display: "flex", width: "max-content", animation: "marquee-scroll 28s linear infinite" }}>
                  {Array.from({ length: 4 }).map((_, gi) => (
                    <span key={gi} style={{ display: "inline-flex", alignItems: "center", gap: "2rem", paddingRight: "2rem", fontSize: "0.81rem", fontWeight: 500, color: "hsl(var(--foreground) / 0.38)", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      <span>Web Development</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                      <span>Back-end Development</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                      <span>UX Research</span>
                      <span style={{ opacity: 0.35, fontSize: "0.52rem" }}>●</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* Fase 3: Judul daftar proyek yang akan muncul saat animasi scroll hampir selesai */}
            <div
              ref={headingRef}
              style={{
                position: "absolute",
                /* ── Adjust this value to move the heading vertically ── */
                top: "96px",
                left: 0, /* Aligned to wrapper's px-6 edge */
                visibility: "hidden", /* shown imperatively via headingRef */
                opacity: 0,
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
                >
                  Project
                </motion.h2>
              </motion.div>
            </div>

            {/* Daftar 4 kartu proyek yang posisinya akan bertransisi mengikuti scroll */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              {CARDS.map((card) => (
                <AnimatedCard key={card.id} card={card} progress={scrollYProgress} />
              ))}
            </div>

          </div> {/* End layout wrapper */}

          {/* Keyframes */}
          <style>{`
            @keyframes ping {
              75%, 100% { transform: scale(2.2); opacity: 0; }
            }
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>

      {/* Elemen pendeteksi untuk memperbarui status navigasi ke bagian proyek */}
      {/* (The #projects sentinel was moved inside the #home container above) */}

      {/* 
        Spacer to push the About section down.
        Since stickyRef has overflowY: "visible", the bottom cards will spill over its 100vh height.
        The center of the bottom cards is at 50vh + 192px (ROW_OFFSET) + 140px (y-shift) = 50vh + 332px.
        Card height is 360px, so the bottom edge is at 50vh + 332px + 180px = 50vh + 512px.
        So they overflow the 100vh container by (50vh + 512px) - 100vh = 512px - 50vh.
        We add exactly this overflow. The visual gap is naturally handled by AboutSection's padding.
      */}
      <div style={{ height: "max(0px, calc(512px - 50vh))" }} />

      {/* Hover overlay styles for project cards */}
      <style>{CURSOR_STYLE}</style>

      {/* AboutSection + ContactSection follow */}
    </>
  );
}
