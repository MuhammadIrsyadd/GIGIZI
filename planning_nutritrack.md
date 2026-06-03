# 🥗 GIGIZI — *"Gizi di Ujung Jari"*
### Website Planning Document · v1.0

---

## 🌿 Identitas Produk

| | |
|---|---|
| **Nama** | **GIGIZI** |
| **Tagline** | *"Gizi di Ujung Jari"* |
| **Audiens** | Masyarakat Indonesia usia 15–45 tahun yang peduli kesehatan |
| **Platform** | Web (Mobile-first, Progressive Web App) |
| **Bahasa** | Indonesia (dengan opsi toggle Inggris) |

---

## 💡 Filosofi

> *"GIZI" berasal dari Bahasa Indonesia yang berarti nutrisi. "GI" juga merupakan singkat dari Gigit — aksi paling mendasar dari makan. GIGIZI adalah pengulangan yang bersemangat, seperti semangat kita menjaga kesehatan setiap hari.*

Website ini lahir dari satu pertanyaan sederhana:
**"Saya sudah makan apa hari ini, dan apa dampaknya untuk tubuh saya?"**

GIGIZI percaya bahwa kesadaran gizi tidak harus rumit. Cukup dengan mengetahui bahan-bahan di piring Anda — nasi, tempe, sayur bayam, atau sepotong ayam — GIGIZI menghitung semuanya untuk Anda, dengan tampilan yang bersih, jujur, dan ramah.

Filosofi desainnya adalah **"Dapur Digital"** — warm, earthy, dan organik. Bukan aplikasi medis yang dingin dan kaku, tapi seperti buku resep milik ibu yang penuh catatan kecil.

---

## 🎨 Arah Desain & Estetika

### Tema Visual: *"Earthy Organic Warmth"*
- **Palet Warna:**
  - Primary: `#3D6B4F` (hijau daun tua)
  - Secondary: `#F5A623` (oranye kunyit)
  - Background: `#FAF6EF` (krem hangat / warna kertas)
  - Accent: `#E8503A` (merah cabai)
  - Text: `#2C1810` (cokelat tua / seperti tanah)

- **Tipografi:**
  - Heading: *Playfair Display* — elegan, berat, editorial
  - Body: *DM Sans* — bersih, modern, mudah dibaca
  - Label/Tag: *Space Mono* — teknis tapi charming untuk angka kalori

- **Estetika Keseluruhan:**
  - Ilustrasi bahan makanan hand-drawn (SVG)
  - Texture kertas halus di background
  - Card dengan border radius besar dan soft shadow
  - Animasi "melayang" untuk item yang ditambahkan
  - Progress bar berbentuk piring/lingkaran (donut chart)

---

## 🗂️ Struktur Halaman

```
GIGIZI/
├── Landing Page              → Hero + CTA + Penjelasan singkat
├── App Page (Core Feature)   → Input bahan + hasil kalori
├── Database Bahan            → Daftar bahan dengan nilai gizi
├── Tentang Kami              → Filosofi & tim
└── 404 Page                  → Kreatif, bertema makanan
```

---

## 🔧 Fitur Utama (Core Features)

### 1. 🥬 Input Bahan Makanan
- Search box dengan **autocomplete** (database bahan lokal Indonesia)
- Input gram dengan **slider + angka manual**
- Tombol **"+ Tambah Bahan"** — simpel, satisfying
- Daftar bahan aktif tampil sebagai **tag card** yang bisa dihapus
- Contoh bahan yang bisa di-input:
  ```
  🍗 Ayam (dada, tanpa kulit)   → 100 gram
  🥬 Sayur Bayam                 → 75 gram
  🥕 Wortel                      → 50 gram
  🍚 Nasi Putih                  → 150 gram
  ```

### 2. 🔢 Kalkulasi Kalori Real-Time
- **Total Kalori** tampil besar di tengah (animasi counter)
- Breakdown per bahan (berapa % kontribusinya)
- Breakdown **makronutrien**:
  - 🥩 Protein (gram)
  - 🧈 Lemak (gram)
  - 🍞 Karbohidrat (gram)
  - 💧 Serat (gram)

### 3. 📊 Visualisasi
- **Donut Chart** — proporsi makronutrien
- **Bar horizontal** per bahan — perbandingan kalori antar bahan
- **Indikator warna** — hijau (ideal), kuning (berlebih), merah (sangat tinggi)

### 4. 🎯 Kebutuhan Harian (Opsional)
- User bisa set **target kalori harian** (default: 2000 kkal)
- Progress bar: "Makanan ini = X% dari kebutuhan harianmu"
- Tooltip saran singkat ("Kamu masih butuh 1200 kkal lagi hari ini")

### 5. 💾 Simpan & Bagikan
- **Simpan sebagai "Menu"** — beri nama (cth: "Makan Siang Senin")
- **Export sebagai gambar** (share ke Instagram/WA)
- **Copy ringkasan teks** — untuk dicopy ke notes/chat

---

## 📦 Database Bahan Makanan

Menggunakan data gizi dari:
- **TKPI (Tabel Komposisi Pangan Indonesia)** — Kemenkes RI
- **USDA FoodData Central** (untuk bahan non-lokal)
- Prioritas bahan-bahan **Indonesia lokal**: tempe, tahu, kangkung, nasi, rendang, dll.

