/**
 * Supabase REST fetch helpers — build-time (SSG) only.
 * Uses anon key; falls back to bundled seed data on any failure.
 */
import { FALLBACK_STORIES } from '../data/fallback/stories';
import { FALLBACK_PRODUCTS } from '../data/fallback/products';
import { FALLBACK_SERVICES } from '../data/fallback/services';
import { FALLBACK_LOCATIONS } from '../data/fallback/locations';
import { FALLBACK_CASES } from '../data/fallback/cases';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://ymkrbeuwvruhmprqjmuj.supabase.co';
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const SITE_URL = 'https://majangmejeng.vercel.app';
export const WA_NUMBER_FALLBACK = '6282225666497';

async function rest<T>(table: string, search: string): Promise<T[] | null> {
  try {
    if (!ANON_KEY) return null;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${search}`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as T[];
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export interface Story {
  id: string; slug: string; title: string; excerpt: string | null;
  body_md: string; hero_image: string | null; hero_image_alt: string | null;
  pillar: 'kawasan' | 'satu-tempat-tiga-cerita' | 'behind-the-scenes' | 'potret';
  location_id: string | null; coords: string | null;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'web' | null;
  platform_url: string | null; published_at: string; created_at: string;
}
export interface Product {
  id: string; slug: string; title: string; category: string; price_idr: number;
  description: string; cover_image: string | null; gallery: string[];
  stock: number; active: boolean; created_at: string;
}
export interface Service {
  id: string; slug: string; title: string; summary: string;
  deliverables: string[]; price_from: number | null; sort_order: number;
}
export interface LocationRow {
  id: string; slug: string; name: string; district: string | null;
  coords: string | null; blurb: string | null;
}

export async function getStories(): Promise<Story[]> {
  return (await rest<Story>('stories', '?select=*&order=published_at.desc')) ?? FALLBACK_STORIES;
}
export async function getStory(slug: string): Promise<Story | undefined> {
  const rows = await getStories();
  return rows.find((s) => s.slug === slug);
}
export async function getProducts(category?: string): Promise<Product[]> {
  const q = category && category !== 'all'
    ? `?select=*&category=eq.${category}&active=eq.true&order=created_at.asc`
    : '?select=*&active=eq.true&order=created_at.asc';
  return (await rest<Product>('products', q)) ?? FALLBACK_PRODUCTS;
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  const rows = await getProducts();
  return rows.find((p) => p.slug === slug);
}
export async function getServices(): Promise<Service[]> {
  return (await rest<Service>('services', '?select=*&order=sort_order.asc')) ?? FALLBACK_SERVICES;
}
export async function getLocations(): Promise<LocationRow[]> {
  return (await rest<LocationRow>('locations', '?select=*&order=name.asc')) ?? FALLBACK_LOCATIONS;
}
export async function getWaNumber(): Promise<string> {
  const rows = await rest<{ key: string; value: unknown }>('site_settings', '?select=key,value&key=eq.wa_number');
  const raw = rows?.[0]?.value;
  const num = typeof raw === 'object' && raw !== null ? String((raw as { value?: string }).value ?? '') : String(raw ?? '');
  return /^62\d{8,12}$/.test(num) ? num : WA_NUMBER_FALLBACK;
}

export const PILLAR_LABELS: Record<string, string> = {
  kawasan: 'Kawasan',
  'satu-tempat-tiga-cerita': 'Satu Tempat, Tiga Cerita',
  'behind-the-scenes': 'Behind the Scenes',
  potret: 'Potret',
};

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export interface CaseStudy {
  id: string; slug: string; client: string; title: string; summary: string;
  service_id: string | null; cover_image: string | null;
  results: string[]; published_at: string;
}
export async function getCases(): Promise<CaseStudy[]> {
  return (await rest<CaseStudy>('cases', '?select=*&order=published_at.desc')) ?? FALLBACK_CASES;
}
