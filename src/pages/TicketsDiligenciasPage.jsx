import PageHero from '../components/PageHero';
import './TicketsDiligenciasPage.css';

const tickets = [
  {
    id: 'diligencias',
    title: 'Diligencia ante el Centro de Conciliación Laboral',
    description:
      'Solicita una diligencia de conciliación laboral en la Ciudad de México. Nuestro equipo te acompañará durante todo el proceso.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-diligencias-cdmx',
    image: '/img/conciliacion-laboral.png',
    badge: 'Más solicitado',
  },
  {
    id: 'desvinculaciones',
    title: 'Desvinculaciones Laborales',
    description:
      'Genera un ticket para solicitar una desvinculación laboral con el respaldo legal de nuestro despacho.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-desvinculaciones',
    image: '/img/desvinculacion-laboral.png',
    badge: null,
  },
  {
    id: 'finiquitos',
    title: 'Cálculo de Finiquitos',
    description:
      'Solicita el trámite y cálculo de finiquito para un trabajador con fundamento en la Ley Federal del Trabajo.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-finiquitos',
    image: '/img/calculo-finiquitos.png',
    badge: null,
  },
];

export default function TicketsDiligenciasPage() {
  return (
    <>
      <PageHero
        label="Tickets"
        title="Tickets de Diligencias"
        subtitle="Gestiona tus solicitudes de diligencias, desvinculaciones y finiquitos."
        breadcrumb="Tickets"
      />

      <section className="tickets-page">
        <div className="container">
          {/* Success Message */}
          <div className="tickets-page__success">
            <div className="tickets-page__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Tu formulario fue enviado correctamente</h2>
            <p>
              Si necesitas registrar otro asunto, puedes generar un nuevo ticket
              seleccionando una de las opciones disponibles.
            </p>
          </div>

          {/* Ticket Cards */}
          <div className="tickets-page__grid">
            {tickets.map((ticket) => (
              <article className="ticket-card" key={ticket.id}>
                {/* Image */}
                <div className="ticket-card__image-wrap">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="ticket-card__image"
                    loading="lazy"
                  />
                  <div className="ticket-card__image-overlay" />
                  {ticket.badge && (
                    <span className="ticket-card__badge">{ticket.badge}</span>
                  )}
                </div>

                {/* Content */}
                <div className="ticket-card__body">
                  <h3 className="ticket-card__title">{ticket.title}</h3>
                  <p className="ticket-card__desc">{ticket.description}</p>

                  <a
                    href={ticket.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ticket-card__cta"
                    id={`ticket-cta-${ticket.id}`}
                  >
                    <span>Comenzar Ahora</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
