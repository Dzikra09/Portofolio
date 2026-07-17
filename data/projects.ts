import type { Project } from "@/types";

/**
 * Dummy project data — replace with real projects over time.
 * Categories: "Web App" | "Landing Page" | "Dashboard"
 * featured: true → shown in Home Projects Preview (max 3)
 */
export const projects: Project[] = [
  {
    slug: "taskflow-app",
    title: "TaskFlow — Manajemen Tugas Tim",
    category: "Web App",
    description:
      "Aplikasi manajemen tugas kolaboratif dengan real-time update, drag-and-drop board, dan notifikasi in-app. Dibangun untuk tim kecil hingga menengah.",
    coverImage: "/covers/cover-webapp.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://taskflow-demo.vercel.app",
    repoUrl: "https://github.com/dzikra-althaf/taskflow",
    featured: true,
  },
  {
    slug: "studio-raya-landing",
    title: "Studio Raya — Agency Landing Page",
    category: "Landing Page",
    description:
      "Landing page premium untuk creative agency dengan hero animasi, portofolio grid, testimonial carousel, dan form kontak terintegrasi.",
    coverImage: "/covers/cover-landing.svg",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Resend"],
    liveUrl: "https://studio-raya.vercel.app",
    repoUrl: "https://github.com/dzikra-althaf/studio-raya",
    featured: true,
  },
  {
    slug: "analitik-dashboard",
    title: "AnalitikPro — Business Dashboard",
    category: "Dashboard",
    description:
      "Dashboard analitik bisnis dengan visualisasi data interaktif, laporan ekspor PDF, dan sistem role-based access control.",
    coverImage: "/covers/cover-dashboard.svg",
    techStack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "NextAuth"],
    liveUrl: "https://analitik-pro.vercel.app",
    repoUrl: "https://github.com/dzikra-althaf/analitik-pro",
    featured: true,
  },
  {
    slug: "kopiku-landing",
    title: "KopiKu — Coffee Shop Landing Page",
    category: "Landing Page",
    description:
      "Landing page untuk kedai kopi lokal dengan menu interaktif, sistem reservasi meja online, dan integrasi Google Maps.",
    coverImage: "/covers/cover-landing.svg",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Zod"],
    liveUrl: "https://kopiku-cafe.vercel.app",
    repoUrl: "https://github.com/dzikra-althaf/kopiku",
    featured: false,
  },
  {
    slug: "inventaris-app",
    title: "InvTrack — Sistem Inventaris",
    category: "Web App",
    description:
      "Sistem manajemen inventaris untuk UMKM dengan fitur stok otomatis, laporan bulanan, dan barcode scanner via kamera.",
    coverImage: "/covers/cover-webapp.svg",
    techStack: ["Next.js", "TypeScript", "Prisma", "SQLite", "Tailwind CSS"],
    repoUrl: "https://github.com/dzikra-althaf/invtrack",
    featured: false,
  },
  {
    slug: "fintrack-dashboard",
    title: "FinTrack — Personal Finance Dashboard",
    category: "Dashboard",
    description:
      "Dashboard keuangan personal untuk tracking pemasukan, pengeluaran, dan tabungan dengan grafik tren bulanan yang intuitif.",
    coverImage: "/covers/cover-dashboard.svg",
    techStack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "Zustand"],
    liveUrl: "https://fintrack-app.vercel.app",
    repoUrl: "https://github.com/dzikra-althaf/fintrack",
    featured: false,
  },
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
