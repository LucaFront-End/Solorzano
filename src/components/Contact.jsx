import { useState } from 'react';
import { contactContent, siteConfig } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { wixClient } from '../lib/wixClient';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import './Contact.css';

const contactInfo = [
  { Icon: Phone, label: 'Teléfono', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { Icon: Mail, label: 'Correo', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { Icon: MapPin, label: 'Oficina', value: 'Ciudad de México', href: siteConfig.mapsLink, external: true },
];

export default function Contact() {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', servicio: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await wixClient.items.insert('FormulariosContacto', {
        ...formData,
        origen: 'home',
        fechaEnvio: new Date().toISOString(),
      });
      setSent(true);
      setFormData({ nombre: '', telefono: '', email: '', servicio: '', mensaje: '' });
    } catch (err) {
      console.error('[Contact] Wix CMS error:', err);
      setError('No se pudo enviar. Intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section section--navy contact" id="contacto" ref={sectionRef}>
      {/* Decorative blobs */}
      <div className="contact__blob contact__blob--1" aria-hidden="true" />
      <div className="contact__blob contact__blob--2" aria-hidden="true" />

      <div className="container">

        {/* ── Top CTA Banner ── */}
        <div className="contact__banner reveal">
          <div className="contact__banner-text">
            <span className="section-label" style={{ color: 'var(--color-accent)' }}>Contacto</span>
            <h2 className="contact__title">{contactContent.title}</h2>
            <p className="contact__subtitle">{contactContent.subtitle}</p>
          </div>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__whatsapp-cta"
          >
            <MessageCircle size={22} strokeWidth={1.8} />
            <span>
              <span className="contact__whatsapp-label">Asesoría Gratuita</span>
              <span className="contact__whatsapp-sub">Respuesta en menos de 1 hora</span>
            </span>
          </a>
        </div>

        {/* ── Two Column Grid ── */}
        <div className="contact__grid">

          {/* Left: Info + Cards */}
          <div className="contact__left reveal">
            <div className="contact__info-cards">
              {contactInfo.map(({ Icon, label, value, href, external }, i) => (
                <a
                  key={i}
                  href={href}
                  className="contact__info-card"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div className="contact__info-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="contact__info-label">{label}</span>
                    <span className="contact__info-value">{value}</span>
                  </div>
                  <svg className="contact__info-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="contact__trust">
              <div className="contact__trust-item">
                <CheckCircle2 size={16} strokeWidth={2} />
                Primera asesoría gratuita
              </div>
              <div className="contact__trust-item">
                <CheckCircle2 size={16} strokeWidth={2} />
                Sin compromiso
              </div>
              <div className="contact__trust-item">
                <CheckCircle2 size={16} strokeWidth={2} />
                +20 años de experiencia
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form className="contact__form reveal reveal-delay-1" onSubmit={handleSubmit}>
            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <CheckCircle2 size={48} strokeWidth={1.5} />
                </div>
                <h3>¡Mensaje enviado!</h3>
                <p>Nuestro equipo se pondrá en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <div className="contact__form-header">
                  <h3>Envíanos un mensaje</h3>
                  <p>Respuesta garantizada en menos de 24 horas hábiles</p>
                </div>

                <div className="contact__form-row">
                  <label className="contact__field">
                    <span>Nombre *</span>
                    <input name="nombre" type="text" placeholder="Tu nombre" className="contact__input" value={formData.nombre} onChange={handleChange} required />
                  </label>
                  <label className="contact__field">
                    <span>Teléfono</span>
                    <input name="telefono" type="tel" placeholder="55 0000 0000" className="contact__input" value={formData.telefono} onChange={handleChange} />
                  </label>
                </div>

                <label className="contact__field">
                  <span>Correo electrónico *</span>
                  <input name="email" type="email" placeholder="correo@empresa.com" className="contact__input" value={formData.email} onChange={handleChange} required />
                </label>

                <label className="contact__field">
                  <span>Servicio de interés</span>
                  <select name="servicio" className="contact__input contact__select" value={formData.servicio} onChange={handleChange}>
                    <option value="">Selecciona un servicio</option>
                    {contactContent.services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>

                <label className="contact__field">
                  <span>Tu mensaje</span>
                  <textarea name="mensaje" placeholder="Cuéntanos tu situación..." className="contact__input contact__textarea" value={formData.mensaje} onChange={handleChange} rows={4} />
                </label>

                <button type="submit" className="contact__submit" disabled={sending}>
                  {sending ? (
                    <><Loader2 size={18} className="spin" /> <span>Enviando...</span></>
                  ) : (
                    <><span>Enviar Mensaje</span> <Send size={18} strokeWidth={2} /></>
                  )}
                </button>
                {error && <p style={{ color: 'var(--color-error)', fontSize: '0.9rem', marginTop: 8 }}>{error}</p>}
              </>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
