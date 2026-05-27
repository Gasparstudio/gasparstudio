'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '../../data/projects';
import CustomCursor from '../../components/CustomCursor';
import Footer from '../../components/Footer';

const BLUE = '#1A7BFF';
const PM = 'var(--page-margin)';

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: BLUE,
};

const SEC = '8px';
const ARTBOARDS = [
  '/works/face/Artboard%201-03.png', '/works/face/Artboard%201-04.png',
  '/works/face/Artboard%201-05.png', '/works/face/Artboard%201-06.png',
  '/works/face/Artboard%201-07.png', '/works/face/Artboard%201-08.png',
  '/works/face/Artboard%201-09.png', '/works/face/Artboard%201-10.png',
  '/works/face/Artboard%201-11.png', '/works/face/Artboard%201-12.png',
  '/works/face/Artboard%201-13.png', '/works/face/Artboard%201-14.png',
];
const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const SECTIONS = [
  { id: 'logo',    label: 'Logo',     num: '01' },
  { id: 'colors',  label: 'Colors',   num: '02' },
  { id: 'type',    label: 'Type',     num: '03' },
  { id: 'mockups', label: 'Identity', num: '04' },
  { id: 'brief',   label: 'Brief',    num: '05' },
] as const;
const anim = (inView: boolean, delay = 0): React.CSSProperties => ({
  transform: inView ? 'translateY(0)' : 'translateY(48px)',
  opacity: inView ? 1 : 0,
  transition: `transform 1600ms ${EASE}, opacity 1600ms ${EASE}`,
  ...(delay ? { transitionDelay: `${delay}ms` } : {}),
});

