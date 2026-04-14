import { useRef, useState } from 'react';
import { aboutContent } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import LucideIcon from './LucideIcon';
import './About.css';

function AboutStat({ stat }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  return (
    <div className="about-stat" ref={ref}>
      <span className="about-stat__value">{count}{stat.suffix}</span>
      <span className="about-stat__label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useScrollReveal();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <section className="section about" id="nosotros" ref={sectionRef}>
      <div className="about__bg-pattern" aria-hidden="true" />

      <div className="container">

        {/* ── Split: Left text + Right stats ── */}
        <div className="about__split reveal">
          <div className="about__text-col">
            <span className="section-label">{aboutContent.label}</span>
            <h2 className="section-title about__title">{aboutContent.title}</h2>
            <p className="about__desc">{aboutContent.description}</p>
            <blockquote className="about__quote">
              <span className="about__quote-mark">"</span>
              {aboutContent.highlight}
            </blockquote>
          </div>

          <div className="about__stats-col">
            <div className="about__stats-grid">
              {aboutContent.stats.map((stat, i) => (
                <div className="about__stat-card" key={i}>
                  <AboutStat stat={stat} />
                  <div className="about__stat-bar" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Pillars: Horizontal hover-reveal ── */}
        <div className="about__pillars reveal reveal-delay-2">
          {aboutContent.pillars.map((p, i) => (
            <div
              key={i}
              className={`about__pillar ${hoveredPillar === i ? 'is-hovered' : ''} ${hoveredPillar !== null && hoveredPillar !== i ? 'is-dimmed' : ''}`}
              onMouseEnter={() => setHoveredPillar(i)}
              onMouseLeave={() => setHoveredPillar(null)}
            >
              <div className="about__pillar-top">
                <div className="about__pillar-num">0{i + 1}</div>
                <div className="about__pillar-icon"><LucideIcon name={p.icon} size={28} strokeWidth={1.5} /></div>
              </div>
              <div className="about__pillar-body">
                <h4 className="about__pillar-title">{p.title}</h4>
                <p className="about__pillar-desc">{p.desc}</p>
              </div>
              <div className="about__pillar-line" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
