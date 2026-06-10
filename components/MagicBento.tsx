'use client';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';

// ── types ──────────────────────────────────────────────────────────────────
export interface MagicBentoProps {
  children: ReactNode;
  className?: string;
  spotlightRadius?: number;
  glowColor?: string;          // CSS rgb values e.g. "201,162,39"
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
}

// ── helpers ────────────────────────────────────────────────────────────────
const MOBILE_BREAKPOINT = 768;

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function updateCardGlow(
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  intensity: number,
  radius: number,
) {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mouseX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((mouseY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty('--glow-intensity', intensity.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
}

// ── GlobalSpotlight ────────────────────────────────────────────────────────
function GlobalSpotlight({
  gridRef,
  disabled,
  spotlightRadius,
  glowColor,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disabled: boolean;
  spotlightRadius: number;
  glowColor: string;
}) {
  useEffect(() => {
    if (disabled || !gridRef.current) return;

    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,
        rgba(${glowColor},0.18) 0%,
        rgba(${glowColor},0.09) 15%,
        rgba(${glowColor},0.04) 30%,
        rgba(${glowColor},0.015) 50%,
        transparent 70%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
      will-change:transform,opacity;
    `;
    document.body.appendChild(el);

    const proximity = spotlightRadius * 0.5;
    const fade = spotlightRadius * 0.75;

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const section = gridRef.current.closest('.magic-bento-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll<HTMLElement>('.magic-bento-card');

      if (!inside) {
        gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      let minDist = Infinity;
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minDist = Math.min(minDist, d);
        const gi = d <= proximity ? 1 : d <= fade ? (fade - d) / (fade - proximity) : 0;
        updateCardGlow(card, e.clientX, e.clientY, gi, spotlightRadius);
      });

      gsap.to(el, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const op = minDist <= proximity ? 0.8
        : minDist <= fade ? ((fade - minDist) / (fade - proximity)) * 0.8
        : 0;
      gsap.to(el, { opacity: op, duration: op > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const onLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>('.magic-bento-card')
        .forEach(c => c.style.setProperty('--glow-intensity', '0'));
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      el.parentNode?.removeChild(el);
    };
  }, [disabled, gridRef, spotlightRadius, glowColor]);

  return null;
}

// ── MagicBento (wrapper) ───────────────────────────────────────────────────
export default function MagicBento({
  children,
  className = '',
  spotlightRadius = 430,
  glowColor = '201,162,39',     // AUVITA gold
  enableSpotlight = true,
  enableBorderGlow = true,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const disabled = isMobile;

  return (
    <div className={`magic-bento-section ${className}`} ref={gridRef}>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disabled={disabled}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      {/* Inject border-glow class onto direct .magic-bento-card children via CSS cascade */}
      <div
        className={enableBorderGlow ? 'magic-bento-grid magic-bento-glow' : 'magic-bento-grid'}
        data-glow-color={glowColor}
      >
        {children}
      </div>
    </div>
  );
}
