import type { Project } from "@/types";

/**
 * Dummy project data — replace with real projects over time.
 * Categories: "Web App" | "Landing Page" | "Dashboard"
 * featured: true → shown in Home Projects Preview (max 3)
 */
export const projects: Project[] = [
  {
    slug: "expense-tracker",
    title: "Tracker.io",
    category: "Web App",
    description:
      "Aplikasi tracking pengeluaran dan pemasukan harian dengan dashboard realtime, kategorisasi transaksi, serta fitur tambah, edit, dan hapus",
    coverImage: "/mockup/mockuptracker1.webp",
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
    title: "4",
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
    title: "My Personal Notes",
    category: "Web App",
    description: "My Personal Notes merupakan website pencatatan pribadi berbasis React + Vite yang dikembangkan sebagai bagian dari project Coding Camp Dicoding × DBS Foundation 2.0. Aplikasi memungkinkan pengguna membuat, mencari, dan mengorganisasi catatan berdasarkan waktu. Dalam pengembangannya, saya berfokus pada peningkatan UI/UX melalui tampilan card-based, visual yang konsisten, serta responsive layout agar aplikasi lebih terstruktur dan nyaman digunakan.",
    coverImage: "/mockup/mockupnotes.webp",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1278 100%)",
    accent: "#06b6d4",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://my-personal-notes-psi.vercel.app/",
    repoUrl: "https://github.com/Dzikra09/my-personal-notes",
    featured: true,
    fullDescription: "My Personal Notes adalah aplikasi pencatatan pribadi berbasis web yang memungkinkan pengguna membuat, mencari, mengelompokkan, dan mengarsipkan catatan dengan tampilan yang rapi dan mudah digunakan. Aplikasi dibangun menggunakan React dan Vite untuk performa development dan loading yang cepat, dengan styling Tailwind CSS guna menjaga konsistensi visual di seluruh tampilan, serta di-deploy secara live menggunakan Vercel.",
    features: ["Dashboard ringkasan", "Mmembuat catatan", "Pencarian catata", "Pengelompokkan catatan otoamtis per bulan", "arsip catatan", "Hapus catatan", "Kustomisasi workspace", "Responsive design"],
    background: "Project ini awalnya dikembangkan sebagai bagian dari program Coding Camp powered by DBS Foundation 2.0 (Dicoding), sebagai media belajar membangun aplikasi frontend dari nol. Setelah program selesai, saya memutuskan untuk melanjutkan dan mengembangkan project ini secara mandiri — mulai dari merancang ulang tampilan dengan identitas warna ungu, menambahkan fitur dashboard, hingga menerapkan alur kerja pengembangan berbasis AI (Antigravity IDE + AI Agent) dengan dokumentasi PRD sebagai acuan, agar setiap komponen yang dibangun tetap konsisten dari sisi desain maupun struktur kode. Latar belakang personal dari project ini adalah kebutuhan akan aplikasi pencatatan yang ringan dan fokus, tanpa fitur berlebihan seperti pada aplikasi note-taking besar (Notion, Evernote), sekaligus menjadi ruang eksplorasi saya dalam membangun aplikasi web modern secara end-to-end — dari perencanaan desain, pengembangan, hingga deployment.",
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
