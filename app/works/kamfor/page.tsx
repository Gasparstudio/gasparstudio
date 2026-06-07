'use client';

import { useEffect, useRef, useState } from 'react';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import Nav from '../../components/Nav';

const GREEN  = '#4A7C4E';
const CREAM  = '#F5F0E8';
const BG     = '#0d1a0d';
const PM     = 'var(--page-margin)';
const EASE   = 'cubic-bezier(0.16,1,0.3,1)';

const SECTIONS = [
  { id: 'logo',    label: 'Logó',       num: '01' },
  { id: 'colors',  label: 'Színek',     num: '02' },
  { id: 'type',    label: 'Tipográfia', num: '03' },
  { id: 'gallery', label: 'Arculat',    num: '04' },
  { id: 'brief',   label: 'Brief',      num: '05' },
] as const;

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const anim = (inView: boolean, delay = 0): React.CSSProperties => ({
  transform: inView ? 'translateY(0)' : 'translateY(48px)',
  opacity: inView ? 1 : 0,
  transition: `transform 1200ms ${EASE} ${delay}ms, opacity 1200ms ${EASE} ${delay}ms`,
});

export default function KamforPage() {
  const [activeSection, setActiveSection] = useState<string>('logo');

  const logoRef    = useRef<HTMLDivElement>(null);
  const colorsRef  = useRef<HTMLDivElement>(null);
  const typeRef    = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const briefRef   = useRef<HTMLDivElement>(null);

  const logoInView    = useInView(logoRef as React.RefObject<HTMLElement>);
  const colorsInView  = useInView(colorsRef as React.RefObject<HTMLElement>);
  const typeInView    = useInView(typeRef as React.RefObject<HTMLElement>);
  const galleryInView = useInView(galleryRef as React.RefObject<HTMLElement>);
  const briefInView   = useInView(briefRef as React.RefObject<HTMLElement>);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const sections = [
      { id: 'logo',    ref: logoRef },
      { id: 'colors',  ref: colorsRef },
      { id: 'type',    ref: typeRef },
      { id: 'gallery', ref: galleryRef },
      { id: 'brief',   ref: briefRef },
    ];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { threshold: 0.4 });
    sections.forEach(({ id, ref }) => {
      if (ref.current) { ref.current.id = id; obs.observe(ref.current); }
    });
    return () => obs.disconnect();
  }, []);

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <CustomCursor />
      <Nav />

      {/* ── Hero ───────────────────────────────────────────── */}
      <div style={{
        minHeight: '100vh', background: BG,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: `120px ${PM} clamp(60px, 8vw, 100px)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background texture blobs */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 70% 40%, ${GREEN}18, transparent)`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: '0 0 20px' }}>
            Brand Identity · 2022
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 140px)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.9,
            color: CREAM, margin: '0 0 32px',
          }}>
            Kámfor<br />Bábszínház
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.7, color: 'rgba(245,240,232,0.5)',
            maxWidth: '480px', margin: 0,
          }}>
            Teljes arculat egy bodajki bábszínháznak — logótól a nyomtatott anyagokig.
          </p>
        </div>

        {/* Scroll hint */}
        <p style={{
          position: 'absolute', bottom: '32px', right: PM,
          fontFamily: 'var(--font-body)', fontSize: '10px',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.25)',
        }}>
          Scroll ↓
        </p>
      </div>

      {/* ── Side nav ───────────────────────────────────────── */}
      <div className="hidden md:flex" style={{
        position: 'fixed', top: '50%', right: '28px',
        transform: 'translateY(-50%)', zIndex: 100,
        flexDirection: 'column', gap: '6px',
      }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scroll(s.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: activeSection === s.id ? CREAM : 'rgba(245,240,232,0.25)',
              transition: 'color 300ms ease',
            }}>{s.label}</span>
            <span style={{
              display: 'block', width: activeSection === s.id ? '20px' : '8px', height: '1px',
              background: activeSection === s.id ? GREEN : 'rgba(245,240,232,0.2)',
              transition: 'width 300ms ease, background 300ms ease',
            }} />
          </button>
        ))}
      </div>

      <div style={{ background: BG, color: CREAM }}>

        {/* ── 01 LOGO ────────────────────────────────────────── */}
        <section ref={logoRef} style={{ padding: `clamp(80px, 12vw, 140px) ${PM}`, borderTop: `1px solid rgba(245,240,232,0.06)` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'clamp(48px, 7vw, 80px)', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: 0 }}>01 — Logó</p>
          </div>

          {/* Logo showcase */}
          <div ref={logoRef as unknown as React.RefObject<HTMLDivElement>} style={{ ...anim(logoInView), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(12px, 2vw, 24px)' }}>
            {/* Dark bg */}
            <div style={{
              background: BG, border: `1px solid rgba(245,240,232,0.08)`,
              borderRadius: '16px', padding: 'clamp(40px, 6vw, 80px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              aspectRatio: '4 / 3',
            }}>
              <img src="/works/logofolio/logos_tight/kamfor-babszinhaz.png" alt="Kámfor logo" style={{ width: '70%', maxWidth: '280px', objectFit: 'contain', filter: 'invert(0.85) sepia(0.2) hue-rotate(60deg)' }} />
            </div>
            {/* Light bg */}
            <div style={{
              background: CREAM, borderRadius: '16px', padding: 'clamp(40px, 6vw, 80px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              aspectRatio: '4 / 3',
            }}>
              <img src="/works/logofolio/logos_tight/kamfor-babszinhaz.png" alt="Kámfor logo dark" style={{ width: '70%', maxWidth: '280px', objectFit: 'contain' }} />
            </div>
          </div>
        </section>

        {/* ── 02 COLORS ──────────────────────────────────────── */}
        <section ref={colorsRef} style={{ padding: `clamp(80px, 12vw, 140px) ${PM}`, borderTop: `1px solid rgba(245,240,232,0.06)` }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: '0 0 clamp(48px, 7vw, 80px)' }}>02 — Színek</p>

          <div style={{ ...anim(colorsInView), display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(12px, 2vw, 20px)' }}>
            {[
              { name: 'Erdő', hex: '#3B6B3F', pantone: 'PMS 7726 C' },
              { name: 'Réz',  hex: '#C8441A', pantone: 'PMS 173 C'  },
              { name: 'Krém', hex: '#F5F0E8', pantone: 'PMS 9184 C' },
              { name: 'Éj',   hex: '#0d1a0d', pantone: 'PMS 7547 C' },
            ].map((c) => (
              <div key={c.hex}>
                <div style={{ height: 'clamp(120px, 16vw, 200px)', borderRadius: '12px', background: c.hex, marginBottom: '16px' }} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 600, color: CREAM, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{c.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(245,240,232,0.35)', margin: '0 0 2px', textTransform: 'uppercase' }}>{c.hex}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.06em', color: 'rgba(245,240,232,0.2)', margin: 0 }}>{c.pantone}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 TYPOGRAPHY ──────────────────────────────────── */}
        <section ref={typeRef} style={{ padding: `clamp(80px, 12vw, 140px) ${PM}`, borderTop: `1px solid rgba(245,240,232,0.06)` }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: '0 0 clamp(48px, 7vw, 80px)' }}>03 — Tipográfia</p>

          <div style={{ ...anim(typeInView), display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 7vw, 80px)' }}>
            {/* Playfair Display */}
            <div style={{ borderTop: `1px solid rgba(245,240,232,0.08)`, paddingTop: 'clamp(32px, 4vw, 48px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'start' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', margin: '0 0 8px' }}>Display</p>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, color: CREAM, margin: '0 0 4px' }}>Playfair Display</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.35)', margin: 0 }}>Serif · Google Fonts</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 700, color: CREAM, letterSpacing: '-0.02em', lineHeight: 0.9, margin: '0 0 clamp(20px, 3vw, 32px)' }}>
                    Aa Bb Cc
                  </p>
                  <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 48px)', flexWrap: 'wrap' }}>
                    {[['Bold', 700], ['Regular', 400]].map(([label, w]) => (
                      <div key={w}>
                        <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: Number(w), color: CREAM, margin: '0 0 4px', lineHeight: 1 }}>Kámfor</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(245,240,232,0.28)', letterSpacing: '0.08em', margin: 0, textTransform: 'uppercase' }}>{String(label)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lato */}
            <div style={{ borderTop: `1px solid rgba(245,240,232,0.08)`, paddingTop: 'clamp(32px, 4vw, 48px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'start' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', margin: '0 0 8px' }}>Body</p>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 600, color: CREAM, margin: '0 0 4px' }}>Lato</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.35)', margin: 0 }}>Sans-serif · Google Fonts</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 700, color: GREEN, letterSpacing: '-0.02em', lineHeight: 0.9, margin: '0 0 clamp(20px, 3vw, 32px)' }}>
                    Aa Bb Cc
                  </p>
                  <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 48px)', flexWrap: 'wrap' }}>
                    {[['Bold', 700], ['Regular', 400], ['Light', 300]].map(([label, w]) => (
                      <div key={w}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: Number(w), color: CREAM, margin: '0 0 4px', lineHeight: 1 }}>Bábszínház</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(245,240,232,0.28)', letterSpacing: '0.08em', margin: 0, textTransform: 'uppercase' }}>{String(label)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 GALLERY ─────────────────────────────────────── */}
        <section ref={galleryRef} style={{ padding: `clamp(80px, 12vw, 140px) ${PM}`, borderTop: `1px solid rgba(245,240,232,0.06)` }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: '0 0 clamp(48px, 7vw, 80px)' }}>04 — Arculat</p>

          <div style={{ ...anim(galleryInView), display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vw, 16px)' }}>
            {/* Full-width */}
            <img src="/works/kamfor/1.png" alt="" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />

            {/* 3-up */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(10px, 1.5vw, 16px)' }}>
              {['/works/kamfor/001.png', '/works/kamfor/002.png', '/works/kamfor/003.png'].map((src) => (
                <img key={src} src={src} alt="" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 BRIEF ───────────────────────────────────────── */}
        <section ref={briefRef} style={{ padding: `clamp(80px, 12vw, 140px) ${PM}`, borderTop: `1px solid rgba(245,240,232,0.06)` }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, margin: '0 0 clamp(48px, 7vw, 80px)' }}>05 — Brief</p>

          <div style={{ ...anim(briefInView), display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(24px, 4vw, 48px)' }}>
            {[
              { label: 'Ügyfél',     value: 'Kámfor Bábszínház' },
              { label: 'Kategória',  value: 'Brand Identity' },
              { label: 'Év',         value: '2022' },
              { label: 'Hatókör',    value: 'Logo, Nyomda, Arculat' },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderTop: `1px solid rgba(245,240,232,0.08)`, paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.28)', margin: '0 0 8px' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 22px)', color: CREAM, margin: 0, letterSpacing: '-0.01em' }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ ...anim(briefInView, 200), marginTop: 'clamp(48px, 7vw, 80px)', maxWidth: '640px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.75, color: 'rgba(245,240,232,0.55)', margin: 0 }}>
              A Kámfor Bábszínház egy bodajki független bábszínház, amely mesékkel és előadásokkal szólítja meg a gyerekeket. A feladat: meleg, játékos és megbízható identitást teremteni — amely egyszerre szól a gyerekeknek és a szülőknek.
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}
