import { useState } from 'react';
import { siteConfig, contactContent } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { wixClient } from '../lib/wixClient';
import PageHero from '../components/PageHero';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import './ContactoPage.css';

const contactCards = [
  { Icon: Phone, label: 'Teléfono', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { Icon: Mail, label: 'Correo', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { Icon: MapPin, label: 'Oficina', value: siteConfig.address, href: siteConfig.mapsLink, external: true },
  { Icon: Clock, label: 'Horario', value: 'Lun - Vie: 9:00 - 18:00', href: null },
];

const faqItems = [
  { q: '¿La primera asesoría tiene costo?', a: 'No. La primera consulta es completamente gratuita y sin compromiso. Evaluaremos tu caso y te daremos una orientación clara sobre los pasos a seguir.' },
  { q: '¿Atienden fuera de la Ciudad de México?', a: 'Sí. Contamos con una red de corresponsales que nos permite atender diligencias en toda la República Mexicana, incluyendo Puebla, Querétaro, Morelos, Estado de México y más.' },
  { q: '¿Cuánto tiempo tarda la resolución de un caso?', a: 'Depende del tipo de caso. Una negociación extrajudicial puede resolverse en semanas, mientras que un juicio laboral puede tomar varios meses. En la consulta inicial te daremos un estimado realista.' },
  { q: '¿Manejan tanto derecho laboral como mercantil?', a: 'Sí. Nuestro despacho cuenta con especialistas en ambas áreas: derecho laboral (individual y colectivo) y derecho mercantil (corporativo, contractual y litigioso).' },
  { q: '¿Qué documentos necesito para mi consulta?', a: 'Para la primera consulta no es necesario ningún documento. Si decides contratarnos, te indicaremos qué documentación necesitamos según tu caso específico.' },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ctc-faq__item ${open ? 'is-open' : ''}`}>
      <button className="ctc-faq__question" onClick={() => setOpen(!open)}>
        <span>{item.q}</span>
        <ChevronDown size={18} strokeWidth={2} className="ctc-faq__chevron" />
      </button>
      <div className="ctc-faq__answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  const formRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const [formData, setFormData] = useState({ nombre: '', empresa: '', puesto: '', telefono: '', email: '', servicio: '', mensaje: '' });
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
        origen: 'contacto',
        fechaEnvio: new Date().toISOString(),
      });
      setSent(true);
      setFormData({ nombre: '', empresa: '', puesto: '', telefono: '', email: '', servicio: '', mensaje: '' });
    } catch (err) {
      console.error('[ContactoPage] Wix CMS error:', err);
      setError('No se pudo enviar. Intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        label="Hablemos"
        title="Contáctanos"
        subtitle="Primera asesoría gratuita y sin compromiso. Estamos listos para ayudarte."
        breadcrumb="Contacto"
      />

      {/* ── Contact Info Cards ── */}
      <section className="ctc-info">
        <div className="container">
          <div className="ctc-info__grid">
            {contactCards.map(({ Icon, label, value, href, external }, i) => {
              const Tag = href ? 'a' : 'div';
              const props = href ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {};
              return (
                <Tag key={i} className="ctc-info__card" {...props}>
                  <div className="ctc-info__icon"><Icon size={22} strokeWidth={1.8} /></div>
                  <div>
                    <span className="ctc-info__label">{label}</span>
                    <span className="ctc-info__value">{value}</span>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + WhatsApp ── */}
      <section className="section ctc-form-section" ref={formRef}>
        <div className="container">
          <div className="ctc-form-grid">
            {/* Form */}
            <form className="ctc-form reveal" onSubmit={handleSubmit}>
              {sent ? (
                <div className="ctc-form__success">
                  <CheckCircle2 size={48} strokeWidth={1.5} />
                  <h3>¡Mensaje enviado!</h3>
                  <p>Nuestro equipo se pondrá en contacto contigo muy pronto.</p>
                </div>
              ) : (
                <>
                  <div className="ctc-form__header">
                    <h2>Envíanos un mensaje</h2>
                    <p>Respuesta garantizada en menos de 24 horas hábiles</p>
                  </div>
                  <div className="ctc-form__row">
                    <label className="ctc-field">
                      <span>Nombre completo *</span>
                      <input name="nombre" type="text" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required />
                    </label>
                    <label className="ctc-field">
                      <span>Empresa</span>
                      <input name="empresa" type="text" placeholder="Nombre de tu empresa" value={formData.empresa} onChange={handleChange} />
                    </label>
                  </div>
                  <div className="ctc-form__row">
                    <label className="ctc-field">
                      <span>Puesto</span>
                      <input name="puesto" type="text" placeholder="Tu cargo" value={formData.puesto} onChange={handleChange} />
                    </label>
                    <label className="ctc-field">
                      <span>Teléfono</span>
                      <input name="telefono" type="tel" placeholder="55 0000 0000" value={formData.telefono} onChange={handleChange} />
                    </label>
                  </div>
                  <label className="ctc-field">
                    <span>Correo electrónico *</span>
                    <input name="email" type="email" placeholder="correo@empresa.com" value={formData.email} onChange={handleChange} required />
                  </label>
                  <label className="ctc-field">
                    <span>Servicio de interés</span>
                    <select name="servicio" value={formData.servicio} onChange={handleChange}>
                      <option value="">Selecciona un servicio</option>
                      {contactContent.services.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </label>
                  <label className="ctc-field">
                    <span>Tu mensaje</span>
                    <textarea name="mensaje" placeholder="Cuéntanos tu situación..." value={formData.mensaje} onChange={handleChange} rows={5} />
                  </label>
                  <button type="submit" className="ctc-form__submit" disabled={sending}>
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

            {/* Sidebar */}
            <div className="ctc-sidebar reveal">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="ctc-wa-card">
                <div className="ctc-wa-card__icon"><MessageCircle size={28} strokeWidth={1.8} /></div>
                <h3 className="ctc-wa-card__title">¿Prefieres WhatsApp?</h3>
                <p className="ctc-wa-card__desc">Escríbenos directamente y recibe respuesta en menos de 1 hora durante horario laboral.</p>
                <span className="ctc-wa-card__btn">Abrir WhatsApp →</span>
              </a>

              <div className="ctc-trust">
                <h4>¿Por qué elegirnos?</h4>
                {['Primera asesoría gratuita', 'Sin compromiso', '+20 años de experiencia', 'Cobertura nacional', '+500 empresas asesoradas'].map((t, i) => (
                  <div className="ctc-trust__item" key={i}>
                    <CheckCircle2 size={16} strokeWidth={2} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="ctc-map">
        <iframe
          title="Ubicación Solórzano Cerezo y Asociados"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.115!2d-99.18!3d19.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Gral.+Juan+Cano+87!5e0!3m2!1ses!2smx!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ── FAQ ── */}
      <section className="section ctc-faq" ref={faqRef}>
        <div className="container">
          <div className="ctc-faq__header reveal">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Preguntas Frecuentes</h2>
          </div>
          <div className="ctc-faq__list reveal">
            {faqItems.map((item, i) => (<FAQItem key={i} item={item} />))}
          </div>
        </div>
      </section>
    </>
  );
}
