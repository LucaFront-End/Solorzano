import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  BookOpen, FileText, Users, ArrowUpRight, ArrowRight,
  Sparkles, MessageCircle, Star, Zap, GraduationCap,
  Download, Globe, Clock,
} from 'lucide-react';
import './ComunidadPage.css';

const SKOOL_URL = siteConfig.skoolUrl;

const communityFeatures = [
  {
    Icon: GraduationCap,
    title: 'Cursos Especializados',
    desc: 'Formación continua en derecho laboral actualizado con contenido práctico, casos de estudio reales y certificaciones.',
    stat: '12+ cursos',
  },
  {
    Icon: Download,
    title: 'Formatos y Plantillas',
    desc: 'Documentos listos para usar: contratos, avisos, actas, convenios y más. Descarga inmediata y actualizados.',
    stat: '50+ formatos',
  },
  {
    Icon: Users,
    title: 'Networking Profesional',
    desc: 'Conecta con abogados y profesionales de RH de todo México. Comparte experiencias, resuelve dudas y crece.',
    stat: '200+ miembros',
  },
];

const marqueeItems = [
  'Cursos en Vivo',
  'Formatos Descargables',
  'Networking Legal',
  'Contenido Exclusivo',
  'Casos de Estudio',
  'Actualización Constante',
  'Comunidad Activa',
  'Soporte Directo',
];

const skoolStats = [
  { value: '200+', label: 'Miembros Activos' },
  { value: '12+', label: 'Cursos Disponibles' },
  { value: '50+', label: 'Recursos Descargables' },
];

export default function ComunidadPage() {
  const heroRef = useScrollReveal();
  const blogRef = useScrollReveal();
  const featRef = useScrollReveal();
  const skoolRef = useScrollReveal();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    document.title = 'Comunidad — Solórzano Cerezo y Asociados';
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className={`com-hero ${heroVisible ? 'is-visible' : ''}`} ref={heroRef}>
        <div className="com-hero__particles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="com-hero__particle" style={{ '--i': i }} />
          ))}
        </div>
        <div className="com-hero__radial" aria-hidden="true" />

        <div className="container com-hero__content">
          <nav className="com-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span className="com-hero__breadcrumb-sep">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </span>
            <span>Comunidad</span>
          </nav>

          <div className="com-hero__badge reveal">
            <Sparkles size={14} strokeWidth={2} />
            Blog & Comunidad Skool
          </div>

          <h1 className="com-hero__title">
            <span className="com-hero__title-line">
              {'Nuestra'.split('').map((c, i) => (
                <span key={i} className="com-hero__char" style={{ '--cd': `${i * 0.04}s` }}>
                  {c === ' ' ? '\u00A0' : c}
                </span>
              ))}
            </span>
            <span className="com-hero__title-line">
              {'Comunidad'.split('').map((c, i) => (
                <span key={i} className="com-hero__char com-hero__char--accent" style={{ '--cd': `${(i + 10) * 0.04}s` }}>
                  {c === ' ' ? '\u00A0' : c}
                </span>
              ))}
            </span>
          </h1>

          <p className="com-hero__subtitle reveal">
            Contenido exclusivo, formatos descargables y una comunidad activa de profesionales de derecho laboral y recursos humanos.
          </p>
        </div>
      </section>

      {/* ── Blog Section (Magazine Grid) ── */}
      <section className="section com-blog" ref={blogRef}>
        <div className="container">
          <div className="com-blog__header reveal">
            <span className="section-label">Blog</span>
            <h2 className="section-title">Últimas Publicaciones</h2>
            <p className="section-subtitle">
              Análisis, guías prácticas y actualizaciones sobre derecho laboral en México.
            </p>
          </div>

          <div className="com-blog__grid">
            {blogContent.posts.map((post, i) => (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`com-blog__card ${i === 0 ? 'com-blog__card--featured' : ''} reveal`}
                key={i}
              >
                <div className="com-blog__card-img">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <div className="com-blog__card-overlay" />
                  <span className="com-blog__card-date">
                    <Clock size={12} strokeWidth={2} />
                    {post.date}
                  </span>
                </div>
                <div className="com-blog__card-body">
                  <h3 className="com-blog__card-title">{post.title}</h3>
                  <p className="com-blog__card-excerpt">{post.excerpt}</p>
                  <span className="com-blog__card-link">
                    Leer en Blog
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="com-blog__more reveal">
            <a
              href="https://www.dsc.mx/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="com-blog__more-link"
            >
              Ver Todas las Publicaciones
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="com-marquee">
        <div className="com-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="com-marquee__item" key={i}>
              <Star size={14} strokeWidth={2} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Community Features (Glassmorphism) ── */}
      <section className="section com-features" ref={featRef}>
        <div className="com-features__bg" aria-hidden="true" />
        <div className="com-features__grid-lines" aria-hidden="true" />

        <div className="container com-features__inner">
          <div className="com-features__header reveal">
            <div className="com-features__badge">
              <Globe size={14} strokeWidth={2} />
              Skool Community
            </div>
            <h2 className="com-features__title">
              Recursos Exclusivos para <span className="text-accent">Profesionales</span>
            </h2>
            <p className="com-features__subtitle">
              Accede a cursos, formatos y una red de profesionales que comparten tu pasión por el derecho laboral.
            </p>
          </div>

          <div className="com-features__cards reveal">
            {communityFeatures.map((feat, i) => (
              <div className="com-feat-card" key={i} style={{ '--delay': `${i * 0.12}s` }}>
                <div className="com-feat-card__glow" aria-hidden="true" />
                <div className="com-feat-card__icon">
                  <feat.Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="com-feat-card__title">{feat.title}</h3>
                <p className="com-feat-card__desc">{feat.desc}</p>
                <div className="com-feat-card__stat">
                  <Zap size={14} strokeWidth={2} />
                  {feat.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skool CTA Hero ── */}
      <section className="com-skool-cta" ref={skoolRef}>
        <div className="com-skool-cta__pattern" aria-hidden="true" />
        <div className="com-skool-cta__orb com-skool-cta__orb--1" aria-hidden="true" />
        <div className="com-skool-cta__orb com-skool-cta__orb--2" aria-hidden="true" />

        <div className="container com-skool-cta__inner">
          <div className="com-skool-cta__stats reveal">
            {skoolStats.map((stat, i) => (
              <div className="com-skool-stat" key={i}>
                <span className="com-skool-stat__value">{stat.value}</span>
                <span className="com-skool-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="com-skool-cta__content reveal">
            <div className="com-skool-cta__badge">
              <Users size={15} strokeWidth={2} />
              Comunidad Skool
            </div>
            <h2 className="com-skool-cta__title">
              Únete a la Comunidad de <span className="text-accent">Relaciones Laborales</span> más Activa de México
            </h2>
            <p className="com-skool-cta__subtitle">
              Más de 200 profesionales ya forman parte. Acceso inmediato, contenido actualizado constantemente y soporte directo del equipo de Solórzano Cerezo.
            </p>

            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="com-skool-cta__btn"
            >
              <span className="com-skool-cta__btn-content">
                <span className="com-skool-cta__btn-text">Explorar la Comunidad</span>
                <span className="com-skool-cta__btn-sub">Relaciones Laborales con SCA en Skool</span>
              </span>
              <ArrowUpRight size={22} strokeWidth={2} />
              <div className="com-skool-cta__btn-shine" aria-hidden="true" />
            </a>

            <p className="com-skool-cta__note">
              Contenido actualizado constantemente • Acceso inmediato • Sin permanencia
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
