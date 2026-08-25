import type { APIRoute } from 'astro';
import { getStories, SITE_URL } from '../lib/data';

export const GET: APIRoute = async () => {
  const stories = await getStories();
  const staticPages = ['', '/cerita', '/jasa', '/hasil-kerja', '/toko', '/tentang-kami', '/titipkan-cerita', '/lokasi', '/privacy'];

  const urls: { loc: string; priority: string; changefreq: string }[] = staticPages.map((p) => ({
    loc: `${SITE_URL}${p}`,
    priority: p === '' ? '1.0' : '0.7',
    changefreq: p === '/cerita' || p === '' ? 'weekly' : 'monthly',
  }));

  for (const s of stories) {
    urls.push({ loc: `${SITE_URL}/cerita/${s.slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
