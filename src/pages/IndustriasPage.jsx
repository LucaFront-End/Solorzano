import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../data/industriesData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import LucideIcon from '../components/LucideIcon';
import CTABanner from '../components/CTABanner';
import PageHero from '../components/PageHero';
import {
  ArrowRight, Building2, Users, MapPin, Calculator, ShieldAlert,
  Percent, TrendingDown, HelpCircle, CheckCircle, Smartphone, Flame,
  Briefcase, Star, ClipboardCheck, Radio, Shield, HelpCircle as HelpIcon
} from 'lucide-react';
import './IndustriasPage.css';

function StatBlock({ value, suffix, label }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="ind-stats__item" ref={ref}>
      <span className="ind-stats__value">{count}{suffix}</span>
      <span className="ind-stats__label">{label}</span>
    </div>
  );
}

function IndustryCard({ industry, index }) {
  const cardRef = useRef(null);

  // States for mini-widgets in cards
  const [widgetState, setWidgetState] = useState({
    manufactura: 3, // audits checked
    retail: 72, // rotation rate
    tech: 'Bajo Riesgo (Normal)', // IP status
    hospitalidad: false, // propinas reguladas
    construccion: { siroc: false, epp: false, contratos: false },
    salud: 'normal', // pulse state
    educacion: 0, // contract cycle status
    logistica: false, // route status
  });

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

  // Render dynamic mini-widget based on slug
  const renderMiniWidget = (slug) => {
    switch (slug) {
      case 'manufactura':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Auditorías STPS REPSE</div>
            <div className="audit-tracker">
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={step}
                  className={`audit-step ${widgetState.manufactura >= step ? 'is-active' : ''}`}
                  onClick={() => setWidgetState(prev => ({ ...prev, manufactura: Math.max(1, step) }))}
                  title={`Fase de Cumplimiento ${step}`}
                />
              ))}
            </div>
            <span className="widget-status">
              {widgetState.manufactura === 4 ? 'Cumplimiento Total (100%)' : 'Riesgo de Multa Activo'}
            </span>
          </div>
        );
      case 'retail-comercio':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Tasa de Rotación de Personal</div>
            <div className="widget-value-row">
              <span className="widget-value">{widgetState.retail}%</span>
              <button
                className="widget-btn"
                onClick={() => setWidgetState(prev => ({ ...prev, retail: prev.retail === 72 ? 24 : 72 }))}
              >
                {widgetState.retail === 72 ? 'Aplicar Blindaje' : 'Restaurar'}
              </button>
            </div>
            <div className="widget-progress-bar">
              <div className="widget-progress-fill" style={{ width: `${widgetState.retail}%`, background: widgetState.retail > 50 ? '#D64545' : '#2EA879' }} />
            </div>
          </div>
        );
      case 'tecnologia':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Propiedad Intelectual (Código)</div>
            <div className="widget-value-row">
              <span className={`widget-badge ${widgetState.tech === 'Blindado' ? 'badge-success' : 'badge-warn'}`}>
                {widgetState.tech}
              </span>
              <button
                className="widget-btn"
                onClick={() => setWidgetState(prev => ({ ...prev, tech: prev.tech === 'Blindado' ? 'Bajo Riesgo (Normal)' : 'Blindado' }))}
              >
                {widgetState.tech === 'Blindado' ? 'Reset' : 'Proteger IP'}
              </button>
            </div>
          </div>
        );
      case 'hospitalidad':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Regulación de Propinas (LFT)</div>
            <div className="widget-toggle-row">
              <span>{widgetState.hospitalidad ? 'Tabulado Regulado' : 'Sin Control Legal'}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={widgetState.hospitalidad}
                  onChange={(e) => setWidgetState(prev => ({ ...prev, hospitalidad: e.target.checked }))}
                />
                <span className="slider-round" />
              </label>
            </div>
          </div>
        );
      case 'construccion':
        const { siroc, epp, contratos } = widgetState.construccion;
        const complete = siroc && epp && contratos;
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Checklist de Obra Civil</div>
            <div className="widget-checklist">
              <label className="chk-item">
                <input
                  type="checkbox"
                  checked={siroc}
                  onChange={(e) => setWidgetState(prev => ({ ...prev, construccion: { ...prev.construccion, siroc: e.target.checked } }))}
                />
                <span>SIROC</span>
              </label>
              <label className="chk-item">
                <input
                  type="checkbox"
                  checked={epp}
                  onChange={(e) => setWidgetState(prev => ({ ...prev, construccion: { ...prev.construccion, epp: e.target.checked } }))}
                />
                <span>EPP</span>
              </label>
              <label className="chk-item">
                <input
                  type="checkbox"
                  checked={contratos}
                  onChange={(e) => setWidgetState(prev => ({ ...prev, construccion: { ...prev.construccion, contratos: e.target.checked } }))}
                />
                <span>Contratos</span>
              </label>
            </div>
            <span className={`widget-status ${complete ? 'text-success' : 'text-danger'}`}>
              {complete ? 'Obra Protegida' : 'Exposición Directa'}
            </span>
          </div>
        );
      case 'salud':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Índice NOM-035 (Estrés)</div>
            <div className="widget-pulse-container" onClick={() => setWidgetState(prev => ({ ...prev, salud: prev.salud === 'normal' ? 'critico' : 'normal' }))}>
              <svg className="pulse-svg" viewBox="0 0 100 30" width="100%">
                <path
                  className={`pulse-path ${widgetState.salud}`}
                  d="M0,15 L30,15 L35,5 L40,25 L45,15 L50,15 L55,5 L60,25 L65,15 L100,15"
                  fill="none"
                  stroke={widgetState.salud === 'normal' ? '#10B981' : '#EF4444'}
                  strokeWidth="2"
                />
              </svg>
              <span className="pulse-text">
                {widgetState.salud === 'normal' ? 'Clima Estable' : 'Fatiga Crítica'}
              </span>
            </div>
          </div>
        );
      case 'educacion':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">Renovación Ciclo SEP</div>
            <div className="widget-cycles">
              <button
                className={`cycle-btn ${widgetState.educacion === 0 ? 'is-active' : ''}`}
                onClick={() => setWidgetState(prev => ({ ...prev, educacion: 0 }))}
              >
                Ciclo Activo
              </button>
              <button
                className={`cycle-btn ${widgetState.educacion === 1 ? 'is-active' : ''}`}
                onClick={() => setWidgetState(prev => ({ ...prev, educacion: 1 }))}
              >
                Liquidación
              </button>
            </div>
            <span className="widget-status">
              {widgetState.educacion === 0 ? 'Contrato Docente Vigente' : 'Finiquitos Proporcionales Requeridos'}
            </span>
          </div>
        );
      case 'logistica-transporte':
        return (
          <div className="ind-card__widget" onClick={(e) => e.stopPropagation()}>
            <div className="widget-label">GPS & Operadores Federales</div>
            <button
              className={`widget-action-btn ${widgetState.logistica ? 'success' : ''}`}
              onClick={() => setWidgetState(prev => ({ ...prev, logistica: !prev.logistica }))}
            >
              {widgetState.logistica ? 'Doping Trimestral OK' : 'Realizar Doping Mandatorio'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      to={`/industrias/${industry.slug}`}
      className={`ind-card ind-card--size-${index < 2 ? 'lg' : index < 5 ? 'md' : 'sm'}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--delay': `${index * 0.08}s`, '--accent': industry.color }}
    >
      <div className="ind-card__inner">
        <div className="ind-card__glow" aria-hidden="true" />
        <div className="ind-card__content">
          <div className="ind-card__icon">
            <LucideIcon name={industry.icon} size={30} strokeWidth={1.5} />
          </div>
          <h3 className="ind-card__title">{industry.title}</h3>
          <p className="ind-card__desc">{industry.description}</p>
          
          {/* Interactive Mini Widget */}
          {renderMiniWidget(industry.slug)}

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
  const calcSectionRef = useScrollReveal();
  const testimonialRef = useScrollReveal();
  const [heroVisible, setHeroVisible] = useState(false);

  // Calculator State
  const [calcEmpleados, setCalcEmpleados] = useState(45);
  const [calcRotacion, setCalcRotacion] = useState('media');
  const [calcSindicato, setCalcSindicato] = useState(false);
  const [calcSector, setCalcSector] = useState('manufactura');

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "SCA transformó por completo nuestra gestión de personal. En el sector manufacturero la subcontratación y el REPSE nos quitaban el sueño. Hoy dormimos tranquilos con un blindaje del 100%.",
      author: "Ing. Alejandro Mendoza",
      position: "Director de Operaciones, Grupo Inmeca (Manufactura)",
      stats: "Multa de $800k STPS cancelada"
    },
    {
      quote: "La alta rotación en nuestras tiendas departamentales solía traducirse en demandas constantes de ex-cajeros. Con el sistema de contratos por temporada y actas certificadas por SCA, redujimos los litigios a cero.",
      author: "Mtra. Silvia Pineda",
      position: "VP de Recursos Humanos, MultiRetail MX (Comercio)",
      stats: "65% de ahorro en indemnizaciones"
    },
    {
      quote: "Proteger la propiedad intelectual de nuestro software en México parecía imposible frente a las ambigüedades de la LFT. El equipo de Solórzano Cerezo redactó contratos impecables con asignación de IP.",
      author: "Carlos Escalante",
      position: "CEO & Co-fundador, DevNexus SaaS (Tecnología)",
      stats: "Cero filtraciones de código registradas"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    document.title = 'Sectores e Industrias Protegidas — Solórzano Cerezo';
    return () => clearTimeout(timer);
  }, []);

  // Calculation Logic
  const sectorFactor = {
    manufactura: 65,
    'retail-comercio': 60,
    tecnologia: 30,
    hospitalidad: 70,
    construccion: 85,
    salud: 50,
    educacion: 40,
    'logistica-transporte': 75
  };

  const factor = sectorFactor[calcSector] || 50;
  let scoreRiesgo = factor;
  
  if (calcEmpleados < 25) scoreRiesgo += 5;
  else if (calcEmpleados < 100) scoreRiesgo += 15;
  else scoreRiesgo += 25;

  if (calcRotacion === 'media') scoreRiesgo += 12;
  else if (calcRotacion === 'alta') scoreRiesgo += 28;

  if (calcSindicato) scoreRiesgo += 15;

  scoreRiesgo = Math.min(100, scoreRiesgo);

  // Estimación de costo de contingencia anual
  const costoEmpleadoPromedio = 64000; // promedio en MXN por indemnizaciones y gastos de juicio
  const tasaDemanda = calcRotacion === 'alta' ? 0.22 : calcRotacion === 'media' ? 0.11 : 0.03;
  const demandasAnuales = Math.max(1, Math.round(calcEmpleados * tasaDemanda * (scoreRiesgo / 100)));
  const costoEstimado = demandasAnuales * costoEmpleadoPromedio;
  const ahorroEstimado = costoEstimado * 0.78; // 78% de ahorro promedio documentado con SCA

  // Nivel de riesgo labels & colors
  let nivelRiesgo = 'Bajo';
  let colorRiesgo = 'var(--color-success)';
  if (scoreRiesgo >= 85) {
    nivelRiesgo = 'Crítico';
    colorRiesgo = 'var(--color-error)';
  } else if (scoreRiesgo >= 60) {
    nivelRiesgo = 'Alto';
    colorRiesgo = '#F97316'; // orange
  } else if (scoreRiesgo >= 35) {
    nivelRiesgo = 'Moderado';
    colorRiesgo = '#F59E0B'; // yellow
  }

  // Prepopulate WhatsApp text
  const whatsappUrl = `https://wa.link/2xc5mr?text=Hola,%20realicé%20la%20evaluación%20de%20riesgo%20laboral%20para%20mi%20empresa%20en%20el%20sector%20de%20${calcSector}.%20Mi%20riesgo%20salió%20como%20${nivelRiesgo}%20(${scoreRiesgo}%)%20con%20un%20costo%20contingencia%20de%20$${costoEstimado.toLocaleString()}%20MXN.%20Me%20interesa%20saber%20cómo%20puedo%20blindarme.`;

  return (
    <>
      <PageHero
        label="Cobertura Sectorial"
        title="Industrias que Blindamos Legalmente"
        subtitle="Asesoría estratégica en derecho laboral, inspecciones y relaciones colectivas adaptada a la naturaleza de operación de cada sector industrial de México."
        breadcrumb="Industrias"
      />

      {/* ── Stats Bar ── */}
      <section className="ind-stats-bar">
        <div className="container ind-stats-bar__inner">
          <StatBlock value={8} suffix="" label="Sectores Especializados" />
          <StatBlock value={500} suffix="+" label="Empresas Protegidas" />
          <StatBlock value={5} suffix="" label="Estados del País" />
          <StatBlock value={98} suffix="%" label="Casos Conciliados Con Éxito" />
        </div>
      </section>

      {/* ── Interactive Risk Calculator Section ── */}
      <section className="section ind-calc-section" ref={calcSectionRef}>
        <div className="container">
          <div className="ind-calc__header reveal">
            <span className="section-label">Herramienta de Diagnóstico</span>
            <h2 className="section-title">Calculadora de Exposición al Riesgo Laboral</h2>
            <p className="section-subtitle">
              Calcula el nivel de riesgo normativo y el costo potencial anual derivado de contingencias laborales en base a las características operativas de tu empresa.
            </p>
          </div>

          <div className="ind-calc__grid reveal">
            {/* Form Column */}
            <div className="ind-calc__card ind-calc__card--form">
              <h3 className="calc-card-title">Configuración de la Empresa</h3>
              <p className="calc-card-subtitle">Completa los siguientes parámetros de tu modelo laboral actual:</p>

              <div className="calc-field">
                <label className="field-label">
                  <span>Sector Industrial</span>
                  <HelpIcon size={14} className="field-icon-help" title="Cada sector tiene regulaciones específicas (REPSE, NOM-037, etc.) y tasas de litigio históricas particulares." />
                </label>
                <div className="sector-selector">
                  {industries.map((ind) => (
                    <button
                      key={ind.slug}
                      type="button"
                      className={`sector-btn-choice ${calcSector === ind.slug ? 'is-selected' : ''}`}
                      onClick={() => setCalcSector(ind.slug)}
                    >
                      <LucideIcon name={ind.icon} size={16} />
                      {ind.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-field">
                <div className="field-label-row">
                  <label className="field-label">Número de Empleados Activos</label>
                  <span className="slider-val-bubble">{calcEmpleados} empleados</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={calcEmpleados}
                  className="calc-slider"
                  onChange={(e) => setCalcEmpleados(parseInt(e.target.value))}
                />
                <div className="slider-limits">
                  <span>5</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500+</span>
                </div>
              </div>

              <div className="calc-field">
                <label className="field-label">Tasa de Rotación del Personal</label>
                <div className="calc-radio-group">
                  {[
                    { id: 'baja', title: 'Baja (Menor a 15% anual)' },
                    { id: 'media', title: 'Media (15% a 40% anual)' },
                    { id: 'alta', title: 'Alta (Mayor a 40% anual)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`calc-radio-btn ${calcRotacion === item.id ? 'is-active' : ''}`}
                      onClick={() => setCalcRotacion(item.id)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-field">
                <div className="toggle-container">
                  <div>
                    <label className="field-label margin-none">Presencia de Sindicato Activo</label>
                    <span className="field-subtext">¿Cuentas con Contrato Colectivo legitimado ante el Centro Federal?</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={calcSindicato}
                      onChange={(e) => setCalcSindicato(e.target.checked)}
                    />
                    <span className="slider-round" />
                  </label>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="ind-calc__card ind-calc__card--results">
              <h3 className="calc-card-title">Resultado de Exposición</h3>
              
              <div className="calc-gauge-wrapper">
                <svg className="calc-gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="42" />
                  <circle
                    className="gauge-fill"
                    cx="50"
                    cy="50"
                    r="42"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 42}`,
                      strokeDashoffset: `${2 * Math.PI * 42 * (1 - scoreRiesgo / 100)}`,
                      stroke: colorRiesgo
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-score">{scoreRiesgo}%</span>
                  <span className="gauge-label" style={{ color: colorRiesgo }}>{nivelRiesgo}</span>
                </div>
              </div>

              <div className="calc-metrics">
                <div className="metric-row">
                  <div className="metric-meta">
                    <span className="metric-lbl">Juicios Anuales Estimados</span>
                    <HelpIcon size={13} className="field-icon-help" title="Fórmula en base a rotación y empleados: a mayor personal y rotación, mayor probabilidad estadística de litigio." />
                  </div>
                  <span className="metric-val">{demandasAnuales} {demandasAnuales === 1 ? 'demanda/año' : 'demandas/año'}</span>
                </div>

                <div className="metric-divider" />

                <div className="metric-row">
                  <div className="metric-meta">
                    <span className="metric-lbl">Costo de Contingencia Legal</span>
                    <HelpIcon size={13} className="field-icon-help" title="Costo integral estimado de indemnizaciones, honorarios de juicios perdidos o conciliados, y recargos LFT." />
                  </div>
                  <span className="metric-val text-danger">${costoEstimado.toLocaleString()} MXN</span>
                </div>

                <div className="metric-divider" />

                <div className="metric-row highlight-green">
                  <div className="metric-meta">
                    <span className="metric-lbl">Ahorro con Blindaje SCA</span>
                    <HelpIcon size={13} className="field-icon-help" title="Monto anual que la empresa previene perder al estructurar adecuadamente sus contratos, nóminas y expedientes." />
                  </div>
                  <span className="metric-val text-success">${ahorroEstimado.toLocaleString()} MXN</span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-calc-cta"
                style={{ '--accent-color': colorRiesgo }}
              >
                <Smartphone size={18} />
                Solicitar Auditoría Preventiva Gratis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="section ind-grid-section" ref={gridRef}>
        <div className="container">
          <div className="ind-grid-section__header reveal">
            <span className="section-label">Cobertura Legal</span>
            <h2 className="section-title">Especialización Sectorial</h2>
            <p className="section-subtitle">
              Haz clic en cualquiera de las industrias para acceder a un desglose profundo de normativas, auditorías personalizadas de riesgo y casos de éxito reales.
            </p>
          </div>

          <div className="ind-bento reveal">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.slug} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Carousel ── */}
      <section className="section section--cream ind-testimonials-sec" ref={testimonialRef}>
        <div className="container">
          <div className="testimonial-header reveal">
            <span className="section-label">Opinión de Socios</span>
            <h2 className="section-title">Casos de Éxito Respaldados</h2>
          </div>

          <div className="testimonial-slider reveal">
            <div className="slider-card">
              <div className="slider-quote-icon">“</div>
              <p className="slider-text">{testimonials[activeTestimonial].quote}</p>
              <div className="slider-footer">
                <div>
                  <h4 className="slider-author">{testimonials[activeTestimonial].author}</h4>
                  <span className="slider-pos">{testimonials[activeTestimonial].position}</span>
                </div>
                <div className="slider-badge">
                  <Percent size={14} />
                  {testimonials[activeTestimonial].stats}
                </div>
              </div>
            </div>

            <div className="slider-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${activeTestimonial === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="¿Tu industria tiene operaciones mixtas?"
        subtitle="Analizamos modelos híbridos complejos (ej. Logística + Retail o Manufactura + Tech) estructurando contratos a medida que cubran cada riesgo legal de forma cruzada."
      />
    </>
  );
}
