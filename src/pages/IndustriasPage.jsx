import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../data/industriesData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import LucideIcon from '../components/LucideIcon';
import CTABanner from '../components/CTABanner';
import { ArrowRight, Building2, Users, MapPin } from 'lucide-react';
import './IndustriasPage.css';

function StatBlock({ value, suffix, label }) {
  const { count, ref } = useCountUp(value, 2200);
  return (
    <div className="ind-stats__item" ref={ref}>
      <span className="ind-stats__value">{count}{suffix}</span>
      <span className="ind-stats__label">{label}</span>
    </div>
  );
}

function IndustryCard({ industry, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  };

  return (
    <Link
      to={`/industrias/${industry.slug}`}
      className={`ind-card ind-card--size-${index < 2 ? 'lg' : index < 4 ? 'md' : 'sm'}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--delay': `${index * 0.08}s`, '--accent': industry.color }}
    >
      <div className="ind-card__inner">
        <div className="ind-card__glow" aria-hidden="true" />
        <div className="ind-card__content">
          <div className="ind-card__icon">
            <LucideIcon name={industry.icon} size={32} strokeWidth={1.5} />
          </div>
          <h3 className="ind-card__title">{industry.title}</h3>
          <p className="ind-card__desc">{industry.description}</p>
          <div className="ind-card__footer">
            <span className="ind-card__badge">
              {industry.challenges.length} desafíos clave
            </span>
            <span className="ind-card__arrow">
              <ArrowRight size={18} strokeWidth={2} />
            </span>
          </div>
        </div>
        <div className="ind-card__border-glow" aria-hidden="true" />
      </div>
    </Link>
  );
}

export default function IndustriasPage() {
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Immersive Hero ── */}
      <section className={`ind-hero ${heroVisible ? 'is-visible' : ''}`} ref={heroRef}>
        <div className="ind-hero__grid-pattern" aria-hidden="true" />
        <div className="ind-hero__orb ind-hero__orb--1" aria-hidden="true" />
        <div className="ind-hero__orb ind-hero__orb--2" aria-hidden="true" />

        <div className="container ind-hero__content">
          <nav className="ind-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span className="ind-hero__breadcrumb-sep">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </span>
            <span>Industrias</span>
          </nav>

          <div className="ind-hero__badge reveal">
            <Building2 size={15} strokeWidth={2} />
            Soluciones por Industria
          </div>

          <h1 className="ind-hero__title">
            {'Industrias que'.split('').map((char, i) => (
              <span key={i} className="ind-hero__char" style={{ '--char-delay': `${i * 0.03}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <br />
            {'Protegemos'.split('').map((char, i) => (
              <span key={`b-${i}`} className="ind-hero__char ind-hero__char--accent" style={{ '--char-delay': `${(i + 15) * 0.03}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="ind-hero__subtitle reveal">
            Más de 20 años de experiencia atendiendo los retos legales específicos de cada sector. Conocemos tu industria, entendemos tus desafíos.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="ind-stats-bar">
        <div className="container ind-stats-bar__inner">
          <StatBlock value={8} suffix="" label="Industrias" />
          <StatBlock value={500} suffix="+" label="Empresas Atendidas" />
          <StatBlock value={5} suffix="" label="Entidades Federativas" />
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="section ind-grid-section" ref={gridRef}>
        <div className="container">
          <div className="ind-grid-section__header reveal">
            <span className="section-label">Sectores</span>
            <h2 className="section-title">Especialización por Industria</h2>
            <p className="section-subtitle">
              Cada industria tiene retos legales únicos. Seleccioná un sector para conocer cómo protegemos a las empresas de tu ramo.
            </p>
          </div>

          <div className="ind-bento reveal">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.slug} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="¿Tu industria no aparece?"
        subtitle="Atendemos empresas de todos los sectores. Contáctanos para una evaluación gratuita de los riesgos legales de tu industria."
      />
    </>
  );
}
