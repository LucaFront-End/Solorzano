import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getIndustryBySlug, industries } from '../data/industriesData';
import { getServiceBySlug } from '../data/cmsServices';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { siteConfig } from '../data/content';
import LucideIcon from '../components/LucideIcon';
import {
  ArrowRight, MessageCircle, CheckCircle2, ChevronRight,
  Shield, Zap, Award, ArrowUpRight, Check, X, ClipboardList,
  AlertTriangle, RefreshCw, BarChart2, Star, HelpCircle, Activity
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
  const challengesReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const quizReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  
  const progressRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  // Overhaul Component States
  const [dashboardTab, setDashboardTab] = useState('stps'); // stps, litigation, contracts
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activePhase, setActivePhase] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  // Quiz States
  const [quizStep, setQuizStep] = useState(0); // 0: start, 1, 2, 3: questions, 4: results
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(100);

  // Floating TOC & Progress Bar Scroll Listener
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
      // Reset quiz when industry changes
      setQuizStep(0);
      setQuizAnswers({});
      setQuizScore(100);
    }
  }, [industry]);

  if (!industry) return <Navigate to="/industrias" replace />;

  const activeCaseStudy = industry.challenges[activeChallenge]?.caseStudy || industry.challenges[0]?.caseStudy;

  const relatedServices = industry.relatedServiceSlugs
    .map(s => getServiceBySlug(s))
    .filter(Boolean);

  const otherIndustries = industries.filter(i => i.slug !== slug).slice(0, 3);
  const tocItems = ['Desafíos', 'Línea de Blindaje', 'Autoevaluación', 'Servicios', 'FAQ'];

  // Shielding Phases Data
  const shieldingPhases = [
    {
      phase: 1,
      title: 'Diagnóstico & Auditoría',
      icon: 'Search',
      desc: 'Realizamos una auditoría exhaustiva de tus expedientes de personal, contratos vigentes, REPSE y cumplimiento de normas obligatorias (NOM-035/037) para mapear vacíos legales.',
      deliverables: ['Matriz de Riesgo Legal', 'Reporte de Hallazgos Críticos', 'Plan de Corrección Urgente']
    },
    {
      phase: 2,
      title: 'Reestructuración & Blindaje',
      icon: 'FileText',
      desc: 'Rediseñamos tus contratos individuales de trabajo, adendas de teletrabajo, convenios de confidencialidad y registramos tu Reglamento Interior de Trabajo ante las autoridades correspondientes.',
      deliverables: ['Nuevos Contratos Blindados', 'Convenios de IP firmados', 'Reglamento Interior Depositado']
    },
    {
      phase: 3,
      title: 'Capacitación a Liderazgo',
      icon: 'Users',
      desc: 'Capacitamos de forma directa a tus gerentes de planta, coordinadores de RH y supervisores en el levantamiento correcto de actas administrativas, rescisiones y manejo de quejas.',
      deliverables: ['Taller de Actas Administrativas', 'Protocolo NOM-035 Activado', 'Manual de Despidos sin Conflicto']
    },
    {
      phase: 4,
      title: 'Defensa Activa SCA',
      icon: 'Shield',
      desc: 'Asignamos un equipo permanente para la atención inmediata de citatorios prejudiciales, inspecciones de la STPS y defensa estratégica ante Tribunales Laborales.',
      deliverables: ['Cobertura de Citatorios 24/7', 'Representación en Juicios', 'Garantía de Paz Laboral']
    }
  ];

  // Quiz Handling
  const handleQuizAnswer = (questionId, value, weight) => {
    const nextAnswers = { ...quizAnswers, [questionId]: { value, weight } };
    setQuizAnswers(nextAnswers);

    if (quizStep < industry.quiz.length) {
      setQuizStep(prev => prev + 1);
    }
  };

  const calculateQuizResult = () => {
    let baseScore = 100;
    industry.quiz.forEach(q => {
      const ans = quizAnswers[q.id];
      if (ans && ans.value === 'No') {
        baseScore -= q.weight;
      }
    });
    setQuizScore(baseScore);
    setQuizStep(4); // Show results
  };

  useEffect(() => {
    if (quizStep === industry.quiz.length && quizStep > 0) {
      calculateQuizResult();
    }
  }, [quizStep]);

  // Quiz output calculations
  let quizRiskLevel = 'Bajo';
  let quizRiskColor = 'var(--color-success)';
  if (quizScore <= 35) {
    quizRiskLevel = 'Crítico';
    quizRiskColor = 'var(--color-error)';
  } else if (quizScore <= 70) {
    quizRiskLevel = 'Moderado';
    quizRiskColor = '#F59E0B'; // yellow
  }

  const quizWhatsappText = `Hola,%20realicé%20el%20test%20de%20riesgo%20para%20${industry.title}.%20Mi%20nivel%20de%20cumplimiento%20salió%20en%20${quizScore}%%20(Riesgo:%20${quizRiskLevel}).%20Deseo%20conocer%20cómo%20blindar%20mi%20empresa.`;

  return (
    <>
      {/* ── Overhauled Hero with Interactive Compliance Dashboard ── */}
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
              Industria {industry.title}
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
                Asesoría Inmediata
              </a>
              <a href="#desafios" className="inddet-hero__cta-secondary">
                Ver Desafíos Críticos
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Interactive Compliance Dashboard Widget */}
          <div className="inddet-hero__visual">
            <div className="dashboard-widget">
              <div className="dashboard-widget__header">
                <div className="dashboard-widget__header-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <div className="dashboard-widget__header-title">
                  <Activity size={12} />
                  SCA Legal Monitor — {industry.title}
                </div>
                <span className="status-live-badge">En Vivo</span>
              </div>

              {/* Tabs list */}
              <div className="dashboard-widget__tabs">
                <button
                  className={`widget-tab-btn ${dashboardTab === 'stps' ? 'is-active' : ''}`}
                  onClick={() => setDashboardTab('stps')}
                >
                  Auditoría STPS
                </button>
                <button
                  className={`widget-tab-btn ${dashboardTab === 'litigation' ? 'is-active' : ''}`}
                  onClick={() => setDashboardTab('litigation')}
                >
                  Costos de Litigio
                </button>
                <button
                  className={`widget-tab-btn ${dashboardTab === 'contracts' ? 'is-active' : ''}`}
                  onClick={() => setDashboardTab('contracts')}
                >
                  Expedientes LFT
                </button>
              </div>

              {/* Tab Contents */}
              <div className="dashboard-widget__body">
                {dashboardTab === 'stps' && (
                  <div className="tab-pane">
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span>REPSE Proveedores</span>
                        <span className="text-success">98% Seguro</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill fill-green" style={{ width: '98%' }} /></div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span>Evaluaciones NOM-035</span>
                        <span className="text-warn">50% Bajo Riesgo</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill fill-yellow" style={{ width: '50%' }} /></div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-meta">
                        <span>Seguridad e Higiene</span>
                        <span className="text-danger">35% Crítico</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill fill-red" style={{ width: '35%' }} /></div>
                    </div>
                    <div className="audit-alert-box">
                      <AlertTriangle size={15} />
                      <span>SCA Alerta: Requiere revisión urgente en actas de EPP para evitar multas federales.</span>
                    </div>
                  </div>
                )}

                {dashboardTab === 'litigation' && (
                  <div className="tab-pane">
                    <div className="chart-preview">
                      <div className="chart-meta">
                        <span>Costo de Demandas Acumuladas</span>
                        <span className="chart-savings">-75% Previsto</span>
                      </div>
                      <div className="chart-svg-container">
                        <svg viewBox="0 0 100 40" className="chart-svg">
                          {/* Grid lines */}
                          <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                          {/* Path 1: Sin SCA */}
                          <path d="M0,35 Q20,38 40,20 T80,5 T100,2" fill="none" stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="3,3" />
                          {/* Path 2: Con SCA */}
                          <path d="M0,35 Q20,32 40,28 T80,33 T100,38" fill="none" stroke="var(--color-success)" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="chart-legend">
                        <span className="leg-item"><span className="leg-dot bg-red" />Sin SCA</span>
                        <span className="leg-item"><span className="leg-dot bg-green" />Con Blindaje SCA</span>
                      </div>
                    </div>
                  </div>
                )}

                {dashboardTab === 'contracts' && (
                  <div className="tab-pane">
                    <div className="folder-status-grid">
                      <div className="folder-item">
                        <span className="folder-icon font-success"><CheckCircle2 size={16} /></span>
                        <div>
                          <h5 className="folder-title">Contratos Individuales</h5>
                          <span className="folder-desc">100% Actualizados LFT</span>
                        </div>
                      </div>
                      <div className="folder-item">
                        <span className="folder-icon font-success"><CheckCircle2 size={16} /></span>
                        <div>
                          <h5 className="folder-title">Convenios de IP</h5>
                          <span className="folder-desc">Firmados con desarrolladores</span>
                        </div>
                      </div>
                      <div className="folder-item">
                        <span className="folder-icon font-danger"><X size={16} /></span>
                        <div>
                          <h5 className="folder-title">Actas de Rescisión</h5>
                          <span className="folder-desc">Falta firma de testigos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating metrics inside hero widget */}
              <div className="dashboard-widget__footer">
                <div className="mini-stat">
                  <span className="mini-stat-val">{industry.stats.casos}</span>
                  <span className="mini-stat-lbl">Casos Éxito</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-val">{industry.stats.empresas}</span>
                  <span className="mini-stat-lbl">Empresas</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-val text-gold">{industry.stats.ahorro}</span>
                  <span className="mini-stat-lbl">Ahorro Prom.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sleek Navigation Sidebar (TOC) ── */}
      <aside className="inddet-toc" ref={progressRef}>
        <div className="inddet-toc__progress" />
        <ul className="inddet-toc__list">
          {tocItems.map((item, i) => (
            <li key={i} className={`inddet-toc__item ${activeSection === i ? 'is-active' : ''}`}>
              <a href={`#${['desafios', 'cronograma', 'evaluacion', 'servicios-rel', 'faq'][i]}`}>
                <span className="inddet-toc__dot" />
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Section 1: Challenges & Detailed Case Study ── */}
      <section
        className="section inddet-challenges"
        id="desafios"
        ref={(el) => { challengesReveal.current = el; sectionsRef.current[0] = el; }}
      >
        <div className="container">
          <div className="inddet-challenges__header reveal">
            <span className="section-label">Desafíos & Soluciones</span>
            <h2 className="section-title">
              Retos Críticos del Sector <span className="text-accent">{industry.title}</span>
            </h2>
            <p className="section-subtitle">
              Analiza los mayores riesgos operativos de tu sector y descubre cómo los hemos solucionado en casos reales.
            </p>
          </div>

          <div className="inddet-challenges__layout reveal">
            {/* Left: Interactive list of challenges with inline mobile accordion */}
            <div className="inddet-challenges__list">
              {industry.challenges.map((ch, i) => (
                <div key={i} className="challenge-item-group">
                  <button
                    className={`challenge-tab-btn ${activeChallenge === i ? 'is-active' : ''}`}
                    onClick={() => setActiveChallenge(activeChallenge === i ? -1 : i)}
                  >
                    <span className="challenge-num">0{i + 1}</span>
                    <div className="challenge-btn-content">
                      <h4 className="challenge-title-text">{ch.title}</h4>
                      <p className="challenge-desc-short">{ch.desc}</p>
                    </div>
                    <ChevronRight size={18} className="challenge-arrow" />
                  </button>

                  <div className={`challenge-mobile-accordion ${activeChallenge === i ? 'is-open' : ''}`}>
                    <div className="case-study-badge">
                      <Award size={13} />
                      Caso de Éxito Documentado
                    </div>
                    <h3 className="case-study-title" style={{ fontSize: '1.15rem', marginTop: '12px', marginBottom: '16px' }}>
                      {ch.caseStudy.title}
                    </h3>
                    
                    <div className="case-study-grid">
                      <div className="case-study-part">
                        <h4 className="case-study-part-title">
                          <span className="part-dot bg-red" />
                          El Desafío
                        </h4>
                        <p className="case-study-part-text">{ch.caseStudy.challenge}</p>
                      </div>

                      <div className="case-study-part">
                        <h4 className="case-study-part-title">
                          <span className="part-dot bg-blue" />
                          La Estrategia SCA
                        </h4>
                        <p className="case-study-part-text">{ch.caseStudy.strategy}</p>
                      </div>

                      <div className="case-study-part highlight">
                        <h4 className="case-study-part-title">
                          <span className="part-dot bg-green" />
                          El Resultado
                        </h4>
                        <p className="case-study-part-text">{ch.caseStudy.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Detailed Case Study Box (Desktop Only) */}
            <div className="case-study-box">
              <div className="case-study-badge">
                <Award size={13} />
                Caso de Éxito Documentado
              </div>
              <h3 className="case-study-title">{activeCaseStudy.title}</h3>
              
              <div className="case-study-grid">
                <div className="case-study-part">
                  <h4 className="case-study-part-title">
                    <span className="part-dot bg-red" />
                    El Desafío
                  </h4>
                  <p className="case-study-part-text">{activeCaseStudy.challenge}</p>
                </div>

                <div className="case-study-part">
                  <h4 className="case-study-part-title">
                    <span className="part-dot bg-blue" />
                    La Estrategia SCA
                  </h4>
                  <p className="case-study-part-text">{activeCaseStudy.strategy}</p>
                </div>

                <div className="case-study-part highlight">
                  <h4 className="case-study-part-title">
                    <span className="part-dot bg-green" />
                    El Resultado
                  </h4>
                  <p className="case-study-part-text">{activeCaseStudy.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive Shielding Timeline ── */}
      <section
        className="section section--white inddet-timeline-sec"
        id="cronograma"
        ref={(el) => { timelineReveal.current = el; sectionsRef.current[1] = el; }}
      >
        <div className="container">
          <div className="inddet-timeline__header reveal">
            <span className="section-label">Metodología de Trabajo</span>
            <h2 className="section-title">Cronograma de Blindaje Corporativo</h2>
            <p className="section-subtitle">
              Una intervención estructurada en 4 fases diseñadas para llevar a tu empresa de una exposición total a una protección absoluta.
            </p>
          </div>

          <div className="inddet-timeline__wrapper reveal">
            {/* Desktop Timeline Layout (TOC & single card) */}
            <div className="timeline-steps desktop-only">
              {shieldingPhases.map((phase) => (
                <button
                  key={phase.phase}
                  className={`timeline-step-btn ${activePhase === phase.phase ? 'is-active' : ''}`}
                  onClick={() => setActivePhase(phase.phase)}
                >
                  <div className="step-number">{phase.phase}</div>
                  <span className="step-title">{phase.title}</span>
                </button>
              ))}
            </div>

            <div className="timeline-content-card desktop-only">
              <div className="timeline-card__icon-wrap">
                <LucideIcon name={shieldingPhases[activePhase - 1]?.icon || 'Search'} size={28} strokeWidth={1.5} />
              </div>
              <div className="timeline-card__details">
                <span className="phase-lbl">Fase {activePhase}</span>
                <h3 className="phase-title">{shieldingPhases[activePhase - 1]?.title}</h3>
                <p className="phase-desc">{shieldingPhases[activePhase - 1]?.desc}</p>
                
                <h4 className="deliverables-title">Entregables Clave:</h4>
                <ul className="deliverables-list">
                  {shieldingPhases[activePhase - 1]?.deliverables.map((del, index) => (
                    <li key={index}>
                      <CheckCircle2 size={15} className="deliverable-check" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Timeline Layout (Vertical connected tree) */}
            <div className="mobile-only mobile-timeline">
              <div className="mobile-timeline__line" />
              {shieldingPhases.map((phase) => {
                const isActive = activePhase === phase.phase;
                return (
                  <div key={phase.phase} className={`mobile-timeline__step ${isActive ? 'is-active' : ''}`}>
                    <button 
                      className="mobile-timeline__trigger"
                      onClick={() => setActivePhase(isActive ? 0 : phase.phase)}
                    >
                      <div className="mobile-timeline__number">
                        {phase.phase}
                        {isActive && <span className="mobile-timeline__ping" />}
                      </div>
                      <span className="mobile-timeline__title">{phase.title}</span>
                    </button>

                    <div className={`mobile-timeline__content ${isActive ? 'is-open' : ''}`}>
                      <p className="phase-desc" style={{ marginBottom: '16px', fontSize: '0.92rem' }}>{phase.desc}</p>
                      <h4 className="deliverables-title" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>Entregables Clave:</h4>
                      <ul className="deliverables-list">
                        {phase.deliverables.map((del, index) => (
                          <li key={index}>
                            <CheckCircle2 size={15} className="deliverable-check" />
                            {del}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Custom Risk Quiz (Interactive Diagnostic) ── */}
      <section
        className="section section--cream inddet-quiz-sec"
        id="evaluacion"
        ref={(el) => { quizReveal.current = el; sectionsRef.current[2] = el; }}
      >
        <div className="container">
          <div className="quiz-container reveal">
            {quizStep === 0 && (
              <div className="quiz-start">
                <span className="quiz-pre">Diagnóstico Rápido</span>
                <h2 className="quiz-heading">Autoevaluación de Riesgos Laborales en {industry.title}</h2>
                <p className="quiz-lead">
                  Responde 3 preguntas estructuradas específicamente para los riesgos legales vigentes del sector de {industry.title} en México. Al terminar, obtendrás un dictamen inmediato y tu puntaje de blindaje laboral.
                </p>
                <button className="btn btn--primary" onClick={() => setQuizStep(1)}>
                  Comenzar Evaluación
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {quizStep > 0 && quizStep <= industry.quiz.length && (
              <div className="quiz-question-view">
                <div className="quiz-progress-bar">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${(quizStep / industry.quiz.length) * 100}%` }}
                  />
                </div>
                
                <span className="question-count">Pregunta {quizStep} de {industry.quiz.length}</span>
                <h3 className="question-text">{industry.quiz[quizStep - 1].question}</h3>

                <div className="quiz-options">
                  <button
                    className="quiz-option-btn option-yes"
                    onClick={() => handleQuizAnswer(industry.quiz[quizStep - 1].id, 'Sí', industry.quiz[quizStep - 1].weight)}
                  >
                    <Check size={20} />
                    <span>Sí, contamos con esto totalmente</span>
                  </button>
                  <button
                    className="quiz-option-btn option-no"
                    onClick={() => handleQuizAnswer(industry.quiz[quizStep - 1].id, 'No', industry.quiz[quizStep - 1].weight)}
                  >
                    <X size={20} />
                    <span>No cuento con ello / Lo desconozco</span>
                  </button>
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="quiz-results">
                <div className="results-badge" style={{ background: quizRiskColor }}>
                  Dictamen de Cumplimiento: {quizScore}%
                </div>
                <h3 className="results-title">Nivel de Riesgo Corporativo: <span style={{ color: quizRiskColor }}>{quizRiskLevel}</span></h3>
                
                <p className="results-desc">
                  {quizScore === 100 
                    ? "¡Felicidades! Tu empresa presenta un cumplimiento completo en las áreas auditadas. Te sugerimos auditorías semestrales preventivas para mantenerte alineado a reformas." 
                    : "Hemos detectado brechas de cumplimiento significativas que exponen a tu empresa a posibles multas de la STPS e indemnizaciones costosas. Te aconsejamos estructurar un plan de blindaje urgente."
                  }
                </p>

                <div className="results-breakdown">
                  <h4 className="breakdown-title">Brechas Detectadas:</h4>
                  <ul className="breakdown-list">
                    {industry.quiz.map(q => {
                      const ans = quizAnswers[q.id];
                      return (
                        <li key={q.id} className={ans?.value === 'Sí' ? 'ok' : 'fail'}>
                          {ans?.value === 'Sí' 
                            ? <CheckCircle2 size={16} className="text-success" /> 
                            : <AlertTriangle size={16} className="text-danger" />
                          }
                          <span>{q.question.substring(0, 75)}... <strong>({ans?.value === 'Sí' ? 'Cumplido' : 'Pendiente'})</strong></span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="results-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    <MessageCircle size={18} />
                    Consultar Resultados con un Abogado
                  </a>
                  <button className="btn btn--outline" onClick={() => setQuizStep(0)}>
                    <RefreshCw size={16} />
                    Reiniciar Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 4: Related Services ── */}
      <section
        className="section inddet-services"
        id="servicios-rel"
        ref={(el) => { servicesReveal.current = el; sectionsRef.current[3] = el; }}
      >
        <div className="container">
          <div className="inddet-services__header reveal">
            <span className="section-label">Portafolio</span>
            <h2 className="section-title">Servicios Relacionados para {industry.title}</h2>
            <p className="section-subtitle">
              Estos son los servicios legales específicos del despacho que más demanda y requiere tu sector.
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
              <span>Ver Catálogo Completo</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Sector FAQ Accordion ── */}
      <section
        className="section section--white inddet-faq-sec"
        id="faq"
        ref={(el) => { faqReveal.current = el; sectionsRef.current[4] = el; }}
      >
        <div className="container">
          <div className="inddet-faq__header reveal">
            <span className="section-label">Resolución de Dudas</span>
            <h2 className="section-title">Preguntas Frecuentes del Sector</h2>
            <p className="section-subtitle">
              Respuestas rápidas redactadas por nuestros especialistas sobre los conflictos más usuales de {industry.title}.
            </p>
          </div>

          <div className="inddet-faq__accordion reveal">
            {industry.faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-accordion-item ${openFaq === idx ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-accordion-trigger"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-icon-toggle">
                    <span className="icon-bar icon-bar--h" />
                    <span className="icon-bar icon-bar--v" />
                  </span>
                </button>
                <div className="faq-accordion-content">
                  <div className="faq-accordion-content-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Industries Carousel ── */}
      <section className="section section--cream inddet-others">
        <div className="container">
          <div className="inddet-others__header">
            <h3 className="inddet-others__title">Otras Especialidades Sectoriales</h3>
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

      {/* ── Premium Call To Action ── */}
      <section className="inddet-cta" style={{ '--accent': industry.color }}>
        <div className="inddet-cta__pattern" aria-hidden="true" />
        <div className="container inddet-cta__inner">
          <div className="inddet-cta__badge">
            <LucideIcon name={industry.icon} size={16} strokeWidth={2} />
            {industry.title}
          </div>
          <h2 className="inddet-cta__title">
            ¿Listo para blindar legalmente tu operación en {industry.title.toLowerCase()}?
          </h2>
          <p className="inddet-cta__subtitle">
            Evita multas e indemnizaciones infladas. Agenda hoy una primera sesión de consultoría estratégica gratuita y sin compromiso.
          </p>
          <div className="inddet-cta__actions">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inddet-cta__btn inddet-cta__btn--primary"
            >
              <MessageCircle size={20} strokeWidth={2} />
              Hablar con un Abogado
            </a>
            <Link to="/contacto" className="inddet-cta__btn inddet-cta__btn--outline">
              Enviar Correo
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
