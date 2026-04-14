import { blogContent } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Blog.css';

export default function Blog() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section--cream blog" id="blog" ref={sectionRef}>
      <div className="container">
        <div className="blog__header reveal">
          <span className="section-label">{blogContent.label}</span>
          <h2 className="section-title">{blogContent.title}</h2>
        </div>

        <div className="blog__grid">
          {blogContent.posts.map((post, i) => (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`blog__card reveal reveal-delay-${i + 1}`}
              key={i}
            >
              <div className="blog__card-img">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span className="blog__card-date">{post.date}</span>
              </div>
              <div className="blog__card-body">
                <h3 className="blog__card-title">{post.title}</h3>
                <p className="blog__card-excerpt">{post.excerpt}</p>
                <span className="blog__card-link">
                  Leer más
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
