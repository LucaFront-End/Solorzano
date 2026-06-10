import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useWixServices } from '../hooks/useWixServices';
import { siteConfig } from '../data/content';
import LucideIcon from './LucideIcon';
import './CMSServiceDetail.css';

export default function CMSServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { services, loading, error, getBySlug } = useWixServices();
  const service = getBySlug(slug);

  // Dynamic page title
  useEffect(() => {
    if (service) {
      document.title = service.seoTitle || `${service.title} | ${siteConfig.name}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && (service.seoDescription || service.excerpt)) {
        metaDesc.setAttribute('content', service.seoDescription || service.excerpt);
      }
    }
    return () => {
      document.title = `${siteConfig.name} — Derecho Laboral y Mercantil`;
    };
  }, [service]);

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 120 }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--color-text-muted)' }}>Cargando servicio...</p>
      </div>
    );
  }

  // 404
  if (!service) {
    return (
      <div className="cms-svc-not-found">
        <div className="container text-center">
          <LucideIcon name="Scale" size={48} className="text-accent" />
          <h2>Servicio no encontrado</h2>
          <p>El servicio solicitado no está disponible o ha cambiado de dirección.</p>
          <Link to="/servicios" className="btn btn--primary">Ver Servicios</Link>
        </div>
      </div>
    );
  }

  // Incomplete service
  if (!service.isComplete) {
    return (
      <article className="cms-svc-detail">
        <header className="cms-svc-detail__hero section--navy">
          <div className="cms-svc-detail__hero-bg" />
          <div className="container cms-svc-detail__hero-container">
            <div className="cms-svc-detail__hero-content cms-svc-detail__hero-content--full">
              <span className="cms-svc-detail__tag">
                <LucideIcon name={service.categoryIcon} size={16} className="text-accent" />
                {service.category}
              </span>
              <h1 className="cms-svc-detail__title">{service.title}</h1>
              <p className="cms-svc-detail__subtitle">
                Este servicio está en proceso de documentación. Contáctanos para más información.
              </p>
              <div className="cms-svc-detail__hero-actions">
                <a href={service.whatsappUrl || siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
                  Solicitar Información
                </a>
                <Link to="/servicios" className="btn btn--outline btn--white">
                  Ver Todos los Servicios
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="section section--white cms-svc-detail__coming-soon">
          <div className="container text-center">
            <div className="cms-svc-detail__coming-icon">
              <LucideIcon name="Clock" size={40} />
            </div>
            <h2>Próximamente</h2>
            <p>Estamos preparando la información detallada de este servicio. Mientras tanto, puedes contactarnos directamente para recibir asesoría personalizada.</p>
            <a href={service.whatsappUrl || siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <LucideIcon name="MessageCircle" size={18} />
              Contactar por WhatsApp
            </a>
          </div>
        </section>
      </article>
    );
  }

  const whatsappLink = service.whatsappUrl || siteConfig.whatsapp;

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Get related services (same category, exclude current)
  const related = services
    .filter(s => s.category === service.category && s.slug !== service.slug && s.isComplete && s.appearsOnPage)
    .slice(0, 3);

  return (
    <article className="cms-svc-detail">
      {/* ── Hero ── */}
      <header className="cms-svc-detail__hero section--navy">
        <div className="cms-svc-detail__hero-bg" />
        <div className="container cms-svc-detail__hero-container">
          <div className="cms-svc-detail__hero-content">
            <span className="cms-svc-detail__tag">
              <LucideIcon name={service.categoryIcon} size={16} className="text-accent" />
              {service.category}
            </span>
            <h1 className="cms-svc-detail__title">{service.title}</h1>
            <p className="cms-svc-detail__subtitle">{service.excerpt}</p>
            <div className="cms-svc-detail__hero-actions">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
                Asesoría por WhatsApp
              </a>
              <a href="#contacto" onClick={handleContactClick} className="btn btn--outline btn--white">
                Solicitar Cotización
              </a>
            </div>
          </div>
          {service.imageUrl && (
            <div className="cms-svc-detail__hero-visual">
              <div className="cms-svc-detail__image-wrapper">
                <img src={service.imageUrl} alt={service.title} className="cms-svc-detail__img" loading="eager" />
                <div className="cms-svc-detail__image-overlay" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <section className="section section--white cms-svc-detail__content">
        <div className="container cms-svc-detail__layout">
          {/* Main Column */}
          <div className="cms-svc-detail__main">
            <div className="cms-svc-detail__description-block">
              <h2 className="cms-svc-detail__section-title">Sobre el servicio</h2>
              <p className="cms-svc-detail__long-desc">{service.description}</p>
            </div>

            {service.whyCrucial && (
              <div className="cms-svc-detail__why-block">
                <div className="cms-svc-detail__why-card">
                  <div className="cms-svc-detail__why-icon">
                    <LucideIcon name="ShieldCheck" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="cms-svc-detail__why-title">¿Por qué es crucial para tu empresa?</h3>
                    <p className="cms-svc-detail__why-desc">{service.whyCrucial}</p>
                  </div>
                </div>
              </div>
            )}

            {service.includes.length > 0 && (
              <div className="cms-svc-detail__benefits-block">
                <h2 className="cms-svc-detail__section-title">¿Qué incluye nuestra solución?</h2>
                <ul className="cms-svc-detail__benefits-list">
                  {service.includes.map((bullet, idx) => (
                    <li key={idx} className="cms-svc-detail__benefit-item">
                      <div className="cms-svc-detail__benefit-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="cms-svc-detail__benefit-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar — Process */}
          {service.steps.length > 0 && (
            <aside className="cms-svc-detail__sidebar">
              <div className="cms-svc-detail__sticky-card">
                <h3 className="cms-svc-detail__sidebar-title">Nuestro Proceso</h3>
                {service.processIntro && (
                  <p className="cms-svc-detail__sidebar-subtitle">{service.processIntro}</p>
                )}

                <div className="cms-svc-detail__timeline">
                  {service.steps.map((step, idx) => (
                    <div key={idx} className="cms-svc-detail__timeline-step">
                      <div className="cms-svc-detail__step-number-col">
                        <div className="cms-svc-detail__step-number">0{idx + 1}</div>
                        {idx < service.steps.length - 1 && <div className="cms-svc-detail__step-line" />}
                      </div>
                      <div className="cms-svc-detail__step-content">
                        <h4 className="cms-svc-detail__step-title">{step.title}</h4>
                        <p className="cms-svc-detail__step-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cms-svc-detail__sidebar-cta">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full">
                    Iniciar Diagnóstico
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* ── Related Services ── */}
      {related.length > 0 && (
        <section className="section section--cream cms-svc-detail__related">
          <div className="container">
            <span className="section-label">Servicios Relacionados</span>
            <h2 className="section-title">Otros servicios de {service.category}</h2>
            <div className="cms-svc-detail__related-grid">
              {related.map(rel => (
                <Link to={`/servicios-derecho/${rel.slug}`} key={rel.id || rel.slug} className="cms-svc-related-card">
                  {rel.imageUrl && (
                    <div className="cms-svc-related-card__img-wrap">
                      <img src={rel.imageUrl} alt={rel.title} loading="lazy" />
                    </div>
                  )}
                  <div className="cms-svc-related-card__body">
                    <h4>{rel.title}</h4>
                    <p>{rel.excerpt}</p>
                    <span className="cms-svc-related-card__link">
                      Ver servicio
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section section--white cms-svc-detail__footer-cta">
        <div className="container text-center">
          <span className="section-label">Contacto Inmediato</span>
          <h2 className="section-title">¿Listo para blindar tu patrimonio empresarial?</h2>
          <p className="section-subtitle mx-auto">
            Agenda una llamada o envíanos un mensaje. Analizaremos tu situación particular sin compromiso ni costos iniciales.
          </p>
          <div className="cms-svc-detail__footer-actions">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              <LucideIcon name="Handshake" size={20} />
              Hablar con un Especialista
            </a>
            <a href="#contacto" onClick={handleContactClick} className="btn btn--outline btn--lg">
              Enviar Mensaje Directo
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
