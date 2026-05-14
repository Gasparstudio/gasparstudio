'use client';

import { useEffect, useRef } from 'react';

const TEXT =
  'Brand design nem csak logót jelent. Olyan vizuális rendszereket épít, amelyek az első pillantásra elmondják, kik vagytok — és miért számítotok.';

export default function ValueProp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = TEXT.split(' ');

  useEffect(() => {
    const wordEls = wordsRef.current.filter(Boolean);
    if (!wordEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0,
      }
    );

    // Stagger: use scroll position to reveal words progressively
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // How far into the section we are (0 = top of section enters viewport, 1 = bottom leaves)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      const revealCount = Math.floor(progress * wordEls.length * 1.4);

      wordEls.forEach((el, i) => {
        if (i < revealCount) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="value-prop"
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
          marginBottom: '48px',
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
        02 · Miért én
      </div>

      {/* Word-by-word reveal text */}
      <div
        ref={containerRef}
        style={{
          maxWidth: '900px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), var(--font-body)',
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
          }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="word-reveal-word"
                style={{
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                {word}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
