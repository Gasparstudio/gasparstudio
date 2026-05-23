'use client';

import { useLang } from '../context/LanguageContext';

const logos: { src: string; alt: string; large?: boolean; medium?: boolean }[] = [
  { src: '/partners/Kamfor_logo_logotipia_white_png.png', alt: 'Kámfor' },
  { src: '/partners/se.png', alt: 'SE', large: true },
  { src: '/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp', alt: "Simon's Burger" },
  { src: '/partners/smashy .png', alt: 'Smashy' },
  { src: '/partners/sarkanyvolgy_2-02.png', alt: 'Sárkányvölgy', medium: true },
  { src: '/partners/buddys.png', alt: 'Buddy\'s' },
  { src: '/partners/trav.png', alt: 'Trav' },
];


export default function StickyClientsFooter() {
  const { t } = useLang();
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 10, 0.90)',
        backdropFilter: 'blur(16px) saturate(80%)',
        WebkitBackdropFilter: 'blur(16px) saturate(80%)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Clients marquee */}
      <div
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.90) 0%, transparent 10%, transparent 90%, rgba(10,10,10,0.90) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Marquee track */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(24px, 3vw, 48px)',
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
                height: logo.large ? 'clamp(40px, 5vw, 56px)' : logo.medium ? 'clamp(30px, 3.8vw, 44px)' : 'clamp(22px, 2.6vw, 34px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.55,
                transition: 'opacity 300ms ease',
                userSelect: 'none',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.55';
              }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
