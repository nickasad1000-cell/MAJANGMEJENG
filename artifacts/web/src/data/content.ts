export type StoryFormat = 'Film' | 'Catatan' | 'Potret' | 'Audio' | 'Wawancara' | 'Photo Essay';

export type Story = {
  slug: string;
  title: string;
  dek: string;
  format: StoryFormat;
  location: string;
  date: string;
  readTime: string;
  color: string;
  image: string;
  excerpt: string;
  body: string[];
  subject: string;
};

export const stories: Story[] = [
  {
    slug: 'suara-subuh-dari-senduro',
    title: 'Suara Subuh dari Senduro',
    dek: 'Sebelum pasar membuka pintu, desa sudah punya orkestra sendiri.',
    format: 'Audio',
    location: 'Senduro',
    date: '12 Feb 2024',
    readTime: '6 min dengar',
    color: 'clay',
    image: '',
    excerpt: 'Rekaman kecil tentang ritme yang biasanya luput: sapu halaman, motor pertama, dan suara ibu-ibu menawar sayur.',
    body: ['Di Senduro, pagi tidak datang sebagai garis terang di balik gunung. Ia datang sebagai bunyi yang berlapis.', 'Ada pintu kayu yang digeser, ada panci yang bertemu kompor, ada langkah yang hafal jalan menuju pasar. Kami duduk di teras Bu Siti dengan mikrofon kecil dan tidak banyak bertanya.', 'Yang terekam bukan kesunyian. Yang terekam adalah cara sebuah tempat menyiapkan harinya.'],
    subject: 'Bu Siti dan ritme pagi Senduro',
  },
  {
    slug: 'warung-yang-tidak-pernah-sepi',
    title: 'Warung yang Tidak Pernah Sepi',
    dek: 'Di tikungan Pasirian, kabar berjalan lebih cepat dari koneksi internet.',
    format: 'Potret',
    location: 'Pasirian',
    date: '04 Jan 2024',
    readTime: '4 min baca',
    color: 'sage',
    image: '',
    excerpt: 'Satu meja, enam gelas kopi, dan arsip hidup sebuah kampung yang selalu punya cerita baru.',
    body: ['Warung Mbak Lilis berdiri di antara bengkel dan toko pakan. Tidak ada papan nama besar, hanya kursi plastik yang tahu kapan harus bergeser.', 'Orang datang untuk kopi, tapi tinggal untuk mendengar. Di sini, petani, sopir, guru, dan anak sekolah bertukar kabar tanpa agenda.', 'Kami memotret ruangnya pelan-pelan: noda di meja, toples kerupuk, dan tangan yang selalu punya pekerjaan.'],
    subject: 'Mbak Lilis, penjaga kabar Pasirian',
  },
  {
    slug: 'catatan-dari-jalan-lama',
    title: 'Catatan dari Jalan Lama',
    dek: 'Perjalanan pulang lewat Ranuyoso, dengan jendela sedikit terbuka.',
    format: 'Catatan',
    location: 'Ranuyoso',
    date: '18 Des 2023',
    readTime: '5 min baca',
    color: 'yellow',
    image: '',
    excerpt: 'Bukan panduan perjalanan. Hanya catatan tentang apa yang terlihat ketika kita tidak terburu-buru.',
    body: ['Jalan lama menuju Ranuyoso menyimpan cara pandang yang berbeda. Truk lewat, sawah bergeser, dan rumah-rumah memberi tanda bahwa hidup sedang berlangsung.', 'Kami berhenti di dua tempat yang tidak masuk daftar siapa pun: bengkel kecil dengan radio keras, lalu lapak buah yang menunggu matahari turun.', 'Mungkin sebuah kota bisa dikenal bukan dari landmark-nya, tapi dari jeda-jeda yang membuat orang ingin kembali.'],
    subject: 'Jeda-jeda di jalan Ranuyoso',
  },
  {
    slug: 'anak-anak-yang-menggambar-hujan',
    title: 'Anak-anak yang Menggambar Hujan',
    dek: 'Di Pronojiwo, kelas sore berubah menjadi studio kecil penuh warna.',
    format: 'Photo Essay',
    location: 'Pronojiwo',
    date: '29 Nov 2023',
    readTime: '8 min baca',
    color: 'blue',
    image: '',
    excerpt: 'Enam lembar kertas, banyak pertanyaan, dan hujan yang tidak pernah cuma soal cuaca.',
    body: ['Kertas-kertas itu dijemur di bawah teras karena hujan datang sebelum gambar selesai. Anak-anak tidak memprotes; mereka hanya membuat awan lebih besar.', 'Kelas sore ini digagas oleh Rara, ilustrator yang pulang ke Pronojiwo setelah bertahun-tahun bekerja di kota.', 'Kami datang untuk memotret gambar. Pulang membawa cara baru melihat hujan: sebagai bahan cerita, bukan gangguan.'],
    subject: 'Kelas gambar Rara di Pronojiwo',
  },
  {
    slug: 'satu-kamera-dua-generasi',
    title: 'Satu Kamera, Dua Generasi',
    dek: 'Bima dan ayahnya belajar membaca kota lewat bingkai yang berbeda.',
    format: 'Wawancara',
    location: 'Kota Lumajang',
    date: '11 Okt 2023',
    readTime: '7 min baca',
    color: 'pink',
    image: '',
    excerpt: 'Percakapan tentang foto keluarga, toko yang berubah, dan mengapa Lumajang selalu punya cahaya sore.',
    body: ['Bima memotret dengan ponsel. Ayahnya masih menyimpan kamera film yang dibeli pada 1998. Mereka berbagi satu tas dan banyak perdebatan kecil.', 'Bagi ayah, foto adalah bukti. Bagi Bima, foto adalah pertanyaan. Keduanya bertemu di trotoar kota, mencari wajah yang tidak dibuat-buat.', 'Wawancara ini berjalan seperti jalan kaki: pelan, berbelok, dan selalu menemukan sesuatu.'],
    subject: 'Bima dan Pak Arif, fotografer lintas generasi',
  },
  {
    slug: 'pasar-setelah-pasar',
    title: 'Pasar Setelah Pasar',
    dek: 'Ketika lapak tutup, kota mulai memperlihatkan pekerjaan lain.',
    format: 'Film',
    location: 'Kota Lumajang',
    date: '22 Sep 2023',
    readTime: '12 min tonton',
    color: 'green',
    image: '',
    excerpt: 'Film pendek tentang orang-orang yang datang paling awal dan pulang paling akhir dari pasar kota.',
    body: ['Film ini dimulai ketika pedagang terakhir menggulung terpal. Kota tidak tutup; ia hanya bertukar pemeran.', 'Ada petugas kebersihan yang hafal nama jalan, ada penjaga parkir yang mengumpulkan berita, dan ada lampu toko yang tetap menyala tanpa pembeli.', 'Kami merekam Lumajang bukan sebagai latar. Kota ini adalah tokoh utama yang punya kebiasaan, lelah, dan humor sendiri.'],
    subject: 'Malam di sekitar pasar kota',
  },
];

