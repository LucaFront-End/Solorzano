/**
 * Hook: useWixBlog
 * Fetches blog posts dynamically from Wix Blog API.
 */
import { useState, useEffect } from 'react';
import { wixClient } from '../lib/wixClient';

export function useWixBlog({ limit = 6, featured = false } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const query = wixClient.posts
      .queryPosts()
      .limit(limit)
      .descending('firstPublishedDate');

    query.find()
      .then((res) => {
        if (cancelled) return;
        const normalized = res.items.map(normalizePosts);
        setPosts(normalized);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[useWixBlog] Error fetching posts:', err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit]);

  return { posts, loading, error };
}

export function useWixPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    wixClient.posts.getPostBySlug(slug)
      .then((res) => {
        if (cancelled) return;
        setPost(normalizePosts(res.post || res));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[useWixPost] Error fetching post:', err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}

function normalizePosts(p) {
  // Extract cover image from wix:image:// URI string
  let coverImage = '';
  const wixImageUri = p.media?.wixMedia?.image;
  if (typeof wixImageUri === 'string' && wixImageUri.startsWith('wix:image://')) {
    // Format: wix:image://v1/{imageId}/{filename}#params
    const match = wixImageUri.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) {
      coverImage = `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
    }
  } else if (typeof wixImageUri === 'string' && wixImageUri.startsWith('http')) {
    coverImage = wixImageUri;
  } else if (p.coverImage) {
    coverImage = p.coverImage;
  }

  return {
    id: p._id,
    title: p.title || '',
    slug: p.slug || '',
    excerpt: p.excerpt || p.title || '',
    content: p.richContent || null,
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

