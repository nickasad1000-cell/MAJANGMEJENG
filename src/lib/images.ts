import type { ImageMetadata } from 'astro';

/**
 * Peta path publik lama (/photos/x.jpg, /products/x.jpg) ke aset
 * teroptimasi astro:assets. Aset fisik kini di src/assets/ dan
 * disajikan lewat <Image /> (WebP + responsive srcset saat build).
 */
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp}',
  { eager: true }
);
const productModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/products/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const byPath = new Map<string, ImageMetadata>();
for (const [file, mod] of Object.entries({ ...photoModules, ...productModules })) {
  const m = file.match(/assets\/(photos|products)\/(.+?)(?:\?[a-z0-9]+)?$/);
  if (m) byPath.set(`/${m[1]}/${m[2]}`, mod.default);
}

/** Kembalikan metadata gambar hanya untuk path lokal yang dikenal; URL eksternal → undefined. */
export function resolveImage(src?: string | null): ImageMetadata | undefined {
  if (!src) return undefined;
  if (!src.startsWith('/') || src.startsWith('//')) return undefined;
  return byPath.get(src.split('?')[0]);
}
