import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import './TerminosCitatoriosPage.css';

export default function TerminosCitatoriosPage() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!accepted) return;
    navigate('/tickets-de-diligencias-en-despacho-legal-solorzano');
  };

  return (
    <>
      <PageHero
        label="Legal"
        title="Términos para Citatorios ante el CCL"
        subtitle="Términos y condiciones aplicables a citatorios ante el Centro de Conciliación Laboral."
        breadcrumb="Términos Citatorios"
      />

      <section className="terminos-page">
        <div className="container">
          <div className="terminos-page__document">

            {/* Intro */}
            <div className="terminos-page__intro">
              <div className="terminos-page__intro-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h2>Términos y Condiciones</h2>
              <p>
                Términos para citatorios ante el Centro de Conciliación Laboral. Por favor lea
                detenidamente cada sección antes de continuar.
              </p>
            </div>

            {/* ─── Sección I ─── */}
            <div className="terminos-section">
              <div className="terminos-section__header">
                <span className="terminos-section__number">I</span>
                <h3 className="terminos-section__title">Cálculo de Finiquito o Indemnización</h3>
              </div>
              <div className="terminos-section__content">
                <p>
                  Todo cálculo de finiquito, liquidación o indemnización será elaborado con fundamento en la
                  Ley Federal del Trabajo vigente y tomando como base la información y documentación
                  proporcionada por el cliente.
                </p>
                <p>
                  Buffete Laboral SA de CV podrá solicitar documentación adicional cuando resulte necesaria
                  para validar:
                </p>
                <ul className="terminos-section__list">
                  <li>Antigüedad laboral</li>
                  <li>Salario diario integrado</li>
                  <li>Prestaciones</li>
                  <li>Incidencias</li>
                  <li>Bonos</li>
                  <li>Comisiones</li>
                  <li>O cualquier concepto relacionado con la relación laboral</li>
                </ul>

                <div className="terminos-section__important">
                  <span className="terminos-section__important-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Importante
                  </span>
                  <p>
                    Cuando el cálculo sea realizado directamente por el despacho, podrá generarse un costo
                    adicional dependiendo de: complejidad del asunto, revisión documental, volumen de
                    trabajadores, cálculo de prestaciones extraordinarias, o validaciones especiales requeridas.
                  </p>
                </div>

                <h4 className="terminos-section__subtitle">
                  Información requerida para elaboración del cálculo
                </h4>
                <p>
                  El cliente deberá enviar a su Ejecutivo de cuenta la siguiente información:
                </p>
                <ul className="terminos-section__list">
                  <li>Nombre completo del trabajador</li>
                  <li>Fecha de ingreso</li>
                  <li>Fecha de baja o terminación</li>
                  <li>Último salario diario y/o salario diario integrado</li>
                  <li>Puesto desempeñado</li>
                </ul>

                <h4 className="terminos-section__subtitle">Motivo de la terminación</h4>
                <ul className="terminos-section__list">
                  <li>Renuncia voluntaria</li>
                  <li>Mutuo acuerdo</li>
                  <li>Rescisión</li>
                  <li>Terminación sin responsabilidad</li>
                </ul>

                <h4 className="terminos-section__subtitle">Prestaciones y conceptos adicionales</h4>
                <ul className="terminos-section__list">
                  <li>Bono</li>
                  <li>Comisiones</li>
                  <li>Fondo de ahorro</li>
                  <li>Vales</li>
                  <li>Prima vacacional superior</li>
                  <li>Otros beneficios</li>
                </ul>

                <p>
                  La información proporcionada deberá ser veraz, completa y actualizada.
                </p>
              </div>
            </div>

            <div className="terminos-page__divider" />

            {/* ─── Sección II ─── */}
            <div className="terminos-section">
              <div className="terminos-section__header">
                <span className="terminos-section__number">II</span>
                <h3 className="terminos-section__title">Modalidad de Pago</h3>
              </div>
              <div className="terminos-section__content">
                <p>
                  El cliente deberá indicar previamente la modalidad mediante la cual realizará el pago
                  correspondiente al trabajador.
                </p>
                <p>Las modalidades disponibles son:</p>
                <ul className="terminos-section__list">
                  <li>Transferencia bancaria</li>
                  <li>Pago en efectivo</li>
                  <li>Cheque certificado</li>
                  <li>Cheque simple</li>
                </ul>
                <p>
                  La modalidad seleccionada deberá mantenerse durante el procedimiento salvo acuerdo
                  distinto entre las partes.
                </p>
              </div>
            </div>

            <div className="terminos-page__divider" />

            {/* ─── Sección III ─── */}
            <div className="terminos-section">
              <div className="terminos-section__header">
                <span className="terminos-section__number">III</span>
                <h3 className="terminos-section__title">Condiciones de Pago</h3>
              </div>
              <div className="terminos-section__content">
                <h4 className="terminos-section__subtitle">Transferencia bancaria</h4>
                <p>
                  El cliente deberá proporcionar comprobante de transferencia el mismo día en que se
                  realice el pago correspondiente.
                </p>

                <h4 className="terminos-section__subtitle">Pago en efectivo</h4>
                <p>
                  El efectivo deberá entregarse completo y previamente contabilizado antes de la
                  comparecencia o firma correspondiente.
                </p>

                <h4 className="terminos-section__subtitle">Cheque simple</h4>
                <p>
                  El cliente reconoce que el trabajador podrá rechazar el pago mediante cheque simple
                  dependiendo de las condiciones acordadas.
                </p>

                <h4 className="terminos-section__subtitle">Cheque certificado</h4>
                <p>
                  El cheque certificado deberá emitirse correctamente a nombre del trabajador y encontrarse
                  disponible al momento de la audiencia o ratificación.
                </p>

                <p>Buffete Laboral SA de CV no será responsable por:</p>
                <ul className="terminos-section__list">
                  <li>Fondos insuficientes</li>
                  <li>Errores bancarios</li>
                  <li>Retrasos</li>
                  <li>O incumplimientos atribuibles al cliente</li>
                </ul>
              </div>
            </div>

            <div className="terminos-page__divider" />

            {/* ─── Sección IV ─── */}
            <div className="terminos-section">
              <div className="terminos-section__header">
                <span className="terminos-section__number">IV</span>
                <h3 className="terminos-section__title">
                  Ratificación ante el Centro de Conciliación Laboral (CCL)
                </h3>
              </div>
              <div className="terminos-section__content">
                <p>
                  Cuando el convenio o terminación laboral requiera ratificación ante el Centro de
                  Conciliación Laboral (CCL), el cliente acepta las siguientes condiciones:
                </p>
                <ul className="terminos-section__list">
                  <li>El trabajador deberá comparecer voluntariamente.</li>
                  <li>El pago deberá encontrarse disponible al momento de la ratificación.</li>
                  <li>
                    La autoridad conciliadora podrá solicitar modificaciones al convenio o documentación
                    presentada.
                  </li>
                  <li>
                    En caso de inasistencia de cualquiera de las partes, podrá requerirse reprogramación.
                  </li>
                  <li>
                    El despacho actuará únicamente como acompañamiento y representación jurídica.
                  </li>
                </ul>

                <p>
                  En procedimientos ratificados ante el CCL, el despacho recomienda que el pago se realice
                  mediante:
                </p>
                <ul className="terminos-section__list">
                  <li>Transferencia bancaria</li>
                  <li>Cheque certificado</li>
                  <li>O efectivo previamente validado</li>
                </ul>

                <div className="terminos-section__important">
                  <span className="terminos-section__important-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Importante
                  </span>
                  <p>
                    La información falsa, incompleta o incorrecta proporcionada por el cliente podrá afectar:
                    cálculos, convenios, negociaciones, ratificaciones, o estrategias legales relacionadas con
                    el procedimiento.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Acceptance ─── */}
            <div className="terminos-page__acceptance">
              <p className="terminos-page__acceptance-note">
                El envío de información y documentación implica la aceptación de los presentes términos y
                condiciones.
              </p>

              <label className="terminos-page__checkbox-wrap" id="accept-terms-label">
                <input
                  type="checkbox"
                  className="terminos-page__checkbox-input"
                  id="accept-terms-checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span className="terminos-page__checkbox-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="terminos-page__checkbox-label">
                  He leído y acepto los términos y condiciones para citatorios ante el Centro de
                  Conciliación Laboral.
                </span>
              </label>

              <div className="terminos-page__submit-wrap">
                <button
                  className="terminos-page__submit"
                  id="continue-button"
                  disabled={!accepted}
                  onClick={handleContinue}
                >
                  Continuar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
