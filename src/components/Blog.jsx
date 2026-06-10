import { Link } from 'react-router-dom';
import { useWixBlog } from '../hooks/useWixBlog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Blog.css';

export default function Blog() {
  const sectionRef = useScrollReveal();
  const { posts, loading, error } = useWixBlog({ limit: 3 });

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

        {error && (
          <div className="blog__error">
            <p>No se pudieron cargar los artículos. <a href="https://www.dsc.mx/blog" target="_blank" rel="noopener noreferrer">Ver blog →</a></p>
          </div>
        )}

        {!loading && !error && (
          <div className="blog__grid">
            {posts.map((post, i) => (
              <Link
                to={`/blog/${post.slug}`}
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
              </Link>
            ))}
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
