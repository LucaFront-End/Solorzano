import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getIndustryBySlug, industries } from '../data/industriesData';
import { getServiceBySlug } from '../data/cmsServices';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { siteConfig } from '../data/content';
import LucideIcon from '../components/LucideIcon';
import {
  ArrowRight, MessageCircle, CheckCircle2, ChevronRight,
  Shield, Zap, Award, ArrowUpRight,
} from 'lucide-react';
import './IndustriaDetailPage.css';

const reasons = [
  { Icon: Shield, title: 'Especialización Sectorial', desc: 'Conocemos la regulación específica de tu industria, no solo la ley general.' },
  { Icon: Zap, title: 'Respuesta Inmediata', desc: 'Actuamos en menos de 1 hora ante cualquier contingencia laboral urgente.' },
  { Icon: Award, title: 'Track Record Comprobado', desc: 'Más de 500 empresas protegidas con un 98% de resoluciones favorables.' },
];

export default function IndustriaDetailPage() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);
  const challengesRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const whyRef = useScrollReveal();
  const progressRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll progress for floating TOC
  useEffect(() => {
    if (!industry) return;

    const handleScroll = () => {
      const sections = sectionsRef.current.filter(Boolean);
      const scrollY = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, i) => {
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(i);
        }
      });

      // Progress bar
      if (progressRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(100, (window.scrollY / docHeight) * 100);
        progressRef.current.style.setProperty('--progress', `${progress}%`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [industry]);

  useEffect(() => {
    if (industry) {
      document.title = `${industry.title} — Solórzano Cerezo y Asociados`;
    }
  }, [industry]);

  if (!industry) return <Navigate to="/industrias" replace />;

  const relatedServices = industry.relatedServiceSlugs
    .map(s => getServiceBySlug(s))
    .filter(Boolean);

  const otherIndustries = industries.filter(i => i.slug !== slug).slice(0, 3);

  const tocItems = ['Desafíos', 'Servicios', '¿Por qué nosotros?'];

  return (
    <>
      {/* ── Split Hero ── */}
      <section className="inddet-hero" style={{ '--accent': industry.color }}>
        <div className="inddet-hero__bg-shapes" aria-hidden="true">
          <div className="inddet-hero__shape inddet-hero__shape--1" />
          <div className="inddet-hero__shape inddet-hero__shape--2" />
          <div className="inddet-hero__shape inddet-hero__shape--3" />
        </div>

        <div className="container inddet-hero__inner">
          <div className="inddet-hero__text">
            <nav className="inddet-hero__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Inicio</Link>
              <ChevronRight size={14} />
              <Link to="/industrias">Industrias</Link>
              <ChevronRight size={14} />
              <span>{industry.title}</span>
            </nav>

            <div className="inddet-hero__badge">
              <LucideIcon name={industry.icon} size={16} strokeWidth={2} />
              {industry.title}
            </div>

            <h1 className="inddet-hero__title">
              Derecho Laboral para <span className="inddet-hero__title-accent">{industry.title}</span>
            </h1>

            <p className="inddet-hero__desc">{industry.heroDesc}</p>

            <div className="inddet-hero__actions">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inddet-hero__cta-primary"
              >
                <MessageCircle size={20} strokeWidth={2} />
                Asesoría Gratuita
              </a>
              <a href="#desafios" className="inddet-hero__cta-secondary">
                Ver Desafíos
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="inddet-hero__visual">
            <div className="inddet-hero__icon-display">
              <div className="inddet-hero__icon-ring inddet-hero__icon-ring--outer" />
              <div className="inddet-hero__icon-ring inddet-hero__icon-ring--inner" />
              <div className="inddet-hero__icon-center">
                <LucideIcon name={industry.icon} size={64} strokeWidth={1} />
              </div>
            </div>

            <div className="inddet-hero__float-stat inddet-hero__float-stat--1">
              <span className="inddet-hero__float-value">{industry.stats.empresas}</span>
              <span className="inddet-hero__float-label">Empresas</span>
            </div>
            <div className="inddet-hero__float-stat inddet-hero__float-stat--2">
              <span className="inddet-hero__float-value">{industry.stats.casos}</span>
              <span className="inddet-hero__float-label">Casos</span>
            </div>
            <div className="inddet-hero__float-stat inddet-hero__float-stat--3">
              <span className="inddet-hero__float-value">{industry.stats.ahorro}</span>
              <span className="inddet-hero__float-label">Ahorro Anual</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating TOC ── */}
      <aside className="inddet-toc" ref={progressRef}>
        <div className="inddet-toc__progress" />
        <ul className="inddet-toc__list">
          {tocItems.map((item, i) => (
            <li key={i} className={`inddet-toc__item ${activeSection === i ? 'is-active' : ''}`}>
              <a href={`#${['desafios', 'servicios-rel', 'por-que'][i]}`}>
                <span className="inddet-toc__dot" />
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Challenges ── */}
      <section
        className="section inddet-challenges"
        id="desafios"
        ref={(el) => { challengesRef.current = el; sectionsRef.current[0] = el; }}
      >
        <div className="container">
          <div className="inddet-challenges__header reveal">
            <span className="section-label">Desafíos Legales</span>
            <h2 className="section-title">
              Retos de la industria de <span className="text-accent">{industry.title}</span>
            </h2>
            <p className="section-subtitle">
              Estos son los desafíos legales más comunes que enfrentan las empresas de tu sector. Los conocemos bien porque los resolvemos todos los días.
            </p>
          </div>

          <div className="inddet-challenges__grid reveal">
            {industry.challenges.map((ch, i) => (
              <div className="inddet-challenge" key={i} style={{ '--delay': `${i * 0.1}s` }}>
                <span className="inddet-challenge__num" aria-hidden="true">0{i + 1}</span>
                <div className="inddet-challenge__icon">
                  <LucideIcon name={ch.icon} size={24} strokeWidth={1.5} />
                </div>
                <h3 className="inddet-challenge__title">{ch.title}</h3>
                <p className="inddet-challenge__desc">{ch.desc}</p>
                <div className="inddet-challenge__accent" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section
        className="section section--cream inddet-services"
        id="servicios-rel"
        ref={(el) => { servicesRef.current = el; sectionsRef.current[1] = el; }}
      >
        <div className="container">
          <div className="inddet-services__header reveal">
            <span className="section-label">Servicios</span>
            <h2 className="section-title">Servicios Relacionados</h2>
            <p className="section-subtitle">
              Estos son los servicios que más aplican a la industria de {industry.title}. Hacé click para conocer los detalles.
            </p>
          </div>

          <div className="inddet-services__scroll reveal">
            {relatedServices.map((svc) => (
              <Link
                to={`/servicios-derecho/${svc.slug}`}
                className="inddet-service-chip"
                key={svc.slug}
              >
                <LucideIcon name={svc.categoryIcon || 'FileText'} size={20} strokeWidth={1.5} />
                <span className="inddet-service-chip__title">{svc.title}</span>
                <ArrowUpRight size={16} strokeWidth={2} className="inddet-service-chip__arrow" />
              </Link>
            ))}
            <Link to="/servicios" className="inddet-service-chip inddet-service-chip--all">
              <span>Ver Todos los Servicios</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section
        className="section inddet-why"
        id="por-que"
        ref={(el) => { whyRef.current = el; sectionsRef.current[2] = el; }}
      >
        <div className="container">
          <div className="inddet-why__layout reveal">
            <div className="inddet-why__text">
              <span className="section-label">Diferencial</span>
              <h2 className="section-title">¿Por qué elegirnos para {industry.title}?</h2>
              <p className="section-subtitle">
                No somos un despacho generalista. Entendemos los matices de tu industria y hablamos tu mismo idioma operativo.
              </p>
            </div>
            <div className="inddet-why__cards">
              {reasons.map((r, i) => (
                <div className="inddet-why__card" key={i} style={{ '--delay': `${i * 0.12}s` }}>
                  <div className="inddet-why__card-icon">
                    <r.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="inddet-why__card-title">{r.title}</h4>
                    <p className="inddet-why__card-desc">{r.desc}</p>
                  </div>
                  <CheckCircle2 size={20} strokeWidth={2} className="inddet-why__card-check" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Industries ── */}
      <section className="section section--cream inddet-others">
        <div className="container">
          <div className="inddet-others__header">
            <h3 className="inddet-others__title">Otras Industrias</h3>
          </div>
          <div className="inddet-others__grid">
            {otherIndustries.map((ind) => (
              <Link to={`/industrias/${ind.slug}`} className="inddet-others__card" key={ind.slug} style={{ '--accent': ind.color }}>
                <div className="inddet-others__card-icon">
                  <LucideIcon name={ind.icon} size={24} strokeWidth={1.5} />
                </div>
                <span className="inddet-others__card-name">{ind.title}</span>
                <ArrowRight size={16} strokeWidth={2} className="inddet-others__card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inddet-cta" style={{ '--accent': industry.color }}>
        <div className="inddet-cta__pattern" aria-hidden="true" />
        <div className="container inddet-cta__inner">
          <div className="inddet-cta__badge">
            <LucideIcon name={industry.icon} size={16} strokeWidth={2} />
            {industry.title}
          </div>
          <h2 className="inddet-cta__title">
            ¿Listo para proteger tu empresa de {industry.title.toLowerCase()}?
          </h2>
          <p className="inddet-cta__subtitle">
            Primera asesoría gratuita y sin compromiso. Conocemos tu industria y sabemos cómo ayudarte.
          </p>
          <div className="inddet-cta__actions">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inddet-cta__btn inddet-cta__btn--primary"
            >
              <MessageCircle size={20} strokeWidth={2} />
              Escríbenos por WhatsApp
            </a>
            <Link to="/contacto" className="inddet-cta__btn inddet-cta__btn--outline">
              Enviar Mensaje
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
