/**
 * Landing Zonas — Dynamic CMS fetch + fallback
 * Fetches from Wix CMS collection "LandingsZonas" at runtime.
 * Falls back to hardcoded data if API unavailable.
 *
 * Expected Wix CMS fields:
 *   title         (Text)    — e.g. "Derecho Laboral en Polanco"
 *   zona          (Text)    — e.g. "Polanco"
 *   slug          (Text)    — e.g. "derecho-laboral-polanco"
 *   excerpt       (Text)    — short description for SEO / card
 *   seoTitle      (Text)    — <title> tag override
 *   metaDescripcion (Text)  — <meta description>
 *   urlDeWhatsApp (Text)    — WhatsApp link with pre-filled message
 */
import { wixClient } from '../lib/wixClient';

const COLLECTION_ID = 'LandingsZonas';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapCmsItem(item) {
  const f = item.data || item;
  return {
    id: f._id || item._id || '',
    title: f.title || f.titulo || '',
    zona: f.zona || '',
    excerpt: f.excerpt || f.excerptCorto || '',
    seoTitle: f.seoTitle || f.tituloDeSeo || '',
    metaDescription: f.metaDescripcion || f.metaDescripcionDeSEO || '',
    whatsappUrl: f.urlDeWhatsApp || f.whatsapp || '',
    slug: f.slug || slugify(f.title || f.titulo || ''),
  };
}

// ── Fallback data — used when CMS collection doesn't exist yet ──
const FALLBACK_DATA = [
  {
    id: 'fallback-1',
    title: 'Derecho Laboral en Ciudad de México',
    zona: 'Ciudad de México',
    excerpt: 'Asesoría y defensa en derecho laboral para empresas en CDMX. Atendemos conciliaciones, despidos, demandas y auditorías.',
    seoTitle: 'Abogados Laborales en Ciudad de México | DSC',
    metaDescription: 'Despacho de abogados laborales en CDMX. Atendemos demandas, conciliaciones y asesoría preventiva. Primera consulta gratuita.',
    whatsappUrl: 'https://wa.me/525537408757?text=Hola%2C%20busco%20asesor%C3%ADa%20en%20derecho%20laboral%20en%20CDMX',
    slug: 'derecho-laboral-ciudad-de-mexico',
  },
  {
    id: 'fallback-2',
    title: 'Derecho Laboral en Polanco',
    zona: 'Polanco',
    excerpt: 'Representamos a empresas y empleadores en Polanco y Miguel Hidalgo. Convenios, finiquitos y conciliaciones ante el CCNL.',
    seoTitle: 'Abogados Laborales en Polanco | DSC',
    metaDescription: 'Asesoría legal laboral en Polanco CDMX. Expertos en conciliación, contratos y desvinculaciones. Cotiza sin costo.',
    whatsappUrl: 'https://wa.me/525537408757?text=Hola%2C%20necesito%20asesor%C3%ADa%20laboral%20en%20Polanco',
    slug: 'derecho-laboral-polanco',
  },
  {
    id: 'fallback-3',
    title: 'Derecho Laboral en Santa Fe',
    zona: 'Santa Fe',
    excerpt: 'Servicios legales laborales para empresas en Santa Fe y Cuajimalpa. Auditorías STPS, contratos y defensa en juicios.',
    seoTitle: 'Abogados Laborales en Santa Fe CDMX | DSC',
    metaDescription: 'Despacho de derecho laboral en Santa Fe. Atendemos juicios, inspecciones STPS y contratos colectivos. Consulta gratuita.',
    whatsappUrl: 'https://wa.me/525537408757?text=Hola%2C%20busco%20abogado%20laboral%20en%20Santa%20Fe',
    slug: 'derecho-laboral-santa-fe',
  },
  {
    id: 'fallback-4',
    title: 'Derecho Laboral en Monterrey',
    zona: 'Monterrey',
    excerpt: 'Representación legal para patrones y empresas en Monterrey y área metropolitana. Diligencias, audiencias y conciliaciones.',
    seoTitle: 'Abogados Laborales en Monterrey | DSC',
    metaDescription: 'Despacho de abogados laborales en Monterrey. Defensa patronal, diligencias y conciliaciones CCNL. Primera consulta gratuita.',
    whatsappUrl: 'https://wa.me/525537408757?text=Hola%2C%20necesito%20asesor%C3%ADa%20laboral%20en%20Monterrey',
    slug: 'derecho-laboral-monterrey',
  },
];

// ── In-memory cache ──
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 min

/**
 * Fetch all zone landing pages from Wix CMS.
 * Returns cached data if fresh. Falls back to FALLBACK_DATA on error.
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

    if (pages.length > 0) {
      _cache = pages;
      _cacheTime = now;
      console.log(`[landingZonas] ✅ Loaded ${pages.length} landings from Wix CMS`);
      return pages;
    }
  } catch (err) {
    console.warn('[landingZonas] CMS fetch failed, using fallback:', err.message);
  }

  _cache = FALLBACK_DATA;
  _cacheTime = now;
  return FALLBACK_DATA;
}

/** Get a single landing by slug */
export async function getLandingZonaBySlug(slug) {
  const pages = await fetchLandingZonas();
  return pages.find((p) => p.slug === slug) || null;
}
