'use client';

import { useLang } from '../context/LanguageContext';

// ⚠️ PLACEHOLDER idézetek — cserélni a valós ügyfél-visszajelzésekre,
// amint megérkeznek (Simon's Burger, Special Effects, Sárkányvölgy).
const TESTIMONIALS = [
  { quoteKey: 'testi.1.quote' as const, role: "Simon's Burger" },
  { quoteKey: 'testi.2.quote' as const, role: 'Special Effects' },
  { quoteKey: 'testi.3.quote' as const, role: 'Sárkányvölgy' },
];

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        padding: 'var(--section-padding-v) var(--page-margin)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        {/* Heading — Outcrowd-os scrub betűanimációval */}
        <h2
          data-animate
          className="font-display"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            margin: '0 0 clamp(40px, 6vw, 72px)',
            maxWidth: '720px',
          }}
        >
          {t('testi.heading')}
        </h2>

        {/* Cards */}
        <div
          className="testi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(16px, 2vw, 24px)',
          }}
        >
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.role}
              style={{
                margin: 0,
                padding: 'clamp(28px, 3vw, 40px)',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '28px',
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.3vw, 18px)',
                  lineHeight: 1.6,
                  color: 'var(--color-text-primary)',
                }}
              >
                “{t(item.quoteKey)}”
              </blockquote>
              <figcaption>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: 'var(--color-accent)',
                  }}
                >
                  {item.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
