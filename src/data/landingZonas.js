/**
 * landingZonas.js
 * Fetches landing pages from Wix CMS collection "EstadosPaginas".
 * No fallback data — returns empty array if CMS is unavailable.
 *
 * Actual CMS fields (discovered via API):
 *   title                       → zone name, e.g. "Baja California Sur"
 *   tituloDeZona                → hero title, e.g. "Protege tu agencia..."
 *   texto3                      → hero description text
 *   imagen2                     → hero image (wix:image URI)
 *   link-estados-paginas-title  → full path, e.g. "/asesoria-legal-para-agencias/baja-california-sur"
 */
import { wixClient } from '../lib/wixClient';

const COLLECTION_ID = 'EstadosPaginas';

function resolveWixImage(raw, w = 1200, h = 700) {
  if (!raw) return '';
  if (raw.startsWith('http')) return raw;
  const match = raw.match(/wix:image:\/\/v1\/([^/]+)/);
  if (!match) return '';
  return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_${w},h_${h},al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
}

/**
 * Extract slug from the CMS link field.
 * e.g. "/asesoria-legal-para-agencias/baja-california-sur" → "baja-california-sur"
 */
function extractSlug(linkField, title) {
  if (linkField) {
    const parts = linkField.replace(/^\//, '').split('/');
    return parts[parts.length - 1] || '';
  }
  // Fallback: slugify the title
  return String(title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapCmsItem(item) {
  const f = item.data || item;

  // Actual CMS fields
  const zona       = f.title || '';                          // "Baja California Sur"
  const heroTitle  = f.tituloDeZona || '';                   // "Protege tu agencia: Blinda..."
  const heroDesc   = f.texto3 || '';                         // "Solicita una asesoría..."
  const rawImage   = f.imagen2 || f.imagen || '';            // wix:image URI
  const linkField  = f['link-estados-paginas-title'] || '';  // "/asesoria-legal-para-agencias/..."

  return {
    id:          f._id || item._id || '',
    zona,                                // city/state name
    title:       heroTitle || zona,       // hero H1 (fallback to zona name)
    descripcion: heroDesc,               // hero paragraph
    imageUrl:    resolveWixImage(rawImage),
    slug:        extractSlug(linkField, zona),
    // Optional SEO fields (if client adds them later)
    seoTitle:        f.tituloDeSeo || f.seoTitle || '',
    metaDescription: f.metadescripcion || f.metaDescripcion || '',
    whatsappUrl:     f.urlDeWhatsapp || f.urlDeWhatsApp || f.whatsapp || '',
  };
}

// ── Cache (5 min) ──
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

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
      .filter((p) => p.slug && (p.zona || p.title));

    console.log(`[landingZonas] ✅ ${pages.length} pages from CMS`);
    _cache = pages;
    _cacheTime = now;
    return pages;
  } catch (err) {
    console.warn('[landingZonas] CMS fetch failed:', err.message);
    _cache = [];
    _cacheTime = now;
    return [];
  }
}

export async function getLandingZonaBySlug(slug) {
  const pages = await fetchLandingZonas();
  return pages.find((p) => p.slug === slug) || null;
}
