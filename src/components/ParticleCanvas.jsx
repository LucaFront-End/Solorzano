import { useEffect, useRef, useCallback } from 'react';

const PARTICLE_COUNT = 200;
const CONNECTION_DIST = 120;
const MOUSE_REPEL_RADIUS = 160;
const MOUSE_ATTRACT_RADIUS = 350;

// Gold palette
const COLORS = [
  { r: 201, g: 169, b: 97 },   // Gold
  { r: 232, g: 213, b: 163 },  // Light gold
  { r: 255, g: 255, b: 255 },  // White
  { r: 166, g: 138, b: 66 },   // Dark gold
];

class Particle {
  constructor(canvasW, canvasH, centerX, centerY) {
    // Spawn from edges or random
    const spawnAngle = Math.random() * Math.PI * 2;
    const spawnDist = Math.max(canvasW, canvasH);
    this.x = centerX + Math.cos(spawnAngle) * spawnDist * (0.5 + Math.random() * 0.5);
    this.y = centerY + Math.sin(spawnAngle) * spawnDist * (0.5 + Math.random() * 0.5);
    this.vx = 0;
    this.vy = 0;

    // Home position: loose sphere formation
    const homeAngle = Math.random() * Math.PI * 2;
    const homeRadius = 60 + Math.random() * 220;
    const homeAngle2 = Math.random() * Math.PI; // vertical spread
    this.homeX = centerX + Math.cos(homeAngle) * homeRadius * Math.sin(homeAngle2);
    this.homeY = centerY + Math.sin(homeAngle) * homeRadius * 0.85 * Math.sin(homeAngle2);

    // Visual
    const colorIdx = Math.random() > 0.55 ? 0 : Math.random() > 0.4 ? 1 : Math.random() > 0.3 ? 2 : 3;
    this.color = COLORS[colorIdx];
    this.baseSize = Math.random() * 2.2 + 0.6;
    this.size = this.baseSize;
    this.baseOpacity = Math.random() * 0.5 + 0.2;
    this.opacity = this.baseOpacity;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.01 + Math.random() * 0.02;

    // Orbit
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitSpeed = (Math.random() - 0.5) * 0.003;
    this.orbitRadius = 8 + Math.random() * 25;

    // State
    this.arrived = false;
  }

  update(mouseX, mouseY, mouseActive, time) {
    // Pulse
    this.pulsePhase += this.pulseSpeed;
    const pulse = Math.sin(this.pulsePhase) * 0.3;
    this.size = this.baseSize * (1 + pulse * 0.3);
    this.opacity = this.baseOpacity * (0.7 + pulse * 0.3 + 0.3);

    // Gentle orbit around home
    this.orbitAngle += this.orbitSpeed;
    const targetX = this.homeX + Math.cos(this.orbitAngle) * this.orbitRadius;
    const targetY = this.homeY + Math.sin(this.orbitAngle + time * 0.0003) * this.orbitRadius;

    // Spring force toward home
    const springStrength = this.arrived ? 0.012 : 0.025;
    this.vx += (targetX - this.x) * springStrength;
    this.vy += (targetY - this.y) * springStrength;

    // Mouse interaction
    if (mouseActive) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
        // Strong repulsion
        const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
        const eased = force * force; // quadratic for snappy feel
        this.vx += (dx / dist) * eased * 6;
        this.vy += (dy / dist) * eased * 6;
        this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        this.size = this.baseSize * (1 + force * 0.8);
      } else if (dist < MOUSE_ATTRACT_RADIUS && dist > MOUSE_REPEL_RADIUS) {
        // Subtle attraction halo
        const force = (dist - MOUSE_REPEL_RADIUS) / (MOUSE_ATTRACT_RADIUS - MOUSE_REPEL_RADIUS);
        this.vx -= (dx / dist) * (1 - force) * 0.2;
        this.vy -= (dy / dist) * (1 - force) * 0.2;
      }
    }

    // Damping
    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;

    // Check arrived
    const distToHome = Math.abs(this.x - this.homeX) + Math.abs(this.y - this.homeY);
    if (distToHome < 60) this.arrived = true;
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const init = useCallback((canvas) => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Center of sphere — right-center area
    const centerX = rect.width * 0.52;
    const centerY = rect.height * 0.48;

    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(rect.width, rect.height, centerX, centerY)
    );

    return { ctx, width: rect.width, height: rect.height };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let { ctx, width, height } = init(canvas);

    const handleResize = () => {
      const result = init(canvas);
      ctx = result.ctx;
      width = result.width;
      height = result.height;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const drawConnections = (particles) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 169, 97, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const time = Date.now() - startTimeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Update particles
      particles.forEach((p) => p.update(mouse.x, mouse.y, mouse.active, time));

      // Draw connections
      drawConnections(particles);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
        ctx.fill();

        // Glow for larger gold particles
        if (p.size > 1.8 && p.color.r === 201) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, `rgba(201, 169, 97, ${p.opacity * 0.15})`);
          gradient.addColorStop(1, 'rgba(201, 169, 97, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw faint mouse glow when active
      if (mouse.active) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_REPEL_RADIUS);
        grd.addColorStop(0, 'rgba(201, 169, 97, 0.03)');
        grd.addColorStop(1, 'rgba(201, 169, 97, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_REPEL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
