import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getLandingZonaBySlug } from '../data/landingZonas';
import { siteConfig } from '../data/content';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Contact from '../components/Contact';
import './ZonaLandingPage.css';

/* ══════════════════════════════════════════════
   ZONA LANDING PAGE — /ciudades/:slug
   100% dinámico desde Wix CMS "LandingdeCiudades".
   Cada campo en el CMS → renderiza en la landing.
   Sin campos hardcodeados.
   ══════════════════════════════════════════════ */

export default function ZonaLandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    getLandingZonaBySlug(slug).then((data) => {
      if (cancelled) return;
      if (!data) setNotFound(true);
      else setPage(data);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [slug]);

  if (notFound) return <Navigate to="/ciudades" replace />;

  if (loading || !page) {
    return (
      <div className="zona-loading">
        <div className="zona-spinner" />
      </div>
    );
  }

  const whatsappUrl = page.whatsappUrl || siteConfig.whatsapp;
  const zona = page.zona || page.title;

  return (
    <>
      {/* SEO — 100% from CMS */}
      <title>{page.seoTitle || `${page.title} | ${siteConfig.name}`}</title>
      {page.metaDescription && (
        <meta name="description" content={page.metaDescription} />
      )}

      <div className="zona-landing">

        {/* ── HERO — split layout: texto | imagen ── */}
        <section className="zona-hero" style={page.imageUrl ? { '--zona-img': `url(${page.imageUrl})` } : {}}>
          <div className="container zona-hero__inner">

            {/* Left — Text (100% from CMS) */}
            <div className="zona-hero__text">
              {/* Breadcrumb */}
              <nav className="zona-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Inicio</Link>
                <span>/</span>
                <Link to="/ciudades">Ciudades</Link>
                <span>/</span>
                <span>{zona}</span>
              </nav>

              {/* zona label — from CMS field "zona/estado/ciudad" */}
              {zona && (
                <span className="zona-label">{zona}</span>
              )}

              {/* title — from CMS field "title" */}
              <h1 className="zona-title">{page.title}</h1>

              {/* descripcion — from CMS field "descripcion/excerpt" */}
              {page.descripcion && (
                <p className="zona-excerpt">{page.descripcion}</p>
              )}

              {/* CTAs */}
              <div className="zona-ctas">
                <a
                  href={whatsappUrl}
                  className="zona-btn zona-btn--wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar ahora
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="zona-btn zona-btn--phone"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Right — Image from CMS (only if provided) */}
            {page.imageUrl && (
              <div className="zona-hero__image-wrap">
                <div className="zona-hero__image-glow" />
                <img
                  src={page.imageUrl}
                  alt={page.title}
                  className="zona-hero__image"
                  loading="eager"
                />
              </div>
            )}

          </div>
        </section>

        {/* ── Shared components — reused from main site ── */}
        <Services />
        <Testimonials />
        <CTABanner
          title={`¿Tu empresa necesita asesoría en ${zona}?`}
          subtitle="Primera consulta gratuita y sin compromiso. Respondemos en menos de 1 hora."
          whatsappUrl={whatsappUrl}
        />
        <Contact />

      </div>
    </>
  );
}
