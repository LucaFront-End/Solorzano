import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useWixPost, useWixBlog } from '../hooks/useWixBlog';
import { siteConfig } from '../data/content';
import { Calendar, Clock, ArrowLeft, ArrowRight, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, error } = useWixPost(slug);
  const { posts: allPosts } = useWixBlog({ limit: 4 });

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ${siteConfig.name}`;
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
    return () => { document.title = siteConfig.name; };
  }, [post, slug]);

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

  // Filter out the current post from related posts
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <article className="blog-post">
      {/* Editorial Header */}
      <header className="blog-post__header">
        <div className="container blog-post__header-container">
          <nav className="blog-post__breadcrumb">
            <Link to="/">Inicio</Link>
            <ChevronRight size={12} className="blog-post__breadcrumb-icon" />
            <Link to="/comunidad">Blog</Link>
            <ChevronRight size={12} className="blog-post__breadcrumb-icon" />
            <span className="blog-post__breadcrumb-current">{post.title}</span>
          </nav>
          
          <div className="blog-post__badge-container">
            <span className="blog-post__badge">Derecho Laboral</span>
          </div>

          <h1 className="blog-post__title">{post.title}</h1>
          
          <div className="blog-post__meta">
            <div className="blog-post__meta-item">
              <Calendar size={14} />
              <span>{post.publishedDate}</span>
            </div>
            <span className="blog-post__meta-dot">•</span>
            <div className="blog-post__meta-item">
              <Clock size={14} />
              <span>{post.readingTime} de lectura</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="container blog-post__cover-container">
          <div className="blog-post__cover-wrapper">
            <img src={post.coverImage} alt={post.title} className="blog-post__cover-img" />
          </div>
        </div>
      )}

      {/* Main Content & Sidebar */}
      <div className="container blog-post__body-container">
        <div className="blog-post__layout">
          <main className="blog-post__main">
            <div className="blog-post__content">
              {/* Full article content from Wix richContent */}
              {post.contentHtml ? (
                <div
                  className="blog-post__rich-content"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                <div className="blog-post__no-content">
                  <p>El contenido completo de este artículo está disponible en nuestro blog.</p>
                  <a
                    href={post.wixUrl || `https://www.dsc.mx/post/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium-wix"
                  >
                    <span>Ver en dsc.mx</span>
                  </a>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="blog-post__sidebar">
            <div className="blog-post__cta-card">
              <div className="blog-post__cta-accent-bar" />
              <h3>¿Tienes dudas o necesitas asesoría?</h3>
              <p>Ofrecemos una primera consulta legal sin costo y con absoluta confidencialidad para tu empresa.</p>
              
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-post__cta-btn blog-post__cta-btn--whatsapp"
              >
                <Phone size={16} />
                <span>Contactar por WhatsApp</span>
              </a>
              
              <Link to="/contacto" className="blog-post__cta-btn blog-post__cta-btn--email">
                <MessageSquare size={16} />
                <span>Enviar un mensaje</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="blog-post__related">
          <div className="container">
            <h2 className="blog-post__related-title">Artículos Recomendados</h2>
            <div className="blog-post__related-grid">
              {relatedPosts.map(related => (
                <article key={related.id} className="blog-post__related-card">
                  {related.coverImage && (
                    <div className="blog-post__related-card-img-wrap">
                      <img src={related.coverImage} alt={related.title} />
                      <div className="blog-post__related-card-img-overlay" />
                    </div>
                  )}
                  <div className="blog-post__related-card-content">
                    <span className="blog-post__related-card-badge">Actualidad</span>
                    <h3 className="blog-post__related-card-title">
                      <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <p className="blog-post__related-card-excerpt">
                      {related.excerpt && related.excerpt.length > 110 
                        ? `${related.excerpt.substring(0, 110)}...` 
                        : related.excerpt}
                    </p>
                    <Link to={`/blog/${related.slug}`} className="blog-post__related-card-link">
                      <span>Leer artículo</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <div className="container blog-post__footer-nav">
        <Link to="/comunidad" className="blog-post__back-link">
          <ArrowLeft size={16} />
          <span>Volver al listado de artículos</span>
        </Link>
      </div>
    </article>
  );
}

