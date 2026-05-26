'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';

export default function ValueProp() {
  const { t } = useLang();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const statRefs = useRef<HTMLDivElement[]>([]);

  const words = t('vp.text').split(' ');

  const stats = [
    { value: t('vp.stat1.value'), label: t('vp.stat1.label') },
    { value: t('vp.stat2.value'), label: t('vp.stat2.label') },
    { value: t('vp.stat3.value'), label: t('vp.stat3.label') },
  ];

  useEffect(() => {
    const wordEls = wordsRef.current.filter(Boolean);
    if (!wordEls.length) return;

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollRange = wrapper.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

      const revealCount = Math.floor(progress * wordEls.length);
      wordEls.forEach((el, i) => {
        el.style.color = i < revealCount
          ? 'var(--color-text-primary)'
          : 'var(--color-text-muted)';
      });

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.62 + i * 0.07;
        const p = Math.max(0, Math.min(1, (progress - start) / 0.2));
        el.style.opacity = String(p);
        el.style.transform = `translateY(${(1 - p) * 24}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }}>
      <section
        id="value-prop"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '900px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(22px, 3.5vw, 42px)',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
              }}
            >
              {words.map((word, i) => (
                <span key={i}>
                  <span
                    ref={(el) => { if (el) wordsRef.current[i] = el; }}
                    style={{
                      color: 'var(--color-text-muted)',
                      transition: 'color 150ms ease',
                    }}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>

            <div
              style={{
                marginTop: 'clamp(40px, 5vw, 64px)',
                display: 'flex',
                gap: 'clamp(32px, 6vw, 80px)',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { if (el) statRefs.current[i] = el; }}
                  style={{ opacity: 0, transform: 'translateY(24px)' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 52px)',
                      fontWeight: 600,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'var(--color-accent)',
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(12px, 1vw, 14px)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: '8px 0 0',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
