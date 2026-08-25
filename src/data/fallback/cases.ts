import type { CaseStudy } from '../../lib/data';

export const FALLBACK_CASES: CaseStudy[] = [
  {
    id: 'case-kopi',
    slug: 'kopi-tepi-kota',
    client: 'Kopi Tepi Kota',
    title: 'Kopi Tepi Kota, dari warung pinggir menjadi 5 cabang',
    summary:
      'Membawa cerita kopi lokal ke audiens yang lebih luas lewat dokumenter mini dan IG/TT.',
    service_id: 'svc-content',
    cover_image: null,
    results: [
      '12 juta views dalam 3 bulan',
      'Pertumbuhan 4.8K followers IG',
      '3 outlet baru dari organic DM',
    ],
    published_at: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'case-ruang',
    slug: 'ruang-pulang',
    client: 'Ruang Pulang',
    title: 'Ruang Pulang, festival pulang kampung untuk diaspora',
    summary:
      'Kampanye 6 minggu untuk mengajak diaspora Lumajang pulang dan bertemu tetangga lama.',
    service_id: 'svc-campaign',
    cover_image: null,
    results: [
      '850 pendaftar festival',
      '40 acara komunitas',
      'Trending #3 Twitter Jatim',
    ],
    published_at: '2025-08-15T00:00:00.000Z',
  },
  {
    id: 'case-laras',
    slug: 'laras-studio',
    client: 'Laras Studio',
    title: 'Laras Studio, rebrand untuk studio dokumenter kecil',
    summary:
      'Sistem identitas visual + kalender konten 6 bulan pertama.',
    service_id: 'svc-social',
    cover_image: null,
    results: [
      'Apresiasi klien meningkat 2.1x',
      'Inquiry naik 60%',
      'Penetapan rate card',
    ],
    published_at: '2025-05-20T00:00:00.000Z',
  },
];