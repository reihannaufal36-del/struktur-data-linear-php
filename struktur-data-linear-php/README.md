# DataStruct — Interactive Lab (PHP)

Project pembelajaran yang menampilkan tiga struktur data linear dalam halaman interaktif:
1. **Array** — tambah elemen, akses berdasarkan indeks, hapus elemen terakhir.
2. **Linked List** — tambah node di awal/akhir dan hapus node berdasarkan posisi.
3. **Stack** — operasi Push, Pop, dan Peek dengan prinsip LIFO.

## Menjalankan project

### Opsi 1: PHP built-in server
1. Pastikan PHP 8.0+ terpasang.
2. Buka terminal pada folder project.
3. Jalankan:
   ```bash
   php -S localhost:8000
   ```
4. Buka `http://localhost:8000` di browser.

### Opsi 2: XAMPP
1. Salin folder `struktur-data-linear-php` ke folder `htdocs`.
2. Jalankan Apache dari XAMPP.
3. Buka `http://localhost/struktur-data-linear-php/`.

## Struktur folder

```text
struktur-data-linear-php/
├── index.php
├── README.md
└── assets/
    ├── app.js
    └── style.css
```

## Catatan implementasi
PHP digunakan untuk merender kerangka halaman dan memilih halaman melalui parameter `?page=...`. Operasi demo berjalan di browser menggunakan JavaScript agar visualisasi dapat berubah langsung tanpa database. Data akan kembali ke kondisi awal ketika halaman dimuat ulang.
