/**
 * CSV Parser Utility for Wix CMS Export
 * Parses the Servicios CSV and normalizes data for the app.
 */

/**
 * Parse a CSV string into an array of objects.
 * Handles multi-line quoted fields correctly.
 */
export function parseCSV(csvText) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const lines = csvText.split('\n');

  // Join lines that are inside quoted fields
  const joinedLines = [];
  let buffer = '';
  for (const line of lines) {
    buffer += (buffer ? '\n' : '') + line;
    const quoteCount = (buffer.match(/"/g) || []).length;
    if (quoteCount % 2 === 0) {
      joinedLines.push(buffer);
      buffer = '';
    }
  }
  if (buffer) joinedLines.push(buffer);

  // Parse each logical row
  for (const row of joinedLines) {
    const fields = parseCSVRow(row);
    if (fields.length > 0) {
      rows.push(fields);
    }
  }

  if (rows.length < 2) return [];

  const headers = rows[0];
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j] || '';
    }
    data.push(obj);
  }
  return data;
}

/**
 * Parse a single CSV row respecting quoted fields with embedded commas/newlines.
 */
function parseCSVRow(row) {
  const fields = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < row.length && row[i + 1] === '"') {
          field += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(field.trim());
        field = '';
      } else {
        field += ch;
      }
    }
  }
  fields.push(field.trim());
  return fields;
}

/**
 * Strip Wix HTML markup from content fields.
 * Converts <p class="font_8">text</p> → text
 * Converts <strong>text</strong> → text
 * Removes <br>, <h2>, etc.
 */
export function stripWixHTML(html) {
  if (!html) return '';
  return html
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<strong>/gi, '')
    .replace(/<\/strong>/gi, '')
    .replace(/<br\s*\/?>/gi, '')
    .replace(/<h2[^>]*>.*?<\/h2>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Extract bullet points from Wix HTML "Que incluye" field.
 * Each line with ✔️ becomes a bullet.
 */
export function extractBullets(html) {
  if (!html) return [];
  const clean = stripWixHTML(html);
  return clean
    .split('\n')
    .map(line => line.replace(/^✔️\s*/, '').trim())
    .filter(line => line.length > 0);
}

/**
 * Extract step title and description from a Wix HTML "Paso N" field.
 * Format: <strong>Title</strong>\n\nDescription text
 */
export function extractStep(html) {
  if (!html) return null;
  const clean = stripWixHTML(html);
  const lines = clean.split('\n').filter(l => l.trim());
  if (lines.length === 0) return null;
  return {
    title: lines[0].trim(),
    desc: lines.slice(1).join(' ').trim() || '',
  };
}

/**
 * Transform Wix image URL to a public WixStatic URL.
 * Input:  wix:image://v1/45119e_648217e4ae69413b87ff45b5d8e6979f~mv2.jpg/Convenios%20laborales.jpg#originWidth=1500&originHeight=1000
 * Output: https://static.wixstatic.com/media/45119e_648217e4ae69413b87ff45b5d8e6979f~mv2.jpg/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg
 */
export function transformWixImageUrl(wixUrl) {
  if (!wixUrl) return '';
  // Extract the image ID from wix:image://v1/{id}/{filename}#params
  const match = wixUrl.match(/wix:image:\/\/v1\/([^/]+)/);
  if (!match) return '';
  const imageId = match[1];
  return `https://static.wixstatic.com/media/${imageId}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
}

/**
 * Generate a URL-friendly slug from a service name.
 */
export function generateSlug(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
    .replace(/^-|-$/g, '');         // trim leading/trailing hyphens
}
