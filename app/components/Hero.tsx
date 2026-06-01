'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { useLang } from '../context/LanguageContext';

const allImages = projects
  .filter((p) => p.slug !== 'logofolio')
  .flatMap((p) => (p.images ?? []).filter((src) => !src.endsWith('.mp4')));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const slotStyles = [
  { top: '0px',   right: '15px',  rotate: '-3deg',  zIndex: 3 },
  { top: '60px',  right: '-55px', rotate: '9deg',   zIndex: 2 },
  { top: '100px', right: '75px',  rotate: '-12deg', zIndex: 1 },
];

export default function Hero() {
  const { t } = useLang();

  const containerRef = useRef<HTMLElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);

  const [cards]      = useState<string[]>(() => shuffle(allImages).slice(0, 3));
  const [activeCard, setActiveCard] = useState(0);

  const [queue]      = useState<string[]>(() => shuffle(allImages));
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (queue.length < 2) return;
    const id = setInterval(() => {
      setTransitioning(true);
      setPrev(current);
      const next = (current + 1) % queue.length;
      setCurrent(next);
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 1400);
    }, 3800);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, queue]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveCard((p) => (p + 1) % 3);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const elements = [
      { el: line1Ref.current,   delay: 0.1  },
      { el: line2Ref.current,   delay: 0.25 },
      { el: taglineRef.current, delay: 0.45 },
      { el: badgeRef.current,   delay: 0.6  },
    ];
    elements.forEach(({ el }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'none';
    });
    elements.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * 1000);
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh' }}
    >
      {/* Background images */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        {prev !== null && (
          <img
            key={`prev-${queue[prev]}`}
            src={queue[prev]}
            alt=""
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'blur(14px)',
              opacity: transitioning ? 0 : 0.8,
              transform: transitioning ? 'scale(0.96)' : 'scale(1)',
              transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}
        <img
          key={`curr-${queue[current]}`}
          src={queue[current]}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'blur(14px)',
            opacity: 0.8,
            transform: transitioning ? 'scale(1.06)' : 'scale(1.0)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 7000ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.88) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)' }} />
      </div>

      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(32px, 6vw, 80px)',
          paddingLeft: 'var(--page-margin)',
          paddingRight: 'var(--page-margin)',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Left: text */}
        <div style={{ flex: '1 1 auto' }}>
          <div ref={line1Ref} style={{ overflow: 'hidden' }}>
            <h1
              className="font-display text-hero"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Buzi Bozi
            </h1>
          </div>
          <div ref={line2Ref} style={{ overflow: 'hidden' }}>
            <h1
              className="font-display text-hero"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-accent)',
                margin: 0,
              }}
            >
              GASPAR.
            </h1>
          </div>
          <p
            ref={taglineRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'var(--color-text-secondary)',
              maxWidth: '400px',
              lineHeight: 'var(--leading-normal)',
              letterSpacing: '-0.01em',
              marginTop: 'clamp(16px, 2vw, 28px)',
              marginBottom: 0,
            }}
          >
            {t('hero.tagline')}
          </p>
        </div>

        {/* Right: floating cards + dots */}
        <div
          className="hidden lg:flex"
          style={{ flexDirection: 'column', alignItems: 'center', gap: '24px', flexShrink: 0 }}
        >
          <div
            style={{
              position: 'relative',
              width: 'clamp(200px, 22vw, 300px)',
              height: 'clamp(280px, 34vw, 430px)',
            }}
          >
            {cards.map((src, i) => {
              const slot = (i - activeCard + 3) % 3;
              const s = slotStyles[slot];
              return (
                <div
                  key={src}
                  style={{
                    position: 'absolute',
                    top: s.top,
                    right: s.right,
                    zIndex: s.zIndex,
                    width: '78%',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transform: `rotate(${s.rotate})`,
                    transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Indicator dots */}
          <style>{`
            @keyframes dotFill {
              from { width: 0%; }
              to   { width: 100%; }
            }
          `}</style>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '30%' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: activeCard === i ? '28px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                  transition: 'width 400ms ease',
                  flexShrink: 0,
                }}
              >
                {activeCard === i && (
                  <div
                    key={activeCard}
                    style={{
                      height: '100%',
                      borderRadius: '999px',
                      background: 'var(--color-accent)',
                      animation: 'dotFill 5s linear forwards',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
