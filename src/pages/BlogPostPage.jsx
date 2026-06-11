import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useWixPost } from '../hooks/useWixBlog';
import { siteConfig } from '../data/content';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, error } = useWixPost(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ${siteConfig.name}`;
    }
    return () => { document.title = siteConfig.name; };
  }, [post]);

  if (loading) {
    return (
      <div className="blog-post__loading">
        <div className="blog-post__spinner" />
        <p>Cargando artículo...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post__error">
        <div className="container">
          <h2>Artículo no encontrado</h2>
          <p>El artículo que buscas no existe o fue movido.</p>
          <Link to="/comunidad" className="btn btn--primary">Ver todos los artículos</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-post">
      {/* Hero */}
      <header className="blog-post__hero">
        {post.coverImage && (
          <div className="blog-post__hero-img-wrap">
            <img src={post.coverImage} alt={post.title} className="blog-post__hero-img" />
            <div className="blog-post__hero-overlay" />
          </div>
        )}
        <div className="container blog-post__hero-content">
          <nav className="blog-post__breadcrumb">
            <Link to="/">Inicio</Link>
            <span>›</span>
            <Link to="/comunidad">Blog</Link>
            <span>›</span>
            <span>{post.title}</span>
          </nav>
          <h1 className="blog-post__title">{post.title}</h1>
          <div className="blog-post__meta">
            <span className="blog-post__date">{post.publishedDate}</span>
            <span className="blog-post__divider">·</span>
            <span className="blog-post__read-time">{post.readingTime} de lectura</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container blog-post__body-wrap">
        <div className="blog-post__layout">
          <main className="blog-post__main">
            <p className="blog-post__excerpt">{post.excerpt}</p>

            <div className="blog-post__redirect-notice">
              <p>Para leer el artículo completo con todos los detalles, visita nuestro blog.</p>
              <a
                href={post.wixUrl || `https://www.dsc.mx/post/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Leer artículo completo →
              </a>
            </div>
          </main>

          {/* Sidebar CTA */}
          <aside className="blog-post__sidebar">
            <div className="blog-post__cta-card">
              <h3>¿Tienes dudas legales?</h3>
              <p>Primera asesoría gratuita y sin compromiso con nuestros especialistas.</p>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--full"
              >
                Contactar por WhatsApp
              </a>
              <Link to="/contacto" className="btn btn--outline btn--full">
                Enviar mensaje
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Back to blog */}
      <div className="container blog-post__footer">
        <Link to="/comunidad" className="blog-post__back">
          ← Volver al blog
        </Link>
      </div>
    </article>
  );
}