export const services = [
  { title: 'Content Production', desc: 'Film pendek, foto, tulisan, dan audio yang punya arah editorial.', icon: 'camera', tag: 'Untuk brand yang ingin terdengar manusiawi' },
  { title: 'Social Posting', desc: 'Kalender konten, caption, dan ritme posting yang tidak terasa seperti mesin.', icon: 'calendar', tag: 'Untuk tim yang butuh teman berpikir' },
  { title: 'Endorsement', desc: 'Kolaborasi dengan suara lokal yang dipercaya, bukan sekadar angka.', icon: 'megaphone', tag: 'Untuk produk yang ingin masuk percakapan' },
  { title: 'Dokumentasi', desc: 'Menyimpan momen acara, proses, dan orang-orang di baliknya dengan hangat.', icon: 'aperture', tag: 'Untuk peristiwa yang layak diingat' },
  { title: 'Campaign', desc: 'Konsep, produksi, distribusi, sampai evaluasi untuk cerita yang lebih besar.', icon: 'sparkles', tag: 'Untuk gagasan yang ingin bergerak' },
];

export const cases = [
  { client: 'Kopi Tepi Kota', title: 'Satu Meja, Banyak Cerita', type: 'Content Production + Social', result: '12 cerita lokal / 6 minggu', color: 'clay', image: '', text: 'Mengubah kedai baru menjadi ruang percakapan melalui seri potret pelanggan dan catatan pendek dari meja yang sama.' },
  { client: 'Ruang Pulang', title: 'Surat untuk yang Tinggal', type: 'Campaign', result: '2.400 partisipasi organik', color: 'blue', image: '', text: 'Kampanye komunitas yang mengajak anak muda Lumajang menulis satu hal yang ingin mereka jaga dari kota ini.' },
  { client: 'Laras Studio', title: 'Benda yang Dipakai Setiap Hari', type: 'Photo Essay + Social', result: '28 aset / 4 kanal', color: 'yellow', image: '', text: 'Peluncuran koleksi dibuat dekat dengan pemakainya: detail bahan, tangan pembuat, dan rutinitas yang memberi benda makna.' },
];

export const locations = [
  { name: 'Kota Lumajang', count: 2, note: 'trotoar, pasar, dan cahaya sore', x: 67, y: 68 },
  { name: 'Senduro', count: 1, note: 'pagi yang berlapis bunyi', x: 45, y: 29 },
  { name: 'Pronojiwo', count: 1, note: 'kelas sore di bawah hujan', x: 72, y: 51 },
  { name: 'Pasirian', count: 1, note: 'kabar dari tikungan jalan', x: 72, y: 78 },
  { name: 'Ranuyoso', count: 1, note: 'jeda di jalan lama', x: 30, y: 62 },
];