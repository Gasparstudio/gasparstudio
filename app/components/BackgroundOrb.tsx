'use client';

export default function BackgroundOrb() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Primary orb */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '25%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(110,110,110,0.13) 0%, rgba(60,60,60,0.06) 45%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-float 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Secondary smaller orb for depth */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(90,90,90,0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'orb-float 30s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
