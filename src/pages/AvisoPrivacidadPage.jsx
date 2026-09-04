import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { siteConfig } from '../data/content';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Mail, 
  Phone, 
  Globe, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Calendar, 
  Printer, 
  CheckCircle2 
} from 'lucide-react';
import './AvisoPrivacidadPage.css';

export default function AvisoPrivacidadPage() {
  useEffect(() => {
    document.title = `Aviso de Privacidad | ${siteConfig.name}`;
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageHero
        label="Marco Legal & Transparencia"
        title="Aviso de Privacidad"
        subtitle="En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
        breadcrumb="Aviso de Privacidad"
      />

      <section className="privacidad-page">
        <div className="container">
          <div className="privacidad-doc">

            {/* Header Documento */}
            <header className="privacidad-doc__header">
              <div className="privacidad-doc__badge">
                <ShieldCheck size={18} strokeWidth={2} />
                <span>Documento Oficial Vigente</span>
              </div>
              <h1 className="privacidad-doc__title">Aviso de Privacidad Integral</h1>
              <p className="privacidad-doc__subtitle">
                <strong>BUFETE LABORAL VTSC, S.C.</strong> (nombre comercial <strong>Solórzano Cerezo y Asociados</strong>)
              </p>
              <div className="privacidad-doc__meta">
                <span className="privacidad-doc__meta-item">
                  <Calendar size={15} />
                  <span>Última actualización: Febrero 2026</span>
                </span>
                <button 
                  type="button" 
                  onClick={handlePrint} 
                  className="privacidad-doc__print-btn"
                  title="Imprimir o guardar como PDF"
                >
                  <Printer size={15} />
                  <span>Imprimir / Guardar PDF</span>
                </button>
              </div>
            </header>

            {/* Contact Box ARCO Highlight */}
            <div className="privacidad-highlight-box">
              <div className="privacidad-highlight-box__icon">
                <UserCheck size={26} strokeWidth={1.8} />
              </div>
              <div className="privacidad-highlight-box__content">
                <h3>Contacto del Departamento de Privacidad (Derechos ARCO)</h3>
                <p>
                  Para ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO), o revocar su consentimiento, comuníquese con el <strong>C. Iztamná Kin Cruz Oropeza</strong>:
                </p>
                <div className="privacidad-highlight-box__grid">
                  <a href="mailto:notificaciones@dsc.mx" className="privacidad-contact-chip">
                    <Mail size={15} />
                    <span>notificaciones@dsc.mx</span>
                  </a>
                  <a href="tel:5525370252" className="privacidad-contact-chip">
                    <Phone size={15} />
                    <span>55 2537 0252</span>
                  </a>
                  <a href="https://www.dsc.mx/" target="_blank" rel="noopener noreferrer" className="privacidad-contact-chip">
                    <Globe size={15} />
                    <span>https://www.dsc.mx/</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Secciones del Documento */}
            <div className="privacidad-body">

              {/* 1. Identidad y Domicilio */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">01</span>
                  <h2>Identidad y Domicilio del Responsable</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    Los datos personales proporcionados por usted serán utilizados por <strong>BUFETE LABORAL VTSC, S.C.</strong> (nombre comercial <strong>Solórzano Cerezo y Asociados</strong>) con domicilio en <strong>Calle General Juan Cano, No. 87, interior 100, Colonia San Miguel Chapultepec II Sección, Alcaldía Miguel Hidalgo, C.P. 11850, Ciudad de México</strong>, en lo sucesivo <strong>SCA</strong>.
                  </p>
                </div>
              </section>

              {/* 2. Fundamento Legal */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">02</span>
                  <h2>Fundamento Legal</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    En cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> (21 de marzo de 2025), se emite el presente aviso de privacidad, el cual tiene por objeto informarle sobre el tratamiento que se dará a sus datos personales y los mecanismos para ejercer sus derechos.
                  </p>
                </div>
              </section>

              {/* 3. Formas de Contacto */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">03</span>
                  <h2>Formas de Contacto</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    Para el caso de que usted quiera ejercer sus derechos de acceso, rectificación, cancelación u oposición, denominados derechos <strong>“ARCO”</strong> puede contactar al encargado del Departamento de Privacidad el <strong>C. Iztamná Kin Cruz Oropeza</strong>, en cualquiera de las formas siguientes:
                  </p>
                  <ul className="privacidad-list">
                    <li><strong>Página web:</strong> <a href="https://www.dsc.mx/" target="_blank" rel="noopener noreferrer">https://www.dsc.mx/</a></li>
                    <li><strong>Teléfono:</strong> <a href="tel:5525370252">55 2537 0252</a></li>
                    <li><strong>Correo electrónico:</strong> <a href="mailto:notificaciones@dsc.mx">notificaciones@dsc.mx</a></li>
                  </ul>
                </div>
              </section>

              {/* 4. Datos Personales Sometidos a Tratamiento */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">04</span>
                  <h2>Datos Personales Sometidos a Tratamiento</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    Para el cumplimiento de las finalidades descritas en el presente Aviso de Privacidad, SCA, en su carácter de despacho jurídico y prestador de servicios legales profesionales, podrá recabar y tratar datos personales de sus clientes, prospectos de clientes, representantes legales, apoderados, personas de contacto y, en su caso, contrapartes relacionadas con los asuntos encomendados.
                  </p>
                  <p>
                    De manera enunciativa más no limitativa, los datos personales que podrán ser tratados comprenden:
                  </p>
                  <div className="privacidad-tags-grid">
                    <span className="privacidad-tag">Nombre completo</span>
                    <span className="privacidad-tag">Denominación o razón social</span>
                    <span className="privacidad-tag">Domicilio fiscal y/o comercial</span>
                    <span className="privacidad-tag">RFC (Registro Federal de Contribuyentes)</span>
                    <span className="privacidad-tag">CURP (Clave Única de Registro de Población)</span>
                    <span className="privacidad-tag">Acta constitutiva y documentos corporativos</span>
                    <span className="privacidad-tag">Identificación oficial de representante o apoderado</span>
                    <span className="privacidad-tag">Comprobante de domicilio</span>
                    <span className="privacidad-tag">Correo electrónico</span>
                    <span className="privacidad-tag">Números telefónicos</span>
                    <span className="privacidad-tag">Constancia de Situación Fiscal (CSF)</span>
                    <span className="privacidad-tag">Información bancaria</span>
                    <span className="privacidad-tag">Documentación contractual</span>
                    <span className="privacidad-tag">Poderes notariales</span>
                  </div>
                  <p className="privacidad-note">
                    Así como cualquier otro dato estrictamente necesario para establecer, documentar, formalizar, ejecutar y administrar la relación jurídica, comercial o de representación legal correspondiente.
                  </p>
                </div>
              </section>

              {/* 5. Finalidades Necesarias */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">05</span>
                  <h2>Finalidades Necesarias</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    SCA tratará sus datos personales para llevar a cabo las siguientes finalidades necesarias:
                  </p>
                  <ul className="privacidad-checklist">
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Integrar, administrar y conservar un expediente físico y/o electrónico del cliente, conforme a las obligaciones profesionales y legales del despacho;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Recabar, analizar y validar información para la elaboración, revisión, formalización y firma de contratos, convenios, dictámenes, escritos legales y demás documentos jurídicos;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Verificar la identidad, personalidad jurídica y capacidad legal del cliente, sus representantes o apoderados;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Consultar y utilizar información fiscal y contable para la emisión de facturación y comprobantes fiscales;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Establecer y mantener canales de comunicación para la atención de consultas, requerimientos, aclaraciones, reclamaciones o seguimiento de asuntos legales;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Prestar servicios de asesoría, consultoría y representación legal ante autoridades judiciales, laborales o administrativas;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Administrar, cuando resulte necesario, procedimientos de cobranza judicial o extrajudicial derivados de la relación contractual;</span>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="privacidad-check-icon" />
                      <span>Conservar evidencia documental y probatoria de la relación jurídica, incluyendo contratos, comunicaciones, escritos, promociones, resoluciones, notificaciones y registros operativos, para efectos legales, fiscales y de responsabilidad profesional.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Finalidades Voluntarias */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">06</span>
                  <h2>Finalidades Voluntarias</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    Sus datos personales también podrán ser tratados para las siguientes finalidades voluntarias, las cuales no son necesarias para la existencia o cumplimiento de la relación contractual con SCA, pero que nos permiten mejorar nuestros procesos, fortalecer la atención y mantener contacto a futuro:
                  </p>
                  <ul className="privacidad-list">
                    <li>Conservar su información en nuestras bases de datos para futuras oportunidades de colaboración profesional o comercial;</li>
                    <li>Enviarle información relativa a actualizaciones de servicios legales, boletines informativos, contenidos de interés jurídico, eventos, conferencias, seminarios, capacitaciones o beneficios relacionados con la actividad del despacho;</li>
                    <li>Realizar encuestas de satisfacción, evaluaciones de calidad del servicio, análisis internos y procesos de mejora continua, con la finalidad de optimizar la atención y los servicios prestados;</li>
                    <li>Contactarlo para invitaciones a eventos institucionales, programas de beneficios exclusivos o actividades organizadas por el despacho.</li>
                  </ul>
                </div>
              </section>

              {/* 7. Transferencias */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">07</span>
                  <h2>Transferencias</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    SCA, para cumplir con las finalidades necesarias anteriormente descritas, así como aquellas derivadas de disposiciones legales o de requerimientos de autoridades competentes, podrá transferir sus datos personales únicamente en los casos legalmente permitidos.
                  </p>
                  <p>
                    Dichas transferencias se realizarán sin requerir el consentimiento del titular, cuando tengan lugar entre entidades relacionadas que comparten procesos administrativos y operativos, garantizando en todo momento un nivel de protección equivalente al previsto en el presente Aviso de Privacidad.
                  </p>
                </div>
              </section>

              {/* 8. Derechos ARCO */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">08</span>
                  <h2>Derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) y/o Revocación del Consentimiento</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    El titular podrá ejercer en cualquier momento los derechos de acceso, rectificación, cancelación u oposición (en lo sucesivo, <strong>"derechos ARCO"</strong>), así como revocar su consentimiento para el tratamiento de sus datos personales, enviando una solicitud al correo electrónico del Responsable de Privacidad indicado en este aviso (<a href="mailto:notificaciones@dsc.mx">notificaciones@dsc.mx</a>).
                  </p>
                  <p>
                    Para ello, su solicitud deberá contener al menos los siguientes elementos:
                  </p>
                  <ul className="privacidad-list">
                    <li>Nombre completo del titular, firma autógrafa y un domicilio u otro medio para recibir la respuesta;</li>
                    <li>Copia de documento oficial que acredite su identidad o, en su caso, la representación legal;</li>
                    <li>Descripción clara y precisa de los datos personales respecto de los cuales desea ejercer alguno de los derechos ARCO;</li>
                    <li>Cualquier elemento adicional que facilite la localización de sus datos personales.</li>
                  </ul>
                  <div className="privacidad-callout">
                    <p>
                      <strong>Procedimiento de cancelación:</strong> La cancelación se llevará a cabo mediante el bloqueo de los datos personales, de conformidad con la legislación aplicable, a efecto de que éstos queden debidamente resguardados y únicamente disponibles para el cumplimiento de obligaciones legales, contractuales, fiscales o administrativas que resulten exigibles. Las solicitudes de cancelación serán atendidas dentro de los plazos previstos en la normativa aplicable.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Consentimiento y Excepciones */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">09</span>
                  <h2>Consentimiento y Excepciones</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    SCA tratará sus datos personales conforme a los principios establecidos en la legislación aplicable, sin que sea necesario recabar el consentimiento del titular cuando dicho tratamiento se encuentre previsto en una norma jurídica que faculte expresamente su uso, derive de una resolución o mandato fundado y motivado emitido por autoridad judicial o administrativa competente, o resulte indispensable para el cumplimiento de obligaciones contractuales entre el titular y el responsable, así como por razones de seguridad o interés público debidamente justificadas.
                  </p>
                </div>
              </section>

              {/* 10. Cookies, Web Beacons */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">10</span>
                  <h2>Cookies y Web Beacons</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    En el sitio web de SCA se utilizan cookies y tecnologías similares con la finalidad de mejorar la experiencia de navegación, facilitar el acceso a contenidos y realizar análisis estadísticos sobre el uso de la plataforma.
                  </p>
                  <p>
                    Dichas tecnologías pueden ser:
                  </p>
                  <ul className="privacidad-list">
                    <li><strong>Funcionales:</strong> Necesarias para el funcionamiento básico del sitio;</li>
                    <li><strong>De análisis o rendimiento:</strong> Para evaluar patrones de navegación y mejorar nuestros servicios; y,</li>
                    <li><strong>Publicitarias (en su caso):</strong> Para mostrar contenido o comunicaciones relevantes.</li>
                  </ul>
                  <p>
                    El usuario podrá configurar su navegador para rechazar o eliminar las cookies, aunque ello podría limitar el correcto funcionamiento de algunas secciones del sitio.
                  </p>
                </div>
              </section>

              {/* 11. Cambios al Aviso de Privacidad */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">11</span>
                  <h2>Cambios al Aviso de Privacidad</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    SCA se reserva el derecho de modificar, actualizar o complementar el presente Aviso de Privacidad en cualquier momento, ya sea para cumplir con cambios en la legislación aplicable, atender nuevas disposiciones emitidas por autoridades competentes, o para ajustarse a modificaciones en sus políticas internas relacionadas con la protección de datos personales.
                  </p>
                  <p>
                    El aviso de privacidad vigente estará disponible en todo momento para su consulta a través de los canales oficiales establecidos por SCA, incluyendo su sitio web (<a href="https://www.dsc.mx/">https://www.dsc.mx/</a>) y medios de atención al cliente.
                  </p>
                </div>
              </section>

              {/* 12. Plazo de Conservación */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">12</span>
                  <h2>Plazo de Conservación de los Datos Personales</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    Los datos personales recabados serán conservados únicamente durante el tiempo que resulte estrictamente necesario para cumplir con las finalidades descritas en el presente, y conforme a los plazos establecidos por la legislación fiscal, mercantil, laboral y cualquier otra disposición jurídica aplicable.
                  </p>
                </div>
              </section>

              {/* 13. Medidas de Seguridad */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">13</span>
                  <h2>Medidas de Seguridad para la Protección de los Datos Personales</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    SCA ha implementado medidas de seguridad de carácter físico, técnico y administrativo, diseñadas para proteger los datos personales contra daño, pérdida, alteración, destrucción, uso indebido, acceso o tratamiento no autorizado, en cumplimiento con la legislación vigente en materia de protección de datos personales.
                  </p>
                </div>
              </section>

              {/* 14. Procedimiento en Caso de Vulneración de Seguridad */}
              <section className="privacidad-section">
                <div className="privacidad-section__head">
                  <span className="privacidad-section__num">14</span>
                  <h2>Procedimiento en Caso de Vulneración de Seguridad</h2>
                </div>
                <div className="privacidad-section__body">
                  <p>
                    En caso de una vulneración de seguridad que comprometa datos personales, SCA activará su protocolo interno de respuesta a incidentes, adoptando medidas inmediatas de investigación, contención y mitigación, así como la notificación a los titulares afectados y a las autoridades competentes, cuando así resulte procedente conforme a la legislación aplicable, documentando las acciones correctivas implementadas para restablecer la seguridad de la información.
                  </p>
                </div>
              </section>

            </div>

            {/* Footer Documento */}
            <footer className="privacidad-doc__footer">
              <div className="privacidad-doc__footer-stamp">
                <ShieldCheck size={28} className="privacidad-stamp-icon" />
                <div>
                  <strong>Solórzano Cerezo y Asociados (SCA)</strong>
                  <span>Bufete Laboral VTSC, S.C. • Febrero 2026</span>
                </div>
              </div>
              <div className="privacidad-doc__footer-actions">
                <Link to="/contacto" className="btn btn--primary btn--sm">
                  Contactar al Despacho
                </Link>
              </div>
            </footer>

          </div>
        </div>
      </section>
    </>
  );
}
