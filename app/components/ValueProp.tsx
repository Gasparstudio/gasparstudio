'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';

export default function ValueProp() {
  const { t } = useLang();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const words = t('vp.text').split(' ');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: isMobile ? '200vh' : '300vh' }}>
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
                fontSize: 'clamp(20px, 5vw, 42px)',
                lineHeight: 1.4,
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

          </div>
        </div>
      </section>
    </div>
  );
}
