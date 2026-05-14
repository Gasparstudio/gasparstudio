'use client';

const socials = [
  { label: 'LI', href: '#', title: 'LinkedIn' },
  { label: 'Be', href: '#', title: 'Behance' },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '28px',
        paddingBottom: '28px',
        paddingLeft: 'var(--page-margin)',
        paddingRight: 'var(--page-margin)',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {/* Copyright */}
      <p
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        © 2026 GASPAR · Brand Designer · Budapest
      </p>

      {/* Social icons */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            title={social.title}
            aria-label={social.title}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-bebas)',
              fontSize: '11px',
              letterSpacing: '0.02em',
              textDecoration: 'none',
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
              el.style.color = 'var(--color-text-muted)';
              el.style.background = 'transparent';
            }}
          >
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
