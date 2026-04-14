import { useState, useCallback } from 'react';
import { CheckCircle2, Paperclip } from 'lucide-react';
import './MultiStepForm.css';

export default function MultiStepForm({ title, subtitle, steps, onSubmit, formId }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateField = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const validateStep = () => {
    const step = steps[currentStep];
    if (!step.fields) return true;

    const newErrors = {};
    step.fields.forEach((field) => {
      if (field.required && !formData[field.name]?.toString().trim()) {
        newErrors[field.name] = 'Este campo es obligatorio';
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Formato de correo inválido';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getVisibleSteps = () => {
    return steps.filter((step) => {
      if (!step.condition) return true;
      return step.condition(formData);
    });
  };

  const visibleSteps = getVisibleSteps();
  const currentVisibleStep = visibleSteps[currentStep];

  const next = () => {
    if (!validateStep()) return;
    if (currentStep < visibleSteps.length - 1) {
      setCurrentStep((p) => p + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    if (onSubmit) onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="msf" id={formId}>
        <div className="msf__success">
          <div className="msf__success-icon"><CheckCircle2 size={56} strokeWidth={1.5} /></div>
          <h3>¡Formulario enviado con éxito!</h3>
          <p>Nos pondremos en contacto contigo lo antes posible.</p>
          <button className="btn btn--primary" onClick={() => { setSubmitted(false); setCurrentStep(0); setFormData({}); }}>
            Enviar otro formulario
          </button>
        </div>
      </div>
    );
  }

  if (!currentVisibleStep) return null;

  const isLast = currentStep === visibleSteps.length - 1;

  return (
    <div className="msf" id={formId}>
      {/* Progress Bar */}
      <div className="msf__progress">
        <div className="msf__progress-bar" style={{ width: `${progress}%` }} />
        <span className="msf__progress-text">{currentStep + 1} / {visibleSteps.length}</span>
      </div>

      {/* Header */}
      <div className="msf__header">
        <h3 className="msf__step-title">{currentVisibleStep.title}</h3>
        {currentVisibleStep.subtitle && (
          <p className="msf__step-subtitle">{currentVisibleStep.subtitle}</p>
        )}
      </div>

      {/* Fields */}
      <div className="msf__body" key={currentStep}>
        {currentVisibleStep.fields?.map((field) => (
          <div className={`msf__field ${errors[field.name] ? 'msf__field--error' : ''}`} key={field.name}>
            {field.label && <label className="msf__label">{field.label}{field.required && ' *'}</label>}

            {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' ? (
              <input
                type={field.type}
                className="msf__input"
                placeholder={field.placeholder || ''}
                value={formData[field.name] || ''}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ) : field.type === 'textarea' ? (
              <textarea
                className="msf__textarea"
                placeholder={field.placeholder || ''}
                value={formData[field.name] || ''}
                onChange={(e) => updateField(field.name, e.target.value)}
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                className="msf__select"
                value={formData[field.name] || ''}
                onChange={(e) => updateField(field.name, e.target.value)}
              >
                <option value="">Seleccione...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div className="msf__radio-group">
                {field.options?.map((opt) => (
                  <label className={`msf__radio ${formData[field.name] === opt ? 'msf__radio--selected' : ''}`} key={opt}>
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      checked={formData[field.name] === opt}
                      onChange={() => updateField(field.name, opt)}
                    />
                    <span className="msf__radio-indicator" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : field.type === 'checkbox' ? (
              <label className={`msf__checkbox ${formData[field.name] ? 'msf__checkbox--checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!formData[field.name]}
                  onChange={(e) => updateField(field.name, e.target.checked)}
                />
                <span className="msf__checkbox-indicator" />
                <span>{field.checkboxLabel || 'Acepto'}</span>
              </label>
            ) : field.type === 'date' ? (
              <input
                type="date"
                className="msf__input"
                value={formData[field.name] || ''}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ) : field.type === 'datetime' ? (
              <input
                type="datetime-local"
                className="msf__input"
                value={formData[field.name] || ''}
                onChange={(e) => updateField(field.name, e.target.value)}
              />
            ) : field.type === 'file' ? (
              <div className="msf__file-drop">
                <input
                  type="file"
                  id={`file-${field.name}`}
                  onChange={(e) => updateField(field.name, e.target.files[0]?.name || '')}
                />
                <label htmlFor={`file-${field.name}`} className="msf__file-label">
                  <span className="msf__file-icon"><Paperclip size={20} strokeWidth={1.5} /></span>
                  <span>{formData[field.name] || 'Arrastrar archivo o hacer clic para subir'}</span>
                  <span className="msf__file-hint">Máx. 10MB</span>
                </label>
              </div>
            ) : field.type === 'info' ? (
              <div className="msf__info-box">
                {field.content}
              </div>
            ) : null}

            {errors[field.name] && <span className="msf__error">{errors[field.name]}</span>}
          </div>
        ))}

        {currentVisibleStep.content && (
          <div className="msf__info-box">{currentVisibleStep.content}</div>
        )}
      </div>

      {/* Navigation */}
      <div className="msf__nav">
        {currentStep > 0 && (
          <button className="btn btn--outline msf__btn-prev" onClick={prev}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Anterior
          </button>
        )}
        <div style={{ flex: 1 }} />
        {isLast ? (
          <button className="btn btn--primary" onClick={handleSubmit}>
            Enviar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        ) : (
          <button className="btn btn--primary" onClick={next}>
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}
