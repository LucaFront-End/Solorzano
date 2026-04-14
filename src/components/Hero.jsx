import { heroContent, siteConfig } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { useTypewriter } from '../hooks/useTypewriter';
import { Scale } from 'lucide-react';
import './Hero.css';

function StatItem({ stat }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  return (
    <div className="hero-stat" ref={ref}>
      <span className="hero-stat__number">
        {stat.prefix || ''}{count}{stat.suffix}
      </span>
      <span className="hero-stat__text">{stat.label}</span>
    </div>
  );
}

export default function Hero() {
  const { text } = useTypewriter(heroContent.typewriterWords, {
    typeSpeed: 110,
    deleteSpeed: 55,
    pauseDelay: 2600,
  });

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        {/* Left Column — Text */}
        <div className="hero__col-text">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Solórzano Cerezo y Asociados
          </div>

          <h1 className="hero__h1">
            <span className="hero__line">
              <span className="hero__word">Los Expertos</span>
            </span>
            <span className="hero__line">
              <span className="hero__word hero__word--2">en Derecho</span>
            </span>
            <span className="hero__line">
              <span className="hero__word hero__word--3">
                <span className="hero__typed">{text}</span>
                <span className="hero__cursor" />
              </span>
            </span>
          </h1>

          <p className="hero__p">{heroContent.subtitle}</p>

          <div className="hero__buttons">
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="hero__cta">
              {heroContent.ctaPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#servicios"
              className="hero__cta-secondary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {heroContent.ctaSecondary}
            </a>
          </div>

          {/* Stats inline */}
          <div className="hero__stats">
            {heroContent.stats.map((stat, i) => (
              <StatItem key={i} stat={stat} />
            ))}
          </div>
        </div>

        {/* Right Column — Image */}
        <div className="hero__col-image">
          <div className="hero__img-wrapper">
            <img
              src="/images/hero-photo.jpg"
              alt="Solórzano Cerezo y Asociados"
              className="hero__img"
            />
            <div className="hero__img-overlay" />
          </div>

          {/* Floating badge over image */}
          <div className="hero__float-card">
            <span className="hero__float-icon"><Scale size={22} strokeWidth={1.5} /></span>
            <div>
              <span className="hero__float-value">+20 años</span>
              <span className="hero__float-label">de experiencia legal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="hero__bottom-line" />
    </section>
  );
}
