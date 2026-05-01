import { useState } from 'react';
import { fullServicesCatalog, mercantileContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import LucideIcon from '../components/LucideIcon';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';
import { MapPin, ChevronDown, ArrowRight, MessageSquare, FileSearch, Settings, Rocket } from 'lucide-react';
import './ServiciosPage.css';

const processSteps = [
  { Icon: MessageSquare, title: 'Consulta Inicial', desc: 'Analizamos tu situación sin costo ni compromiso.' },
  { Icon: FileSearch, title: 'Diagnóstico', desc: 'Evaluamos riesgos y oportunidades legales de tu empresa.' },
  { Icon: Settings, title: 'Estrategia', desc: 'Diseñamos un plan de acción personalizado.' },
  { Icon: Rocket, title: 'Ejecución', desc: 'Implementamos y damos seguimiento hasta la resolución.' },
];

function ServiceCategory({ cat, index, isOpen, onToggle }) {
  return (
    <div className={`svc-cat ${isOpen ? 'is-open' : ''}`}>
      <button className="svc-cat__header" onClick={onToggle}>
        <div className="svc-cat__header-left">
          <span className="svc-cat__num">0{index + 1}</span>
          <div className="svc-cat__icon"><LucideIcon name={cat.icon} size={24} strokeWidth={1.5} /></div>
          <h3 className="svc-cat__title">{cat.category}</h3>
        </div>
        <div className="svc-cat__header-right">
          <span className="svc-cat__count">{cat.items.length} servicios</span>
          <ChevronDown size={20} strokeWidth={2} className="svc-cat__chevron" />
        </div>
      </button>
      <div className="svc-cat__body">
        <div className="svc-cat__items">
          {cat.items.map((item, i) => (
            <div className="svc-item" key={i}>
              <div className="svc-item__content">
                <h4 className="svc-item__title">{item.title}</h4>
                <p className="svc-item__desc">{item.description}</p>
              </div>
              <div className="svc-item__location">
                <MapPin size={14} strokeWidth={2} />
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServiciosPage() {
  const [openCat, setOpenCat] = useState(0);
  const catRef = useScrollReveal();
  const mercRef = useScrollReveal();
  const procRef = useScrollReveal();

  return (
    <>
      <PageHero
        label="Catálogo Completo"
        title="Nuestros Servicios"
        subtitle="Cobertura legal integral a nivel nacional. Más de 20 tipos de diligencias y servicios especializados."
        breadcrumb="Servicios"
      />

      {/* ── Labor Services Catalog ── */}
      <section className="section svc-catalog" ref={catRef}>
        <div className="container">
          <div className="svc-catalog__header reveal">
            <span className="section-label">Derecho Laboral</span>
            <h2 className="section-title">Servicios Laborales</h2>
            <p className="section-subtitle">Diligencias y servicios especializados que atendemos a nivel nacional a través de nuestra red de corresponsales.</p>
          </div>

          <div className="svc-catalog__list reveal">
            {fullServicesCatalog.map((cat, i) => (
              <ServiceCategory
                key={i}
                cat={cat}
                index={i}
                isOpen={openCat === i}
                onToggle={() => setOpenCat(openCat === i ? -1 : i)}
              />
            ))}
          </div>

          <div className="svc-catalog__cta reveal">
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Solicitar Cotización
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Mercantile Services ── */}
      <section className="section section--cream svc-mercantile" ref={mercRef}>
        <div className="container">
          <div className="svc-mercantile__header reveal">
            <span className="section-label">{mercantileContent.label}</span>
            <h2 className="section-title">{mercantileContent.title}</h2>
          </div>

          <div className="svc-mercantile__grid reveal">
            {mercantileContent.items.map((item, i) => (
              <div className="svc-merc-card" key={i}>
                <div className="svc-merc-card__icon">
                  <LucideIcon name={item.icon} size={28} strokeWidth={1.5} />
                </div>
                <h3 className="svc-merc-card__title">{item.title}</h3>
                <p className="svc-merc-card__desc">{item.description}</p>
                <div className="svc-merc-card__detail">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section svc-process" ref={procRef}>
        <div className="container">
          <div className="svc-process__header reveal">
            <span className="section-label">Proceso</span>
            <h2 className="section-title">¿Cómo Trabajamos?</h2>
            <p className="section-subtitle">Un proceso claro y transparente desde el primer contacto hasta la resolución de tu caso.</p>
          </div>

          <div className="svc-process__steps reveal">
            {processSteps.map((step, i) => (
              <div className="svc-step" key={i}>
                <div className="svc-step__num">0{i + 1}</div>
                <div className="svc-step__icon"><step.Icon size={28} strokeWidth={1.5} /></div>
                <h4 className="svc-step__title">{step.title}</h4>
                <p className="svc-step__desc">{step.desc}</p>
                {i < processSteps.length - 1 && <div className="svc-step__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="¿Necesitas un servicio especializado?"
        subtitle="Contáctanos para una evaluación gratuita de tu situación legal. Atendemos en toda la República."
      />
    </>
  );
}
