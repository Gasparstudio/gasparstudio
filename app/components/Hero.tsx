'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { projects } from '../data/projects';
import { useLang } from '../context/LanguageContext';
import ExplodeButton from './ExplodeButton';

// Projektenként max 2 kép — a háttér csak elmosva látszik, nem kell az összes
// artboardot letölteni hozzá (ez korábban 40+ nagy képet jelentett induláskor).
const allImages = projects
  .filter((p) => p.slug !== 'logofolio')
  .flatMap((p) => (p.images ?? []).filter((src) => !src.endsWith('.mp4')).slice(0, 2));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// SSR-ren és az első kliens-renderen ugyanazt kell adnia (nincs Math.random itt),
// a tényleges keverés useLayoutEffect-ben fut le, mountolás után.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const slotStyles = [
  { top: '0px',   right: '15px',  rotate: '-3deg',  zIndex: 3 },
  { top: '60px',  right: '-55px', rotate: '9deg',   zIndex: 2 },
  { top: '100px', right: '75px',  rotate: '-12deg', zIndex: 1 },
];

export default function Hero() {
  const { t } = useLang();

  const containerRef = useRef<HTMLElement>(null);
  const h1aRef       = useRef<HTMLHeadingElement>(null);
  const h1bRef       = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  const [cards, setCards]           = useState<string[]>(() => allImages.slice(0, 3));
  const [activeCard, setActiveCard] = useState(0);

  const [queue, setQueue]     = useState<string[]>(() => allImages);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Keverés csak mountolás után, a böngésző-festés előtt — nincs hydration mismatch,
  // nincs látható villanás.
  useIsomorphicLayoutEffect(() => {
    setQueue(shuffle(allImages));
    setCards(shuffle(allImages).slice(0, 3));
  }, []);

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
    // Címsorok: karakterenkénti felúszás (Outcrowd-minta, betöltéskor)
    const heads = [h1aRef.current, h1bRef.current].filter(Boolean) as HTMLElement[];
    const splits = heads.map((el) => new SplitType(el, { types: 'chars', tagName: 'span' }));
    heads.forEach((el) => { el.style.opacity = '1'; });
    const chars = splits.flatMap((s) => s.chars ?? []);
    gsap.from(chars, {
      yPercent: 115,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.035,
      delay: 0.15,
    });

    // Kísérő elemek: fade-up sorban
    const elements = [
      { el: badgeRef.current, delay: 0.55 },
      { el: subRef.current,   delay: 0.7  },
      { el: ctaRef.current,   delay: 0.85 },
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

    return () => splits.forEach((s) => s.revert());
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
          {/* Availability badge */}
          <div ref={badgeRef} style={{ marginBottom: 'clamp(16px, 2vw, 24px)' }}>
            <span className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              {t('hero.badge')}
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={h1aRef}
              className="font-display text-hero"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-text-primary)',
                margin: 0,
                opacity: 0,
              }}
            >
              Gáspár Bálint
            </h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={h1bRef}
              className="font-display text-hero"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-text-secondary)',
                margin: 0,
                opacity: 0,
              }}
            >
              Brand Designer
            </h1>
          </div>
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'var(--color-text-secondary)',
              maxWidth: '440px',
              lineHeight: 'var(--leading-normal)',
              marginTop: 'clamp(16px, 2vw, 28px)',
              marginBottom: 0,
            }}
          >
            {t('hero.sub')}
          </p>

          {/* CTA-k */}
          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              marginTop: 'clamp(24px, 3vw, 40px)',
            }}
          >
            <ExplodeButton href="/arajanlat">{t('hero.cta1')}</ExplodeButton>
            <a
              href="/works"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
            >
              {t('hero.works')}
            </a>
          </div>
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
              perspective: '1400px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-18deg) rotateX(9deg)',
                transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
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
                      boxShadow: `0 24px 55px rgba(0,0,0,0.6), 0 10px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)`,
                      transform: `rotate(${s.rotate}) translateZ(${s.zIndex * 50}px)`,
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
          </div>

          {/* Indicator dots */}
          <style>{`
            @keyframes dotFill {
              from { width: 0%; }
              to   { width: 100%; }
            }
          `}</style>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '30%', transform: 'translate(-50px, -20px)' }}>
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
