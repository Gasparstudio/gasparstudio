'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '../../data/projects';
import CustomCursor from '../../components/CustomCursor';
import Footer from '../../components/Footer';

const GREEN = '#0da64f';
const PM = 'var(--page-margin)';
const SEC = '8px';

const PHOTOS = [
  "/works/Simon's%20Burger/_DSC5942.jpg",
  "/works/Simon's%20Burger/_DSC6041.jpg",
  "/works/Simon's%20Burger/_DSC6340.jpg",
];
const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const SECTIONS = [
  { id: 'logo',         label: 'Logo'         },
  { id: 'social',       label: 'Social Media' },
  { id: 'smashchamps',  label: 'Smash Champs' },
  { id: 'brief',        label: 'Brief'        },
] as const;

const SMASH_MEDIA = [
  "/works/Simon's%20Burger/smashchamps/01.png",
  "/works/Simon's%20Burger/smashchamps/_DSC4835.jpg",
  "/works/Simon's%20Burger/smashchamps/02.png",
  "/works/Simon's%20Burger/smashchamps/_DSC5002.jpg",
  "/works/Simon's%20Burger/smashchamps/03.png",
  "/works/Simon's%20Burger/smashchamps/_DSC5178.jpg",
  "/works/Simon's%20Burger/smashchamps/04.png",
  "/works/Simon's%20Burger/smashchamps/_DSC5349.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC5391.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC9149.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC9167.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC9186.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC9187.jpg",
  "/works/Simon's%20Burger/smashchamps/_DSC9189.jpg",
];

const OLD_SOCIAL = [
  "/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185734.png",
  "/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185740.png",
  "/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185850.png",
];
const NEW_SOCIAL = [
  "/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_burger.png",
  "/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_fagyi.png",
  "/works/Simon's%20Burger/social/new/Simon%27s_catering_1x1_v2.png",
  "/works/Simon's%20Burger/social/new/Simon%27s_catering_1x1_v4.png",
  "/works/Simon's%20Burger/social/new/Simon%27s_catering_1x1_v5.png",
];

const anim = (inView: boolean, delay = 0): React.CSSProperties => ({
  transform: inView ? 'translateY(0)' : 'translateY(48px)',
  opacity: inView ? 1 : 0,
  transition: `transform 1600ms ${EASE}, opacity 1600ms ${EASE}`,
  ...(delay ? { transitionDelay: `${delay}ms` } : {}),
});

