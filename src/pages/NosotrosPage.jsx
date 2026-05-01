import { useEffect, useRef } from 'react';
import { aboutContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import LucideIcon from '../components/LucideIcon';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';
import { MapPin, Clock, Award, Heart, Shield, Eye } from 'lucide-react';
import './NosotrosPage.css';

function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  return (
    <div className="nos-stat" ref={ref}>
      <span className="nos-stat__value">{count}{stat.suffix}</span>
      <span className="nos-stat__label">{stat.label}</span>
    </div>
  );
}

const timeline = [
  { year: '2005', title: 'Fundación', desc: 'Nace Solórzano Cerezo y Asociados en Ciudad de México con la visión de transformar el derecho laboral preventivo.' },
  { year: '2010', title: 'Expansión Regional', desc: 'Ampliamos nuestra cobertura a Puebla y Estado de México, consolidando nuestra red de corresponsales.' },
  { year: '2015', title: '500+ Empresas', desc: 'Superamos las 500 empresas asesoradas. Incorporamos el área de Derecho Mercantil a nuestros servicios.' },
  { year: '2020', title: 'Transformación Digital', desc: 'Implementamos plataformas digitales para el seguimiento de casos en tiempo real y formularios en línea.' },
  { year: '2025', title: 'Comunidad SCA', desc: 'Lanzamos nuestra comunidad profesional en Skool para abogados y RH, democratizando el conocimiento laboral.' },
];

const values = [
  { Icon: Shield, title: 'Integridad', desc: 'Actuamos con honestidad y transparencia en cada caso y con cada cliente.' },
  { Icon: Eye, title: 'Prevención', desc: 'La mejor defensa es anticiparse. Nuestro enfoque siempre es preventivo.' },
  { Icon: Award, title: 'Excelencia', desc: 'Buscamos la máxima calidad en cada asesoría, documento y representación.' },
  { Icon: Heart, title: 'Compromiso', desc: 'Nos involucramos con tus objetivos como si fueran los nuestros.' },
];

export default function NosotrosPage() {
  const methRef = useScrollReveal();
  const timeRef = useScrollReveal();
  const valRef = useScrollReveal();
  const covRef = useScrollReveal();
  const timelineTrackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineTrackRef.current) return;
      const rect = timelineTrackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how much of the track has been scrolled past the middle of the screen
      const start = rect.top - (windowHeight / 2);
      const end = rect.bottom - (windowHeight / 2);
      const total = end - start;
      
      let progress = 0;
      if (start < 0) {
        progress = Math.min(100, Math.max(0, (-start / total) * 100));
      }
      
      timelineTrackRef.current.style.setProperty('--scroll-progress', `${progress}%`);
      
      // Add 'is-active' class to items as scroll reaches them
      const items = timelineTrackRef.current.querySelectorAll('.nos-timeline__item');
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.75) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <PageHero
        label="Conócenos"
        title="Nuestro Despacho"
        subtitle="Más de 20 años protegiendo empresas y construyendo relaciones laborales sanas en todo México."
        breadcrumb="Nosotros"
      />

      {/* ── Stats Bar ── */}
      <section className="nos-stats-bar">
        <div className="container nos-stats-bar__inner">
          {aboutContent.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="section nos-method" ref={methRef}>
        <div className="container">
          <div className="nos-method__header reveal">
            <span className="section-label">Metodología</span>
            <h2 className="section-title">Tres Ejes que Protegen tu Empresa</h2>
            <p className="section-subtitle">Nuestra metodología comprobada ha permitido a nuestros clientes optimizar procesos y evitar contingencias laborales costosas.</p>
          </div>

          <div className="nos-method__grid reveal">
            {aboutContent.pillars.map((p, i) => (
              <div className="nos-method__card" key={i}>
                <div className="nos-method__card-num">0{i + 1}</div>
                <div className="nos-method__card-icon">
                  <LucideIcon name={p.icon} size={32} strokeWidth={1.5} />
                </div>
                <h3 className="nos-method__card-title">{p.title}</h3>
                <p className="nos-method__card-desc">{p.desc}</p>
                <div className="nos-method__card-line" />
              </div>
            ))}
          </div>

          <blockquote className="nos-method__quote reveal">
            <span className="nos-method__quote-mark">"</span>
            {aboutContent.highlight}
          </blockquote>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section section--cream nos-timeline" ref={timeRef}>
        <div className="container">
          <div className="nos-timeline__header reveal">
            <span className="section-label">Trayectoria</span>
            <h2 className="section-title">Nuestra Historia</h2>
          </div>

          <div className="nos-timeline__track reveal" ref={timelineTrackRef}>
            {timeline.map((item, i) => (
              <div className="nos-timeline__item" key={i}>
                <div className="nos-timeline__dot" />
                <div className="nos-timeline__content">
                  <span className="nos-timeline__year">{item.year}</span>
                  <h4 className="nos-timeline__title">{item.title}</h4>
                  <p className="nos-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section nos-values" ref={valRef}>
        <div className="container">
          <div className="nos-values__header reveal">
            <span className="section-label">Nuestros Valores</span>
            <h2 className="section-title">Lo que nos Define</h2>
          </div>

          <div className="nos-values__grid reveal">
            {values.map((v, i) => (
              <div className="nos-values__card" key={i}>
                <div className="nos-values__card-icon">
                  <v.Icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="nos-values__card-title">{v.title}</h4>
                <p className="nos-values__card-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage ── */}
      <section className="section section--cream nos-coverage" ref={covRef}>
        <div className="container">
          <div className="nos-coverage__header reveal">
            <span className="section-label">Cobertura</span>
            <h2 className="section-title">Presencia a Nivel Nacional</h2>
            <p className="section-subtitle">Con nuestra red de corresponsales, atendemos diligencias en las principales entidades del país.</p>
          </div>

          <div className="nos-coverage__grid reveal">
            {siteConfig.cities.map((city, i) => (
              <div className="nos-coverage__city" key={i}>
                <MapPin size={18} strokeWidth={1.8} />
                <span>{city}</span>
              </div>
            ))}
          </div>

          <div className="nos-coverage__note reveal">
            <Clock size={16} strokeWidth={2} />
            <span>Servicios disponibles a nivel nacional a través de nuestra red de corresponsales</span>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
