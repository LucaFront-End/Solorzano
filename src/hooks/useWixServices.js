/**
 * Hook: useWixCMS
 * Fetches services dynamically from Wix Data (CMS) API.
 * Collection: "Servicios Derecho Solorzano" (use exact collection name from Wix CMS)
 */
import { useState, useEffect } from 'react';
import { wixClient } from '../lib/wixClient';

const COLLECTION_ID = 'Servicios Derecho Solorzano';

// Category icon mapping (Lucide icon names)
const categoryIcons = {
  'Contratos y Prevención Laboral': 'FileText',
  'Demandas y Relaciones Laborales': 'Scale',
  'Inspecciones y Cumplimiento Laboral': 'Search',
};

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function normalizeService(item) {
  const f = item.data || item;
  const slug = f.slug || generateSlug(f.servicio || f.titulo || '');
  const category = f.categoría || f.categoria || '';
  return {
    id: item._id || f._id || '',
    slug,
    title: f.servicio || f.titulo || '',
    category,
    categoryIcon: categoryIcons[category] || 'FileText',
    excerpt: f.excerptCorto || f['excerpt corto'] || '',
    description: f.descricpionAmplia || f['descricpión amplia'] || '',
    whyCrucial: f.porqueEsCrucialParaTuEmpresa || f['porque es crucial para tu empresa'] || '',
    includes: parseIncludes(f.queIncluye || f['que incluye'] || ''),
    processIntro: f.nuestroProceso || f['nuestro proceso'] || '',
    steps: parseSteps(f),
    whatsappUrl: f.urlDeWhatsApp || f['url de whatsapp'] || '',
    imageUrl: transformWixImageUrl(f.imagenServicio || f['imagen servicio'] || ''),
    appearsOnPage: (f.apareceEnPagina || f['aparece en página'] || '').toString().toUpperCase() === 'SI' || f.apareceEnPagina === true,
    isComplete: !!(f.excerptCorto && f.descricpionAmplia),
    seoTitle: f.tituloDeSeo || f['titulo de seo'] || '',
    seoDescription: f.metaDescripcionDeSEO || f['meta descripcion de seo'] || '',
  };
}

function transformWixImageUrl(wixUrl) {
  if (!wixUrl) return '';
  if (wixUrl.startsWith('http')) return wixUrl;
  const match = wixUrl.match(/wix:image:\/\/v1\/([^/]+)/);
  if (!match) return '';
  const imageId = match[1];
  return `https://static.wixstatic.com/media/${imageId}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
}

function parseIncludes(html) {
  if (!html) return [];
  // Strip HTML tags and split by newlines
  const clean = html.replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').replace(/\n{2,}/g, '\n').trim();
  return clean.split('\n').map(s => s.trim()).filter(s => s.length > 2);
}

function parseSteps(f) {
  const steps = [];
  for (let i = 1; i <= 4; i++) {
    const raw = f[`paso${i}proceso`] || f[`paso ${i} proceso`] || '';
    if (!raw) continue;
    const clean = raw.replace(/<[^>]+>/g, '\n').replace(/\n{2,}/g, '\n').trim();
    const lines = clean.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length >= 2) {
      steps.push({ title: lines[0], desc: lines.slice(1).join(' ') });
    } else if (lines.length === 1) {
      steps.push({ title: lines[0], desc: '' });
    }
  }
  return steps;
}

export function useWixServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    wixClient.items
      .queryDataItems({ dataCollectionId: COLLECTION_ID })
      .limit(100)
      .find()
      .then((res) => {
        if (cancelled) return;
        const normalized = res.items
          .map(normalizeService)
          .filter(s => s.title);
        setServices(normalized);
      })
      .catch((err) => {
        console.error('[useWixServices] Error:', err);
        if (!cancelled) setError(err);
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
    getBySlug: (slug) => services.find(s => s.slug === slug) || null,
  };
}
