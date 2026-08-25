import type { Service } from '../../lib/data';

export const FALLBACK_SERVICES: Service[] = [
  {
    id: 'svc-content',
    slug: 'content-production',
    title: 'Content Production',
    summary:
      'Liputan, produksi video pendek, dan dokumentasi untuk cerita yang lebih lama dari viral.',
    deliverables: [
      'Riset lapangan & wawancara',
      'Videografi 1–3 menit',
      'Tulisan naratif 800–1500 kata',
      'Repurposing 6 aset untuk IG/TT',
    ],
    price_from: 4500000,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'svc-social',
    slug: 'social-posting',
    title: 'Social Posting',
    summary:
      'Pengelolaan kalender konten mingguan untuk Instagram & TikTok dengan tone yang konsisten.',
    deliverables: [
      '12–16 posting per bulan',
      'Caption lokal',
      'Reels editing',
      'Laporan engagement bulanan',
    ],
    price_from: 3500000,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'svc-endo',
    slug: 'endorsement',
    title: 'Endorsement',
    summary:
      'Kolaborasi dengan kreator lokal Lumajang untuk memperkenalkan produk Anda ke audience yang relevan.',
    deliverables: [
      'Brief & casting',
      'Produksi konten kreator',
      'Distribusi IG + TT',
      'Reach report',
    ],
    price_from: 2500000,
    sort_order: 3,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'svc-doc',
    slug: 'dokumentasi',
    title: 'Dokumentasi',
    summary:
      'Dokumentasi pernikahan, acara komunitas, dan ritual keluarga dengan pendekatan photo-journalistik.',
    deliverables: [
      '1 fotografer + 1 videografer',
      '400+ foto edited',
      'Highlight video 3–5 menit',
      'Album online',
    ],
    price_from: 6000000,
    sort_order: 4,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'svc-campaign',
    slug: 'campaign',
    title: 'Campaign',
    summary:
      'Perencanaan dan eksekusi kampanye 4–8 minggu untuk brand yang ingin terhubung dengan pasar lokal Jawa Timur.',
    deliverables: [
      'Strategi & konsep',
      'Produksi 6–10 aset',
      'Distribusi multi-platform',
      'Laporan dampak',
    ],
    price_from: 12000000,
    sort_order: 5,
    created_at: '2026-01-01T00:00:00.000Z',
  },
];