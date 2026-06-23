import { createClient, ApiKeyStrategy, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { posts } from '@wix/blog';

// Wix Client for CMS Data items
const wixClient = createClient({
  modules: { items },
  auth: ApiKeyStrategy({
    siteId: '1880dc88-4674-4fc5-94a0-5511256f1665',
    apiKey: process.env.WIX_API_KEY || '',
  }),
});

// Wix Client for Blog posts
const blogWixClient = createClient({
  modules: { posts },
  auth: OAuthStrategy({
    clientId: '5b3b46bd-5bd9-4cea-b2b3-ee7aa5fab57e',
  }),
});

const SITE_URL = 'https://dsc.mx';

// Helper to generate service slugs if missing
function generateSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default async function handler(req, res) {
  const { type = 'index' } = req.query;
  const today = new Date().toISOString().split('T')[0];

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');

  try {
    // ══════════════════════════════════════════════════════════════
    // 1. SITEMAP INDEX MODE
    // ══════════════════════════════════════════════════════════════
    if (type === 'index') {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-ciudades.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-servicios.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
      return res.status(200).send(xml);
    }

    // ══════════════════════════════════════════════════════════════
    // 2. STATIC PAGES + INDUSTRIES SUB-SITEMAP
    // ══════════════════════════════════════════════════════════════
    if (type === 'pages') {
      const staticRoutes = [
        { loc: '/', priority: '1.0', changefreq: 'weekly' },
        { loc: '/nosotros', priority: '0.8', changefreq: 'monthly' },
        { loc: '/servicios', priority: '0.9', changefreq: 'weekly' },
        { loc: '/industrias', priority: '0.8', changefreq: 'monthly' },
        { loc: '/comunidad', priority: '0.7', changefreq: 'weekly' },
        { loc: '/contacto', priority: '0.8', changefreq: 'monthly' },
        { loc: '/ciudades', priority: '0.9', changefreq: 'weekly' },
        { loc: '/terminos-de-citatorios-ante-el-ccl', priority: '0.4', changefreq: 'monthly' },
        { loc: '/tickets-de-diligencias-en-despacho-legal-solorzano', priority: '0.4', changefreq: 'monthly' },
      ];

      const industries = [
        'manufactura',
        'retail-comercio',
        'tecnologia',
        'hospitalidad',
        'construccion',
        'salud',
        'educacion',
        'logistica-transporte'
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

      for (const route of staticRoutes) {
        xml += `  <url>
    <loc>${SITE_URL}${route.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
      }

      for (const slug of industries) {
        xml += `  <url>
    <loc>${SITE_URL}/industrias/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }

      xml += '</urlset>';
      return res.status(200).send(xml);
    }

    // ══════════════════════════════════════════════════════════════
    // 3. CIUDADES SUB-SITEMAP (Wix CMS LandingdeCiudades)
    // ══════════════════════════════════════════════════════════════
    if (type === 'ciudades') {
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

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

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

      xml += '</urlset>';
      return res.status(200).send(xml);
    }

    // ══════════════════════════════════════════════════════════════
    // 4. SERVICIOS SUB-SITEMAP (Wix CMS ServiciosDerechoSolorzano)
    // ══════════════════════════════════════════════════════════════
    if (type === 'servicios') {
      const response = await wixClient.items
        .query('ServiciosDerechoSolorzano')
        .limit(100)
        .find();

      const services = (response.items || [])
        .map((item) => {
          const f = item.data || item;
          const serviceName = f.servicio || f.title || f.titulo || '';
          return {
            slug: f.slug || generateSlug(serviceName),
            updated: f._updatedDate || f._createdDate || new Date().toISOString(),
          };
        })
        .filter((s) => s.slug);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

      for (const service of services) {
        const lastmod = service.updated.split('T')[0];
        xml += `  <url>
    <loc>${SITE_URL}/servicios-derecho/${service.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }

      xml += '</urlset>';
      return res.status(200).send(xml);
    }

    // ══════════════════════════════════════════════════════════════
    // 5. BLOG SUB-SITEMAP (Wix Blog Posts)
    // ══════════════════════════════════════════════════════════════
    if (type === 'blog') {
      const result = await blogWixClient.posts
        .queryPosts()
        .limit(100)
        .descending('firstPublishedDate')
        .find();

      const blogPosts = (result.items || [])
        .map((post) => {
          return {
            slug: post.slug || '',
            updated: post.lastPublishedDate || post.firstPublishedDate || new Date().toISOString(),
          };
        })
        .filter((p) => p.slug);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

      for (const post of blogPosts) {
        const lastmod = new Date(post.updated).toISOString().split('T')[0];
        xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }

      xml += '</urlset>';
      return res.status(200).send(xml);
    }

    // Unrecognized type
    return res.status(400).send('Invalid sitemap type requested.');

  } catch (err) {
    console.error('[sitemap] Error generating sitemap type:', type, err);
    // Fallback minimal sitemap index or set
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
    return res.status(200).send(fallback);
  }
}
