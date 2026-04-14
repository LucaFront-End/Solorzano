import { useState } from 'react';
import CitatoriosForm from './forms/CitatoriosForm';
import DiligenciasForm from './forms/DiligenciasForm';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ClipboardList, MapPin } from 'lucide-react';
import './FormsSection.css';

const formTabs = [
  { id: 'citatorios', label: 'Citatorios', Icon: ClipboardList, desc: 'Atención de citatorios en el Centro de Conciliación Laboral' },
  { id: 'diligencias', label: 'Diligencias Foráneas', Icon: MapPin, desc: 'Solicitud y control de diligencias foráneas' },
];

export default function FormsSection() {
  const [activeForm, setActiveForm] = useState('citatorios');
  const sectionRef = useScrollReveal();

  return (
    <section className="section section--light forms-section" id="formularios" ref={sectionRef}>
      <div className="container">
        <div className="forms-section__header reveal">
          <span className="section-label">Formularios</span>
          <h2 className="section-title">Solicitudes en línea</h2>
          <p className="section-subtitle">Completa el formulario correspondiente para agilizar tu solicitud.</p>
        </div>

        <div className="forms-section__tabs reveal reveal-delay-1">
          {formTabs.map((tab) => (
            <button
              key={tab.id}
              className={`forms-section__tab ${activeForm === tab.id ? 'forms-section__tab--active' : ''}`}
              onClick={() => setActiveForm(tab.id)}
            >
              <span className="forms-section__tab-icon"><tab.Icon size={22} strokeWidth={1.5} /></span>
              <div>
                <span className="forms-section__tab-label">{tab.label}</span>
                <span className="forms-section__tab-desc">{tab.desc}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="forms-section__content reveal reveal-delay-2">
          {activeForm === 'citatorios' ? <CitatoriosForm /> : <DiligenciasForm />}
        </div>
      </div>
    </section>
  );
}
