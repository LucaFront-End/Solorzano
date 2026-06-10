import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig, navLinks } from '../data/content';
import { cmsCategories } from '../data/cmsServices';
import { ChevronDown, ArrowRight } from 'lucide-react';
import LucideIcon from './LucideIcon';
import './Navbar.css';

// Build dropdown data from CMS: 3 categories × 4 services + ver más
const DROPDOWN_MAX_ITEMS = 4;
const dropdownCategories = cmsCategories.map(cat => ({
  category: cat.category,
  icon: cat.icon,
  items: cat.items.filter(s => s.isComplete).slice(0, DROPDOWN_MAX_ITEMS).map(s => ({
    label: s.title,
    href: `/servicios-derecho/${s.slug}`,
  })),
  totalCount: cat.items.length,
  hasMore: cat.items.length > DROPDOWN_MAX_ITEMS,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Handle hash scroll after navigation
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleNav = (href) => {
    setMenuOpen(false);
    setDropdownOpen(null);

    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      return;
    }

    if (href.startsWith('/#')) {
      const hash = href.slice(1);
      if (isHome) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
      return;
    }

    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHome && !scrolled ? 'navbar--home' : ''}`} id="navbar">
      <div className="navbar__inner container container--wide">
        <Link to="/" className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={siteConfig.logoIcon} alt="DSC" className="navbar__logo-icon" />
          <img src={siteConfig.logo} alt={siteConfig.name} className="navbar__logo-text" />
        </Link>

        <ul className="navbar__links" ref={dropdownRef}>
          {navLinks.map((link) => {
            if (link.label === 'Servicios') {
              return (
                <li 
                  key="Servicios"
                  className="navbar__item--has-dropdown"
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <button 
                    className={`navbar__link navbar__link--dropdown-trigger ${desktopDropdownOpen ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setDesktopDropdownOpen(!desktopDropdownOpen); }}
                  >
                    Servicios
                    <ChevronDown size={14} className={`navbar__dropdown-arrow ${desktopDropdownOpen ? 'rotated' : ''}`} />
                  </button>

                  <div className={`navbar__mega-dropdown ${desktopDropdownOpen ? 'navbar__mega-dropdown--open' : ''}`}>
                    <div className="navbar__dropdown-inner navbar__dropdown-inner--3col">
                      {dropdownCategories.map((cat) => (
                        <div className="navbar__dropdown-column" key={cat.category}>
                          <h4 className="navbar__dropdown-title">
                            <LucideIcon name={cat.icon} size={14} />
                            {cat.category}
                          </h4>
                          <ul className="navbar__dropdown-list">
                            {cat.items.map((item) => (
                              <li key={item.href}>
                                <Link to={item.href} className="navbar__dropdown-link" onClick={() => setDesktopDropdownOpen(false)}>
                                  <span className="navbar__dropdown-link-title">{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {cat.hasMore && (
                            <Link
                              to="/servicios"
                              className="navbar__dropdown-more"
                              onClick={() => setDesktopDropdownOpen(false)}
                            >
                              Ver todos ({cat.totalCount})
                              <ArrowRight size={12} strokeWidth={2.5} />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }

            return link.children ? (
              /* ── Dropdown item ── */
              <li key={link.label} className="navbar__dropdown">
                <button
                  className={`navbar__link navbar__link--dropdown ${dropdownOpen === link.label ? 'navbar__link--open' : ''}`}
                  onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                >
                  {link.label}
                  <ChevronDown size={14} strokeWidth={2.5} className="navbar__chevron" />
                </button>
                <div className={`navbar__dropdown-menu ${dropdownOpen === link.label ? 'navbar__dropdown-menu--open' : ''}`}>
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="navbar__dropdown-item"
                      onClick={(e) => { e.preventDefault(); handleNav(child.href); }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              /* ── Normal item ── */
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
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

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Bottom-Sheet Drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        {/* Drag handle */}
        <div className="navbar__drawer-handle" />

        {/* Main links */}
        <nav className="navbar__drawer-nav">
          {navLinks.map((link, i) => {
            if (link.label === 'Servicios') {
              return (
                <div key="Servicios" className="navbar__drawer-section">
                  <button
                    className={`navbar__drawer-item navbar__drawer-item--accordion ${mobileDropdownOpen ? 'navbar__drawer-item--open' : ''}`}
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    <span className="navbar__drawer-item-label">Servicios</span>
                    <ChevronDown size={16} className="navbar__drawer-chevron" />
                  </button>
                  <div className={`navbar__drawer-accordion ${mobileDropdownOpen ? 'navbar__drawer-accordion--open' : ''}`}>
                    {dropdownCategories.map((cat) => (
                      <div key={cat.category} className="navbar__drawer-cat">
                        <span className="navbar__drawer-cat-label">{cat.category}</span>
                        {cat.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="navbar__drawer-subitem"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                        {cat.hasMore && (
                          <Link to="/servicios" className="navbar__drawer-subitem navbar__drawer-subitem--more" onClick={() => setMenuOpen(false)}>
                            Ver todos los servicios →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (link.children) {
              return (
                <div key={link.label} className="navbar__drawer-section navbar__drawer-section--group">
                  <span className="navbar__drawer-section-label">{link.label}</span>
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="navbar__drawer-subitem"
                      onClick={(e) => { e.preventDefault(); handleNav(child.href); }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className="navbar__drawer-item"
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              >
                <span className="navbar__drawer-item-label">{link.label}</span>
                <ArrowRight size={16} className="navbar__drawer-arrow" />
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="navbar__drawer-cta">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__drawer-cta-btn"
            onClick={() => setMenuOpen(false)}
          >
            Agenda una Asesoría
          </a>
          <a href={`tel:${siteConfig.phone}`} className="navbar__drawer-phone">
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </nav>
  );
}
