'use client';

const logos: { src: string; alt: string; large?: boolean }[] = [
  { src: '/partners/Kamfor_logo_logotipia_white_png.png', alt: 'Kámfor' },
  { src: '/partners/se.png', alt: 'SE', large: true },
  { src: '/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp', alt: "Simon's Burger" },
  { src: '/partners/smashy .png', alt: 'Smashy' },
];

export default function Clients() {
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      style={{
        paddingTop: 'clamp(16px, 2vw, 24px)',
        paddingBottom: 'clamp(16px, 2vw, 24px)',
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
