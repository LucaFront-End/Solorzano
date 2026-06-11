/**
 * Vercel Serverless Function — /api/blog-posts
 * Proxies Wix Blog queryPosts server-side to avoid CORS restrictions.
 * Query params: ?limit=6
 */

const WIX_CLIENT_ID = '5b3b46bd-5bd9-4cea-b2b3-ee7aa5fab57e';
const WIX_TOKEN_URL = 'https://www.wixapis.com/oauth2/token';
const WIX_POSTS_URL = 'https://www.wixapis.com/blog/v3/posts/query';

async function getWixToken() {
  const res = await fetch(WIX_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: WIX_CLIENT_ID,
      grantType: 'anonymous',
    }),
  });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

function resolveWixImageSrc(wixUri) {
  if (!wixUri) return '';
  if (typeof wixUri === 'string' && wixUri.startsWith('wix:image://')) {
    const match = wixUri.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) {
      return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
    }
  }
  if (typeof wixUri === 'string' && wixUri.startsWith('http')) return wixUri;
  return '';
}

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
    coverImage,
    publishedDate: p.firstPublishedDate
      ? new Date(p.firstPublishedDate).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
      : '',
    readingTime: p.minutesToRead ? `${p.minutesToRead} min` : '5 min',
    categories: p.categoryIds || [],
    url: `/blog/${p.slug}`,
    wixUrl: p.url || '',
  };
}

export default async function handler(req, res) {
  // Allow CORS from our own domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const limit = Math.min(Number(req.query.limit) || 6, 50);
    const token = await getWixToken();

    const wixRes = await fetch(WIX_POSTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: {
          sort: [{ fieldName: 'firstPublishedDate', order: 'DESC' }],
          paging: { limit },
        },
      }),
    });

    if (!wixRes.ok) {
      const text = await wixRes.text();
      throw new Error(`Wix API error ${wixRes.status}: ${text}`);
    }

    const data = await wixRes.json();
    const posts = (data.posts || []).map(normalizePost);
    res.status(200).json({ posts });
  } catch (err) {
    console.error('[api/blog-posts]', err);
    res.status(500).json({ error: err.message });
  }
}
