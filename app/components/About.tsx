'use client';

import { useEffect, useRef } from 'react';

const tools = ['Figma', 'Illustrator', 'After Effects', 'Photoshop'];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [leftRef.current, rightRef.current];
    elements.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'none';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || '0';
            setTimeout(() => {
              el.style.transition =
                'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el, i) => {
      if (!el) return;
      el.dataset.delay = String(i * 150);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        paddingTop: 'var(--section-padding-v)',
        paddingBottom: 'var(--section-padding-v)',
        paddingLeft: 'var(--page-margin)',
        paddingRight: 'var(--page-margin)',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <div
        className="section-label"
        style={{
          marginBottom: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '32px',
            height: '1px',
            background: 'var(--color-accent)',
          }}
        />
        04 · Rólam
      </div>

      {/* 2-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
      >
        {/* Left: photo placeholder */}
        <div ref={leftRef}>
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 5',
              maxWidth: '400px',
              borderRadius: 'var(--card-radius-lg)',
              background: 'linear-gradient(160deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)',
              border: '1px solid var(--color-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative geometric shapes */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 'calc(30% + 20px)',
                left: 'calc(50% + 20px)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'var(--color-accent-muted)',
                border: '1px solid var(--color-accent)',
                transform: 'rotate(15deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                padding: '16px',
                borderRadius: 'var(--card-radius)',
                background: 'rgba(10,10,10,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '14px',
                  color: '#0A0A0A',
                  fontWeight: 700,
                }}
              >
                G
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Gaspar
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--color-text-secondary)',
                    margin: '2px 0 0',
                  }}
                >
                  Brand Designer · Budapest
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: text content */}
        <div
          ref={rightRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas), var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--leading-snug)',
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Identitások, amelyek hatnak.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans), var(--font-body)',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            Brand designerként abban hiszek, hogy egy erős vizuális identitás nem díszítés — hanem stratégia. Budapest-alapú, globálisan gondolkodó.
          </p>

          {/* Tools */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: '16px' }}
            >
              Eszközök
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    fontFamily: 'var(--font-jetbrains), var(--font-mono)',
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {[
              { value: '5+', label: 'Év tapasztalat' },
              { value: '40+', label: 'Projekt' },
              { value: '12+', label: 'Ügyfél' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    color: 'var(--color-accent)',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--color-text-muted)',
                    margin: '6px 0 0',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CV Download */}
          <div>
            <a
              href="#"
              className="btn btn-ghost"
              style={{ display: 'inline-flex' }}
            >
              CV letöltése ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
