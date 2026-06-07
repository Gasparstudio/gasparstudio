'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LanguageContext';

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const navLinks = [
    { label: t('nav.works'),   href: '/works',    isPage: true },
    { label: t('nav.about'),   href: '/rolam',    isPage: true },
    { label: t('nav.contact'), href: '#contact',  isPage: false },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const [hovered, setHovered] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  return (
    <>
      {/* ── Floating Pill Nav ─────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
        aria-label="Main navigation"
      >
        {/* ── Glass shell ───────────────────────────────────────── */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            background: scrolled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
            backdropFilter: 'blur(5px) saturate(80%) brightness(1.06)',
            WebkitBackdropFilter: 'blur(5px) saturate(80%) brightness(1.06)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(255,255,255,0.04)'
              : '0 4px 24px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.16)',
            transition: 'background 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Layer 1 — noise grain */}
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

          {/* Layer 2 — flat border */}
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

          {/* ── Actual nav content ────────────────────────────── */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 10px 10px 24px',
            }}
          >
            {/* Logo */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.08em',
                marginRight: '8px',
              }}
            >
              GASPAR
            </span>

            {/* Nav links — hidden on mobile */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '4px' }}>
              {navLinks.map((link) =>
                link.isPage ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 500,
                      padding: '8px 14px',
                      borderRadius: '999px',
                      cursor: 'none',
                      textDecoration: 'none',
                      transition: 'color 200ms ease, background 200ms ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 500,
                      padding: '8px 14px',
                      borderRadius: '999px',
                      cursor: 'none',
                      transition: 'color 200ms ease, background 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.color = 'var(--color-text-primary)';
                      (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
                      (e.target as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            {/* CTA button */}
            <a
              href="/arajanlat"
              className="btn btn-primary hidden md:inline-flex"
              style={{ fontSize: '13px', padding: '10px 20px' }}
            >
              {t('nav.cta')}
            </a>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
              }}
            >
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--color-text-primary)', borderRadius: '2px', transition: 'all 300ms ease', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--color-text-primary)', borderRadius: '2px', transition: 'all 300ms ease', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--color-text-primary)', borderRadius: '2px', transition: 'all 300ms ease', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay ─────────────────────────── */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-bg)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navLinks.map((link, i) =>
          link.isPage ? (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 12vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'color 200ms ease',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 60}ms`,
                lineHeight: 1.1,
                display: 'block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
            >
              {link.label}
            </Link>
          ) : (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 12vw, 80px)',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'color 200ms ease',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 60}ms`,
                lineHeight: 1.1,
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = 'var(--color-text-primary)'; }}
            >
              {link.label}
            </button>
          )
        )}

        <button
          onClick={toggle}
          style={{
            marginTop: '16px',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '999px',
            padding: '8px 20px',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
        >
          {lang === 'hu' ? 'Switch to English' : 'Váltás magyarra'}
        </button>

        <a
          href="/arajanlat"
          className="btn btn-primary"
          style={{ marginTop: '16px', fontSize: '16px', padding: '16px 36px' }}
        >
          {t('nav.cta')}
        </a>
      </div>
    </>
  );
}
