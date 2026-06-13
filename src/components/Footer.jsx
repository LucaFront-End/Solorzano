import { Link, useNavigate, useLocation } from 'react-router-dom';
import { siteConfig, navLinks } from '../data/content';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNav = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img src={siteConfig.logoIcon} alt="DSC" className="footer__logo" />
            <span className="footer__brand-name">Solórzano Cerezo<br /><small>y Asociados</small></span>
            <p className="footer__brand-desc">
              Derecho Laboral y Mercantil en Ciudad de México. Asesoría legal integral para tu empresa.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navegación</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link to={link.href}>{link.label}</Link>
                  ) : (
                    <a href={link.href} onClick={(e) => handleNav(e, link.href)}>{link.label}</a>
                  )}
                </li>
              ))}
              {/* Zonas hub */}
              <li>
                <Link to="/zonas">Zonas de Servicio</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul>
              <li><a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li><a href={siteConfig.mapsLink} target="_blank" rel="noopener noreferrer">Ver en Google Maps</a></li>
            </ul>
            <div className="footer__social">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.49h-2.8v8.44C19.61 23.09 24 18.09 24 12.07z"/></svg>
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.47 2H3.53A1.45 1.45 0 002 3.47v17.06A1.45 1.45 0 003.47 22h17.06A1.45 1.45 0 0022 20.53V3.47A1.45 1.45 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 110-3.12 1.56 1.56 0 010 3.12zM18.91 18.74h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0012.85 13a2 2 0 00-.1.73v5h-3v-9h3v1.2a3 3 0 012.71-1.5c2 0 3.45 1.29 3.45 4.06v5.24z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">
            La información proporcionada en este sitio web tiene fines exclusivamente informativos y no constituye asesoramiento legal. Es fundamental consultar con un abogado para obtener asesoramiento legal personalizado.
          </p>
          <div className="footer__bottom-row">
            <span>© {new Date().getFullYear()} Solórzano Cerezo y Asociados. Todos los derechos reservados.</span>
            <a href="https://www.dsc.mx/pol%C3%ADtica-de-privacidad" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
