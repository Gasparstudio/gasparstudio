'use client';

import { useLang } from '../context/LanguageContext';

const logos: { src: string; alt: string; large?: boolean }[] = [
  { src: '/partners/Kamfor_logo_logotipia_white_png.png', alt: 'Kámfor' },
  { src: '/partners/se.png', alt: 'SE', large: true },
  { src: '/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp', alt: "Simon's Burger" },
  { src: '/partners/smashy .png', alt: 'Smashy' },
];

export default function Clients() {
  const { t } = useLang();
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      style={{
        paddingTop: 'clamp(32px, 4vw, 48px)',
        paddingBottom: 'clamp(32px, 4vw, 48px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Section label */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(20px, 3vw, 32px)',
        }}
      >
        <span
          className="section-label"
          style={{
            display: 'inline-flex',
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
          {t('clients.label')}
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              background: 'var(--color-accent)',
            }}
          />
        </span>
      </div>

      {/* Fade edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 'clamp(70px, 10vw, 96px)',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 12%, transparent 88%, var(--color-bg) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(48px, 6vw, 96px)',
          width: 'max-content',
          animation: 'marquee 24s linear infinite',
          willChange: 'transform',
        }}
      >
        {track.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            style={{
              height: logo.large ? 'clamp(56px, 6.5vw, 88px)' : 'clamp(28px, 3vw, 44px)',
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.35,
              transition: 'opacity 300ms ease',
              userSelect: 'none',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.opacity = '0.35';
            }}
          />
        ))}
      </div>
    </section>
  );
}
