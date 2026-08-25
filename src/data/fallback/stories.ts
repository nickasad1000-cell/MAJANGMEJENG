import type { Story } from '../../lib/data';

/**
 * Used only when Supabase is unreachable (network down on first paint).
 * 6 Lumajang stories carry-over from v1.
 */
export const FALLBACK_STORIES: Story[] = [
  {
    id: 'fb-senduro',
    slug: 'suara-subuh-dari-senduro',
    title: 'Suara Subuh dari Senduro',
    excerpt:
      'Catatan pagi di kaki Semeru. Sebelum warung buka, sudah ada yang berdiri lebih dulu.',
    body_md:
      'Senduro adalah kecamatan yang letaknya paling dekat dengan Semeru. Pagi di sini tidak dimulai dari jam lima — dimulai dari suara yang lebih pelan dari jam itu: ayam berkokok dari kejauhan, gerobak lewat, suara kaleng kopi dibuka.\n\nDi warung Pak Hasan, kopi pertama hari itu selalu yang paling sunyi. Tidak ada pembicaraan, hanya uap dan sesekali asap rokok. Saya duduk di kursi plastik yang sama seperti minggu lalu, dan dia menuang tanpa bertanya.\n\n"Ini cerita apa?" tanyanya ketika saya catat di buku. Saya bilang: tentang pagi. Dia tertawa kecil: "Kalau cuma tentang pagi, banyak. Tapi belum ada yang menulis."',
    hero_image: null,
    pillar: 'kawasan',
    location_id: 'loc-senduro',
    coords: '8°5′S / 113°0′E',
    platform: 'instagram',
    platform_url: 'https://instagram.com/majangmejeng_/reel/suara-subuh-senduro',
    hero_image_alt: null,
    published_at: '2026-06-12T08:00:00.000Z',
    created_at: '2026-06-12T08:00:00.000Z',
    updated_at: '2026-06-12T08:00:00.000Z',
  },
  {
    id: 'fb-pasirian',
    slug: 'warung-yang-tidak-pernah-sepi',
    title: 'Warung yang Tidak Pernah Sepi',
    excerpt:
      'Pasirian punya satu warung yang buka 18 jam. Ini catatan dari balik mejanya.',
    body_md:
      'Warung Bu Aminah tidak punya jam tutup resmi. Ia tutup kalau sudah tidak ada yang beli. Itu pun kadang jam sebelas malam.\n\nPelanggannya tiga generasi: anak sekolah, ibu rumah tangga, dan tukang ojek yang berhenti setelah shift terakhir. Setiap orang punya urutan pesan yang sama: kopi, gorengan, kadang telur.\n\n"Ini bukan jualan," kata Bu Aminah. "Ini tempat orang mampir supaya tidak diam di rumah."',
    hero_image: null,
    pillar: 'satu-tempat-tiga-cerita',
    location_id: 'loc-pasirian',
    coords: '8°13′S / 113°8′E',
    platform: 'tiktok',
    platform_url: 'https://tiktok.com/@majangmejeng_/video/warung-bersama-bu-aminah',
    hero_image_alt: null,
    published_at: '2026-05-30T08:00:00.000Z',
    created_at: '2026-05-30T08:00:00.000Z',
    updated_at: '2026-05-30T08:00:00.000Z',
  },
  {
    id: 'fb-pronojiwo',
    slug: 'catatan-dari-jalan-lama',
    title: 'Catatan dari Jalan Lama',
    excerpt: 'Pronojiwo menyimpan jalan kecil yang tidak lagi masuk peta.',
    body_md:
      'Jalan lama itu masih bisa dilalui motor, tapi tidak lagi masuk Google Maps. Saya ke sana dengan orang yang lahir di sana, dan sekarang tinggal di kota.\n\n"Ini rumah almarhum kakek," katanya, menunjuk struktur kayu yang masih utuh. Di belakangnya, sungai kecil masih mengalir.\n\nIa tidak pulang untuk merenovasi. Ia pulang untuk melihat apakah rumahnya masih diingat oleh rumput.',
    hero_image: null,
    pillar: 'kawasan',
    location_id: 'loc-pronojiwo',
    coords: '8°12′S / 113°0′E',
    platform: 'instagram',
    platform_url: 'https://instagram.com/majangmejeng_/reel/jalan-lama-pronojiwo',
    hero_image_alt: null,
    published_at: '2026-04-18T08:00:00.000Z',
    created_at: '2026-04-18T08:00:00.000Z',
    updated_at: '2026-04-18T08:00:00.000Z',
  },
  {
    id: 'fb-ranuyoso',
    slug: 'anak-anak-yang-menggambar-hujan',
    title: 'Anak-anak yang Menggambar Hujan',
    excerpt: 'Di Ranuyoso, hujan adalah topik. Berikut sketsa yang mereka buat.',
    body_md:
      'Saya minta anak-anak SDN Ranuyoso 3 menggambar hujan. Hasilnya bukan awan dan tetes — ada yang menggambar jendela, ada yang menggambar jemuran, ada yang menggambar ibu yang masuk lebih cepat.\n\nHujan bukan cuaca. Hujan adalah peristiwa di dalam rumah.',
    hero_image: null,
    pillar: 'behind-the-scenes',
    location_id: 'loc-ranuyoso',
    coords: '7°58′S / 113°21′E',
    platform: 'tiktok',
    platform_url: 'https://tiktok.com/@majangmejeng_/video/hujan-di-ranuyoso',
    hero_image_alt: null,
    published_at: '2026-03-22T08:00:00.000Z',
    created_at: '2026-03-22T08:00:00.000Z',
    updated_at: '2026-03-22T08:00:00.000Z',
  },
  {
    id: 'fb-kota-1',
    slug: 'satu-kamera-dua-generasi',
    title: 'Satu Kamera, Dua Generasi',
    excerpt:
      'Ayah saya fotografer keliling. Sekarang saya pegang kamera yang sama. Hasilnya tidak mirip.',
    body_md:
      'Kamera itu Minolta Hi-Matic 7sII. Tahun 1977. Saya tidak tahu banyak soal mekaniknya, hanya tahu: gulung film, atur fokus, atur.\n\nFoto ayah saya selalu tentang manusia. Foto saya lebih banyak tentang ruang kosong. Mungkin karena kota tempat kami memotret sudah berbeda.',
    hero_image: null,
    pillar: 'behind-the-scenes',
    location_id: 'loc-kota',
    coords: '8°8′S / 113°13′E',
    platform: 'instagram',
    platform_url: 'https://instagram.com/majangmejeng_/reel/kamera-minolta-77',
    hero_image_alt: null,
    published_at: '2026-02-10T08:00:00.000Z',
    created_at: '2026-02-10T08:00:00.000Z',
    updated_at: '2026-02-10T08:00:00.000Z',
  },
  {
    id: 'fb-kota-2',
    slug: 'pasar-setelah-pasar',
    title: 'Pasar Setelah Pasar',
    excerpt:
      'Pasar pagi tutup jam sepuluh. Yang terjadi setelahnya sering luput dari kamera.',
    body_md:
      'Setelah pasar tutup, masih ada aktivitas: pengepul keliling, kucing yang akhirnya berani lewat lorong, tukang sol sepatu yang buka di pinggir jalan.\n\n"Saya tidak buka di pasar," kata Tukang Sol. "Saya buka setelah pasar."',
    hero_image: null,
    pillar: 'potret',
    location_id: 'loc-kota',
    coords: '8°8′S / 113°13′E',
    platform: 'instagram',
    platform_url: 'https://instagram.com/majangmejeng_/reel/pasar-setelah-pasar',
    hero_image_alt: null,
    published_at: '2026-01-08T08:00:00.000Z',
    created_at: '2026-01-08T08:00:00.000Z',
    updated_at: '2026-01-08T08:00:00.000Z',
  },
];