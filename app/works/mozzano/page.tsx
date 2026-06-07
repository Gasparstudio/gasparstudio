'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';

const WARM = '#C8442A';
const BG   = '#ffffff';
const N    = 4;

const SLICES = [
  { name: 'Salami',          tagline: 'Just salami.\nYou\'re welcome.',            price: '$12' },
  { name: 'Quattro Formaggi',tagline: 'We asked how much cheese.\nThey said yes.', price: '$15' },
  { name: 'Pepperoni',       tagline: 'Everyone orders this.\nWe don\'t judge.',   price: '$14' },
  { name: 'Margherita',      tagline: 'Simple. Brutal.\nPerfect.',                 price: '$12' },
];

const FONTS = `
  @font-face {
    font-family: 'CabinetGrotesk';
    src: url('/works/mozzano/CabinetGrotesk_Complete/Fonts/WEB/CabinetGrotesk-Variable.woff2') format('woff2');
    font-weight: 100 900; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'ClashDisplay';
    src: url('/works/mozzano/ClashDisplay_Complete/Fonts/WEB/ClashDisplay-Variable.woff2') format('woff2');
    font-weight: 200 700; font-style: normal; font-display: swap;
  }
  @keyframes mozzFadeRight {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes mozzBounce {
    0%, 100% { transform: translateY(0);   opacity: 0.3; }
    50%       { transform: translateY(8px); opacity: 0.6; }
  }
`;

const POLAROIDS = [
  { src: '/works/mozzano/Artboard%201.png', rotate: '-5deg',  delay: 0   },
  { src: '/works/mozzano/Artboard%208.png', rotate: '2.5deg', delay: 80  },
  { src: '/works/mozzano/dobozos.png',       rotate: '-2deg',  delay: 160 },
];

const SOCIAL_IMGS = [
  '/works/mozzano/Artboard%203.png',
  '/works/mozzano/Artboard%206.png',
  '/works/mozzano/Artboard%207.png',
];

function SocialStatement() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(p => (p + 1) % SOCIAL_IMGS.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 'clamp(32px, 5vw, 80px)',
      alignItems: 'center', padding: 'clamp(56px, 10vw, 130px) 0',
      borderTop: '1px solid rgba(17,17,17,0.07)',
    }}>
      {/* Left — cycling image frame */}
      <div style={{
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(0,0,0,0.10)',
        aspectRatio: '4 / 5',
        background: '#f0ede8',
      }}>
        <img
          src={SOCIAL_IMGS[idx]}
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            opacity: visible ? 1 : 0,
            transition: 'opacity 350ms ease',
          }}
        />
      </div>

      {/* Right — text */}
      <div>
        <h2 style={{
          fontFamily: 'CabinetGrotesk, var(--font-display)',
          fontSize: 'clamp(32px, 5.5vw, 86px)',
          fontWeight: 800, color: '#111',
          letterSpacing: '-0.04em', lineHeight: 1.05,
          margin: '0 0 16px', maxWidth: '14ch',
        }}>
          Még nem uraltuk le az egész internetet.
        </h2>
        <p style={{
          fontFamily: 'CabinetGrotesk, var(--font-display)',
          fontSize: 'clamp(32px, 5.5vw, 86px)',
          fontWeight: 800, color: WARM,
          letterSpacing: '-0.04em', lineHeight: 1.05,
          margin: 0,
        }}>
          MÉG.
        </p>
      </div>

    </div>
  );
}

function PolaroidSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      margin: 'clamp(56px, 9vw, 120px) 0',
    }}>
      {POLAROIDS.map((p, i) => (
        <div key={i} style={{
          background: '#fff',
          padding: 'clamp(10px, 1.8vw, 22px) clamp(10px, 1.8vw, 22px) clamp(24px, 4vw, 44px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)',
          width: 'clamp(180px, 26vw, 320px)',
          flexShrink: 0,
          cursor: 'none',
          marginLeft: i > 0 ? 'clamp(-60px, -8vw, -100px)' : 0,
          zIndex: i,
          transform: inView
            ? `rotate(${p.rotate})`
            : `rotate(${p.rotate}) translateY(60px)`,
          opacity: inView ? 1 : 0,
          transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}ms, opacity 400ms ease ${p.delay}ms`,
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
            e.currentTarget.style.zIndex = '10';
            e.currentTarget.style.transition = 'transform 300ms cubic-bezier(0.16,1,0.3,1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = `rotate(${p.rotate})`;
            e.currentTarget.style.zIndex = String(i);
            e.currentTarget.style.transition = 'transform 300ms cubic-bezier(0.16,1,0.3,1)';
          }}
        >
          <img src={p.src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      ))}
    </div>
  );
}

export default function MozzanoPage() {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeSlice, setActiveSlice] = useState(0);

  const heroRef     = useRef<HTMLDivElement>(null);
  const pizzaRef    = useRef<HTMLImageElement>(null);
  const stepRef     = useRef(0);
  const cooldownRef = useRef(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // Lefelé: ha még nem értünk a végére
      if (goingDown && stepRef.current < N - 1) {
        e.preventDefault();
        if (cooldownRef.current) return;
        const newStep = stepRef.current + 1;
        stepRef.current = newStep;
        if (pizzaRef.current) pizzaRef.current.style.transform = `rotate(${newStep * 90}deg)`;
        setActiveSlice(newStep);
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, 520);
        return;
      }

      // Lefelé: az utolsó lépésnél engedjük tovább
      if (goingDown && stepRef.current >= N - 1) {
        stepRef.current = N;
        return;
      }

      // Felfelé: ha van visszafelé lépés (beleértve a "befejezett" N állapotot is)
      if (goingUp && stepRef.current > 0) {
        e.preventDefault();
        if (cooldownRef.current) return;
        // N állapotból visszalépünk N-1-re
        const newStep = Math.min(stepRef.current, N - 1) - 1;
        stepRef.current = newStep;
        if (pizzaRef.current) pizzaRef.current.style.transform = `rotate(${newStep * 90}deg)`;
        setActiveSlice(newStep);
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, 520);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <CustomCursor />
      <style>{FONTS}</style>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--page-margin)', height: '68px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(17,17,17,0.1)' : 'transparent'}`,
        transition: 'background 400ms ease, border-color 400ms ease',
      }}>
        <div style={{ flex: 1 }}>
          <Link href="/works"
            style={{ color: 'rgba(17,17,17,0.45)', fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'var(--text-small)', textDecoration: 'none', transition: 'color 200ms ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#111')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,17,0.45)')}
          >
            ← Vissza
          </Link>
        </div>
        <span style={{
          fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: '15px',
          fontWeight: 700, letterSpacing: '0.1em', color: '#111',
        }}>
          MOZZANO
        </span>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/arajanlat" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
            Írj nekem →
          </a>
        </div>
      </nav>

      {/* ── PIZZA HERO — 100vh, scroll-hijacked ── */}
      <div ref={heroRef} style={{ height: '100vh', background: BG, overflow: 'hidden' }}>
        <div style={{
          height: '100vh', background: BG,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>

          {/* LEFT — Logo (absolute so pizza rotation can't affect its position) */}
          <div style={{
            position: 'absolute',
            top: 'clamp(100px, 20vh, 200px)',
            left: 'var(--page-margin)',
            zIndex: 2,
          }}>
            <img
              src="/works/mozzano/mozzano_logo.png"
              alt="Mozzano"
              style={{ width: 'clamp(180px, 24vw, 380px)', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* CENTER — Pizza */}
          <img
            ref={pizzaRef}
            src="/works/mozzano/piza.png"
            alt="Mozzano pizza"
            style={{
              width:  'clamp(340px, 78vmin, 900px)',
              height: 'clamp(340px, 78vmin, 900px)',
              objectFit: 'contain',
              flexShrink: 0, zIndex: 1,
              filter: 'drop-shadow(0 24px 56px rgba(0,0,0,0.14))',
              transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          />

          {/* RIGHT — Slice info */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(100px, 20vh, 200px)',
            right: 'var(--page-margin)',
            zIndex: 2,
            maxWidth: '260px',
            textAlign: 'left',
          }}>
            <div
              key={activeSlice}
              style={{ animation: 'mozzFadeRight 500ms cubic-bezier(0.16,1,0.3,1) forwards' }}
            >
              <h2 style={{
                fontFamily: 'CabinetGrotesk, var(--font-display)',
                fontSize: 'clamp(24px, 3.2vw, 52px)',
                fontWeight: 800, color: '#111',
                letterSpacing: '-0.03em', margin: '0 0 0', lineHeight: 1.05,
              }}>
                {SLICES[activeSlice].name}
              </h2>
              <p style={{
                fontFamily: 'ClashDisplay, var(--font-body)',
                fontSize: 'clamp(11px, 1.1vw, 15px)',
                fontWeight: 400, color: 'rgba(17,17,17,0.45)',
                margin: '0 0 8px', lineHeight: 1.4, whiteSpace: 'pre-line',
              }}>
                {SLICES[activeSlice].tagline}
              </p>
              <p style={{
                fontFamily: 'CabinetGrotesk, var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 600, color: WARM,
                margin: '-20px 0 0', letterSpacing: '-0.01em',
              }}>
                {SLICES[activeSlice].price}
              </p>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '36px',
            fontFamily: 'ClashDisplay, var(--font-body)', fontSize: '10px',
            letterSpacing: '0.14em', color: 'rgba(17,17,17,0.28)',
            textTransform: 'uppercase',
            animation: 'mozzBounce 2.2s ease-in-out infinite',
          }}>
            Scroll ↓
          </div>
        </div>
      </div>

      {/* ── GALLERY ── */}
      <section style={{ background: BG, padding: '0 clamp(20px, 4vw, 56px)' }}>

        {/* 01 — Logo */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'center', paddingTop: 'clamp(56px, 8vw, 100px)',
        }}>
          <div>
            <h2 style={{ fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 14px' }}>
              Ez csak egy logó.
            </h2>
            <p style={{ fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(17,17,17,0.4)', margin: 0 }}>
              Jól néz ki, és ennyi.
            </p>
          </div>
          <img src="/works/mozzano/mozzano_logo.png" alt="Mozzano logo"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>

        {/* Polaroidok */}
        <PolaroidSection />

        {/* Social statement */}
        <SocialStatement />

        {/* Separator — hosszu_mozzano */}
        <img
          src="/works/mozzano/hosszu_mozzano.gif"
          alt=""
          style={{ width: '100%', display: 'block', height: 'auto' }}
        />

        {/* 02 — Szín */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'center', margin: 'clamp(48px, 7vw, 90px) 0' }}>
          <img src="/works/mozzano/Artboard%203.png" alt=""
            style={{ width: '100%', display: 'block', height: 'auto', borderRadius: '18px', transform: 'rotate(0.8deg)', boxShadow: '0 8px 36px rgba(0,0,0,0.07)' }} />
          <div style={{ padding: '0 clamp(16px, 3vw, 40px)' }}>
            <h2 style={{ fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: 'clamp(22px, 2.8vw, 44px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 12px' }}>
              Meleg.<br />Nyers.
            </h2>
            <p style={{ fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 15px)', color: 'rgba(17,17,17,0.4)', margin: 0, lineHeight: 1.5 }}>
              Nem véletlenszerű.<br />Pontosan ez volt a cél.
            </p>
          </div>
        </div>

        {/* 03 — Betűtípus */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', alignItems: 'center', margin: 'clamp(48px, 7vw, 90px) 0' }}>
          <div style={{ padding: '0 clamp(16px, 3vw, 40px)' }}>
            <h2 style={{ fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: 'clamp(22px, 2.8vw, 44px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 12px' }}>
              Cabinet<br />Grotesk.
            </h2>
            <p style={{ fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 15px)', color: 'rgba(17,17,17,0.4)', margin: 0, lineHeight: 1.5 }}>
              Nem kellett más.
            </p>
          </div>
          <img src="/works/mozzano/Artboard%207.png" alt=""
            style={{ width: '100%', display: 'block', height: 'auto', borderRadius: '18px', transform: 'rotate(-0.6deg)', boxShadow: '0 8px 36px rgba(0,0,0,0.07)' }} />
        </div>

        {/* 06 — széles kép */}
        <img src="/works/mozzano/Artboard%206.png" alt=""
          style={{ width: '60%', display: 'block', height: 'auto', borderRadius: '20px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.07)' }} />

        {/* 04 — Identitás */}
        <div style={{ paddingTop: 'clamp(56px, 8vw, 100px)', paddingBottom: '32px' }}>
          <h2 style={{ fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 10px', maxWidth: '680px' }}>
            Minden felületen ugyanolyan magabiztos.
          </h2>
          <p style={{ fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(17,17,17,0.4)', margin: 0 }}>
            Nem kell magyarázni. Látszik.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'end', maxWidth: '65%', margin: '0 auto' }}>
          <img src="/works/mozzano/Artboard%208.png" alt=""
            style={{ width: '100%', display: 'block', height: 'auto', borderRadius: '18px', transform: 'rotate(-1.2deg)', boxShadow: '0 8px 36px rgba(0,0,0,0.07)' }} />
          <img src="/works/mozzano/Artboard%209.png" alt=""
            style={{ width: '92%', display: 'block', height: 'auto', borderRadius: '18px', transform: 'rotate(1deg)', marginLeft: 'auto', boxShadow: '0 8px 36px rgba(0,0,0,0.07)' }} />
        </div>

        {/* 05 — Mockupok */}
        <div style={{ paddingTop: 'clamp(56px, 8vw, 100px)', paddingBottom: '32px' }}>
          <h2 style={{ fontFamily: 'CabinetGrotesk, var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 10px' }}>
            A végeredmény.
          </h2>
          <p style={{ fontFamily: 'ClashDisplay, var(--font-body)', fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(17,17,17,0.4)', margin: 0 }}>
            Tessék.
          </p>
        </div>
        <img src="/works/mozzano/Artboard%204.png" alt=""
          style={{ width: '65%', display: 'block', height: 'auto', borderRadius: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.08)', marginBottom: '16px', margin: '0 auto 16px' }} />
        <img src="/works/mozzano/Artboard%205.png" alt=""
          style={{ width: '60%', display: 'block', height: 'auto', borderRadius: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.08)', marginLeft: 'auto', marginBottom: 'clamp(56px, 8vw, 100px)' }} />

      </section>

      <Footer />
    </>
  );
}
