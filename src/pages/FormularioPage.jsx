import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import './FormularioPage.css';

const formConfig = {
  'solicitud-de-diligencias': {
    title: 'Solicitud de Diligencias',
    subtitle: 'Completa el formulario para solicitar diligencias en la Ciudad de México.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-diligencias-cdmx',
    breadcrumb: 'Diligencias',
  },
  'solicitud-de-desvinculaciones': {
    title: 'Solicitud de Desvinculaciones',
    subtitle: 'Completa el formulario para solicitar una desvinculación laboral.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-desvinculaciones',
    breadcrumb: 'Desvinculaciones',
  },
  'solicitud-de-finiquitos': {
    title: 'Solicitud de Finiquitos',
    subtitle: 'Completa el formulario para solicitar el trámite de finiquito.',
    url: 'https://forms.legal.surf/solorzanocerezo/solicitud-de-finiquitos',
    breadcrumb: 'Finiquitos',
  },
};

export default function FormularioPage() {
  const { slug } = useParams();
  const config = formConfig[slug];

  if (!config) {
    return (
      <div className="form-page__not-found">
        <h2>Formulario no encontrado</h2>
        <p>El formulario que buscas no existe.</p>
      </div>
    );
  }

  return (
    <>
      <PageHero
        label="Solicitudes"
        title={config.title}
        subtitle={config.subtitle}
        breadcrumb={config.breadcrumb}
      />
      <section className="form-page">
        <div className="container">
          <div className="form-page__frame-wrap">
            <iframe
              src={config.url}
              title={config.title}
              className="form-page__iframe"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
