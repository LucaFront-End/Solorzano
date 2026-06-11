/**
 * Vercel Serverless Function — /api/blog-posts
 * Uses the @wix/sdk directly in Node.js (no CORS restriction server-side).
 * Query params: ?limit=6
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
      return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
    }
  }
  if (typeof uri === 'string' && uri.startsWith('http')) return uri;
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const limit = Math.min(Number(req.query.limit) || 6, 50);
    const wixClient = makeWixClient();

    const result = await wixClient.posts
      .queryPosts()
      .limit(limit)
      .descending('firstPublishedDate')
      .find();

    const normalizedPosts = result.items.map(normalizePost);
    res.status(200).json({ posts: normalizedPosts });
  } catch (err) {
    console.error('[api/blog-posts]', err);
    res.status(500).json({ error: err.message });
  }
}
