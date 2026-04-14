import { clientLogos } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Clients.css';

export default function Clients() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section--white clients" ref={sectionRef}>
      <div className="container">
        <div className="clients__header reveal">
          <span className="section-label">Red Corporativa</span>
          <h2 className="section-title">Confían en nuestra firma</h2>
        </div>
      </div>

      <div className="clients__marquee reveal reveal-delay-1">
        <div className="clients__track">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div className="clients__logo" key={i}>
              <img src={logo} alt={`Cliente ${(i % clientLogos.length) + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="clients__marquee clients__marquee--reverse reveal reveal-delay-2">
        <div className="clients__track clients__track--reverse">
          {[...clientLogos.slice().reverse(), ...clientLogos.slice().reverse()].map((logo, i) => (
            <div className="clients__logo" key={i}>
              <img src={logo} alt={`Cliente ${(i % clientLogos.length) + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
