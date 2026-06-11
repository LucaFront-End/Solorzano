/**
 * Hook: useWixServices
 * Provides service data from the local CSV export (always available).
 * Previously fetched from Wix SDK which failed due to CORS in production.
 */
import { useState, useEffect } from 'react';
import {
  cmsServices,
  visibleServices,
  cmsCategories,
  getServiceBySlug,
} from '../data/cmsServices';

export function useWixServices() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief load so components that depend on loading state behave correctly
    const timer = setTimeout(() => setLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  return {
    services: cmsServices,
    visibleServices,
    categories: cmsCategories,
    loading,
    error: null,
    getBySlug: (slug) => getServiceBySlug(slug),
  };
}
