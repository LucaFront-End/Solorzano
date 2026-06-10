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
        setPost(normalizePosts(res));
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
  return {
    id: p._id,
    title: p.title || '',
    slug: p.slug || '',
    excerpt: p.excerpt || p.title || '',
    content: p.richContent || null,
    coverImage: p.media?.wixMedia?.image?.url
      ? `https://static.wixstatic.com/media/${p.media.wixMedia.image.url.replace('wix:image://v1/', '').split('/')[0]}/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`
      : (p.heroImage || ''),
    publishedDate: p.firstPublishedDate
      ? new Date(p.firstPublishedDate).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
      : '',
    readingTime: p.minutesToRead ? `${p.minutesToRead} min` : '5 min',
    categories: p.categoryIds || [],
    url: `/blog/${p.slug}`,
    wixUrl: p.url || '',
  };
}
