import type { APIRoute } from 'astro';
import { getStories, SITE_URL } from '../lib/data';

export const GET: APIRoute = async () => {
  const stories = await getStories();

  const items = stories
    .map((s) => {
      const url = `${SITE_URL}/cerita/${s.slug}`;
      return `    <item>
      <title>${escapeXml(s.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(s.published_at).toUTCString()}</pubDate>
      ${s.excerpt ? `<description>${escapeXml(s.excerpt)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Majang Mejeng</title>
    <link>${SITE_URL}</link>
    <description>Jurnal lokal &amp; studio kreatif dari Lumajang, Jawa Timur.</description>
    <language>id-ID</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!)
  );
}
