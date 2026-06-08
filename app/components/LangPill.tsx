'use client';

import Link from 'next/link';
import { useLang } from '../context/LanguageContext';

const GLASS: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(5px) saturate(80%) brightness(1.06)',
  WebkitBackdropFilter: 'blur(5px) saturate(80%) brightness(1.06)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(255,255,255,0.04)',
  display: 'flex',
  alignItems: 'center',
};

const NOISE = (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundSize: '180px 180px',
      opacity: 0.02,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

const BORDER = (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      border: '1px solid rgba(255,255,255,0.10)',
      pointerEvents: 'none',
      zIndex: 1,
    }}
  />
);

const INNER: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

export default function LangPill() {
  const { lang, toggle, t } = useLang();

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        zIndex: 1001,
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* Contact pill */}
      <div style={GLASS}>
        {NOISE}
        {BORDER}
        <Link
          href="/arajanlat"
          style={{
            ...INNER,
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            cursor: 'none',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
        >
          Írj nekem →
        </Link>
      </div>

      {/* Language pill */}
      <div style={GLASS}>
        {NOISE}
        {BORDER}
        <button
          onClick={toggle}
          style={{
            ...INNER,
            gap: '4px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'none',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
        >
          <span style={{ opacity: lang === 'hu' ? 1 : 0.35, transition: 'opacity 200ms' }}>HU</span>
          <span style={{ opacity: 0.25, margin: '0 1px' }}>/</span>
          <span style={{ opacity: lang === 'en' ? 1 : 0.35, transition: 'opacity 200ms' }}>EN</span>
        </button>
      </div>
    </div>
  );
}
