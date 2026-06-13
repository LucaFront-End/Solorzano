/**
 * Hook: useWixCities
 * Fetches coverage cities/zones dynamically from Wix CMS.
 * Collection: "CiudadesCobertura" — fields: nombre (text), estado (text), activa (boolean)
 * Falls back to siteConfig.cities if the CMS collection doesn't exist or returns empty.
 */
import { useState, useEffect } from 'react';
import { wixClient } from '../lib/wixClient';
import { siteConfig } from '../data/content';

const COLLECTION_ID = 'CiudadesCobertura';

const FALLBACK_CITIES = siteConfig.cities.map((name, i) => ({
  id: `fallback-${i}`,
  nombre: name,
  estado: '',
  activa: true,
}));

function normalizeCity(item) {
  const f = item.data || item;
  return {
    id: f._id || item._id || '',
    nombre: f.nombre || f.ciudad || f.name || '',
    estado: f.estado || f.state || '',
    activa: f.activa !== false, // default to true
  };
}

export function useWixCities() {
  const [cities, setCities] = useState(FALLBACK_CITIES);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('fallback');

  useEffect(() => {
    let cancelled = false;

    wixClient.items
      .query(COLLECTION_ID)
      .limit(50)
      .find()
      .then((res) => {
        if (cancelled) return;
        const rawItems = res.items || res._items || [];
        const normalized = rawItems
          .map(normalizeCity)
          .filter((c) => c.nombre && c.activa);

        if (normalized.length > 0) {
          setCities(normalized);
          setSource('wix');
          console.log(`[useWixCities] ✅ Loaded ${normalized.length} cities from Wix CMS`);
        } else {
          console.warn('[useWixCities] Wix returned 0 cities, using fallback');
          setSource('fallback');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('[useWixCities] CMS not available, using fallback:', err.message);
          setSource('fallback');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cities, loading, source };
}
