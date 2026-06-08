'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';

const tools = ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'AI képgenerálás'];

const statsConfig = [
  { target: 8,  suffix: '+', labelKey: 'about.stat.exp' as const },
  { target: 50, suffix: '+', labelKey: 'about.stat.projects' as const },
  { target: 25, suffix: '+', labelKey: 'about.stat.clients' as const },
];

export default function About() {
  const { t } = useLang();
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(statsConfig.map(() => 0));

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

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCounts(statsConfig.map(s => Math.round(s.target * ease)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
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
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}
          >
            <img
              src="/works/Void/void1.png"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
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
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--leading-snug)',
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {t('about.heading')}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            {t('about.body')}
          </p>

          {/* Tools */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: '16px' }}
            >
              {t('about.tools')}
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
                    fontFamily: 'var(--font-body)',
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
            ref={statsRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(20px, 4vw, 40px)',
              paddingTop: '24px',
            }}
          >
            {statsConfig.map((stat, i) => (
              <div key={stat.labelKey}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    color: 'var(--color-accent)',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {counts[i]}{stat.suffix}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--color-text-muted)',
                    margin: '6px 0 0',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

