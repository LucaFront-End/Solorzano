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

    wixClient.posts.getPostBySlug(slug, { fieldsets: ['RICH_CONTENT'] })
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
    contentHtml: p.richContent ? ricosToHtml(p.richContent) : '',
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

/**
 * ricosToHtml — converts a Wix Ricos document (richContent JSON) to clean HTML.
 * Handles: paragraphs, headings, lists, blockquotes, code, dividers, images, links.
 */
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
      // Wix image nodes use imageData.image.src (which may be a wix:image:// URI)
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
      // Wix TEXT nodes carry content in textData
      const td = node.textData || {};
      let text = escapeHtml(td.text || '');
      if (!text) return '';
      const decorations = td.decorations || [];
      for (const dec of decorations) {
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
            ? ' target="_blank" rel="noopener noreferrer"'
            : '';
          text = `<a href="${url}"${target}>${text}</a>`;
        }
      }
      return text;
    }
    default:
      return innerHtml() || '';
  }
}

function resolveWixImageSrc(src) {
  if (!src) return '';
  if (typeof src === 'string' && src.startsWith('wix:image://')) {
    const match = src.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_900,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg`;
  }
  if (typeof src === 'string' && src.startsWith('http')) return src;
  return '';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

