import type { Project } from "@/types";
import trackerMockup from "../mockup/mockuptracker1.webp";

/**
 * Dummy project data — replace with real projects over time.
 * Categories: "Web App" | "Landing Page" | "Dashboard"
 * featured: true → shown in Home Projects Preview (max 3)
 */
export const projects: Project[] = [
  {
    slug: "expense-tracker",
    title: "Tracker.io — Expense Tracker Ap",
    category: "Web App",
    description:
      "Aplikasi tracking pengeluaran dan pemasukan harian dengan dashboard realtime, kategorisasi transaksi, serta fitur tambah, edit, dan hapus",
    coverImage: trackerMockup.src,
    accent: "#a855f7",
    techStack: ["React", "Vite", "JavaScript", "CSS3"],
    liveUrl: "https://tracker-expense-three.vercel.app",
    repoUrl: "https://github.com/Dzikra09/expense-tracker",
    featured: true,
    fullDescription:
      "Expense Tracker merupakan aplikasi berbasis web yang dikembangkan untuk membantu pengguna dalam mencatat, mengelola, dan memantau pemasukan serta pengeluaran secara sederhana. Aplikasi ini memungkinkan pengguna untuk menambahkan transaksi, mengelompokkan transaksi berdasarkan jenis pemasukan atau pengeluaran, serta melihat ringkasan kondisi keuangan melalui perhitungan saldo, total pemasukan, dan total pengeluaran secara otomatis.",
    features: [
      "Tambah, kelola, dan pantau transaksi keuangan",
      "Kategorisasi transaksi berdasarkan pemasukan atau pengeluaran",
      "Ringkasan saldo, total pemasukan, dan total pengeluaran secara otomatis",
    ],
    background:
      "Proyek ini dikembangkan sebagai implementasi dari materi yang dipelajari selama mengikuti Bootcamp Dicoding x DBS Foundation Coding Camp 2.0. Selama proses pengembangan, saya menerapkan konsep pengembangan aplikasi web modern, mulai dari pengelolaan data, validasi input, hingga pembuatan antarmuka yang responsif dan mudah digunakan. Selain menjadi media pembelajaran, proyek ini juga menjadi sarana untuk mengasah kemampuan dalam membangun aplikasi yang memiliki fungsionalitas nyata dan dapat digunakan dalam kehidupan sehari-hari.",
  },
  {
    slug: "project-2",
    title: "Project Placeholder 2",
    category: "Landing Page",
    description: "Deskripsi singkat mengenai proyek kedua yang dapat Anda sesuaikan nantinya.",
    coverImage: "/covers/cover-webapp.svg", // Fallback image or empty
    gradient: "hsl(262,70%,58%)",
    accent: "#38bdf8",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    featured: true,
    fullDescription: "Penjelasan lengkap untuk proyek kedua. Anda dapat menceritakan detail mengenai masalah yang diselesaikan oleh proyek ini, solusi yang ditawarkan, dan hasil akhir dari aplikasi atau website yang dibangun.",
    features: [
      "Fitur unggulan pertama dari proyek ini",
      "Fitur tambahan yang memberikan nilai lebih",
      "Integrasi dengan layanan pihak ketiga (opsional)",
    ],
    background: "Cerita mengenai latar belakang mengapa proyek ini dibuat. Apakah untuk keperluan tugas, eksperimen pribadi, atau proyek klien? Anda dapat menjelaskannya di sini.",
  },
  {
    slug: "project-3",
    title: "Project Placeholder 3",
    category: "Dashboard",
    description: "Deskripsi singkat mengenai proyek ketiga yang dapat Anda sesuaikan nantinya.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "hsl(262,70%,58%)",
    accent: "#4ade80",
    techStack: ["Vue", "Nuxt", "TypeScript"],
    featured: true,
    fullDescription: "Penjelasan lengkap untuk proyek ketiga. Anda dapat menceritakan detail mengenai masalah yang diselesaikan oleh proyek ini, solusi yang ditawarkan, dan hasil akhir dari aplikasi atau website yang dibangun.",
    features: [
      "Fitur unggulan pertama dari proyek ini",
      "Fitur tambahan yang memberikan nilai lebih",
      "Integrasi dengan layanan pihak ketiga (opsional)",
    ],
    background: "Cerita mengenai latar belakang mengapa proyek ini dibuat. Apakah untuk keperluan tugas, eksperimen pribadi, atau proyek klien? Anda dapat menjelaskannya di sini.",
  },
  {
    slug: "project-4",
    title: "Project Placeholder 4",
    category: "Web App",
    description: "Deskripsi singkat mengenai proyek keempat yang dapat Anda sesuaikan nantinya.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "hsl(262,70%,58%)",
    accent: "#fb923c",
    techStack: ["Svelte", "Firebase"],
    featured: true,
    fullDescription: "Penjelasan lengkap untuk proyek keempat. Anda dapat menceritakan detail mengenai masalah yang diselesaikan oleh proyek ini, solusi yang ditawarkan, dan hasil akhir dari aplikasi atau website yang dibangun.",
    features: [
      "Fitur unggulan pertama dari proyek ini",
      "Fitur tambahan yang memberikan nilai lebih",
      "Integrasi dengan layanan pihak ketiga (opsional)",
    ],
    background: "Cerita mengenai latar belakang mengapa proyek ini dibuat. Apakah untuk keperluan tugas, eksperimen pribadi, atau proyek klien? Anda dapat menjelaskannya di sini.",
  },
  {
    slug: "project-5",
    title: "Project Placeholder 5",
    category: "Landing Page",
    description: "Deskripsi singkat mengenai proyek kelima yang dapat Anda sesuaikan nantinya.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "hsl(262,70%,58%)",
    accent: "#06b6d4",
    techStack: ["React Native", "Expo"],
    featured: true,
    fullDescription: "Penjelasan lengkap untuk proyek kelima. Anda dapat menceritakan detail mengenai masalah yang diselesaikan oleh proyek ini, solusi yang ditawarkan, dan hasil akhir dari aplikasi atau website yang dibangun.",
    features: [
      "Fitur unggulan pertama dari proyek ini",
      "Fitur tambahan yang memberikan nilai lebih",
      "Integrasi dengan layanan pihak ketiga (opsional)",
    ],
    background: "Cerita mengenai latar belakang mengapa proyek ini dibuat. Apakah untuk keperluan tugas, eksperimen pribadi, atau proyek klien? Anda dapat menjelaskannya di sini.",
  },
  {
    slug: "project-6",
    title: "Project Placeholder 6",
    category: "Dashboard",
    description: "Deskripsi singkat mengenai proyek keenam yang dapat Anda sesuaikan nantinya.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "hsl(262,70%,58%)",
    accent: "#eab308",
    techStack: ["Angular", "RxJS"],
    featured: true,
    fullDescription: "Penjelasan lengkap untuk proyek keenam. Anda dapat menceritakan detail mengenai masalah yang diselesaikan oleh proyek ini, solusi yang ditawarkan, dan hasil akhir dari aplikasi atau website yang dibangun.",
    features: [
      "Fitur unggulan pertama dari proyek ini",
      "Fitur tambahan yang memberikan nilai lebih",
      "Integrasi dengan layanan pihak ketiga (opsional)",
    ],
    background: "Cerita mengenai latar belakang mengapa proyek ini dibuat. Apakah untuk keperluan tugas, eksperimen pribadi, atau proyek klien? Anda dapat menjelaskannya di sini.",
  },
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
