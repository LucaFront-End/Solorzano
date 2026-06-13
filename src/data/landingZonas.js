/**
 * landingZonas.js
 * Fetches landing pages from Wix CMS collection "EstadosPaginas".
 * No fallback data — returns empty array if CMS is unavailable.
 *
 * Expected CMS fields (all optional — renders what's there):
 *   title           → hero title / page title
 *   zona / estado   → zone/city name (label)
 *   descripcion     → hero description / excerpt
 *   imagen / imagenHero / coverImage → hero background image (wix:image URI or URL)
 *   slug            → URL slug
 *   tituloDeSeo     → <title> tag
 *   metadescripcion → <meta description>
 *   urlDeWhatsapp   → WhatsApp CTA link
 */
import { wixClient } from '../lib/wixClient';

const COLLECTION_ID = 'EstadosPaginas';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}


function resolveWixImage(raw, w = 1200, h = 800) {
  if (!raw) return '';
  if (raw.startsWith('http')) return raw;
  // wix:image://v1/{mediaId}/{filename}
  const match = raw.match(/wix:image:\/\/v1\/([^/]+)/);
  if (!match) return '';
  return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_${w},h_${h},al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
}

function mapCmsItem(item) {
  // Wix SDK returns items flat (no .data wrapper in v2)
  const f = item.data || item;
  const title = f.title || f.titulo || '';

  // Image — try every common field name the client might use
  const rawImage =
    f.imagen || f.imagenHero || f.imagenDeFondo || f.coverImage ||
    f.heroImage || f.imagenPrincipal || f.image || '';

  return {
    id:              f._id || item._id || '',
    title,
    zona:            f.zona || f.estado || f.ciudad || f.zone || '',
    // Hero description — prefer long desc, fall back to excerpt
    descripcion:     f.descripcion || f.excerpt || f.excerptCorto || f.subtitulo || '',
    imageUrl:        resolveWixImage(rawImage),
    seoTitle:        f.tituloDeSeo || f.seoTitle || '',
    metaDescription: f.metadescripcion || f.metaDescripcion || f.metaDescripcionDeSEO || '',
    whatsappUrl:     f.urlDeWhatsapp || f.urlDeWhatsApp || f.whatsapp || f.linkWhatsapp || '',
    slug:            f.slug || slugify(title),
  };
}

// ── In-memory cache (5 min TTL) ──
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Fetch all landing pages from Wix CMS.
 * Returns [] if the collection is empty or unreachable.
 */
export async function fetchLandingZonas() {
  const now = Date.now();
  if (_cache && now - _cacheTime < CACHE_TTL) return _cache;

  try {
    const response = await wixClient.items
      .query(COLLECTION_ID)
      .limit(100)
      .find();

    const pages = (response.items || response._items || [])
      .map(mapCmsItem)
      .filter((p) => p.slug && p.title);

    console.log(`[landingZonas] ✅ ${pages.length} pages from CMS "${COLLECTION_ID}"`);
    _cache = pages;
    _cacheTime = now;
    return pages;
  } catch (err) {
    console.warn(`[landingZonas] CMS fetch failed (${COLLECTION_ID}):`, err.message);
    _cache = [];
    _cacheTime = now;
    return [];
  }
}

/** Get a single landing by slug */
export async function getLandingZonaBySlug(slug) {
  const pages = await fetchLandingZonas();
  return pages.find((p) => p.slug === slug) || null;
}
