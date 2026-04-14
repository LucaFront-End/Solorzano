import { servicesContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import LucideIcon from './LucideIcon';
import './Services.css';

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section--cream services" id="servicios" ref={sectionRef}>
      <div className="container services__container">
        
        {/* Sticky Header Left */}
        <div className="services__header reveal">
          <div className="services__header-sticky">
            <span className="section-label">{servicesContent.label}</span>
            <h2 className="section-title">{servicesContent.title}</h2>
            <p className="section-subtitle">{servicesContent.subtitle}</p>
            
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary services__cta">
              Agenda una Consulta
            </a>
          </div>
        </div>

        {/* Scrollable Cards Right */}
        <div className="services__cards">
          {servicesContent.items.map((item, i) => (
            <div className="services__card reveal" key={i}>
              <div className="services__card-header">
                <div className="services__card-icon"><LucideIcon name={item.icon} size={28} strokeWidth={1.5} /></div>
                <div className="services__card-number">0{i + 1}</div>
              </div>
              <h3 className="services__card-title">{item.title}</h3>
              <p className="services__card-desc">{item.description}</p>
              
              <ul className="services__card-list">
                {['Protección proactiva', 'Análisis detallado', 'Respuesta legal rápida'].map((bullet, idx) => (
                  <li key={idx}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {bullet}
                  </li>
                ))}
              </ul>

              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="services__card-link">
                {item.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
