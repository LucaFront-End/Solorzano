import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useWixBlog } from '../hooks/useWixBlog';
import {
  BookOpen, FileText, Users, ArrowUpRight, ArrowRight,
  Sparkles, MessageCircle, Star, Zap, GraduationCap,
  Download, Globe, Clock, Search, Play, Pause, Calendar,
  Check, Lock, Award, Heart, CheckCircle2, ChevronRight
} from 'lucide-react';
import './ComunidadPage.css';



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

export default function ComunidadPage() {
  const heroRef = useScrollReveal();
  const blogRef = useScrollReveal();
  const featRef = useScrollReveal();
  const simulatorRef = useScrollReveal();
  const eventsRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  
  const [heroVisible, setHeroVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  // Dynamic blog posts from Wix
  const { posts: wixPosts, loading: blogLoading } = useWixBlog({ limit: 50 });

  // Filter posts client-side
  const filteredPosts = wixPosts.filter(post => {
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Resource Downloads States
  const [downloadProgress, setDownloadProgress] = useState({});

  // Classroom Simulator States
  const [activeCourse, setActiveCourse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [courseProgress, setCourseProgress] = useState({ 0: 65, 1: 20, 2: 0 });
  const [playingTimer, setPlayingTimer] = useState(0);
  const timerRef = useRef(null);

  // Live Activity Feed State (infinite append Simulation)
  const [liveActivities, setLiveActivities] = useState([
    { id: 1, user: 'Silvia P. (RH)', action: 'descargó la plantilla de Contrato Blindado', time: 'hace 2 min' },
    { id: 2, user: 'Ing. Carlos M.', action: 'completó el módulo de Inspecciones STPS', time: 'hace 5 min' },
    { id: 3, user: 'Lic. Arriaga', action: 'respondió al foro: Duda sobre horas extra en retail', time: 'hace 10 min' },
    { id: 4, user: 'Diana G.', action: 'se unió a la comunidad de Skool', time: 'hace 12 min' }
  ]);

  // Webinar registration states
  const [registeredWebinars, setRegisteredWebinars] = useState({});

  // Append items to live feed simulation
  useEffect(() => {
    const users = ['Ana M.', 'Pedro H.', 'Sofía L.', 'Mtro. Juárez', 'Roberto T.', 'Gabriela V.', 'Sistemas RH'];
    const actions = [
      'descargó la Calculadora de Liquidaciones Excel',
      'completó el examen de NOM-037',
      'subió una duda sobre aguinaldos proporcionales',
      'agendó el próximo webinar de PTU',
      'calificó el curso de Blindaje 101 con 5 estrellas',
      'completó el curso de Actas Administrativas'
    ];

    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newActivity = {
        id: Date.now(),
        user: randomUser,
        action: randomAction,
        time: 'hace 1s'
      };

      setLiveActivities(prev => [newActivity, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    document.title = 'Comunidad de Relaciones Laborales — Solórzano Cerezo';
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => {
      clearTimeout(timer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Simulator Playing Audio Wave simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPlayingTimer(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            // Upgrade progress on completion
            setCourseProgress(c => {
              const current = c[activeCourse];
              return { ...c, [activeCourse]: Math.min(100, current + 15) };
            });
            return 0;
          }
          return prev + 2;
        });
      }, 150);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeCourse]);

  // Resource download simulation trigger
  const handleDownload = (id) => {
    if (downloadProgress[id]) return;

    setDownloadProgress(prev => ({ ...prev, [id]: { status: 'loading', pct: 0 } }));
    
    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += 10;
      setDownloadProgress(prev => ({ ...prev, [id]: { status: 'loading', pct: currentPct } }));
      
      if (currentPct >= 100) {
        clearInterval(interval);
        setDownloadProgress(prev => ({ ...prev, [id]: { status: 'complete', pct: 100 } }));
        // Open a fake download link / resource description PDF
        setTimeout(() => {
          window.open('https://www.dsc.mx/blog', '_blank');
        }, 800);
      }
    }, 150);
  };

  // Webinar Toggle Registration
  const handleRegisterWebinar = (id) => {
    setRegisteredWebinars(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const coursesData = [
    {
      title: 'Módulo 1: Blindaje Laboral 101',
      lessons: [
        { title: 'Tipos de Contratos LFT y sus efectos', duration: '12 mins', unlocked: true },
        { title: 'Estructuración del expediente de personal', duration: '15 mins', unlocked: true },
        { title: 'Cláusulas de propiedad intelectual y confidencialidad', duration: '18 mins', unlocked: true },
        { title: 'Caso práctico: Startup SaaS mexicana', duration: '10 mins', unlocked: false }
      ]
    },
    {
      title: 'Módulo 2: Despidos y Actas sin Conflicto',
      lessons: [
        { title: 'Levantamiento de actas administrativas legales', duration: '20 mins', unlocked: true },
        { title: 'Notificación de aviso de rescisión justificada', duration: '14 mins', unlocked: false },
        { title: 'Cálculo de finiquitos y primas de antigüedad', duration: '22 mins', unlocked: false }
      ]
    },
    {
      title: 'Módulo 3: NOM-037 & Teletrabajo',
      lessons: [
        { title: 'Requisitos obligatorios del home office en México', duration: '16 mins', unlocked: false },
        { title: 'Cálculo del reembolso de luz e internet', duration: '11 mins', unlocked: false }
      ]
    }
  ];

  return (
    <>
      {/* ── Overhauled Hero with Live Activity Feed Simulation ── */}
      <section className={`com-hero ${heroVisible ? 'is-visible' : ''}`} ref={heroRef}>
        <div className="com-hero__particles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="com-hero__particle" style={{ '--i': i }} />
          ))}
        </div>
        <div className="com-hero__radial" aria-hidden="true" />

        <div className="container com-hero__inner">
          <div className="com-hero__text">
            <nav className="com-hero__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Inicio</Link>
              <span className="com-hero__breadcrumb-sep">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </span>
              <span>Comunidad</span>
            </nav>

            <div className="com-hero__badge reveal">
              <Sparkles size={14} strokeWidth={2} />
              Centro de Aprendizaje & Skool Hub
            </div>

            <h1 className="com-hero__title reveal">
              Nuestra <span className="text-accent">Comunidad</span>
            </h1>

            <p className="com-hero__subtitle reveal">
              Accede a biblioteca de formatos descargables, cursos grabados interactivos y una red activa de profesionales de RH y derecho laboral mexicano.
            </p>
          </div>

          {/* Live Skool Activity Feed Container */}
          <div className="com-hero__feed-column">
            <div className="live-feed-card">
              <div className="live-feed-card__header">
                <Users size={16} />
                <span>Actividad en Skool (Relaciones Laborales)</span>
                <span className="green-ping" />
              </div>
              <div className="live-feed-card__list">
                {liveActivities.map((act) => (
                  <div className="feed-item" key={act.id}>
                    <div className="feed-avatar">
                      {act.user[0]}
                    </div>
                    <div className="feed-content">
                      <span className="feed-user">{act.user}</span>
                      <span className="feed-action">{act.action}</span>
                    </div>
                    <span className="feed-time">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
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

      {/* ── Section 1: Searchable Blog & Knowledge Hub ── */}
      <section className="section com-blog" ref={blogRef} id="biblioteca">
        <div className="container">
          <div className="com-blog__header reveal">
            <span className="section-label">Biblioteca</span>
            <h2 className="section-title">Publicaciones y Análisis Prácticos</h2>
            <p className="section-subtitle">
              Consulta análisis de reformas laborales redactados con un lenguaje operativo y directo para empresas.
            </p>
          </div>

          {/* Search and Filters panel */}
          <div className="blog-controls-panel reveal">
            <div className="search-bar-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar artículos por título o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
            
            <div className="category-filters">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'reformas', label: 'Reformas LFT' },
                { id: 'rh', label: 'Recursos Humanos' },
                { id: 'defensa', label: 'Litigio y Defensa' }
              ].map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of posts */}
          <div className="com-blog__grid">
            {blogLoading && (
              <div className="com-blog__loading">
                <div className="com-blog__spinner" />
                <p>Cargando publicaciones...</p>
              </div>
            )}
            {!blogLoading && filteredPosts.map((post, i) => (
              <Link
                to={`/blog/${post.slug}`}
                className={`com-blog__card reveal ${i === 0 ? 'com-blog__card--featured' : ''}`}
                key={post.id}
                style={{ '--delay': `${i * 0.08}s` }}
              >
                <div className="com-blog__card-img">
                  {post.coverImage
                    ? <img src={post.coverImage} alt={post.title} loading="lazy" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1f2845 0%, #2d3c6e 100%)' }} />
                  }
                  <div className="com-blog__card-overlay" />
                  <span className="com-blog__card-date">
                    <Clock size={12} strokeWidth={2} />
                    {post.publishedDate}
                  </span>
                </div>
                <div className="com-blog__card-body">
                  <h3 className="com-blog__card-title">{post.title}</h3>
                  <p className="com-blog__card-excerpt">{post.excerpt}</p>
                  <div className="com-blog__card-footer">
                    <span className="com-blog__card-link">
                      Leer artículo
                      <ArrowUpRight size={16} strokeWidth={2} />
                    </span>
                    <span className="read-time">{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
            {!blogLoading && filteredPosts.length === 0 && (
              <div className="no-posts-found">
                <h3>No se encontraron publicaciones</h3>
                <p>Prueba buscando con palabras clave diferentes.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2: Downloadable Resources Bento Library ── */}
      <section className="section com-features" ref={featRef}>
        <div className="com-features__bg" aria-hidden="true" />
        <div className="com-features__grid-lines" aria-hidden="true" />

        <div className="container com-features__inner">
          <div className="com-features__header reveal">
            <div className="com-features__badge">
              <Download size={14} strokeWidth={2} />
              Formatos Descargables
            </div>
            <h2 className="com-features__title">
              Biblioteca de Recursos <span className="text-accent">Gratuitos</span>
            </h2>
            <p className="com-features__subtitle">
              Descarga expedientes tipo, Excel de cálculos e instructivos listos para usar en tus operaciones diarias de RH.
            </p>
          </div>

          <div className="com-features__cards reveal">
            {[
              {
                id: 'excel-finiquito',
                title: 'Calculadora de Liquidaciones Excel',
                desc: 'Plantilla en Excel formulada conforme a la LFT para calcular finiquitos, indemnización de 3 meses, prima vacacional y aguinaldos.',
                meta: 'XLSX • 1.4 MB'
              },
              {
                id: 'contrato-tipo',
                title: 'Contrato Individual de Trabajo Blindado',
                desc: 'Modelo de contrato por tiempo indeterminado adecuado a las reformas de subcontratación y validez probatoria ante tribunales.',
                meta: 'DOCX • 350 KB'
              },
              {
                id: 'guia-inspeccion',
                title: 'Guía de Inspección STPS',
                desc: 'Checklist definitivo con los 48 documentos que un inspector federal del trabajo auditará en materia de administración y seguridad.',
                meta: 'PDF • 2.8 MB'
              }
            ].map((res, i) => {
              const status = downloadProgress[res.id]?.status || 'idle';
              const pct = downloadProgress[res.id]?.pct || 0;

              return (
                <div className="com-feat-card" key={res.id} style={{ '--delay': `${i * 0.12}s` }}>
                  <div className="com-feat-card__glow" aria-hidden="true" />
                  <div className="com-feat-card__icon">
                    <FileText size={24} />
                  </div>
                  <h3 className="com-feat-card__title">{res.title}</h3>
                  <p className="com-feat-card__desc">{res.desc}</p>
                  
                  <div className="resource-card-footer">
                    <span className="file-meta">{res.meta}</span>
                    <button
                      className={`download-trigger-btn ${status}`}
                      onClick={() => handleDownload(res.id)}
                    >
                      {status === 'idle' && (
                        <>
                          <Download size={14} />
                          <span>Descargar</span>
                        </>
                      )}

                      {status === 'loading' && (
                        <>
                          <div className="spinner-loader" style={{ '--pct': `${pct}%` }} />
                          <span>{pct}%</span>
                        </>
                      )}

                      {status === 'complete' && (
                        <>
                          <Check size={14} />
                          <span>¡Descargado!</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Interactive Skool Classroom Preview ── */}
      <section className="section com-classroom-simulator" ref={simulatorRef}>
        <div className="container">
          <div className="simulator-header reveal">
            <span className="section-label">Plataforma Educativa</span>
            <h2 className="section-title">Explora la Academia en Skool</h2>
            <p className="section-subtitle">
              Te mostramos una vista previa interactiva de las videoclases prácticas que nuestros miembros activos consultan dentro del portal Skool.
            </p>
          </div>

          <div className="simulator-layout reveal">
            {/* Left Column: Modules list */}
            <div className="simulator-sidebar">
              <h4 className="sidebar-heading">Módulos de Capacitación</h4>
              <div className="course-modules-list">
                {coursesData.map((course, idx) => (
                  <button
                    key={idx}
                    className={`course-module-tab ${activeCourse === idx ? 'is-selected' : ''}`}
                    onClick={() => {
                      setActiveCourse(idx);
                      setIsPlaying(false);
                      setPlayingTimer(0);
                    }}
                  >
                    <div className="module-meta">
                      <span className="module-title">{course.title}</span>
                      <span className="module-completion">{courseProgress[idx]}% Completado</span>
                    </div>
                    <div className="module-bar">
                      <div className="module-bar-fill" style={{ width: `${courseProgress[idx]}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Video Player and Lesson Checklist */}
            <div className="simulator-main">
              {/* Virtual Video Player */}
              <div className="virtual-player">
                <div className="player-screen">
                  {isPlaying ? (
                    <div className="player-animation-wave">
                      <div className="wave-bar bar-1" />
                      <div className="wave-bar bar-2" />
                      <div className="wave-bar bar-3" />
                      <div className="wave-bar bar-4" />
                      <div className="wave-bar bar-5" />
                      <div className="wave-playing-label">Reproduciendo videoclase de {coursesData[activeCourse].title.substring(0, 16)}...</div>
                    </div>
                  ) : (
                    <div className="player-placeholder">
                      <Play size={48} className="play-icon-center" onClick={() => setIsPlaying(true)} />
                      <span className="placeholder-text">Haz clic en Play para simular la reproducción</span>
                    </div>
                  )}

                  {/* Custom progress indicators */}
                  <div className="player-controls">
                    <button className="play-toggle-btn" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <div className="player-scrubber">
                      <div className="player-scrubber-fill" style={{ width: `${playingTimer}%` }} />
                    </div>
                    <span className="player-time-lbl">
                      {Math.floor((playingTimer * 0.15))}s / 15s
                    </span>
                  </div>
                </div>
              </div>

              {/* Lessons list inside active module */}
              <div className="lessons-checklist">
                <h4 className="lessons-heading">Lecciones del Módulo</h4>
                <div className="lessons-list-items">
                  {coursesData[activeCourse].lessons.map((les, i) => (
                    <div className={`lesson-list-row ${les.unlocked ? 'is-unlocked' : 'is-locked'}`} key={i}>
                      {les.unlocked ? (
                        <CheckCircle2 size={16} className="text-success" />
                      ) : (
                        <Lock size={16} className="text-muted" />
                      )}
                      <span className="lesson-row-title">{les.title}</span>
                      <span className="lesson-row-duration">{les.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Upcoming Event Calendar ── */}
      <section className="section section--cream com-events-sec" ref={eventsRef}>
        <div className="container">
          <div className="events-sec-header reveal">
            <span className="section-label">Agenda en Vivo</span>
            <h2 className="section-title">Próximos Webinars y Sesiones de Q&A</h2>
            <p className="section-subtitle">
              Reserva tu lugar en nuestros talleres prácticos mensuales vía Zoom con preguntas y respuestas abiertas.
            </p>
          </div>

          <div className="events-grid reveal">
            {[
              {
                id: 'web-ptu',
                title: 'Estrategias Legales ante el Reparto de Utilidades (PTU)',
                desc: 'Aprende a formular comisiones mixtas de PTU, revisar la declaración anual, y resolver inconformidades de trabajadores de forma legal.',
                date: 'Miércoles, 24 de Junio • 17:00 Hrs CDMX',
                host: 'Impartido por: Lic. Pablo Solórzano',
                attendees: 135
              },
              {
                id: 'web-contratos',
                title: 'Taller: Elaboración y Rescisión de Contratos LFT',
                desc: 'Casos reales de actas administrativas aprobadas ante los Tribunales Laborales y cómo redactar cláusulas de teletrabajo NOM-037 blindadas.',
                date: 'Jueves, 9 de Julio • 11:00 Hrs CDMX',
                host: 'Impartido por: Mtro. Carlos Bueno',
                attendees: 94
              }
            ].map(event => {
              const isRegistered = registeredWebinars[event.id];

              return (
                <div className="event-card" key={event.id}>
                  <div className="event-card__date">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.desc}</p>
                  
                  <div className="event-footer">
                    <div className="event-host-info">
                      <span className="event-host">{event.host}</span>
                      <span className="attendees-count">
                        <Users size={12} />
                        {event.attendees + (isRegistered ? 1 : 0)} registrados
                      </span>
                    </div>

                    <button
                      className={`event-reg-btn ${isRegistered ? 'registered' : ''}`}
                      onClick={() => handleRegisterWebinar(event.id)}
                    >
                      {isRegistered ? (
                        <>
                          <Check size={14} />
                          <span>Lugar Reservado</span>
                        </>
                      ) : (
                        <span>Registrarme Gratis</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skool CTA Hero ── */}
      <section className="com-skool-cta" ref={ctaRef}>
        <div className="com-skool-cta__pattern" aria-hidden="true" />
        <div className="com-skool-cta__orb com-skool-cta__orb--1" aria-hidden="true" />
        <div className="com-skool-cta__orb com-skool-cta__orb--2" aria-hidden="true" />

        <div className="container com-skool-cta__inner">
          <div className="com-skool-cta__stats reveal">
            <div className="com-skool-stat">
              <span className="com-skool-stat__value">200+</span>
              <span className="com-skool-stat__label">Miembros en Red</span>
            </div>
            <div className="com-skool-stat">
              <span className="com-skool-stat__value">12+</span>
              <span className="com-skool-stat__label">Cursos en Academia</span>
            </div>
            <div className="com-skool-stat">
              <span className="com-skool-stat__value">50+</span>
              <span className="com-skool-stat__label">Formatos Editables</span>
            </div>
          </div>

          <div className="com-skool-cta__content reveal">
            <div className="com-skool-cta__badge">
              <Users size={15} strokeWidth={2} />
              Red de Relaciones Laborales
            </div>
            <h2 className="com-skool-cta__title">
              Únete a la Comunidad de <span className="text-accent">Especialistas</span> en RH más Activa de México
            </h2>
            <p className="com-skool-cta__subtitle">
              Capacítate en tiempo real sobre reformas laborales, comparte dudas con colegas y recibe asesoría preventiva con el respaldo directo del equipo de SCA.
            </p>

            <a
              href={siteConfig.skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="com-skool-cta__btn"
            >
              <span className="com-skool-cta__btn-content">
                <span className="com-skool-cta__btn-text">Ingresar a la Comunidad</span>
                <span className="com-skool-cta__btn-sub">Relaciones Laborales con SCA en Skool</span>
              </span>
              <ArrowUpRight size={22} strokeWidth={2} />
              <div className="com-skool-cta__btn-shine" aria-hidden="true" />
            </a>

            <p className="com-skool-cta__note">
              Acceso libre para clientes activos • Actualización permanente sobre la LFT
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
