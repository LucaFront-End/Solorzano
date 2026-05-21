import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesDetailData } from '../data/servicesData';
import { siteConfig } from '../data/content';
import LucideIcon from './LucideIcon';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = servicesDetailData[serviceId];

  // If the service doesn't exist, redirect or show not found
  if (!service) {
    return (
      <div className="service-not-found">
        <div className="container text-center">
          <LucideIcon name="Scale" size={48} className="text-accent" />
          <h2>Servicio no encontrado</h2>
          <p>El servicio solicitado no está disponible o ha cambiado de dirección.</p>
          <Link to="/" className="btn btn--primary">Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  const handleContactClick = (e) => {
    // If navigating to home contact section
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  return (
    <article className="service-detail">
      {/* ── Editorial Hero Section ── */}
      <header className="service-detail__hero section--navy">
        <div className="service-detail__hero-bg" />
        <div className="container service-detail__hero-container">
          <div className="service-detail__hero-content">
            <span className="service-detail__tag">
              <LucideIcon name={service.icon} size={16} className="text-accent" />
              {service.category}
            </span>
            <h1 className="service-detail__title">{service.title}</h1>
            <p className="service-detail__subtitle">{service.subtitle}</p>
            <div className="service-detail__hero-actions">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
                Asesoría por WhatsApp
              </a>
              <a href="#contacto" onClick={handleContactClick} className="btn btn--outline btn--white">
                Solicitar Cotización
              </a>
            </div>
          </div>
          <div className="service-detail__hero-visual">
            <div className="service-detail__image-wrapper">
              <img src={service.image} alt={service.title} className="service-detail__img" />
              <div className="service-detail__image-overlay" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Core Information Section ── */}
      <section className="section section--white service-detail__content">
        <div className="container service-detail__layout">
          
          {/* ── Left Column: Details & Benefits ── */}
          <div className="service-detail__main">
            <div className="service-detail__description-block">
              <h2 className="service-detail__section-title">Sobre el servicio</h2>
              <p className="service-detail__long-desc">{service.description}</p>
            </div>

            <div className="service-detail__why-block">
              <div className="service-detail__why-card">
                <div className="service-detail__why-icon">
                  <LucideIcon name="ShieldCheck" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="service-detail__why-title">¿Por qué es crucial para tu empresa?</h3>
                  <p className="service-detail__why-desc">{service.whyNeeded}</p>
                </div>
              </div>
            </div>

            <div className="service-detail__benefits-block">
              <h2 className="service-detail__section-title">¿Qué incluye nuestra solución?</h2>
              <ul className="service-detail__benefits-list">
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className="service-detail__benefit-item">
                    <div className="service-detail__benefit-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="service-detail__benefit-text">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right Column: Timeline / Process ── */}
          <aside className="service-detail__sidebar">
            <div className="service-detail__sticky-card">
              <h3 className="service-detail__sidebar-title">Nuestro Proceso</h3>
              <p className="service-detail__sidebar-subtitle">Metodología paso a paso orientada a resultados rápidos y seguros.</p>
              
              <div className="service-detail__timeline">
                {service.steps.map((step, idx) => (
                  <div key={idx} className="service-detail__timeline-step">
                    <div className="service-detail__step-number-col">
                      <div className="service-detail__step-number">0{idx + 1}</div>
                      {idx < service.steps.length - 1 && <div className="service-detail__step-line" />}
                    </div>
                    <div className="service-detail__step-content">
                      <h4 className="service-detail__step-title">{step.title}</h4>
                      <p className="service-detail__step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="service-detail__sidebar-cta">
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--full">
                  Iniciar Diagnóstico
                </a>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* ── Premium CTA Section ── */}
      <section className="section section--cream service-detail__footer-cta">
        <div className="container text-center">
          <span className="section-label">Contacto Inmediato</span>
          <h2 className="section-title">¿Listo para blindar tu patrimonio empresarial?</h2>
          <p className="section-subtitle mx-auto">
            Agenda una llamada o envíanos un mensaje. Analizaremos tu situación particular sin compromiso ni costos iniciales.
          </p>
          <div className="service-detail__footer-actions">
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
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
