import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, FileText, Users, ArrowUpRight } from 'lucide-react';
import './Community.css';

const features = [
  {
    Icon: BookOpen,
    title: 'Cursos Especializados',
    desc: 'Formación continua en derecho laboral actualizado, con contenido práctico para tu ejercicio profesional.',
  },
  {
    Icon: FileText,
    title: 'Formatos y Plantillas',
    desc: 'Documentos listos para usar: contratos, avisos, actas y más. Ahorra tiempo en tu día a día.',
  },
  {
    Icon: Users,
    title: 'Networking Profesional',
    desc: 'Conecta con abogados y profesionales de RH de todo México. Comparte experiencias y crece.',
  },
];

const SKOOL_URL = 'https://www.skool.com/relaciones-laborares-con-sca/about';

export default function Community() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section--navy community" id="comunidad" ref={sectionRef}>
      <div className="community__bg" aria-hidden="true" />
      <div className="community__particles" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="community__particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="container community__container">

        <div className="community__header reveal">
          <div className="community__badge">
            <Users size={16} strokeWidth={2} />
            Para Abogados y RH
          </div>
          <h2 className="community__title">
            Únete a Nuestra <span className="text-accent">Comunidad</span> de Profesionales
          </h2>
          <p className="community__subtitle">
            Accede a cursos, formatos descargables y contenido exclusivo sobre relaciones laborales.
            Publicamos constantemente para mantenerte al día.
          </p>
        </div>

        <div className="community__grid reveal">
          {features.map((feat, i) => (
            <div className="community__card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="community__card-icon">
                <feat.Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="community__card-title">{feat.title}</h3>
              <p className="community__card-desc">{feat.desc}</p>
              <div className="community__card-glow" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="community__cta-wrap reveal">
          <a
            href={SKOOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="community__cta"
          >
            <span className="community__cta-text">
              <span className="community__cta-label">Explorar la Comunidad</span>
              <span className="community__cta-sub">Relaciones Laborales con SCA en Skool</span>
            </span>
            <ArrowUpRight size={22} strokeWidth={2} />
          </a>
          <p className="community__cta-note">
            Contenido actualizado constantemente • Acceso inmediato
          </p>
        </div>

      </div>
    </section>
  );
}
