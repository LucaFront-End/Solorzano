import { useState } from 'react';
import { mercantileContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import LucideIcon from './LucideIcon';
import './MercantileServices.css';

export default function MercantileServices() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useScrollReveal();
  const active = mercantileContent.items[activeIdx];

  return (
    <section className="section section--cream mercantile" id="mercantil" ref={sectionRef}>
      <div className="container">

        <div className="mercantile__header reveal">
          <span className="section-label">{mercantileContent.label}</span>
          <h2 className="section-title">{mercantileContent.title}</h2>
        </div>

        <div className="mercantile__layout reveal reveal-delay-1">

          {/* ── Left: Tab Navigation ── */}
          <nav className="mercantile__nav">
            {mercantileContent.items.map((item, i) => (
              <button
                key={i}
                className={`mercantile__tab ${i === activeIdx ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="mercantile__tab-num">0{i + 1}</span>
                <span className="mercantile__tab-icon"><LucideIcon name={item.icon} size={20} strokeWidth={1.5} /></span>
                <span className="mercantile__tab-label">{item.title}</span>
                <svg className="mercantile__tab-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </nav>

          {/* ── Right: Feature Panel ── */}
          <div className="mercantile__feature" key={activeIdx}>
            <div className="mercantile__feature-bg" />
            <div className="mercantile__feature-content">
              <div className="mercantile__feature-icon"><LucideIcon name={active.icon} size={36} strokeWidth={1.5} /></div>
              <div className="mercantile__feature-index">0{activeIdx + 1}</div>
              <h3 className="mercantile__feature-title">{active.title}</h3>
              <p className="mercantile__feature-desc">{active.description}</p>
              <div className="mercantile__feature-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{active.detail}</span>
              </div>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary mercantile__feature-cta"
              >
                Consultar Ahora
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
