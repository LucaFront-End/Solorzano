import { Link } from 'react-router-dom';
import './PageHero.css';

export default function PageHero({ label, title, subtitle, breadcrumb = 'Inicio' }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg-pattern" aria-hidden="true" />
      <div className="page-hero__glow" aria-hidden="true" />

      <div className="container page-hero__content">
        <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="page-hero__breadcrumb-link">Inicio</Link>
          <span className="page-hero__breadcrumb-sep">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </span>
          <span className="page-hero__breadcrumb-current">{breadcrumb}</span>
        </nav>

        {label && <span className="page-hero__label">{label}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}

        <div className="page-hero__accent-line" aria-hidden="true" />
      </div>
    </section>
  );
}
