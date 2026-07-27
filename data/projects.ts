import type { Project } from "@/types";

/**
 * Dummy project data — replace with real projects over time.
 * Categories: "Web App" | "Landing Page" | "Dashboard"
 * featured: true → shown in Home Projects Preview (max 3)
 */
export const projects: Project[] = [
  {
    slug: "tracker-expense",
    title: "Tracker.io — Expense Tracker",
    category: "Web App",
    description:
      "Aplikasi pencatatan keuangan pribadi (pemasukan & pengeluaran) dengan fitur filter tanggal, export data ke Excel, dan dark mode. Data tersimpan di database MySQL melalui REST API.",
    coverImage: "/covers/cover-tracker.svg",
    techStack: ["Node.js", "Express", "MySQL", "JavaScript", "JWT"],
    liveUrl: "https://tracker-expense-three.vercel.app/",
    repoUrl: "https://github.com/Dzikra09/tracker_expense",
    featured: true,
    fullDescription:
      "Aplikasi web pencatatan keuangan pribadi yang membantu pengguna memantau arus kas mereka secara real-time — mulai dari pemasukan, pengeluaran, hingga saldo saat ini. Dibangun dengan arsitektur full-stack (backend + database terpisah dari frontend) dan sudah terhubung ke database sungguhan (MySQL), bukan lagi sekadar penyimpanan sementara di browser.",
    features: [
      "Autentikasi Pengguna — Login dan registrasi akun, setiap pengguna punya data transaksi masing-masing",
      "Pencatatan Transaksi (CRUD) — Tambah, edit, hapus, serta ubah tipe transaksi (Pemasukan ⇄ Pengeluaran) dengan mudah",
      "Dashboard Ringkasan Real-time — Menampilkan saldo saat ini, total pemasukan, dan total pengeluaran secara otomatis terhitung dari data di database",
      "Kelola Kategori Custom — Pengguna bisa membuat kategori sendiri lengkap dengan emoji penanda (misal: 🍔 Makanan, 🎮 Hiburan)",
      "Pencarian Transaksi — Cari transaksi berdasarkan judul/keterangan secara real-time",
      "Filter Berdasarkan Tanggal — Menyaring transaksi dalam rentang tanggal tertentu, dapat dikombinasikan dengan pencarian",
      "Export ke Excel — Data transaksi yang sedang ditampilkan (termasuk hasil filter) dapat diunduh langsung dalam format .xlsx",
      "Dark Mode — Tampilan gelap yang nyaman digunakan, preferensi tema tersimpan otomatis",
    ],
    background:
      "Proyek ini dikembangkan sebagai bagian dari portofolio pribadi, awalnya berbasis materi Bootcamp Dicoding, kemudian dikembangkan lebih lanjut secara mandiri dengan integrasi database MySQL sungguhan, arsitektur full-stack (frontend di Vercel, backend & database di Railway), serta fitur-fitur tambahan seperti JWT authentication, filter tanggal, ekspor Excel, dan dark mode. Tantangan utama meliputi migrasi dari localStorage ke MySQL, penanganan CORS antar platform deployment yang berbeda, serta memahami perbedaan koneksi database internal vs publik di Railway.",
  },
];

/** All unique categories derived from the projects array */
export const projectCategories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Only featured projects for the Home preview */
export const featuredProjects = projects.filter((p) => p.featured);
