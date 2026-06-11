import { Link } from 'react-router-dom';
import { useWixBlog } from '../hooks/useWixBlog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Blog.css';

/* ── Fallback posts when API is unavailable or returns empty ── */
const FALLBACK_POSTS = [
  {
    id: 'fallback-1',
    title: 'Reforma Laboral 2025: Lo que toda empresa debe saber',
    slug: 'reforma-laboral-2025',
    excerpt: 'Analizamos los cambios más relevantes de la reforma laboral y cómo afectan las relaciones de trabajo en México. Conozca las nuevas obligaciones patronales.',
    coverImage: '',
    publishedDate: 'junio 2025',
    externalUrl: 'https://www.dsc.mx/blog',
  },
  {
    id: 'fallback-2',
    title: 'Outsourcing y Subcontratación: Guía actualizada',
    slug: 'outsourcing-subcontratacion-guia',
    excerpt: 'Todo lo que necesita saber sobre el régimen de subcontratación especializada. Requisitos, sanciones y mejores prácticas para cumplir con la ley.',
    coverImage: '',
    publishedDate: 'mayo 2025',
    externalUrl: 'https://www.dsc.mx/blog',
  },
  {
    id: 'fallback-3',
    title: 'NOM-035: Factores de Riesgo Psicosocial en el Trabajo',
    slug: 'nom-035-factores-riesgo',
    excerpt: 'Guía práctica para implementar la NOM-035-STPS en su empresa. Obligaciones patronales, evaluaciones y medidas de prevención efectivas.',
    coverImage: '',
    publishedDate: 'abril 2025',
    externalUrl: 'https://www.dsc.mx/blog',
  },
];

export default function Blog() {
  const sectionRef = useScrollReveal();
  const { posts, loading, error } = useWixBlog({ limit: 3 });

  /* Use API posts when available, otherwise fall back to static content */
  const useFallback = error || (!loading && posts.length === 0);
  const displayPosts = useFallback ? FALLBACK_POSTS : posts;

  return (
    <section className="section section--cream blog" id="blog" ref={sectionRef}>
      <div className="container">
        <div className="blog__header reveal">
          <span className="section-label">Blog</span>
          <h2 className="section-title">Nuestras últimas noticias</h2>
        </div>

        {loading && (
          <div className="blog__loading">
            <div className="blog__spinner" />
            <p>Cargando artículos...</p>
          </div>
        )}

        {!loading && (
          <div className="blog__grid">
            {displayPosts.map((post, i) => {
              const isFallback = !!post.externalUrl;
              const CardTag = isFallback ? 'a' : Link;
              const cardProps = isFallback
                ? { href: post.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
                : { to: `/blog/${post.slug}` };

              return (
                <CardTag
                  {...cardProps}
                  className={`blog__card reveal reveal-delay-${i + 1}`}
                  key={post.id}
                >
                  <div className="blog__card-img">
                    {post.coverImage
                      ? <img src={post.coverImage} alt={post.title} loading="lazy" />
                      : <div className="blog__card-img-placeholder" />
                    }
                    <span className="blog__card-date">{post.publishedDate}</span>
                  </div>
                  <div className="blog__card-body">
                    <h3 className="blog__card-title">{post.title}</h3>
                    <p className="blog__card-excerpt">{post.excerpt}</p>
                    <span className="blog__card-link">
                      Leer más
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </CardTag>
              );
            })}
          </div>
        )}

        <div className="blog__footer">
          <Link to="/comunidad" className="btn btn--outline">
            Ver todos los artículos →
          </Link>
        </div>
      </div>
    </section>
  );
}