export default function SimonsBurgerPage() {
  const [scrolled, setScrolled] = useState(false);
  const [pct, setPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('logo');
  const [photoIdx, setPhotoIdx] = useState(0);
  const [socialIdx, setSocialIdx] = useState(0);
  const [precInView,        setPrecInView]        = useState(false);
  const [mockupStmtInView,  setMockupStmtInView]  = useState(false);
  const [mockupCopyInView,  setMockupCopyInView]  = useState(false);
  const [briefInView,       setBriefInView]       = useState(false);

  const precRef       = useRef<HTMLDivElement>(null);
  const mockupStmtRef = useRef<HTMLDivElement>(null);
  const mockupCopyRef = useRef<HTMLDivElement>(null);
  const briefRef      = useRef<HTMLDivElement>(null);

  const idx  = projects.findIndex((p) => p.slug === 'simons-burger');
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
    const id = setInterval(() => setPhotoIdx(i => (i + 1) % PHOTOS.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSocialIdx(i => (i + 1) % NEW_SOCIAL.length), 1800);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 152;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };

  useEffect(() => {
    const ids = SECTIONS.map(s => s.id);
    const update = () => {
      const offset = 152;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      const lastEl = document.getElementById(ids[ids.length - 1]);
      if (lastEl) {
        const r = lastEl.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > offset) current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const makeObs = (setter: (v: boolean) => void) =>
    new IntersectionObserver(([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  useEffect(() => { const o = makeObs(setPrecInView);       if (precRef.current)       { o.observe(precRef.current);       return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setMockupStmtInView); if (mockupStmtRef.current) { o.observe(mockupStmtRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setMockupCopyInView); if (mockupCopyRef.current) { o.observe(mockupCopyRef.current); return () => o.disconnect(); } }, []);
  useEffect(() => { const o = makeObs(setBriefInView);      if (briefRef.current)      { o.observe(briefRef.current);      return () => o.disconnect(); } }, []);

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1100, height: '2px', width: `${pct}%`, background: GREEN, transition: 'width 80ms linear', pointerEvents: 'none' }} />
      <CustomCursor />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${PM}`, height: '68px',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        transition: 'background 400ms ease, border-color 400ms ease',
      }}>
        <Link href="/works"
          style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--font-inter)', fontSize: '14px', textDecoration: 'none', transition: 'color 200ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#000')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.45)')}>
          ← Munkák
        </Link>
        <Link href="/"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', letterSpacing: '0.08em', color: '#0a0a0a', textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          GASPAR
        </Link>
        <a href="/#contact" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Írj nekem →</a>
      </nav>

      <main style={{ paddingTop: '68px', background: '#f8f8f6' }}>

        {/* ─── FLOATING TOC BANNER ───────────────────────────────── */}
        <div style={{ position: 'sticky', top: '76px', zIndex: 900, padding: `12px ${PM}`, pointerEvents: 'none' }}>
          <div style={{
            maxWidth: 'var(--max-width)', margin: '0 auto',
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '14px',
            padding: '0 20px', height: '52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            pointerEvents: 'auto',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            <img src="/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp" alt="Simon's Burger"
              style={{ height: '22px', width: 'auto' }} />
            <div style={{ display: 'flex', gap: '2px' }}>
              {SECTIONS.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  style={{
                    background: activeSection === id ? `${GREEN}18` : 'transparent',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    padding: '6px 14px',
                    transition: 'background 250ms ease',
                  }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: activeSection === id ? GREEN : 'rgba(0,0,0,0.35)', fontWeight: activeSection === id ? 500 : 400, transition: 'color 250ms' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── LOGO ──────────────────────────────────────────────── */}
        <section id="logo" style={{ padding: `clamp(48px, 7vw, 96px) ${PM} ${SEC}` }}>
          <div ref={precRef} style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 3.8vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0a0a0a', lineHeight: 1.15, maxWidth: '760px', margin: 0,
              ...anim(precInView, 120),
            }}>
              Simon's Burger<br />az egyszerűségben hisz.<br />A megoldás is egyszerű volt.
            </h1>
            <p style={{
              marginTop: '28px', marginBottom: '10px', fontFamily: 'var(--font-inter)', fontSize: 'clamp(14px, 1.3vw, 16px)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.55, maxWidth: '560px',
              ...anim(precInView, 260),
            }}>
              Nem kellett mindent lerombolni. Egyetlen, jól átgondolt változtatás elég volt ahhoz, hogy az identitás végre azt mondja, amit a márka mindig is képviselt: tisztán, felesleges zaj nélkül.
            </p>
          </div>
        </section>

        {/* ─── SEPARATOR ─────────────────────────────────────────── */}
        <div style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', borderRadius: '14px', overflow: 'hidden' }}>
            <img
              src="/works/Simon's%20Burger/elvlaszto.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>


        {/* ─── RATIONALE ─────────────────────────────────────────── */}
        <section id="social" style={{ padding: `clamp(48px, 6vw, 72px) ${PM} clamp(48px, 6vw, 72px)` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }}>
            <h2 style={{
              fontFamily: 'var(--font-inter)', fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 900,
              color: '#0a0a0a', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0,
            }}>
              A Simon's Burger<br />logójának újratervezésére<br />elsősorban a vizuális<br />inkonzisztenciák miatt volt szükség.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.55, margin: 0 }}>
                A védjegyjelzésként használt „®" elem elhelyezése és használata nem volt egységes, emellett a betűközök sem működtek következetesen, ami megbontotta a logó vizuális egyensúlyát és összképét.
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.55, margin: 0 }}>
                Az újratervezés során a tipográfia finomhangolásával, különösen a betűközök tudatos szűkítésével, valamint a „®" jel jobb felső sarokba történő precíz elhelyezésével egy letisztultabb, harmonikusabb logó jött létre. Az új kompozíció egységesebb befoglaló formát eredményez, így a márkajel vizuálisan stabilabbá és esztétikusabbá vált.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL MÉDIA ──────────────────────────────────────── */}
        <section style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Régi sor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div style={{ aspectRatio: '1', borderRadius: '12px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: GREEN, letterSpacing: '-0.03em' }}>Régi</span>
              </div>
              {OLD_SOCIAL.map((src, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', background: '#e8e8e8' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>

            {/* Új sor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div style={{ aspectRatio: '1', borderRadius: '12px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: GREEN, letterSpacing: '-0.03em' }}>Új</span>
              </div>
              {[0, 1, 2].map((offset) => (
                <div key={offset} style={{ aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', background: '#e8e8e8', position: 'relative' }}>
                  {NEW_SOCIAL.map((src, i) => {
                    const visible = i === (socialIdx + offset) % NEW_SOCIAL.length;
                    return (
                      <img key={i} src={src} alt="" style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                        opacity: visible ? 1 : 0, transition: 'opacity 600ms ease',
                      }} />
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ─── SMASH CHAMPS ──────────────────────────────────────── */}
        <section id="smashchamps" style={{ padding: `0 ${PM} ${SEC}` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: '16px', overflow: 'hidden', minHeight: 'clamp(320px, 40vw, 560px)' }}>

            {/* Bal: logó fehér háttéren */}
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 5vw, 64px)' }}>
              <img
                src="/works/Simon's%20Burger/smashchamps._feher.png"
                alt="Smash Champs"
                style={{ width: '80%', maxWidth: '320px', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Jobb: szöveg videó háttéren */}
            <div style={{ position: 'relative', overflow: 'hidden', borderLeft: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 5vw, 64px)' }}>
              <video
                src="/works/Simon's%20Burger/smashchamps/2ND_SMASHCHAMPS.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, margin: '0 0 24px' }}>
                  Smash Champs
                </h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: '0 0 16px' }}>
                  A Smash Champs arculata egy amerikai sportversenyek hangulatát idéző vizuális világra épült. A logó célja egy energikus, motiváló és kompetitív atmoszféra megteremtése volt, amely jól tükrözi a negyedévente megrendezett belsős verseny karakterét.
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, margin: 0 }}>
                  A dinamikus tipográfia és az amerikai sportbrandingből inspirálódó vizuális elemek egy erős, könnyen felismerhető identitást hoznak létre, amely egyszerre közvetíti a versenyszellemet és a nyereményként megszerezhető amerikai utazás élményét.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ─── SMASH MARQUEE ─────────────────────────────────────── */}
        <div style={{ padding: `${SEC} 0`, overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            width: 'max-content',
            animation: 'marquee 50s linear infinite',
          }}>
            {[...SMASH_MEDIA, ...SMASH_MEDIA, ...SMASH_MEDIA, ...SMASH_MEDIA].map((src, i) =>
              src.endsWith('.mp4') ? (
                <video
                  key={i}
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ height: 'clamp(200px, 26vw, 360px)', width: 'auto', aspectRatio: 'auto', borderRadius: '12px', flexShrink: 0, display: 'block' }}
                />
              ) : (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{ height: 'clamp(200px, 26vw, 360px)', width: 'auto', borderRadius: '12px', flexShrink: 0, display: 'block', objectFit: 'cover' }}
                />
              )
            )}
          </div>
        </div>

        {/* ─── BRIEF ─────────────────────────────────────────────── */}
        <section id="brief" style={{ padding: `clamp(48px, 6vw, 80px) ${PM}` }}>
          <div ref={briefRef} style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'start' }}>

            <div style={{ maxWidth: '92%' }}>
              {([
                ['Client',       "Simon's Burger"],
                ['Industry',     'Food & Beverage'],
                ['Year',         '2025'],
                ['Scope',        'Brand Redesign'],
                ['Deliverables', 'Logo · Color system · Typography · Packaging · Signage'],
              ] as [string, string][]).map(([label, value], i) => (
                <div key={label} style={{ padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', borderBottom: '1px solid rgba(0,0,0,0.07)', ...anim(briefInView, i * 100) }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'rgba(0,0,0,0.7)', textAlign: 'right', lineHeight: 1.5 }}>{value}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0a0a0a', lineHeight: 1.15, ...anim(briefInView, 200) }}>
                Simon's needed more<br />than a refresh.
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.5, marginTop: '16px', maxWidth: '72%', ...anim(briefInView, 380) }}>
                An identity strong enough to compete in a saturated market, honest enough to reflect what Simon's has always been about: real food, real people, real craft.
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(0,0,0,0.28)', lineHeight: 1.55, marginTop: '12px', maxWidth: '72%', ...anim(briefInView, 500) }}>
                The brief: strip it back, build it right. One mark that works from a napkin to a neon sign. Without compromise.
              </p>
            </div>

          </div>
        </section>

        {/* ─── PROJECT NAV ───────────────────────────────────────── */}
        <div style={{ padding: `0 ${PM} clamp(48px, 6vw, 80px)` }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            {prev ? (
              <Link href={`/works/${prev.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', textDecoration: 'none', color: 'rgba(0,0,0,0.4)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.4)')}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>← Előző</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em' }}>{prev.title}</span>
              </Link>
            ) : <div />}
            <Link href="/works"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'rgba(0,0,0,0.22)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.22)')}>
              Összes munka
            </Link>
            {next ? (
              <Link href={`/works/${next.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'right', textDecoration: 'none', color: 'rgba(0,0,0,0.4)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#000')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.4)')}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Következő →</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em' }}>{next.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
