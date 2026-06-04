import PageHero from '../components/PageHero';
import './TicketsDiligenciasPage.css';

const tickets = [
  {
    id: 'diligencias',
    title: 'Diligencia ante el Centro de Conciliación Laboral',
    description:
      'Solicita una diligencia de conciliación laboral en la Ciudad de México.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-diligencias-cdmx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'desvinculaciones',
    title: 'Desvinculaciones Laborales',
    description:
      'Genera un ticket para solicitar una desvinculación laboral.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-desvinculaciones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="18" y1="8" x2="23" y2="13" />
        <line x1="23" y1="8" x2="18" y2="13" />
      </svg>
    ),
  },
  {
    id: 'finiquitos',
    title: 'Cálculo de Finiquitos',
    description:
      'Solicita el trámite y cálculo de finiquito para un trabajador.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-finiquitos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
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
              <div className="tickets-page__card" key={ticket.id}>
                <div className="tickets-page__card-icon">{ticket.icon}</div>
                <h3 className="tickets-page__card-title">{ticket.title}</h3>
                <p className="tickets-page__card-desc">{ticket.description}</p>
                <a
                  href={ticket.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tickets-page__card-cta"
                  id={`ticket-cta-${ticket.id}`}
                >
                  Comenzar Ahora
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