### Kategori Bahan:
```
🍚 Karbohidrat       → Nasi, Roti, Mie, Singkong, Kentang
🍗 Protein Hewani    → Ayam, Ikan, Telur, Daging Sapi, Udang
🫘 Protein Nabati    → Tempe, Tahu, Kacang Tanah, Edamame
🥦 Sayuran           → Bayam, Kangkung, Wortel, Brokoli, Tomat
🍌 Buah              → Pisang, Mangga, Pepaya, Apel, Jeruk
🧈 Lemak & Minyak    → Minyak Kelapa, Santan, Mentega, Avokad
🧂 Bumbu & Rempah    → Bawang, Cabai, Jahe, Kunyit (nilai gizi minor)
```

Minimal **500+ bahan** di database awal.

---

## 🗃️ Tech Stack (Rekomendasi)

### Frontend
| Teknologi | Kegunaan |
|---|---|
| **React.js / Next.js** | Framework utama |
| **Tailwind CSS** | Styling utility-first |
| **Framer Motion** | Animasi UI yang smooth |
| **Recharts / Chart.js** | Visualisasi donut & bar chart |
| **Fuse.js** | Fuzzy search autocomplete bahan |

### Backend
| Teknologi | Kegunaan |
|---|---|
| **Node.js + Express** atau **Supabase** | API + Auth |
| **PostgreSQL** | Database bahan & user data |
| **Redis** (opsional) | Cache query populer |

### Tambahan
| Teknologi | Kegunaan |
|---|---|
| **html2canvas** | Export hasil sebagai gambar |
| **Vercel / Railway** | Hosting |
| **Anthropic Claude API** | Fitur AI (fase 2) |

---

## 🚀 Roadmap Pengembangan

### 🟢 Fase 1 — MVP (Bulan 1–2)
- [ ] Setup project Next.js + Tailwind
- [ ] Build database 200+ bahan lokal Indonesia
- [ ] Halaman utama: input bahan + kalkulasi kalori
- [ ] Breakdown makronutrien (protein, lemak, karbo)
- [ ] Donut chart & bar chart
- [ ] Desain mobile-first yang bersih
- [ ] Deploy ke Vercel

### 🟡 Fase 2 — Enrichment (Bulan 3–4)
- [ ] Autocomplete bahan yang lebih cerdas (Fuse.js)
- [ ] Expand database ke 500+ bahan
- [ ] Fitur simpan menu (localStorage → akun user)
- [ ] Export sebagai gambar (share WA/Instagram)
- [ ] Target kalori harian & progress tracker
- [ ] Halaman "Database Bahan" yang bisa di-browse publik

### 🔵 Fase 3 — AI & Komunitas (Bulan 5–6)
- [ ] **Fitur AI "Tanya GIZI"** — user chat tentang makanan mereka
- [ ] Input via foto makanan (image recognition)
- [ ] Rekomendasi makanan sesuai sisa kalori hari ini
- [ ] Komunitas: user share menu sehat mereka
- [ ] Notifikasi harian pengingat log makanan (PWA push notification)

---

## 📱 Wireframe Konsep — App Page

```
┌─────────────────────────────────────┐
│  🥗 GIGIZI          [🔍] [☰]        │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Cari bahan...          [+] │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │🍗 Ayam   │  │🥬 Bayam  │        │
│  │100g  165│  │75g   14  │        │
│  │    kkal │  │    kkal  │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐                       │
│  │🥕 Wortel │                       │
│  │50g   21  │                       │
│  │    kkal  │                       │
│  └──────────┘                       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│         TOTAL KALORI                │
│           ╔═══════╗                 │
│           ║  200  ║                 │
│           ║  kkal ║                 │
│           ╚═══════╝                 │
│    [Protein] [Lemak] [Karbo]        │
│      20g       8g     12g           │
│                                     │
│  [💾 Simpan]  [📤 Bagikan]         │
└─────────────────────────────────────┘
```

---

## 🌟 Pembeda Utama (USP)

| Fitur | GIGIZI | Kompetitor Umum |
|---|---|---|
| Database bahan lokal Indonesia | ✅ Lengkap | ⚠️ Terbatas |
| UI dalam Bahasa Indonesia | ✅ | ❌ Mayoritas Inggris |
| Input gram + slider visual | ✅ | ⚠️ Hanya angka |
| Export sebagai gambar share | ✅ | ❌ |
| Desain organik & hangat | ✅ | ❌ Terlalu medis/kaku |
| AI "Tanya GIZI" (Fase 2) | ✅ | ❌ |
| Gratis sepenuhnya | ✅ | ⚠️ Freemium |

---

## 🎯 Metrik Keberhasilan

```
Bulan 1  →  500 pengguna unik / bulan
Bulan 3  →  2.000 pengguna unik / bulan
Bulan 6  →  10.000 pengguna unik / bulan
           500+ menu tersimpan di komunitas
           Rating kepuasan ≥ 4.2 / 5
```

---

## 📝 Catatan Akhir

> GIGIZI bukan sekadar kalkulator. Ia adalah **teman makan** yang membantu kamu memahami apa yang masuk ke tubuhmu — tanpa menghakimi, tanpa ribet. Seperti ibu yang selalu tahu ada apa di dapur.

---

*Dokumen ini dibuat sebagai planning awal. Revisi dan iterasi sangat dianjurkan sesuai feedback pengguna nyata.*

**Dibuat dengan 🥗 dan semangat hidup sehat.**
