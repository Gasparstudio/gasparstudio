'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Munkák', href: '/works', isPage: true },
  { label: 'Rólam', href: '#about', isPage: false },
  { label: 'Kapcsolat', href: '#contact', isPage: false },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      {/* Desktop / Floating Pill Nav */}
      <nav
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-label="Main navigation"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 10px 10px 24px',
            borderRadius: '999px',
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)'}`,
            background: scrolled
              ? 'rgba(10, 10, 10, 0.92)'
              : 'rgba(17, 17, 17, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
              : '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Logo mark */}
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

          {/* Divider */}
          <span
            style={{
              width: '1px',
              height: '16px',
              background: 'var(--color-border)',
              marginRight: '8px',
            }}
          />

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
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
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
                    (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
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

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn btn-primary hidden md:inline-flex"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            Írj nekem →
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
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'var(--color-text-primary)',
                borderRadius: '2px',
                transition: 'all 300ms ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'var(--color-text-primary)',
                borderRadius: '2px',
                transition: 'all 300ms ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'var(--color-text-primary)',
                borderRadius: '2px',
                transition: 'all 300ms ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
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
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = 'var(--color-text-primary)';
              }}
            >
              {link.label}
            </button>
          )
        )}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          className="btn btn-primary"
          style={{ marginTop: '32px', fontSize: '16px', padding: '16px 36px' }}
        >
          Írj nekem →
        </a>
      </div>
    </>
  );
}

