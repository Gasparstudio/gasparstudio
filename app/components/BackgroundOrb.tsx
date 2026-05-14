'use client';

export default function BackgroundOrb() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '140vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* SVG grain filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="blob-noise" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="soft-light" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Blob 1 — nagy, bal felső */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-8%',
          width: '60vw',
          height: '60vw',
          borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
          background: 'radial-gradient(ellipse at 45% 45%, rgba(175,175,175,0.28) 0%, rgba(110,110,110,0.12) 45%, transparent 70%)',
          filter: 'blur(55px) url(#blob-noise)',
          animation: 'orb-float 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 — közepes, jobb felső */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-8%',
          width: '45vw',
          height: '45vw',
          borderRadius: '38% 62% 55% 45% / 48% 38% 62% 52%',
          background: 'radial-gradient(ellipse at 55% 45%, rgba(150,150,150,0.22) 0%, rgba(90,90,90,0.09) 50%, transparent 70%)',
          filter: 'blur(65px) url(#blob-noise)',
          animation: 'orb-float 28s ease-in-out infinite reverse',
          animationDelay: '-8s',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 — kis, közép */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '30%',
          width: '32vw',
          height: '32vw',
          borderRadius: '55% 45% 38% 62% / 42% 58% 42% 58%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(130,130,130,0.16) 0%, transparent 65%)',
          filter: 'blur(45px) url(#blob-noise)',
          animation: 'orb-float 17s ease-in-out infinite',
          animationDelay: '-4s',
          willChange: 'transform',
        }}
      />

      {/* Bottom fade to black */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)',
        }}
      />
    </div>
  );
}
