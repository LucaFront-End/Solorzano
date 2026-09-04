/**
 * Hook: useWixBlog / useWixPost
 * Fetches blog data via our own Vercel API proxy (/api/blog-posts, /api/blog-post)
 * to avoid Wix CORS restrictions in production.
 * In local dev, Vite proxies /api → Vercel dev server (or we fall back to SDK).
 */
import { useState, useEffect } from 'react';

/**
 * Fetch multiple posts.
 * @param {object} opts
 * @param {number} opts.limit - max posts to return (default 6)
 */
export function useWixBlog({ limit = 6 } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/blog-posts?limit=${limit}&_t=${Date.now()}`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then(data => {
        if (cancelled) return;
        setPosts(data.posts || []);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[useWixBlog] Error:', err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit]);

  return { posts, loading, error };
}

/**
 * Fetch a single post by slug (with full richContent HTML).
 * @param {string} slug
 */
export function useWixPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/blog-post?slug=${encodeURIComponent(slug)}&_t=${Date.now()}`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then(data => {
        if (cancelled) return;
        setPost(data.post || null);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[useWixPost] Error:', err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}
