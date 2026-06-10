/**
 * CMS Services Data Layer
 * Processes the CSV export and provides structured service data to the app.
 */
import csvRaw from '../../Servicios+Derecho+Solorzano.csv?raw';
import {
  parseCSV,
  stripWixHTML,
  extractBullets,
  extractStep,
  transformWixImageUrl,
  generateSlug,
} from './csvParser';

// Category icon mapping (Lucide icon names)
const categoryIcons = {
  'Contratos y Prevención Laboral': 'FileText',
  'Demandas y Relaciones Laborales': 'Scale',
  'Inspecciones y Cumplimiento Laboral': 'Search',
};

/**
 * Parse and normalize all services from CSV
 */
function buildServicesFromCSV() {
  const rawRows = parseCSV(csvRaw);

  return rawRows.map(row => {
    const serviceName = row['Servicio'] || row['Titulo'] || '';
    const slug = row['Slug'] || generateSlug(serviceName);
    const category = row['Categoría'] || '';
    const excerpt = row['Excerpt corto'] || '';
    const description = row['Descricpión amplia'] || '';
    const whyCrucial = row['Porque es crucial para tu empresa'] || '';
    const includesRaw = row['Que incluye'] || '';
    const processIntro = row['Nuestro Proceso'] || '';
    const whatsappUrl = row['URL de WhatsApp'] || '';
    const imageRaw = row['Imagen Servicio'] || '';
    const appearsOnPage = (row['Aparece en página'] || '').toUpperCase() === 'SI';
    const seoTitle = row['Titulo de seo'] || '';
    const seoDescription = row['Meta descripcion de SEO'] || '';
    const id = row['ID'] || '';

    // Extract steps
    const steps = [];
    for (let i = 1; i <= 4; i++) {
      const step = extractStep(row[`Paso ${i} proceso`]);
      if (step) steps.push(step);
    }

    // Determine if service has enough content for a full page
    const isComplete = !!(excerpt && description && includesRaw && steps.length > 0);

    return {
      id,
      slug,
      title: serviceName,
      category,
      categoryIcon: categoryIcons[category] || 'FileText',
      excerpt,
      description: stripWixHTML(description),
      whyCrucial: stripWixHTML(whyCrucial),
      includes: extractBullets(includesRaw),
      processIntro: stripWixHTML(processIntro),
      steps,
      whatsappUrl,
      imageUrl: transformWixImageUrl(imageRaw),
      appearsOnPage,
      isComplete,
      seoTitle,
      seoDescription,
    };
  }).filter(s => s.title); // remove empty rows
}

// Build once at import time
export const cmsServices = buildServicesFromCSV();

// Only services that should appear on the page
export const visibleServices = cmsServices.filter(s => s.appearsOnPage);

/**
 * Group visible services by category
 */
export const cmsCategoriesMap = (() => {
  const map = {};
  for (const service of visibleServices) {
    if (!map[service.category]) {
      map[service.category] = {
        category: service.category,
        icon: service.categoryIcon,
        items: [],
      };
    }
    map[service.category].items.push(service);
  }
  return map;
})();

/**
 * Categories as ordered array
 */
export const cmsCategories = Object.values(cmsCategoriesMap);

/**
 * Slug lookup map for fast access
 */
const slugMap = {};
for (const service of cmsServices) {
  if (service.slug) {
    slugMap[service.slug] = service;
  }
}

/**
 * Get a service by its slug
 */
export function getServiceBySlug(slug) {
  return slugMap[slug] || null;
}

/**
 * Get all services for a given category
 */
export function getServicesByCategory(category) {
  return visibleServices.filter(s => s.category === category);
}
