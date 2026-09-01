import type { Project } from "@/types";

/**
 * Dummy project data ΓÇö replace with real projects over time.
 * Categories: "Web App" | "Landing Page" | "Dashboard"
 * featured: true ΓåÆ shown in Home Projects Preview (max 3)
 */
export const projects: Project[] = [
  {
    slug: "expense-tracker",
    title: "Tracker.io ΓÇö Expense Tracker App",
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
  {
    slug: "placeholder-2",
    title: "Judul Proyek 2",
    category: "Landing Page",
    description: "Deskripsi singkat untuk proyek placeholder 2.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#38bdf8",
    techStack: ["Tech 1", "Tech 2", "Tech 3"],
    featured: false,
    fullDescription: "Deskripsi lengkap untuk proyek placeholder 2. Kamu bisa mengganti teks ini nanti dengan detail fitur dan fungsi aplikasimu.",
    features: ["Fitur Placeholder 1", "Fitur Placeholder 2"],
    background: "Latar belakang pengembangan untuk proyek placeholder 2.",
  },
  {
    slug: "placeholder-3",
    title: "Judul Proyek 3",
    category: "Dashboard",
    description: "Deskripsi singkat untuk proyek placeholder 3.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#4ade80",
    techStack: ["Tech 1", "Tech 2", "Tech 3"],
    featured: false,
    fullDescription: "Deskripsi lengkap untuk proyek placeholder 3. Kamu bisa mengganti teks ini nanti dengan detail fitur dan fungsi aplikasimu.",
    features: ["Fitur Placeholder 1", "Fitur Placeholder 2"],
    background: "Latar belakang pengembangan untuk proyek placeholder 3.",
  },
  {
    slug: "placeholder-4",
    title: "Judul Proyek 4",
    category: "Web App",
    description: "Deskripsi singkat untuk proyek placeholder 4.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#fb923c",
    techStack: ["Tech 1", "Tech 2", "Tech 3"],
    featured: false,
    fullDescription: "Deskripsi lengkap untuk proyek placeholder 4. Kamu bisa mengganti teks ini nanti dengan detail fitur dan fungsi aplikasimu.",
    features: ["Fitur Placeholder 1", "Fitur Placeholder 2"],
    background: "Latar belakang pengembangan untuk proyek placeholder 4.",
  },
  {
    slug: "placeholder-5",
    title: "Judul Proyek 5",
    category: "Landing Page",
    description: "Deskripsi singkat untuk proyek placeholder 5.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#06b6d4",
    techStack: ["Tech 1", "Tech 2", "Tech 3"],
    featured: false,
    fullDescription: "Deskripsi lengkap untuk proyek placeholder 5. Kamu bisa mengganti teks ini nanti dengan detail fitur dan fungsi aplikasimu.",
    features: ["Fitur Placeholder 1", "Fitur Placeholder 2"],
    background: "Latar belakang pengembangan untuk proyek placeholder 5.",
  },
  {
    slug: "placeholder-6",
    title: "Judul Proyek 6",
    category: "Dashboard",
    description: "Deskripsi singkat untuk proyek placeholder 6.",
    coverImage: "/covers/cover-webapp.svg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#eab308",
    techStack: ["Tech 1", "Tech 2", "Tech 3"],
    featured: false,
    fullDescription: "Deskripsi lengkap untuk proyek placeholder 6. Kamu bisa mengganti teks ini nanti dengan detail fitur dan fungsi aplikasimu.",
    features: ["Fitur Placeholder 1", "Fitur Placeholder 2"],
    background: "Latar belakang pengembangan untuk proyek placeholder 6.",
  },
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
