'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomCursor from '../../components/CustomCursor';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

const PM = 'var(--page-margin)';

const LOGOS = [
  {
    src: '/partners/sarkanyvolgy_2-02.png',
    name: 'Sárkányvölgy Mesefesztivál',
    desc: 'Children\'s storytelling festival identity. Playful dragon motif with a hand-crafted, fairytale warmth.',
    category: 'Emblem', year: '2023',
    height: 140,
    invert: true,
    link: '',
  },
  {
    src: '/works/logofolio/logos/face_logo-02.png',
    name: 'FACE',
    desc: 'Bold identity for a creative collective. A geometric lettermark balancing symmetry and tension.',
    category: 'Lettermark', year: '2026',
    height: 185,
    invert: 'color',
    opacity: 0.62,
    link: '/works/face',
  },
  {
    src: '/works/logofolio/logos_tight/onyx.png',
    name: 'Onyx',
    desc: 'Luxury positioning. Single-weight logic with a jeweller\'s precision.',
    category: 'Wordmark', year: '2024',
    height: 120,
  },
  {
    src: '/works/logofolio/logos_tight/kamfor-babszinhaz.png',
    name: 'Kámfor Bábszínház',
    desc: 'Puppet theatre identity. Playful yet grounded — warmth in the letterforms, story in the mark.',
    category: 'Logotype', year: '2022',
    height: 120,
    link: 'https://kamforbabszinhaz.hu',
    linkExternal: true,
  },
  {
    src: '/works/logofolio/logos/mozzano_logo2.png',
    name: 'Mozzano',
    desc: 'Italian pizza restaurant brand. Warm, confident wordmark with a craft-food sensibility.',
    category: 'Wordmark', year: '2026',
    height: 28,
    invert: 'color',
    opacity: 0.62,
    link: '/works/mozzano',
  },
  {
    src: '/works/logofolio/logos_tight/kanvas.png',
    name: 'Kanvas',
    desc: 'Art and design platform. Open, expressive — a blank canvas implicit in every form.',
    category: 'Wordmark', year: '2024',
    height: 72,
    link: 'https://kanvasglobal.com',
    linkExternal: true,
  },
  {
    src: '/works/logofolio/logos_tight/yoda-creation.png',
    name: 'Yoda Creation',
    desc: 'Creative studio identity. Wordmark built around geometric balance and deliberate negative space.',
    category: 'Wordmark', year: '2023',
    height: 72,
  },
  {
    src: '/works/logofolio/logos_tight/poker-nomix.png',
    name: 'Poker Nomix',
    desc: 'Gaming and card culture brand. Sharp angles, bold contrast, edge-heavy letterforms.',
    category: 'Logotype', year: '2023',
    height: 72,
  },
  {
    src: '/works/logofolio/logos_tight/vajda-works.png',
    name: 'Vajda Works',
    desc: 'Industrial craftsmanship studio. Structured and minimal — built to last.',
    category: 'Monogram', year: '2022',
    height: 120,
  },
  {
    src: '/works/logofolio/logos_tight/college-cuber.png',
    name: 'College Cuber',
    desc: 'Speedcubing community mark. Cube geometry fused with competitive energy.',
    category: 'Emblem', year: '2022',
    height: 170,
  },
  {
    src: '/works/logofolio/logos_tight/b-brand.png',
    name: 'B Brand',
    desc: 'Personal brand identity. Clean and adaptable lettermark for a multidisciplinary creative.',
    category: 'Lettermark', year: '2023',
    height: 134,
  },
  {
    src: '/works/logofolio/logos_tight/magic-potion.png',
    name: 'Magic Potion',
    desc: 'Fantasy lifestyle brand. Illustrative approach with hand-feel texture and an otherworldly tone.',
    category: 'Illustration mark', year: '2023',
    height: 170,
  },
  {
    src: '/works/logofolio/logos_tight/ox-bow.png',
    name: 'Ox-Bow',
    desc: 'Outdoor and adventure identity. Rugged geometry, land-inspired palette, endurance built in.',
    category: 'Emblem', year: '2023',
    height: 170,
  },
  {
    src: '/works/logofolio/logos_tight/sushi-million.png',
    name: 'Sushi Million',
    desc: 'Japanese dining brand. Minimal forms, cultural tension between precision and abundance.',
    category: 'Wordmark', year: '2024',
    height: 120,
  },
  {
    src: '/works/logofolio/logos_tight/emotion-build.png',
    name: 'Emotion Build',
    desc: 'Construction and interior brand. Structural rigidity meets emotional warmth.',
    category: 'Logotype', year: '2023',
    height: 170,
  },
];

function LogoRow({ logo, index }: { logo: (typeof LOGOS)[0]; index: number }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(`logo-row-${index}`);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <>
      {index === 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
      )}
      <div
        id={`logo-row-${index}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          padding: '72px 0',
          alignItems: 'center',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(32px)',
          transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
        }}
      >
        {/* Logo image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <img
            src={logo.src}
            alt={logo.name}
            style={{
              maxWidth: '100%',
              maxHeight: `${logo.height}px`,
              objectFit: 'contain',
              filter: logo.invert === true
                ? 'invert(1) brightness(0.75)'
                : logo.invert === 'color'
                  ? 'grayscale(1) brightness(100)'
                  : undefined,
              opacity: logo.opacity ?? 1,
            }}
          />
        </div>

        {/* Text */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              fontWeight: 500,
              color: '#fff',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}
          >
            {logo.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 16px',
              maxWidth: '380px',
            }}
          >
            {logo.desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                margin: 0,
              }}
            >
              {logo.category}{'  '}{logo.year}
            </p>
            {'link' in logo && (
              <Link
                href={logo.link || '#'}
                target={logo.linkExternal ? '_blank' : undefined}
                rel={logo.linkExternal ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px 4px 8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'border-color 250ms ease, color 250ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                }}
              >
                <span style={{ fontSize: '11px' }}>↗</span>
                Projekt
              </Link>
            )}
          </div>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
    </>
  );
}

export default function LogofolioPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <CustomCursor />
      <style>{`
        @media (max-width: 640px) {
          .lf-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lf-logo-cell { padding: 24px !important; }
        }
      `}</style>

      <Nav />

      {/* Header */}
      <div
        style={{
          paddingTop: 'clamp(120px, 18vh, 180px)',
          paddingBottom: '80px',
          paddingLeft: PM,
          paddingRight: PM,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 500,
            color: '#fff',
            margin: '0 0 24px',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Logofolio
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
            maxWidth: '520px',
          }}
        >
          A collection of logomarks, wordmarks, and brand identities — each built around a single clear idea.
        </p>
      </div>

      {/* Logo list */}
      <div style={{ paddingLeft: PM, paddingRight: PM, paddingBottom: '120px' }}>
        {LOGOS.map((logo, i) => (
          <LogoRow key={logo.src} logo={logo} index={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
