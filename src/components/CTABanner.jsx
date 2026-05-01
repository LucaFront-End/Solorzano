import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './CTABanner.css';

export default function CTABanner({
  title = '¿Listo para proteger tu empresa?',
  subtitle = 'Primera asesoría gratuita y sin compromiso. Nuestro equipo está listo para ayudarte.',
  showContactLink = true,
}) {
  const ref = useScrollReveal();

  return (
    <section className="cta-banner" ref={ref}>
      {/* Decorative orbs */}
      <div className="cta-banner__orb cta-banner__orb--1" aria-hidden="true" />
      <div className="cta-banner__orb cta-banner__orb--2" aria-hidden="true" />
      <div className="cta-banner__grid-lines" aria-hidden="true" />

      <div className="container">
        <div className="cta-banner__inner reveal">
          <div className="cta-banner__badge">
            <Sparkles size={14} strokeWidth={2} />
            Asesoría Gratuita
          </div>

          <h2 className="cta-banner__title">{title}</h2>
          <p className="cta-banner__subtitle">{subtitle}</p>

          <div className="cta-banner__actions">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-banner__btn cta-banner__btn--whatsapp"
            >
              <MessageCircle size={20} strokeWidth={2} />
              Escríbenos por WhatsApp
            </a>
            {showContactLink && (
              <Link to="/contacto" className="cta-banner__btn cta-banner__btn--outline">
                Enviar Mensaje
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            )}
          </div>

          <p className="cta-banner__note">
            Respuesta en menos de 1 hora • Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
