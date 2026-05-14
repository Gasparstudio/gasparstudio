'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { el: line1Ref.current, delay: 0.1 },
      { el: line2Ref.current, delay: 0.25 },
      { el: taglineRef.current, delay: 0.45 },
      { el: buttonsRef.current, delay: 0.6 },
      { el: badgeRef.current, delay: 0.75 },
    ];

    // Set initial state
    elements.forEach(({ el }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'none';
    });

    // Animate in sequence
    elements.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * 1000);
    });
  }, []);

  const scrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
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
        position: 'relative',
      }}
    >
      {/* Status badge — top right */}
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
            fontFamily: 'var(--font-jetbrains), var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.08em',
          }}
        >
          Elérhető projektre
        </span>
      </div>

      {/* Main heading */}
      <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
        <div
          ref={line1Ref}
          style={{ overflow: 'hidden' }}
        >
          <h1
            className="font-display text-hero"
            style={{
              fontFamily: 'var(--font-bebas), var(--font-display)',
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
        <div
          ref={line2Ref}
          style={{ overflow: 'hidden' }}
        >
          <h1
            className="font-display text-hero"
            style={{
              fontFamily: 'var(--font-bebas), var(--font-display)',
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

      {/* Bottom row: tagline + buttons */}
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
            fontFamily: 'var(--font-dm-sans), var(--font-body)',
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '400px',
            lineHeight: 'var(--leading-normal)',
            letterSpacing: '-0.01em',
          }}
        >
          Brands that feel before they speak.
        </p>

        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#works"
            onClick={scrollToWorks}
            className="btn btn-ghost"
          >
            Munkáim ↓
          </a>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="btn btn-primary"
          >
            Írj nekem →
          </a>
        </div>
      </div>

      {/* Scroll indicator line */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: 'clamp(40px, 6vw, 80px)',
          background: 'linear-gradient(to bottom, transparent, var(--color-border))',
        }}
      />
    </section>
  );
}
