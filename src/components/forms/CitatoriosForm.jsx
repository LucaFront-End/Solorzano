import MultiStepForm from './MultiStepForm';
import { entidadesFederativas } from '../../data/content';

const steps = [
  {
    title: 'Proporciónanos tu nombre',
    subtitle: 'Datos de contacto del solicitante',
    fields: [
      { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre completo', required: true },
    ],
  },
  {
    title: '¿Cuál es tu correo electrónico?',
    subtitle: 'Dinos a qué correo electrónico quieres que se envíe respuesta',
    fields: [
      { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'ejemplo@ejemplo.com', required: true },
    ],
  },
  {
    title: 'Nombre de la empresa o persona que representaremos',
    fields: [
      { name: 'empresa', label: 'Empresa / Patrón / Persona', type: 'text', required: true },
    ],
  },
  {
    title: '¿En qué Entidad Federativa se atenderá el citatorio?',
    fields: [
      { name: 'entidad', label: 'Entidad Federativa', type: 'select', options: entidadesFederativas, required: true },
    ],
  },
  {
    title: 'Adjunta el citatorio o documento notificado',
    subtitle: 'Esto nos ayudará a saber en qué ciudad fue solicitado',
    fields: [
      { name: 'archivo', label: 'Archivo del citatorio', type: 'file' },
    ],
  },
  {
    title: 'Nombre de la persona que solicita el citatorio',
    fields: [
      { name: 'solicitante', label: 'Nombre del solicitante', type: 'text', required: true },
    ],
  },
  {
    title: 'Fecha y hora de audiencia del citatorio',
    subtitle: 'Esto nos ayudará a agilizar gestiones de agenda',
    fields: [
      { name: 'fechaAudiencia', label: 'Fecha y hora', type: 'datetime', required: false },
    ],
  },
  {
    title: '¿Conoces a la persona que solicita el citatorio?',
    fields: [
      { name: 'conoceSolicitante', label: '', type: 'radio', options: ['Sí', 'No', 'Sí lo conozco, pero no es mi empleado'], required: true },
    ],
  },
  {
    title: '¿Te gustaría que intentáramos resolver el asunto desde la primera cita?',
    subtitle: 'En el Centro de Conciliación Laboral, en muchos casos es conveniente buscar una solución desde la primera audiencia para evitar más tiempo, costos y riesgos.',
    fields: [
      { name: 'resolverPrimera', label: '', type: 'radio', options: ['Sí, estoy de acuerdo', 'No, prefiero revisarlo primero'], required: true },
    ],
  },
  {
    title: 'Forma de pago',
    subtitle: 'El pago de prestaciones/finiquito/indemnización se realizará de la siguiente manera:',
    condition: (data) => data.resolverPrimera === 'Sí, estoy de acuerdo',
    fields: [
      { name: 'formaPago', label: '', type: 'radio', options: ['Efectivo', 'Cheque de caja o certificado', 'Transferencia electrónica'], required: true },
    ],
  },
  {
    title: 'Condiciones de pago',
    subtitle: 'Para pago en efectivo o cheques, será necesario hacerlos llegar el mismo día o con mínimo 24 horas de antelación. Para transferencias, se recomienda prepararlas con anticipación.',
    condition: (data) => data.resolverPrimera === 'Sí, estoy de acuerdo',
    fields: [
      { name: 'aceptaPago', type: 'checkbox', checkboxLabel: 'Acepto las condiciones para el pago con efectivo, cheque o transferencia.', required: true },
    ],
  },
  {
    title: 'Datos del empleador',
    subtitle: 'Has seleccionado que lo conoces pero no es empleado tuyo. Por favor, compártenos los datos de su empleador.',
    condition: (data) => data.conoceSolicitante === 'Sí lo conozco, pero no es mi empleado',
    fields: [
      { name: 'contactoEmpleador', label: 'Nombre del contacto', type: 'text' },
      { name: 'emailEmpleador', label: 'Correo electrónico', type: 'email' },
      { name: 'telEmpleador', label: 'Teléfono', type: 'tel' },
    ],
  },
  {
    title: '¿Algo más que quieras agregar a esta solicitud?',
    fields: [
      { name: 'comentarios', label: 'Comentarios adicionales', type: 'textarea', placeholder: 'Escribe aquí cualquier información adicional...' },
    ],
  },
];

export default function CitatoriosForm() {
  const handleSubmit = (data) => {
    console.log('Citatorios form submitted:', data);
    // TODO: Send via EmailJS, Resend, or Wix Forms API
  };

  return (
    <MultiStepForm
      formId="form-citatorios"
      title="Formulario para la atención de citatorios"
      subtitle="En el Centro de Conciliación Laboral"
      steps={steps}
      collectionId="FormularioCitatorios"
      onSubmit={handleSubmit}
    />
  );
}
