'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import Nav from '../../components/Nav';

const CREAM = '#F5F1E7';
const GREEN = '#2D6A4F';
const NAVY  = '#171F29';
const RED   = '#D34C2D';
const MOHA  = '#1B4332';
const FERN  = '#52B788';
const PM    = 'var(--page-margin)';
const EASE  = 'cubic-bezier(0.16,1,0.3,1)';

const FONTS = `
  @font-face {
    font-family: 'CabinetGrotesk';
    src: url('/works/mozzano/CabinetGrotesk_Complete/Fonts/WEB/CabinetGrotesk-Variable.woff2') format('woff2');
    font-weight: 100 900; font-style: normal; font-display: swap;
  }
  @keyframes svFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const CG: React.CSSProperties = { fontFamily: 'CabinetGrotesk, var(--font-display)' };

const SECTIONS = [
  { id: 'logo',   label: 'Logó',       num: '01' },
  { id: 'colors', label: 'Színek',     num: '02' },
  { id: 'type',   label: 'Tipográfia', num: '03' },
  { id: 'apply',  label: 'Alkalmazás', num: '04' },
  { id: 'brief',  label: 'Brief',      num: '05' },
] as const;

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

const anim = (v: boolean, delay = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? 'translateY(0)' : 'translateY(40px)',
  transition: `opacity 900ms ${EASE} ${delay}ms, transform 900ms ${EASE} ${delay}ms`,
});

export default function SarkanyvolgyPage() {
  const [active, setActive] = useState('logo');

  const logoRef  = useRef<HTMLElement>(null);
  const colRef   = useRef<HTMLElement>(null);
  const typRef   = useRef<HTMLElement>(null);
  const appRef   = useRef<HTMLElement>(null);
  const briefRef = useRef<HTMLElement>(null);

  const logoV  = useInView(logoRef);
  const colV   = useInView(colRef);
  const typV   = useInView(typRef);
  const appV   = useInView(appRef);
  const briefV = useInView(briefRef);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const refs = [
      { id: 'logo',   ref: logoRef },
      { id: 'colors', ref: colRef  },
      { id: 'type',   ref: typRef  },
      { id: 'apply',  ref: appRef  },
      { id: 'brief',  ref: briefRef },
    ];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    refs.forEach(({ id, ref }) => { if (ref.current) { ref.current.id = id; obs.observe(ref.current); } });
    return () => obs.disconnect();
  }, []);

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <style>{FONTS}</style>
      <CustomCursor />
      <Nav />

      {/* ── HERO ────────────────────────────────────────────── */}
      <div style={{ minHeight: '100vh', background: CREAM, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: `120px ${PM} clamp(56px,8vw,100px)` }}>

        {/* Dragon watermark */}
        <img
          src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__black_icon.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute', top: '-5%', right: '-8%',
            width: 'clamp(340px, 52vw, 740px)', opacity: 0.06,
            pointerEvents: 'none', userSelect: 'none',
          }}
        />

        {/* Logo top-left */}
        <div style={{ position: 'absolute', top: '88px', left: PM }}>
          <div style={{ height: 'clamp(48px,7vw,72px)', width: 'clamp(48px,7vw,72px)', position: 'relative' }}>
            <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png" alt="Sárkány Völgy" fill style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} sizes="72px" priority />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ ...CG, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: '0 0 28px', fontWeight: 600, animation: 'svFadeUp 700ms ease both' }}>
            Brand Identity · 2026
          </p>
          <h1 style={{ ...CG, fontSize: 'clamp(52px,10vw,136px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.88, color: NAVY, margin: '0 0 40px', animation: 'svFadeUp 700ms ease 100ms both' }}>
            Sárkány<br />Völgy<br />Mese<br />Fesztivál
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.7, color: `${NAVY}80`, maxWidth: '480px', margin: 0, animation: 'svFadeUp 700ms ease 200ms both' }}>
            Arculati kézikönyv egy modern mítoszhoz, ahol a sárkányok mesélnek.
          </p>
        </div>

        <p style={{ position: 'absolute', bottom: '32px', right: PM, fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: `${NAVY}40` }}>
          Scroll ↓
        </p>
      </div>

      {/* ── BRAND STATEMENT ─────────────────────────────────── */}
      <div style={{ background: GREEN, padding: `clamp(14px,5vw,70px) ${PM}`, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', right: '-2%', top: 0, bottom: 0, width: 'clamp(180px,28vw,380px)', opacity: 0.1, pointerEvents: 'none' }}>
          <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="" fill style={{ objectFit: 'contain', objectPosition: 'right center' }} sizes="380px" />
        </div>
        <p style={{ ...CG, fontSize: 'clamp(36px,7vw,96px)', fontWeight: 900, color: CREAM, lineHeight: 1, letterSpacing: '-0.03em', maxWidth: '18ch', margin: '0 0 32px', position: 'relative', zIndex: 1 }}>
          Egy völgy, ahol a sárkányok mesélnek.
        </p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(13px,1.3vw,16px)', color: `${CREAM}70`, maxWidth: '520px', lineHeight: 1.7, margin: 0, position: 'relative', zIndex: 1 }}>
          A Sárkány Völgy Mese Fesztivál egy modern mítosz. Gyökerei a magyar népmesékbe nyúlnak, formanyelve viszont mai: bátor, tiszta, vizuálisan fegyelmezett.
        </p>
      </div>

      {/* ── SIDE NAV ────────────────────────────────────────── */}
      <div className="hidden md:flex" style={{ position: 'fixed', top: '50%', right: '28px', transform: 'translateY(-50%)', zIndex: 100, flexDirection: 'column', gap: '6px' }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => scroll(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: active === s.id ? NAVY : `${NAVY}35`, transition: 'color 300ms ease' }}>{s.label}</span>
            <span style={{ display: 'block', width: active === s.id ? '20px' : '8px', height: '1.5px', background: active === s.id ? GREEN : `${NAVY}20`, transition: 'width 300ms ease, background 300ms ease', borderRadius: '2px' }} />
          </button>
        ))}
      </div>

      <div style={{ background: CREAM }}>

        {/* ── 01 LOGO ──────────────────────────────────────── */}
        <section ref={logoRef as React.RefObject<HTMLElement>} style={{ padding: `clamp(30px,8vw,90px) ${PM}`, borderTop: `1px solid ${NAVY}10` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(40px,6vw,72px)', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: 0, fontWeight: 600 }}>01 · Logó</p>
            <p style={{ ...CG, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>Védjegy és variációk</p>
          </div>

          <div style={{ ...anim(logoV), display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(12px,2vw,20px)' }}>
            {/* A — Védjegy */}
            <div style={{ background: NAVY, borderRadius: '0', padding: 'clamp(40px,6vw,64px) clamp(32px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <div style={{ width: 'clamp(80px,12vw,140px)', height: 'clamp(80px,12vw,140px)', position: 'relative' }}>
                  <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="Védjegy" fill style={{ objectFit: 'contain' }} sizes="140px" priority />
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${CREAM}15`, paddingTop: '16px', marginTop: '24px' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, margin: '0 0 4px', fontWeight: 600 }}>A · Védjegy</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${CREAM}50`, margin: 0, lineHeight: 1.5 }}>Avatar, ikon, mintázat</p>
              </div>
            </div>

            {/* B — Vízszintes */}
            <div style={{ background: GREEN, borderRadius: '0', padding: 'clamp(40px,6vw,64px) clamp(32px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <div style={{ width: 'min(90%, 320px)', aspectRatio: '3/1', position: 'relative' }}>
                  <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_long.png" alt="Vízszintes" fill style={{ objectFit: 'contain' }} sizes="320px" priority />
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${CREAM}15`, paddingTop: '16px', marginTop: '24px' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, margin: '0 0 4px', fontWeight: 600 }}>B · Vízszintes</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${CREAM}50`, margin: 0, lineHeight: 1.5 }}>Alapértelmezett · Levél, fejléc</p>
              </div>
            </div>

            {/* C — Álló */}
            <div style={{ background: CREAM, border: `1px solid ${NAVY}12`, borderRadius: '0', padding: 'clamp(40px,6vw,64px) clamp(32px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <div style={{ width: 'min(90%, 320px)', aspectRatio: '3/1', position: 'relative' }}>
                  <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color.png" alt="Álló" fill style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} sizes="320px" priority />
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${NAVY}10`, paddingTop: '16px', marginTop: '24px' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, margin: '0 0 4px', fontWeight: 600 }}>C · Álló</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${NAVY}45`, margin: 0, lineHeight: 1.5 }}>Plakát, profilkép, póló</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 COLORS ────────────────────────────────────── */}
        <section ref={colRef as React.RefObject<HTMLElement>} style={{ padding: `clamp(30px,8vw,90px) ${PM}`, borderTop: `1px solid ${NAVY}10` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(40px,6vw,72px)', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: 0, fontWeight: 600 }}>02 · Színpaletta</p>
            <p style={{ ...CG, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>Három szín, egy világ</p>
          </div>

          {/* 60–30–10 bar */}
          <div style={{ ...anim(colV), display: 'flex', borderRadius: '0', overflow: 'hidden', height: '56px', marginBottom: 'clamp(32px,5vw,56px)' }}>
            <div style={{ flex: 6, background: GREEN, display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '8px' }}>
              <span style={{ ...CG, fontWeight: 900, fontSize: '18px', color: CREAM }}>60%</span>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${CREAM}70` }}>Sárkány Zöld</span>
            </div>
            <div style={{ flex: 3, background: NAVY, display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '8px' }}>
              <span style={{ ...CG, fontWeight: 900, fontSize: '18px', color: CREAM }}>30%</span>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${CREAM}60` }}>Éjkobalt</span>
            </div>
            <div style={{ flex: 1, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...CG, fontWeight: 900, fontSize: '14px', color: CREAM }}>10%</span>
            </div>
          </div>

          {/* 3 main colors */}
          <div style={{ ...anim(colV, 80), display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(12px,2vw,20px)', marginBottom: 'clamp(12px,2vw,20px)' }}>
            {[
              { name: 'Sárkány Zöld', role: 'Elsődleges · 60%', hex: '#2D6A4F', rgb: '45 / 106 / 79',  pantone: '356 C' },
              { name: 'Éjkobalt',     role: 'Másodlagos · 30%', hex: '#171F29', rgb: '23 / 31 / 41',   pantone: '' },
              { name: 'Sárkány Tűz', role: 'Harmadlagos · 10%', hex: '#D34C2D', rgb: '211 / 76 / 45',  pantone: '' },
            ].map((c) => (
              <div key={c.hex}>
                <div style={{ height: 'clamp(140px,18vw,220px)', borderRadius: '0', background: c.hex, marginBottom: '16px' }} />
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${NAVY}40`, margin: '0 0 6px' }}>{c.role}</p>
                <p style={{ ...CG, fontWeight: 800, fontSize: 'clamp(17px,2vw,22px)', color: NAVY, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{c.name}</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: `${NAVY}50`, margin: '0 0 2px' }}>{c.hex}</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: `${NAVY}30`, margin: 0 }}>RGB {c.rgb}{c.pantone ? ` · Pantone ${c.pantone}` : ''}</p>
              </div>
            ))}
          </div>

          {/* Secondary row */}
          <div style={{ ...anim(colV, 160), display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px,2vw,20px)' }}>
            {[
              { name: 'Pergamen',  role: 'Háttér',         hex: '#F5F1E7', text: NAVY },
              { name: 'Mély Moha', role: 'Sötét variáns',  hex: '#1B4332', text: CREAM },
              { name: 'Páfrány',   role: 'Világos variáns', hex: '#52B788', text: NAVY },
            ].map((c) => (
              <div key={c.hex} style={{ background: c.hex, borderRadius: '0', padding: 'clamp(16px,2vw,24px)', border: c.hex === '#F5F1E7' ? `1px solid ${NAVY}12` : 'none' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${c.text}50`, margin: '0 0 4px' }}>{c.role}</p>
                <p style={{ ...CG, fontWeight: 800, fontSize: 'clamp(14px,1.6vw,18px)', color: c.text, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{c.name}</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: `${c.text}40`, margin: 0 }}>{c.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 TYPOGRAPHY ────────────────────────────────── */}
        <section ref={typRef as React.RefObject<HTMLElement>} style={{ borderTop: `1px solid ${NAVY}10` }}>
          <div style={{ padding: `clamp(30px,8vw,90px) ${PM}`, background: NAVY }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(40px,6vw,72px)', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: 0, fontWeight: 600 }}>03 · Tipográfia</p>
              <p style={{ ...CG, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: CREAM, margin: 0, letterSpacing: '-0.02em' }}>Két betűtípus, tiszta hierarchia</p>
            </div>

            <div style={{ ...anim(typV), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(12px,2vw,20px)' }}>
              {/* Cabinet Grotesk Black */}
              <div style={{ background: '#0d1520', borderRadius: '0', padding: 'clamp(32px,4vw,52px)' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, margin: '0 0 8px', fontWeight: 600 }}>Display · Címek</p>
                <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(15px,1.8vw,20px)', color: CREAM, margin: '0 0 32px' }}>Cabinet Grotesk Black</p>
                <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(52px,9vw,120px)', color: CREAM, lineHeight: 0.85, margin: '0 0 32px', letterSpacing: '-0.04em' }}>Aa</p>
                <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(11px,1vw,13px)', color: `${CREAM}35`, letterSpacing: '0.04em', lineHeight: 1.8 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
              </div>

              {/* Geist */}
              <div style={{ background: `${CREAM}08`, border: `1px solid ${CREAM}08`, borderRadius: '0', padding: 'clamp(32px,4vw,52px)' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: RED, margin: '0 0 8px', fontWeight: 600 }}>Body · Folyószöveg</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 500, fontSize: 'clamp(15px,1.8vw,20px)', color: CREAM, margin: '0 0 32px' }}>Geist Regular</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, fontSize: 'clamp(52px,9vw,120px)', color: FERN, lineHeight: 0.85, margin: '0 0 32px', letterSpacing: '-0.04em' }}>Aa</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, fontSize: 'clamp(12px,1.1vw,14px)', color: `${CREAM}55`, lineHeight: 1.75 }}>
                  Egyszer volt, hol nem volt, hetedhét országon is túl, ahol a kurta farkú malac túr, volt egyszer egy völgy.
                </p>
              </div>
            </div>

            {/* Hierarchy */}
            <div style={{ ...anim(typV, 120), marginTop: 'clamp(32px,4vw,48px)', borderTop: `1px solid ${CREAM}08`, paddingTop: 'clamp(32px,4vw,48px)' }}>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: `${CREAM}35`, margin: '0 0 24px' }}>Hierarchia</p>
              {[
                { label: 'Nagy főcím · 30pt', text: 'Mesélni jövünk',       style: { ...CG, fontWeight: 900, fontSize: 'clamp(24px,4vw,48px)', color: CREAM, letterSpacing: '-0.03em' } },
                { label: 'Főcím · 20pt',      text: 'A völgy meghív',       style: { ...CG, fontWeight: 900, fontSize: 'clamp(18px,2.8vw,32px)', color: CREAM, letterSpacing: '-0.02em' } },
                { label: 'Alcím · 12pt',      text: 'Programjaink, helyszín és időpontok', style: { ...CG, fontWeight: 800, fontSize: 'clamp(14px,1.8vw,20px)', color: CREAM } },
                { label: 'Body · 9pt',        text: 'Gyere te is a völgybe, ahol a tűz nem éget, csak mesél. Helyszín: Zirci Arborétum. Időpont: 2026. augusztus.', style: { fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(12px,1.2vw,15px)', color: `${CREAM}60`, lineHeight: 1.45 } },
                { label: 'Caps · 7pt',        text: 'SÁRKÁNYVÖLGY · 2026 · MESE FESZTIVÁL', style: { fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: RED } },
              ].map(({ label, text, style }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '24px', borderBottom: `1px solid ${CREAM}06`, padding: '16px 0', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', color: `${CREAM}25`, margin: 0, letterSpacing: '0.06em' }}>{label}</p>
                  <p style={{ ...style, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 APPLICATIONS ──────────────────────────────── */}
        <section ref={appRef as React.RefObject<HTMLElement>} style={{ padding: `clamp(30px,8vw,90px) ${PM}`, borderTop: `1px solid ${NAVY}10` }}>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(20px,3vw,32px)', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: 0, fontWeight: 600 }}>04 · Alkalmazás</p>
            <p style={{ ...CG, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>A márka a világban</p>
          </div>

          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.7, color: `${NAVY}55`, maxWidth: '560px', margin: `0 0 clamp(40px,6vw,64px)` }}>
            Az alábbi példák bemutatják, hogyan szólal meg a márka különböző felületeken. Minden megjelenés a 60–30–10 szabályt követi, és a logót a védőzóna szabályainak betartásával használja.
          </p>

          <div style={{ ...anim(appV), display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vw,12px)' }}>

            {/* Sor 1: Zöld plakát (bal) + két kártya (jobb) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(8px,1.2vw,12px)', alignItems: 'stretch' }}>

              {/* Zöld plakátkártya */}
              <div style={{ background: GREEN, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'clamp(420px,55vw,580px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 'clamp(36px,5vw,60px)', height: 'clamp(36px,5vw,60px)', position: 'relative' }}>
                    <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="" fill style={{ objectFit: 'contain' }} sizes="60px" />
                  </div>
                  <span style={{ color: RED, fontSize: 'clamp(18px,2.8vw,32px)', lineHeight: 1 }}>✦</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(8px,0.8vw,10px)', letterSpacing: '0.16em', textTransform: 'uppercase', color: `${CREAM}50`, margin: `0 0 clamp(10px,1.5vw,16px)` }}>Sárkány Völgy Mese Fesztivál</p>
                  <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(28px,5.5vw,72px)', color: CREAM, lineHeight: 0.88, letterSpacing: '-0.03em', margin: 0 }}>
                    Hetedhét<br />országon<br /><span style={{ color: RED }}>is túl.</span>
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${CREAM}15`, paddingTop: '14px' }}>
                  <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(7px,0.7vw,9px)', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${CREAM}45`, margin: 0, lineHeight: 1.7 }}>Sárkány Völgy<br />Mese Fesztivál</p>
                  <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(7px,0.7vw,9px)', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${CREAM}45`, margin: 0, textAlign: 'right', lineHeight: 1.7 }}>Jegyek ·<br />Sarkanyvolgy.hu</p>
                </div>
              </div>

              {/* Jobb oszlop: két kártya egymás alatt */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vw,12px)' }}>

                {/* NAVY: Mese. Tűz. Völgy. */}
                <div style={{ background: NAVY, padding: 'clamp(24px,3.5vw,40px)', flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                  <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(22px,3.8vw,52px)', color: CREAM, margin: 0, letterSpacing: '-0.03em', lineHeight: 0.92 }}>
                    Mese.<br />Tűz.<br /><span style={{ color: RED }}>Völgy.</span>
                  </p>
                </div>

                {/* CREAM: ikon + "Sárkány Völgy" + piros csík */}
                <div style={{ background: CREAM, border: `1px solid ${NAVY}12`, padding: 'clamp(24px,3.5vw,40px)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'clamp(16px,3vw,32px)', background: RED }} />
                  <div style={{ width: 'clamp(28px,4vw,48px)', height: 'clamp(28px,4vw,48px)', position: 'relative' }}>
                    <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png" alt="Sárkány Völgy" fill style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} sizes="48px" />
                  </div>
                  <div>
                    <p style={{ ...CG, fontWeight: 800, fontSize: 'clamp(14px,2vw,24px)', color: NAVY, margin: `0 0 6px`, letterSpacing: '-0.01em' }}>Sárkány Völgy</p>
                    <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(8px,0.7vw,10px)', letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, margin: 0, fontWeight: 600 }}>Mese Fesztivál · 2026</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Sor 2: Piros kártya (ikon) + Krém vízjel kártya */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(8px,1.2vw,12px)' }}>

              {/* Piros: fehér ikon középen */}
              <div style={{ background: RED, padding: 'clamp(36px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'clamp(140px,18vw,220px)' }}>
                <div style={{ width: 'clamp(56px,9vw,110px)', height: 'clamp(56px,9vw,110px)', position: 'relative' }}>
                  <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="Logó" fill style={{ objectFit: 'contain' }} sizes="110px" />
                </div>
              </div>

              {/* Krém: nagy vízjel ikon */}
              <div style={{ background: CREAM, border: `1px solid ${NAVY}10`, position: 'relative', overflow: 'hidden', minHeight: 'clamp(140px,18vw,220px)' }}>
                <div style={{ position: 'absolute', right: '-8%', bottom: '-8%', width: '80%', height: '130%', opacity: 0.09 }}>
                  <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__black_icon.png" alt="" fill style={{ objectFit: 'contain', objectPosition: 'right bottom' }} sizes="400px" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 05 BRIEF ─────────────────────────────────────── */}
        <section ref={briefRef as React.RefObject<HTMLElement>} style={{ padding: `clamp(30px,8vw,90px) ${PM}`, borderTop: `1px solid ${NAVY}10` }}>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, margin: '0 0 clamp(40px,6vw,72px)', fontWeight: 600 }}>05 · Brief</p>

          <div style={{ ...anim(briefV), display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(20px,3vw,40px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
            {[
              { label: 'Ügyfél',    value: 'Sárkány Völgy Mese Fesztivál' },
              { label: 'Kategória', value: 'Brand Identity' },
              { label: 'Év',        value: '2026' },
              { label: 'Hatókör',   value: 'Logo, Arculati kézikönyv, Tipográfia, Alkalmazások' },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderTop: `1px solid ${NAVY}12`, paddingTop: '20px' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${NAVY}35`, margin: '0 0 8px' }}>{label}</p>
                <p style={{ ...CG, fontWeight: 700, fontSize: 'clamp(15px,1.8vw,20px)', color: NAVY, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ ...anim(briefV, 150), maxWidth: '640px' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.75, color: `${NAVY}60`, margin: 0 }}>
              A Sárkány Völgy Mese Fesztivál egy modern mítosz. Gyökerei a magyar népmesékbe nyúlnak, formanyelve viszont mai: bátor, tiszta, vizuálisan fegyelmezett. A védjegy egy stilizált, heraldikus sárkány. Szögletes és lágy egyszerre. Mint maga a mese.
            </p>
          </div>
        </section>

      </div>

      <div style={{ background: GREEN, padding: `clamp(14px,5vw,50px) ${PM}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <p style={{ ...CG, fontWeight: 900, fontSize: 'clamp(28px,5vw,64px)', color: CREAM, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
          Mese.<br />Tűz.<br /><span style={{ color: RED }}>Völgy.</span>
        </p>
        <div style={{ height: 'clamp(80px,12vw,140px)', width: 'clamp(80px,12vw,140px)', position: 'relative', opacity: 0.25 }}>
          <Image src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="" fill style={{ objectFit: 'contain' }} sizes="140px" />
        </div>
      </div>

      <Footer />
    </>
  );
}
