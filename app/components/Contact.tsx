'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gáspár-bálint-042721195/', icon: 'in' },
  { label: 'Behance', href: 'https://www.behance.net/gasparbalint', icon: 'Be' },
];

export default function Contact() {
  const { t } = useLang();
  const containerRef = useRef<HTMLElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);

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
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            {t('contact.question')}
          </p>

          {/* Big email placeholder — fill in later */}
          <a
            href="mailto:hello@gasparstudio.hu"
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 72px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-muted)',
              margin: 0,
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            hello@gasparstudio.hu
          </a>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {t('contact.desc')}
        </p>


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
                fontFamily: 'var(--font-body)',
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
                  fontFamily: 'var(--font-display)',
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
