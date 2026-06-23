import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
  modules: { items },
  auth: ApiKeyStrategy({
    siteId: '1880dc88-4674-4fc5-94a0-5511256f1665',
    apiKey: process.env.WIX_API_KEY || '',
  }),
});

const SITE_URL = 'https://dsc.mx';

export default async function handler(req, res) {
  try {
    // Fetch all cities from CMS
    const response = await wixClient.items
      .query('LandingdeCiudades')
      .limit(100)
      .find();

    const cities = (response.items || [])
      .map((item) => {
        const f = item.data || item;
        return {
          slug: f.slug || '',
          updated: f._updatedDate || f._createdDate || new Date().toISOString(),
        };
      })
      .filter((c) => c.slug);

    // Static routes
    const staticRoutes = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/nosotros', priority: '0.8', changefreq: 'monthly' },
      { loc: '/servicios', priority: '0.9', changefreq: 'weekly' },
      { loc: '/industrias', priority: '0.8', changefreq: 'monthly' },
      { loc: '/comunidad', priority: '0.7', changefreq: 'weekly' },
      { loc: '/contacto', priority: '0.8', changefreq: 'monthly' },
      { loc: '/ciudades', priority: '0.9', changefreq: 'weekly' },
    ];

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Static routes
    for (const route of staticRoutes) {
      xml += `  <url>
    <loc>${SITE_URL}${route.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    }

    // Dynamic city landing pages
    for (const city of cities) {
      const lastmod = city.updated.split('T')[0];
      xml += `  <url>
    <loc>${SITE_URL}/ciudades/${city.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('[sitemap] Error generating sitemap:', err);
    // Return a minimal sitemap on error
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(fallback);
  }
}
