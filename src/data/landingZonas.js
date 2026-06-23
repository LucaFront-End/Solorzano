/**
 * landingZonas.js
 * Fetches landing pages from Wix CMS collection "LandingdeCiudades".
 * No fallback data — returns empty array if CMS is unavailable.
 *
 * CMS fields (from CSV export):
 *   title (Titulo)              → main identifier, e.g. "Abogado Laboral para empresas en México"
 *   slug                        → URL slug, e.g. "abogado-laboral-en-mexico"
 *   tituloDeSeo                 → SEO <title>, e.g. "Abogado Laboral en México para Empresas | ..."
 *   metadescripcion             → meta description
 *   tituloDePagina              → hero H1 title
 *   excerptDePagina             → hero paragraph/excerpt
 *   urlDeWhatsapp               → WhatsApp link for this city
 *   ciudad                      → city name, e.g. "México"
 *   palabra                     → keyword (used for SEO)
 */
import { wixClient } from '../lib/wixClient';

const COLLECTION_ID = 'LandingdeCiudades';

function mapCmsItem(item) {
  const f = item.data || item;

  const ciudad       = f.ciudad || '';
  const titulo       = f.title || f.titulo || '';
  // Wix strips accents from field keys: "Titulo de página" → "tituloDePgina"
  const heroTitle    = f.tituloDePgina || f.tituloDePagina || titulo;
  const heroDesc     = f.excerptDePgina || f.excerptDePagina || '';
  const slug         = f.slug || slugify(titulo);

  return {
    id:              f._id || item._id || '',
    zona:            ciudad || titulo,               // city name (displayed as label)
    title:           heroTitle,                       // hero H1
    descripcion:     heroDesc,                        // hero paragraph
    imageUrl:        '',                              // no image in this CMS
    slug,
    seoTitle:        f.tituloDeSeo || '',
    metaDescription: f.metadescripcin || f.metadescripcion || f.metaDescripcion || '',
    whatsappUrl:     f.urlDeWhatsapp || f.urlDeWhatsApp || '',
    palabra:         f.palabra || '',                 // SEO keyword
  };
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

    console.log(`[landingZonas] ✅ ${pages.length} cities from CMS`);
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
