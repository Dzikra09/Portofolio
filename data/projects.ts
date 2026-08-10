import type { Project } from "@/types";

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
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
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
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