export default function FacePage() {
  const [scrolled, setScrolled] = useState(false);
  const [pct, setPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('logo');
  const [artIdx, setArtIdx] = useState(0);
  const [precInView,        setPrecInView]        = useState(false);
  const [colorBlueInView,   setColorBlueInView]   = useState(false);
  const [colorBlackInView,  setColorBlackInView]  = useState(false);
  const [colorWhiteInView,  setColorWhiteInView]  = useState(false);
  const [mockupStmtInView,  setMockupStmtInView]  = useState(false);
  const [mockupCopyInView,  setMockupCopyInView]  = useState(false);
  const [briefInView,       setBriefInView]       = useState(false);
  const precRef       = useRef<HTMLDivElement>(null);
  const colorBlueRef  = useRef<HTMLDivElement>(null);
  const colorBlackRef = useRef<HTMLDivElement>(null);
  const colorWhiteRef = useRef<HTMLDivElement>(null);
  const mockupStmtRef = useRef<HTMLDivElement>(null);
  const mockupCopyRef = useRef<HTMLDivElement>(null);
  const briefRef      = useRef<HTMLDivElement>(null);

  const idx = projects.findIndex((p) => p.slug === 'face');
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setPct(dh > 0 ? (window.scrollY / dh) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setArtIdx(i => (i + 1) % ARTBOARDS.length), 200);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 152;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };

  useEffect(() => {
    const ids = ['logo', 'colors', 'type', 'mockups', 'brief'];
    const update = () => {
      const offset = 152;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) current = id;
      }
      // If the last section is visible anywhere in the viewport, activate it
      const lastEl = document.getElementById(ids[ids.length - 1]);
      if (lastEl) {
        const rect = lastEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > offset) current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const makeObs = (setter: (v: boolean) => void) =>
    new IntersectionObserver(([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
  useEffect(() => { const o = makeObs(setPrecInView);       if (precRef.current)       { o.observe(precRef.current);       return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setColorBlueInView);  if (colorBlueRef.current)  { o.observe(colorBlueRef.current);  return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setColorBlackInView); if (colorBlackRef.current) { o.observe(colorBlackRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setColorWhiteInView); if (colorWhiteRef.current) { o.observe(colorWhiteRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setMockupStmtInView); if (mockupStmtRef.current) { o.observe(mockupStmtRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setMockupCopyInView); if (mockupCopyRef.current) { o.observe(mockupCopyRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setBriefInView);      if (briefRef.current)      { o.observe(briefRef.current);      return () => o.disconnect(); } }, []);

  return (
    <>
      {/* SVG filter — removes white bg from logo, placed outside overflow:hidden sections */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="rmw" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 3 0" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1100, height: '2px', width: `${pct}%`, background: BLUE, transition: 'width 80ms linear', pointerEvents: 'none' }} />
      <CustomCursor />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${PM}`, height: '68px',
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 400ms ease',
      }}>
        <Link href="/works"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: '14px', textDecoration: 'none', transition: 'color 200ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
          ← Munkák
        </Link>
        <Link href="/"
          style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '0.08em', color: 'var(--color-text-primary)', textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          GASPAR
        </Link>
        <a href="/#contact" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Írj nekem →</a>
      </nav>

      <main style={{ paddingTop: '68px', background: '#000' }}>

        {/* ─── FLOATING TOC BANNER ───────────────────────────────── */}
        <div style={{ position: 'sticky', top: '76px', zIndex: 900, padding: `12px ${PM}`, pointerEvents: 'none' }}>
          <div style={{
            maxWidth: 'var(--max-width)', margin: '0 auto',
            background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px',
            padding: '0 20px', height: '52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            pointerEvents: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}>
            {/* Left: logo only */}
            <img src="/works/face/face_logo-04_v2-04.png" alt="Face"
              style={{ height: '18px', width: 'auto' }} />
            {/* Right: section links */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {SECTIONS.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{
                    background: activeSection === id ? 'rgba(26,123,255,0.12)' : 'transparent',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    padding: '6px 14px',
                    transition: 'background 250ms ease',
                  }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: activeSection === id ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'color 250ms' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── LOGO: CONSTRUCTION + RATIONALE ───────────────────── */}
        <section id="logo" style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '14px', alignItems: 'stretch' }}>

            {/* Construction grid */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', background: '#000' }}>
              <img src="/works/face/face_logo_1.png" alt="Logo construction grid"
                style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }} />
            </div>

            {/* Editorial copy — animated on scroll */}
            <div ref={precRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px, 3vw, 40px)' }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 650, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.25,
                transform: precInView ? 'translateY(0)' : 'translateY(48px)',
                opacity: precInView ? 1 : 0,
                transition: 'transform 1600ms cubic-bezier(0.16,1,0.3,1), opacity 1600ms cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '200ms',
              }}>
                Precision layered with fluidity. Structure that bends without breaking.
              </p>
              <p style={{
                marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7,
                transform: precInView ? 'translateY(0)' : 'translateY(48px)',
                opacity: precInView ? 1 : 0,
                transition: 'transform 1600ms cubic-bezier(0.16,1,0.3,1), opacity 1600ms cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '380ms',
              }}>
                The rounded terminals echo the softness of modern interfaces while the strict grid anchors it to the discipline of engineering.
              </p>
            </div>
          </div>
        </section>


        {/* ─── COLOR SYSTEM ──────────────────────────────────────── */}
        <section id="colors" style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* Face Blue — dominant panel */}
            <div ref={colorBlueRef} style={{ borderRadius: '14px', overflow: 'hidden', background: BLUE, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(220px, 28vw, 400px)' }}>
              {/* Left: copy */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(24px, 3vw, 44px)' }}>
                <div style={anim(colorBlueInView, 0)}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Face Blue</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>#1A7BFF</div>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 650, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.02em', maxWidth: '340px', ...anim(colorBlueInView, 200) }}>
                  Not navy, not sky. Face Blue sits at the intersection of authority and energy. The color of systems that work.
                </p>
              </div>
              {/* Right: logo mark */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vw, 56px)' }}>
                <img src="/works/face/face_logo-02.png" alt="" style={{ width: '55%', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
              </div>
            </div>

            {/* Black + White — side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

              {/* Black */}
              <div ref={colorBlackRef} style={{ borderRadius: '14px', overflow: 'hidden', background: '#0a0a0a', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(160px, 18vw, 260px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(20px, 2.5vw, 36px)' }}>
                  <div style={anim(colorBlackInView, 0)}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Black</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.18)', marginTop: '4px' }}>#000000</div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, ...anim(colorBlackInView, 200) }}>
                    The silence between signals. On black, the mark becomes an object.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 3vw, 40px)' }}>
                  <img src="/works/face/face_logo-02.png" alt="" style={{ width: '55%', height: 'auto', display: 'block' }} />
                </div>
              </div>

              {/* White */}
              <div ref={colorWhiteRef} style={{ borderRadius: '14px', overflow: 'hidden', background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(160px, 18vw, 260px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(20px, 2.5vw, 36px)' }}>
                  <div style={anim(colorWhiteInView, 0)}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>White</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(0,0,0,0.25)', marginTop: '4px' }}>#FFFFFF</div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(0,0,0,0.4)', lineHeight: 1.6, ...anim(colorWhiteInView, 200) }}>
                    Every bold idea starts here. White lets the mark breathe and never competes.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 3vw, 40px)' }}>
                  <img src="/works/face/face_logo-02.png" alt="" style={{ width: '55%', height: 'auto', display: 'block' }} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── TYPOGRAPHY ────────────────────────────────────────── */}
        <section id="type" style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

            {/* Two-column specimen */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

              {/* Sora — Display */}
              <div style={{ borderRadius: '14px', background: '#0a0a0a', padding: 'clamp(28px, 3vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'clamp(320px, 34vw, 500px)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', color: BLUE, textTransform: 'uppercase', marginBottom: '20px' }}>Sora</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 11vw, 168px)', fontWeight: 800, color: '#fff', lineHeight: 0.85, letterSpacing: '-0.04em' }}>Face</div>
                </div>
                <div>
                  {(['ExtraBold', 'Bold', 'SemiBold', 'Regular', 'Light'] as const).map((w, i) => (
                    <div key={w} style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(13px, 1.3vw, 16px)',
                      fontWeight: w === 'ExtraBold' ? 800 : w === 'Bold' ? 700 : w === 'SemiBold' ? 600 : w === 'Regular' ? 400 : 300,
                      color: `rgba(255,255,255,${0.72 - i * 0.11})`,
                      lineHeight: 1.9,
                    }}>{w}</div>
                  ))}
                </div>
              </div>

              {/* DM Sans — Body */}
              <div style={{ borderRadius: '14px', background: '#0a0a0a', padding: 'clamp(28px, 3vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'clamp(320px, 34vw, 500px)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', color: BLUE, textTransform: 'uppercase', marginBottom: '20px' }}>DM Sans</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px, 2.2vw, 30px)', fontWeight: 500, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                    System-built.<br />Interface-tested.<br />Human-approved.
                  </p>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(255,255,255,0.22)', lineHeight: 1.8, letterSpacing: '0.02em' }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  0123456789 &amp;.,!?@#
                </div>
              </div>
            </div>

            {/* Type scale */}
            <div style={{ marginTop: '10px', borderRadius: '14px', background: '#0a0a0a', padding: 'clamp(24px, 3vw, 40px)', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: '20px' }}>Type Scale</div>
              {([
                { label: 'Hero',    size: 'clamp(44px, 6.5vw, 88px)', weight: 800, text: 'Identity',                               font: 'var(--font-display)', tracking: '-0.04em' },
                { label: 'H1',      size: 'clamp(30px, 4vw, 56px)',   weight: 700, text: 'Brand Design',                           font: 'var(--font-display)', tracking: '-0.03em' },
                { label: 'H2',      size: 'clamp(20px, 2.6vw, 36px)', weight: 650, text: 'Visual Systems',                         font: 'var(--font-display)', tracking: '-0.02em' },
                { label: 'Body',    size: '18px',                      weight: 400, text: 'The mark that holds from 16px to 16 metres.', font: 'var(--font-body)', tracking: '0' },
                { label: 'Caption', size: '11px',                      weight: 400, text: 'FACE · BRAND IDENTITY · 2026',           font: 'var(--font-body)',    tracking: '0.12em' },
              ] as { label: string; size: string; weight: number; text: string; font: string; tracking: string }[]).map(({ label, size, weight, text, font, tracking }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', width: '52px', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: font, fontSize: size, fontWeight: weight, color: '#fff', lineHeight: 1.05, letterSpacing: tracking, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── MOCKUPS ───────────────────────────────────────────── */}
        <section id="mockups" style={{ padding: `0 ${PM} ${SEC}` }}>
          <div ref={mockupStmtRef} style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            {/* Statement */}
            <p style={{ marginTop: '20px', fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 650, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.75)', maxWidth: '640px', lineHeight: 1.3, ...anim(mockupStmtInView, 200) }}>
              A brand isn't real until it lives in the world. Every material, texture, and surface was considered.
            </p>

          </div>

          {/* Mockup 1 — full width strip */}
          <div style={{ marginTop: '20px', width: '100%', borderRadius: '14px', overflow: 'hidden' }}>
            <img
              src="/works/face/mockup_02_v2.png"
              alt="Mockup"
              style={{ width: '100%', height: 'clamp(200px, 28vw, 380px)', objectFit: 'cover', objectPosition: '50% 22%', display: 'block' }}
            />
          </div>

          <div style={{ maxWidth: 'var(--max-width)', margin: '12px auto 0', width: '100%', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '12px', alignItems: 'center' }}>

            {/* Copy */}
            <div ref={mockupCopyRef} style={{ padding: 'clamp(16px, 2vw, 32px) 0' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, ...anim(mockupCopyInView, 200) }}>
                Clean enough to cut<br />through concrete.
              </p>
              <p style={{ marginTop: '16px', fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: '72%', ...anim(mockupCopyInView, 380) }}>
                The identity system was built to scale without friction. From a business card corner to a building façade, the mark carries the same authority. No adaptations, no compromises.
              </p>
              <p style={{ marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.25)', lineHeight: 1.75, maxWidth: '72%', ...anim(mockupCopyInView, 500) }}>
                Applied to wayfinding, environmental graphics, and architectural signage, Face blue reads with the same precision it holds at 16 pixels.
              </p>
            </div>

            {/* mockup_01 only */}
            <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/works/face/mockup_01.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

          </div>

          <div style={{ maxWidth: 'var(--max-width)', margin: '10px auto 0', width: '100%', display: 'grid', gridTemplateColumns: '8fr 8fr 3fr', gap: '12px' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '3/2' }}>
              <img src="/works/face/mockup_05.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '3/2' }}>
              <img src="/works/face/mockup_06.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* 9:16 carousel — same height, narrower */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '9/16', position: 'relative' }}>
              {ARTBOARDS.map((src, i) => (
                <img key={src} src={src} alt="" style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center', display: 'block',
                  opacity: i === artIdx ? 1 : 0,
                  transition: 'opacity 300ms ease',
                }} />
              ))}
            </div>
          </div>

          {/* Laptop mockup */}
          <div style={{ maxWidth: 'var(--max-width)', margin: '10px auto 0', width: '100%', borderRadius: '14px', overflow: 'hidden' }}>
            <img src="/works/face/mockup_03.png?v=3" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

        </section>

        {/* ─── BRIEF ─────────────────────────────────────────────── */}
        <section id="brief" style={{ padding: `clamp(48px, 6vw, 80px) ${PM}` }}>
          <div ref={briefRef} style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'start' }}>

            <div style={{ maxWidth: '92%' }}>
              {([
                ['Client',       'Face'],
                ['Industry',     'Tech / App'],
                ['Year',         '2026'],
                ['Scope',        'Brand Identity'],
                ['Deliverables', 'Logo mark · Color system · Typography · Print · Digital'],
              ] as [string,string][]).map(([label, value], i) => (
                <div key={label} style={{ padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', ...anim(briefInView, i * 100) }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.68)', textAlign: 'right', lineHeight: 1.5 }}>{value}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, ...anim(briefInView, 200) }}>
                Face needed more than a logo.<br />They needed a system.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.55, marginTop: '16px', maxWidth: '72%', ...anim(briefInView, 380) }}>
                An identity precise enough to signal authority in enterprise, bold enough to cut through the noise of a saturated tech market.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.25)', lineHeight: 1.55, marginTop: '12px', maxWidth: '72%', ...anim(briefInView, 500) }}>
                The brief: build a mark that holds at 16px and at 16 metres. One that works on a dark interface, a white business card, and an exterior façade equally. Without compromise.
              </p>
            </div>

          </div>
        </section>

        {/* ─── PROJECT NAV ───────────────────────────────────────── */}
        <div style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            {prev ? (
              <Link href={`/works/${prev.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', textDecoration: 'none', color: 'var(--color-text-secondary)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>← Előző</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 650, color: '#fff', letterSpacing: '-0.01em' }}>{prev.title}</span>
              </Link>
            ) : <div />}
            <Link href="/works"
              style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
              Összes munka
            </Link>
            {next ? (
              <Link href={`/works/${next.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'right', textDecoration: 'none', color: 'var(--color-text-secondary)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Következő →</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 650, color: '#fff', letterSpacing: '-0.01em' }}>{next.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function MockupCard({ src, label }: { src: string; label: string }) {
  return (
    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
      <img src={src} alt={label} style={{ width: '100%', height: 'auto', display: 'block' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em' }}>{label}</span>
      </div>
    </div>
  );
}

function PlaceholderCard({ label, desc, fullWidth }: { label: string; desc: string; fullWidth?: boolean }) {
  return (
    <div style={{
      gridColumn: fullWidth ? '1 / -1' : undefined,
      borderRadius: '12px',
      border: '1px dashed rgba(26,123,255,0.28)',
      background: 'rgba(26,123,255,0.03)',
      padding: 'clamp(32px, 4vw, 48px) clamp(20px, 3vw, 36px)',
      display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center',
      minHeight: fullWidth ? '140px' : '220px',
    }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(26,123,255,0.5)' }}>[ Mockup szükséges ]</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px, 1.6vw, 20px)', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.65, maxWidth: '440px' }}>{desc}</span>
    </div>
  );
}
