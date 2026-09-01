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
    title: "Tracker.io — Expense Tracker App",
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
<<<<<<< HEAD
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
=======
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
>>>>>>> d4f86bc7c2530d28a1f8a06f073f800eddada209
  },
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
