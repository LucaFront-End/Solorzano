import { Link } from 'react-router-dom';
import { useWixBlog } from '../hooks/useWixBlog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Blog.css';

/* ── Fallback posts when API is unavailable or returns empty ── */
const FALLBACK_POSTS = [
  {
    id: 'dc9618ba-2b58-414e-ae5e-cece3af2e7d6',
    title: 'Tu contrato dice una jornada. ¿La evidencia de tu empresa cuenta otra?',
    slug: 'tu-contrato-dice-una-jornada-la-evidencia-de-tu-empresa-cuenta-otra',
    excerpt: 'Con la reducción de la jornada laboral, el reto no será únicamente modificar horarios. Las empresas tendrán que lograr que sus contratos, controles y operación cuenten la misma historia.',
    coverImage: 'https://static.wixstatic.com/media/65f9b2_97163596ef8642bba9a0003a5636447b~mv2.png/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg',
    publishedDate: 'agosto de 2026',
    externalUrl: '',
  },
  {
    id: 'f461144a-1c72-4f49-b4e2-361cc3d013ec',
    title: 'Lo que todo director legal y de RRHH debe saber sobre el primer tratado para el trabajo en plataformas digitales',
    slug: 'lo-que-todo-director-legal-y-de-rrhh-debe-saber-sobre-el-primer-tratado-para-el-trabajo-en-plataform',
    excerpt: 'Convenio 193 de la OIT: El primer instrumento internacional vinculante diseñado específicamente para el trabajo mediado por aplicaciones y algoritmos.',
    coverImage: 'https://static.wixstatic.com/media/65f9b2_0ab1c57e400c4b1c9318e1db645b7990~mv2.png/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg',
    publishedDate: 'junio de 2026',
    externalUrl: '',
  },
  {
    id: '5c5339b2-49a0-414b-ad21-f0964856f44b',
    title: 'El checklist de desvinculación que nadie te enseñó',
    slug: 'el-checklist-de-desvinculación-que-nadie-te-enseñó',
    excerpt: 'Cuando llega el momento de terminar una relación laboral, la mayoría ya tiene su lista mental. Pero hay puntos críticos que marcan la diferencia entre una desvinculación limpia y un conflicto.',
    coverImage: 'https://static.wixstatic.com/media/65f9b2_fbd98647ae584d5f8cd889c2905ba895~mv2.png/v1/fill/w_800,h_533,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.jpg',
    publishedDate: 'mayo de 2026',
    externalUrl: '',
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
