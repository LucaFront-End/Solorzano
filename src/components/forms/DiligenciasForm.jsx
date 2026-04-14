import MultiStepForm from './MultiStepForm';
import { entidadesFederativas, solicitantesInternos, serviciosDiligencias } from '../../data/content';

const steps = [
  {
    title: '¿Quién hace la solicitud?',
    subtitle: 'Solicitante interno',
    fields: [
      { name: 'solicitante', label: 'Selecciona el solicitante', type: 'select', options: solicitantesInternos, required: true },
    ],
  },
  {
    title: 'Cliente',
    subtitle: '¿A qué cliente se le enviará esta cotización?',
    fields: [
      { name: 'cliente', label: 'Nombre del cliente', type: 'text', required: true },
    ],
  },
  {
    title: 'Entidad Federativa',
    fields: [
      { name: 'entidad', label: 'Selecciona la entidad', type: 'select', options: entidadesFederativas },
    ],
  },
  {
    title: '¿En qué ciudad se llevará a cabo la diligencia?',
    fields: [
      { name: 'ciudad', label: 'Ciudad', type: 'text', placeholder: 'Escribe el nombre de la ciudad' },
    ],
  },
  {
    title: 'Servicio solicitado',
    fields: [
      { name: 'servicio', label: 'Selecciona el servicio', type: 'select', options: serviciosDiligencias },
    ],
  },
  {
    title: 'Fecha y hora de la diligencia',
    fields: [
      { name: 'fechaDiligencia', label: 'Fecha y hora', type: 'datetime' },
    ],
  },
  {
    title: '¿Algo más que quieras comentarnos?',
    fields: [
      { name: 'comentarios', label: 'Comentarios adicionales', type: 'textarea', placeholder: 'Escribe aquí...' },
    ],
  },
  {
    title: 'Total cotizado',
    fields: [
      { name: 'totalCotizado', label: 'Monto total cotizado', type: 'number', placeholder: '$0.00' },
    ],
  },
  {
    title: '¿Se debe añadir algún gasto adicional?',
    subtitle: 'Por ejemplo: guías de mensajería, copias certificadas, etc.',
    fields: [
      { name: 'gastoAdicional', label: '', type: 'radio', options: ['Sí', 'No'] },
    ],
  },
  {
    title: 'Detalle del gasto adicional',
    condition: (data) => data.gastoAdicional === 'Sí',
    fields: [
      { name: 'conceptoGasto', label: 'Concepto del gasto', type: 'text', placeholder: 'Ej. viáticos / traslado / gratificación' },
      { name: 'montoGasto', label: 'Monto del gasto adicional', type: 'number', placeholder: '$0.00' },
    ],
  },
  {
    title: 'Total final autorizado',
    subtitle: 'Este es el monto final que deberá considerarse para la diligencia (IVA incluido).',
    fields: [
      { name: 'totalFinal', label: 'Total final (IVA incluido)', type: 'number', placeholder: '$0.00' },
    ],
  },
];

export default function DiligenciasForm() {
  const handleSubmit = (data) => {
    console.log('Diligencias form submitted:', data);
    // TODO: Send via EmailJS, Resend, or Wix Forms API
  };

  return (
    <MultiStepForm
      formId="form-diligencias"
      title="Solicitud de Diligencias Foráneas"
      subtitle="Control de cada diligencia"
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
