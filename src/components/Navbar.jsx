import { useState, useEffect } from 'react';
import { siteConfig, navLinks } from '../data/content';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container container--wide">
        <a href="#" className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={siteConfig.logoIcon} alt="DSC" className="navbar__logo-icon" />
          <img src={siteConfig.logo} alt={siteConfig.name} className="navbar__logo-text" />
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="navbar__link" onClick={(e) => { e.preventDefault(); handleNav(link.href); }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
            Agenda una Asesoría
          </a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.06}s` }}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href); }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: '32px' }}>
          Agenda una Asesoría
        </a>
      </div>
    </nav>
  );
}
