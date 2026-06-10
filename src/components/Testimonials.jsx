import { useState, useEffect, useRef } from 'react';
import { testimonialsContent } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const STARS = 5;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sectionRef = useScrollReveal();
  const items = testimonialsContent.items;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length, isHovered]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="section section--navy testimonials" id="testimonios" ref={sectionRef}>
      <div className="container">
        
        <div className="testimonials__header reveal">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>{testimonialsContent.label}</span>
          <h2 className="section-title" style={{ color: 'var(--color-text-white)' }}>{testimonialsContent.title}</h2>
        </div>

        <div 
          className="testimonials__carousel reveal reveal-delay-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          <div className="testimonials__track">
            {items.map((item, i) => {
              // Calculate relative position
              let diff = i - active;
              // Handle wrap-around for infinite feel (only works well if > 2 items, we assume at least 3)
              if (diff === items.length - 1) diff = -1;
              if (diff === -(items.length - 1)) diff = 1;

              let className = 'testimonials__slide';
              if (diff === 0) className += ' is-active';
              else if (diff === 1) className += ' is-next';
              else if (diff === -1) className += ' is-prev';
              else className += ' is-hidden';

              return (
                <div key={i} className={className} onClick={() => setActive(i)}>
                  <div className="testimonials__slide-inner">
                    <div className="testimonials__slide-mark">"</div>
                    
                    <div className="testimonials__stars">
                      {Array.from({ length: STARS }).map((_, j) => (
                        <svg key={j} width="20" height="20" viewBox="0 0 24 24" fill={j < item.rating ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'}>
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                        </svg>
                      ))}
                    </div>

                    <p className="testimonials__text">{item.text}</p>
                    
                    <div className="testimonials__author">
                      <img src={item.avatar} alt={item.name} className="testimonials__avatar" />
                      <div className="testimonials__author-info">
                        <span className="testimonials__name">{item.name}</span>
                        <span className="testimonials__role">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="testimonials__controls reveal reveal-delay-2">
            <button className="testimonials__btn" onClick={handlePrev} aria-label="Anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="testimonials__dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Ir a reseña ${i + 1}`}
                >
                  <span className="testimonials__dot-prog" />
                </button>
              ))}
            </div>
            <button className="testimonials__btn" onClick={handleNext} aria-label="Siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
