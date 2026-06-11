/**
 * Hook: useWixServices
 * Fetches services dynamically from Wix CMS (live data).
 * Falls back to local CSV data if the API call fails.
 * Collection: "Servicios Derecho Solorzano"
 */
import { useState, useEffect } from 'react';
import { wixClient } from '../lib/wixClient';
import {
  cmsServices as csvServices,
  visibleServices as csvVisibleServices,
  cmsCategories as csvCategories,
  getServiceBySlug as csvGetBySlug,
} from '../data/cmsServices';

const COLLECTION_ID = 'ServiciosDerechoSolorzano';

// Category icon mapping (Lucide icon names)
const categoryIcons = {
  'Contratos y Prevención Laboral': 'FileText',
  'Demandas y Relaciones Laborales': 'Scale',
  'Inspecciones y Cumplimiento Laboral': 'Search',
};

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

function transformWixImageUrl(wixUrl) {
  if (!wixUrl) return '';
  if (wixUrl.startsWith('http')) return wixUrl;
  const match = wixUrl.match(/wix:image:\/\/v1\/([^/]+)/);
  if (!match) return '';
  const imageId = match[1];
  return `https://static.wixstatic.com/media/${imageId}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
}

function stripHTML(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseIncludes(html) {
  if (!html) return [];
  const clean = stripHTML(html);
  return clean
    .split('\n')
    .map(s => s.replace(/^✔️\s*/, '').trim())
    .filter(s => s.length > 2);
}

function parseSteps(f) {
  const steps = [];
  for (let i = 1; i <= 4; i++) {
    const raw = f[`paso${i}Proceso`] || f[`paso${i}proceso`] || f[`paso ${i} proceso`] || '';
    if (!raw) continue;
    const clean = stripHTML(raw);
    const lines = clean.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length >= 2) {
      steps.push({ title: lines[0], desc: lines.slice(1).join(' ') });
    } else if (lines.length === 1) {
      steps.push({ title: lines[0], desc: '' });
    }
  }
  return steps;
}

function normalizeService(item) {
  // Wix SDK returns flat items (no nested .data property)
  const f = item.data || item;
  const serviceName = f.servicio || f.title || f.titulo || '';
  const slug = f.slug || generateSlug(serviceName);
  // Wix CMS uses 'categora' (no accent) as the field name
  const category = f.categora || f.categoría || f.categoria || '';
  const excerpt = f.excerptCorto || '';
  // Wix CMS uses 'descricpinAmplia' (typo in CMS, no 'o')
  const description = f.descricpinAmplia || f.descricpionAmplia || '';
  const whyCrucial = f.porqueEsCrucialParaTuEmpresa || '';
  // Wix CMS uses 'richtext' for the "que incluye" bullets
  const includesRaw = f.richtext || f.queIncluye || '';

  return {
    id: f._id || item._id || '',
    slug,
    title: serviceName,
    category,
    categoryIcon: categoryIcons[category] || 'FileText',
    excerpt,
    description: stripHTML(description),
    whyCrucial: stripHTML(whyCrucial),
    includes: parseIncludes(includesRaw),
    processIntro: stripHTML(f.nuestroProceso || ''),
    steps: parseSteps(f),
    whatsappUrl: f.urlDeWhatsApp || '',
    imageUrl: transformWixImageUrl(f.imagenServicio || ''),
    // Wix CMS uses 'apareceEnPgina' (no accent)
    appearsOnPage:
      (f.apareceEnPgina || f.apareceEnPagina || '')
        .toString().toUpperCase() === 'SI' ||
      f.apareceEnPgina === true ||
      f.apareceEnPagina === true,
    isComplete: !!(excerpt && description),
    seoTitle: f.tituloDeSeo || '',
    seoDescription: f.metaDescripcionDeSEO || '',
  };
}

export function useWixServices() {
  const [services, setServices] = useState(csvServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('csv'); // 'wix' | 'csv'

  useEffect(() => {
    let cancelled = false;

    // Wix SDK v2: use .query(collectionId).limit(n).find()
    wixClient.items
      .query(COLLECTION_ID)
      .limit(100)
      .find()
      .then((res) => {
        if (cancelled) return;
        const rawItems = res.items || res._items || [];
        const normalized = rawItems
          .map(normalizeService)
          .filter(s => s.title);

        if (normalized.length > 0) {
          setServices(normalized);
          setSource('wix');
          console.log(`[useWixServices] ✅ Loaded ${normalized.length} services from Wix CMS`);
        } else {
          console.warn('[useWixServices] Wix returned 0 items, using CSV fallback');
          setSource('csv');
        }
      })
      .catch((err) => {
        console.warn('[useWixServices] Wix API failed, using CSV fallback:', err.message);
        if (!cancelled) {
          setError(err);
          setSource('csv');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const visibleServices = services.filter(s => s.appearsOnPage);

  const categoriesMap = {};
  for (const svc of visibleServices) {
    if (!categoriesMap[svc.category]) {
      categoriesMap[svc.category] = { category: svc.category, icon: svc.categoryIcon, items: [] };
    }
    categoriesMap[svc.category].items.push(svc);
  }

  return {
    services,
    visibleServices,
    categories: Object.values(categoriesMap),
    loading,
    error,
    source,
    getBySlug: (slug) => services.find(s => s.slug === slug) || null,
  };
}
