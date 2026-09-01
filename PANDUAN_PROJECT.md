# Panduan Mengelola dan Mengubah Data Proyek

Dokumen ini menjelaskan langkah-langkah untuk mengubah foto, penjelasan singkat, dan detail lengkap dari setiap proyek yang ditampilkan di beranda maupun halaman detail proyek.

Semua data proyek (baik untuk *card* di beranda maupun penjelasan di halaman detail) terpusat pada satu file, yaitu:
**`data/projects.ts`**

---

## 1. Struktur Data Proyek
Buka file `data/projects.ts`. Di dalam file tersebut terdapat sebuah *array* bernama `projects`. Setiap blok `{ ... }` mewakili satu proyek dan memiliki struktur seperti ini:

```typescript
{
  slug: "nama-url-proyek", // Harus unik, huruf kecil, dipisah tanda hubung (-)
  title: "Judul Proyek Anda",
  category: "Web App", // Kategori (misal: Web App, Landing Page, Mobile)
  description: "Penjelasan singkat proyek (muncul di card halaman depan).",
  coverImage: "/path/ke/gambar.jpg", // Gambar proyek
  accent: "#38bdf8", // Warna aksen / garis pemisah pada card
  techStack: ["React", "Next.js", "Tailwind CSS"], // Teknologi yang digunakan
  featured: true, // Ubah ke true jika proyek ini ingin ditampilkan di beranda
  
  // -- Bagian Halaman Detail --
  fullDescription: "Penjelasan paragraf lengkap mengenai keseluruhan proyek...",
  features: [
    "Fitur unggulan pertama",
    "Fitur pendukung lainnya",
  ],
  background: "Latar belakang mengapa proyek ini dibuat...",
}
```

---

## 2. Cara Mengganti Foto Proyek (`coverImage`)

Ada dua cara utama untuk mengganti foto proyek Anda:

### Cara A: Menggunakan Import File Lokal (seperti Tracker.io)
Ini adalah cara yang disarankan jika file foto Anda berada di luar folder `public` (misalnya di dalam folder `mockup`):
1. Letakkan file foto Anda di dalam folder `mockup` (contoh: `mockup/foto-proyek-saya.webp`).
2. Gulir ke bagian paling atas dari file `data/projects.ts`. Tambahkan kode *import*:
   ```typescript
   import gambarProyekSaya from "../mockup/foto-proyek-saya.webp";
   ```
3. Di dalam blok proyek Anda, ubah `coverImage` menggunakan variabel yang baru di-*import* tadi ditambah `.src`:
   ```typescript
   coverImage: gambarProyekSaya.src,
   ```

### Cara B: Menggunakan Folder `public`
Ini adalah cara termudah jika file foto Anda berada di dalam folder `public`:
1. Masukkan gambar Anda ke dalam folder `public`, Anda bisa membuat folder khusus di dalamnya (misal: ditaruh di `public/projects/foto.jpg`).
2. Langsung ketikkan jalur gambarnya di properti `coverImage` (selalu mulai dengan garis miring `/`):
   ```typescript
   coverImage: "/projects/foto.jpg",
   ```

---

## 3. Cara Mengganti Penjelasan dan Detail Proyek

Untuk menyesuaikan penjelasan dari *placeholder* menjadi proyek sungguhan, perbarui properti berikut di proyek yang Anda inginkan:

- **`description`**: Teks ini adalah rangkuman singkat (sekitar 1-2 kalimat) yang akan **ditampilkan pada *card*** di halaman beranda. Usahakan agar tidak terlalu panjang.
- **`fullDescription`**: Paragraf mendetail tentang fungsi, tujuan, atau cerita di balik aplikasi. Teks ini ditampilkan penuh pada **halaman detail proyek** (Bagian "Deskripsi Proyek").
- **`features`**: Ini adalah daftar fitur yang disajikan menggunakan *bullet point*. Jangan lupa menggunakan kutip `""` pada setiap daftar, dan dipisahkan oleh tanda koma `,`. Ditampilkan di bagian "Fitur Utama".
- **`background`**: Menceritakan motivasi, masalah yang dipecahkan, atau sejarah pembuatan proyek. Ditampilkan di bagian "Latar Belakang Pengembangan".

## 4. Tips Tambahan
- **`slug`**: Ini menentukan URL proyek Anda! Jika `slug`-nya `"aplikasi-toko"`, maka link-nya adalah `anda.com/projects/aplikasi-toko`. Jangan gunakan spasi, gunakan tanda hubung (`-`).
- **`techStack`**: Untuk tampilan yang optimal, cukup cantumkan 3-4 teknologi paling utama agar deretan *badge* tidak meluber di dalam kartu beranda.
- **`accent`**: Warna ini (menggunakan format *Hex code* seperti `#ff0000` untuk merah) memberi efek garis warna-warni yang estetik di bagian bawah keterangan *card*.
