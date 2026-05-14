'use client';

import { useEffect, useRef } from 'react';

const socials = [
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Behance', href: '#', icon: 'Be' },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'none';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition =
                'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        paddingTop: 'var(--section-padding-v)',
        paddingBottom: 'var(--section-padding-v)',
        paddingLeft: 'var(--page-margin)',
        paddingRight: 'var(--page-margin)',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Section label */}
      <div
        className="section-label"
        style={{
          marginBottom: '64px',
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
        05 · Kapcsolat
      </div>

      <div
        ref={contentRef}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        {/* CTA heading */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Van egy projektjük?
          </p>

          {/* Big email */}
          <a
            href="mailto:hello@gaspar.design"
            style={{
              display: 'block',
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 7vw, 100px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
            }}
          >
            hello@gaspar.design
          </a>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Legyen szó brand identitásról, vizuális rendszerről vagy kampányról — írj, és nézzük meg együtt, mit lehet alkotni.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:hello@gaspar.design"
          className="btn btn-primary"
          style={{ fontSize: '16px', padding: '18px 40px' }}
        >
          Írj nekem →
        </a>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            height: '1px',
            background: 'var(--color-border)',
          }}
        />

        {/* Social links */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                borderRadius: '999px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                textDecoration: 'none',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 'var(--text-small)',
                fontWeight: 500,
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--color-accent)';
                el.style.color = 'var(--color-accent)';
                el.style.background = 'var(--color-accent-muted)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--color-border)';
                el.style.color = 'var(--color-text-secondary)';
                el.style.background = 'var(--color-surface)';
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '1px solid currentColor',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '10px',
                  letterSpacing: '0.02em',
                  flexShrink: 0,
                }}
              >
                {social.icon}
              </span>
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Background decorative gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, var(--color-accent-muted) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </section>
  );
}
