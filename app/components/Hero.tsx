'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { useLang } from '../context/LanguageContext';

// All non-video images across every project
const allImages = projects.flatMap((p) =>
  (p.images ?? []).filter((src) => !src.endsWith('.mp4'))
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Hero() {
  const { t } = useLang();

  const containerRef = useRef<HTMLElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const buttonsRef   = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);

  // Background image state
  const [queue]       = useState<string[]>(() => shuffle(allImages));
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Cycle images
  useEffect(() => {
    if (queue.length < 2) return;
    const id = setInterval(() => {
      setTransitioning(true);
      setPrev(current);
      const next = (current + 1) % queue.length;
      setCurrent(next);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 1400);
    }, 3800);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, queue]);

  // Hero enter animation
  useEffect(() => {
    const elements = [
      { el: line1Ref.current, delay: 0.1 },
      { el: line2Ref.current, delay: 0.25 },
      { el: taglineRef.current, delay: 0.45 },
      { el: buttonsRef.current, delay: 0.6 },
      { el: badgeRef.current, delay: 0.75 },
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
        el.style.transition = `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * 1000);
    });
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
      }}
    >
      {/* ── Background images (constrained to hero only) ──── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Previous image — fades out + slight shrink */}
        {prev !== null && (
          <img
            key={`prev-${queue[prev]}`}
            src={queue[prev]}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(14px)',
              opacity: transitioning ? 0 : 0.8,
              transform: transitioning ? 'scale(0.96)' : 'scale(1)',
              transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}

        {/* Current image — fades in + slight zoom-in */}
        <img
          key={`curr-${queue[current]}`}
          src={queue[current]}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(14px)',
            opacity: transitioning ? 0.8 : 0.8,
            transform: transitioning ? 'scale(1.06)' : 'scale(1.0)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 7000ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Dark vignette so the hero text stays readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.88) 100%)',
          }}
        />
        {/* Bottom fade — fully opaque at the very bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)',
          }}
        />
      </div>

      {/* ── Content wrapper (max-width + padding) ──────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(60px, 8vw, 120px)',
          paddingLeft: 'var(--page-margin)',
          paddingRight: 'var(--page-margin)',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          width: '100%',
        }}
      >

      {/* ── Status badge ────────────────────────────────────── */}
      <div
        ref={badgeRef}
        style={{
          position: 'absolute',
          top: '40px',
          right: 'var(--page-margin)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '999px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <span
          className="pulse-dot"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#4ADE80',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.08em',
          }}
        >
          {t('hero.badge')}
        </span>
      </div>

      {/* ── Main heading ────────────────────────────────────── */}
      <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
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
            Brand Designer.
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
      </div>

      {/* ── Bottom row ──────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '400px',
            lineHeight: 'var(--leading-normal)',
            letterSpacing: '-0.01em',
          }}
        >
          {t('hero.tagline')}
        </p>

        <div
          ref={buttonsRef}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          <a href="#works" onClick={scrollTo('#works')} className="btn btn-ghost">
            {t('hero.works')}
          </a>
          <a href="#contact" onClick={scrollTo('#contact')} className="btn btn-primary">
            {t('hero.cta')}
          </a>
        </div>
      </div>

      </div>{/* end content wrapper */}
    </section>
  );
}
