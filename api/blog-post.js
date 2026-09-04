/**
 * Vercel Serverless Function — /api/blog-post
 * Uses the @wix/sdk directly in Node.js (no CORS restriction server-side).
 * Fetches a single post with RICH_CONTENT and converts it to HTML.
 * Query params: ?slug=mi-articulo
 */
import { createClient, OAuthStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';

function makeWixClient() {
  return createClient({
    modules: { posts },
    auth: OAuthStrategy({
      clientId: '5b3b46bd-5bd9-4cea-b2b3-ee7aa5fab57e',
    }),
  });
}

function resolveWixImageSrc(uri) {
  if (!uri) return '';
  if (typeof uri === 'string' && uri.startsWith('wix:image://')) {
    const match = uri.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) {
      // Must include both w_ and h_ for Wixstatic v1/fill to work correctly
      return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
    }
  }
  if (typeof uri === 'string' && uri.startsWith('http')) return uri;
  return '';
}

/* ── Ricos → HTML renderer ── */
function ricosToHtml(doc) {
  if (!doc || !Array.isArray(doc.nodes)) return '';
  return doc.nodes.map(nodeToHtml).filter(Boolean).join('\n');
}

function nodeToHtml(node) {
  if (!node) return '';
  const { type, nodes = [] } = node;
  const innerHtml = () => nodes.map(nodeToHtml).join('');

  switch (type) {
    case 'PARAGRAPH': {
      const text = innerHtml();
      if (!text.trim()) return '<br />';
      return `<p>${text}</p>`;
    }
    case 'HEADING': {
      const level = node.headingData?.level || 2;
      const tag = `h${Math.min(6, Math.max(1, level))}`;
      return `<${tag}>${innerHtml()}</${tag}>`;
    }
    case 'BULLET_LIST':
      return `<ul>${nodes.map(n => `<li>${(n.nodes || []).map(nodeToHtml).join('')}</li>`).join('')}</ul>`;
    case 'ORDERED_LIST':
      return `<ol>${nodes.map(n => `<li>${(n.nodes || []).map(nodeToHtml).join('')}</li>`).join('')}</ol>`;
    case 'LIST_ITEM':
      return innerHtml();
    case 'BLOCKQUOTE':
      return `<blockquote>${innerHtml()}</blockquote>`;
    case 'CODE_BLOCK':
      return `<pre><code>${innerHtml()}</code></pre>`;
    case 'DIVIDER':
      return '<hr />';
    case 'IMAGE': {
      const imgData = node.imageData?.image || {};
      const srcRaw = imgData.src?.url || imgData.src || '';
      const src = resolveWixImageSrc(srcRaw);
      if (!src) return '';
      const alt = imgData.altText || node.imageData?.altText || '';
      const caption = node.imageData?.caption
        ? `<figcaption>${escapeHtml(node.imageData.caption)}</figcaption>`
        : '';
      return `<figure><img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" />${caption}</figure>`;
    }
    case 'TEXT': {
      const td = node.textData || {};
      let text = escapeHtml(td.text || '');
      if (!text) return '';
      for (const dec of (td.decorations || [])) {
        if (dec.type === 'BOLD') text = `<strong>${text}</strong>`;
        if (dec.type === 'ITALIC') text = `<em>${text}</em>`;
        if (dec.type === 'UNDERLINE') text = `<u>${text}</u>`;
        if (dec.type === 'STRIKETHROUGH') text = `<s>${text}</s>`;
        if (dec.type === 'COLOR') {
          const color = dec.colorData?.foreground;
          if (color) text = `<span style="color:${color}">${text}</span>`;
        }
        if (dec.type === 'LINK' && dec.linkData?.link?.url) {
          const url = dec.linkData.link.url;
          const target = dec.linkData.link.target === 'BLANK'
            ? ' target="_blank" rel="noopener noreferrer"' : '';
          text = `<a href="${url}"${target}>${text}</a>`;
        }
      }
      return text;
    }
    default:
      return innerHtml() || '';
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Post normalizer ── */
function normalizePost(p) {
  let coverImage = '';
  const wixImageUri = p.media?.wixMedia?.image;
  if (wixImageUri) coverImage = resolveWixImageSrc(wixImageUri);
  else if (p.coverImage) coverImage = p.coverImage;

  return {
    id: p._id,
    title: p.title || '',
    slug: p.slug || '',
    excerpt: p.excerpt || p.title || '',
    contentHtml: p.richContent ? ricosToHtml(p.richContent) : '',
    coverImage,
    publishedDate: p.firstPublishedDate
      ? new Date(p.firstPublishedDate).toLocaleDateString('es-MX', {
          month: 'long',
          year: 'numeric',
        })
      : '',
    readingTime: p.minutesToRead ? `${p.minutesToRead} min` : '5 min',
    categories: p.categoryIds || [],
    url: `/blog/${p.slug}`,
    wixUrl: p.url || '',
  };
}

/* ── Handler ── */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  // Create a fresh client per request to avoid stale auth state in warm instances
  const wixClient = makeWixClient();

  try {
    const result = await wixClient.posts.getPostBySlug(slug, {
      fieldsets: ['RICH_CONTENT'],
    });

    const raw = result.post || result;
    const post = normalizePost(raw);
    res.status(200).json({ post });
  } catch (err) {
    console.error('[api/blog-post]', err);
    res.status(500).json({ error: err.message });
  }
}
