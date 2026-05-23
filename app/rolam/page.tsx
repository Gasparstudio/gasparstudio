'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';

// ─── Szerkeszthető adatok ─────────────────────────────────────
const bio = {
  name: 'Gaspar Burger',
  role: 'Brand Designer',
  location: 'Budapest',
  summary:
    'Brand designerként abban hiszek, hogy egy erős vizuális identitás nem díszítés — hanem stratégia. Budapest-alapú, globálisan gondolkodó.',
  photo: '/works/Void/void1.png',
};

const stats = [
  { value: '5+', label: 'Év tapasztalat' },
  { value: '40+', label: 'Projekt' },
  { value: '12+', label: 'Ügyfél' },
];

const tools = ['Figma', 'Illustrator', 'After Effects', 'Photoshop', 'Lightroom'];

// Töltsd ki a saját állomásaiddal
const timeline = [
  {
    year: '2019',
    title: 'Első lépések',
    description: 'Megismerkedtem az Adobe Creative Suite-tel. Logók, plakátok, az első kísérletek.',
    tag: 'Kezdet',
  },
  {
    year: '2021',
    title: 'Szabadúszóként',
    description: 'Az első fizetős projektek. Brand identity munkák, kisebb vállalkozások arculata.',
    tag: 'Mérföldkő',
  },
  {
    year: '2022',
    title: 'Kámfor',
    description: 'Komplex arculati projekt — logo, nyomtatott anyagok, brand guidelines.',
    tag: 'Projekt',
  },
  {
    year: '2024',
    title: 'Nemzetközi',
    description: 'Globális piacra lépés. Távoli együttműködések, többnyelvű brand rendszerek.',
    tag: 'Mérföldkő',
  },
  {
    year: '2026',
    title: 'GASPAR Studio',
    description: 'Saját stúdió. Modern brand identitások, stratégiai gondolkodás, minőség kompromisszum nélkül.',
    tag: 'Ma',
  },
];

const tagStyles: Record<string, { bg: string; color: string }> = {
  Kezdet:      { bg: 'rgba(99,102,241,0.15)',   color: '#818CF8' },
  Mérföldkő:   { bg: 'rgba(155,109,255,0.15)',  color: '#B08FFF' },
  Projekt:     { bg: 'rgba(255,112,67,0.15)',   color: '#FF7043' },
  Ma:          { bg: 'rgba(155,109,255,0.15)',  color: 'var(--color-accent)' },
};

// ─── Page ─────────────────────────────────────────────────────
export default function RolamPage() {
  const [scrolled, setScrolled] = useState(false);

  // Desktop timeline refs
  const timelineSectionRef = useRef<HTMLElement>(null);
  const curtainRef         = useRef<HTMLDivElement>(null);
  const cardRefs           = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs            = useRef<(HTMLDivElement | null)[]>([]);
  const yearRefs           = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP pin + curtain reveal (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let killed = false;
    const run = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = timelineSectionRef.current;
      const curtain = curtainRef.current;
      if (!section || !curtain) return;

      // Cards and year labels start hidden — curtain only covers the line
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, scale: 0.72, y: i % 2 === 0 ? -14 : 14 });
      });
      yearRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 10 });
      });

      const tl = gsap.timeline();

      // Curtain wipes away from right → reveals from left
      tl.to(curtain, {
        scaleX: 0,
        ease: 'none',
        duration: 1,
      }, 0);

      // Reveal each column: dot → year label → card (bouncy)
      timeline.forEach((_, i) => {
        const pos  = 0.04 + (i / timeline.length) * 0.88;
        const card = cardRefs.current[i];
        const dot  = dotRefs.current[i];
        const year = yearRefs.current[i];

        if (dot) {
          tl.fromTo(dot,
            { scale: 0 },
            { scale: 1, duration: 0.06, ease: 'back.out(2.5)' },
            pos,
          );
        }
        if (year) {
          tl.to(year, {
            opacity: 1,
            y: 0,
            duration: 0.10,
            ease: 'power2.out',
          }, pos + 0.02);
        }
        if (card) {
          tl.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.18,
            ease: 'back.out(2.6)',
          }, pos + 0.04);
        }
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: section,
        pin: true,
        scrub: 1.4,
        start: 'top top',
        end: '+=2400',
        anticipatePin: 1,
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    const cleanup = run();
    return () => {
      killed = true;
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />

      {/* ── Nav ────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--page-margin)', height: '68px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'background 400ms ease, border-color 400ms ease',
        }}
      >
        <Link href="/"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', textDecoration: 'none', transition: 'color 200ms ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          ← Vissza
        </Link>
        <Link href="/"
          style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '0.08em', color: 'var(--color-text-primary)', textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          GASPAR
        </Link>
        <a href="/#contact" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
          Írj nekem →
        </a>
      </nav>

      <main style={{ paddingTop: '68px' }}>

        {/* ══ TIMELINE — Desktop (pinned) ══════════════════ */}
        <section
          ref={timelineSectionRef}
          className="hidden md:flex"
          style={{
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--color-bg)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Section header */}
          <div style={{ padding: '0 var(--page-margin)', marginBottom: 'clamp(36px, 5vw, 56px)', flexShrink: 0 }}>
            <div className="section-label" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-accent)' }} />
              04 · Rólam
            </div>
            <h1 className="text-h2" style={{ margin: 0, color: 'var(--color-text-primary)' }}>
              Mérföldkövek
            </h1>
          </div>

          {/* Timeline track */}
          <div style={{ padding: '0 var(--page-margin)', position: 'relative', flexShrink: 0 }}>

            {/* Gradient line overlay */}
            <div style={{
              position: 'absolute',
              left: 'var(--page-margin)',
              right: 'var(--page-margin)',
              top: '50%',
              height: '2px',
              background: 'var(--color-accent-gradient)',
              transform: 'translateY(-50%)',
              opacity: 0.4,
            }} />

            {/* Grid of items */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${timeline.length}, 1fr)`,
            }}>
              {timeline.map((event, i) => {
                const isAbove = i % 2 === 0;
                const tag = tagStyles[event.tag] ?? { bg: 'var(--color-surface)', color: 'var(--color-text-secondary)' };

                return (
                  <div
                    key={event.year + i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0,
                    }}
                  >
                    {/* Above slot */}
                    <div style={{
                      height: 'clamp(160px, 18vh, 220px)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '20px',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                      {isAbove ? (
                        <div
                          ref={(el) => { if (i % 2 === 0) cardRefs.current[i] = el; }}
                          style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--card-radius)',
                            padding: 'clamp(14px, 1.5vw, 20px)',
                            width: '90%',
                            maxWidth: '260px',
                          }}
                        >
                          <span style={{
                            display: 'inline-block', marginBottom: '10px',
                            padding: '3px 10px', borderRadius: '999px',
                            background: tag.bg, color: tag.color,
                            fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
                          }}>
                            {event.tag}
                          </span>
                          <h3 style={{
                            fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 650,
                            color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em',
                          }}>
                            {event.title}
                          </h3>
                          <p style={{
                            fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1vw, 13px)',
                            color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5,
                          }}>
                            {event.description}
                          </p>
                        </div>
                      ) : (
                        <span
                          ref={(el) => { yearRefs.current[i] = el; }}
                          style={{
                            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 32px)',
                            fontWeight: 700, letterSpacing: '-0.03em',
                            background: 'var(--color-accent-gradient)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            display: 'block',
                          }}
                        >
                          {event.year}
                        </span>
                      )}
                    </div>

                    {/* Dot */}
                    <div
                      ref={(el) => { dotRefs.current[i] = el; }}
                      style={{
                        width: '16px', height: '16px', borderRadius: '50%',
                        background: 'var(--color-accent-gradient)',
                        boxShadow: '0 0 0 5px rgba(155,109,255,0.12), 0 0 16px rgba(155,109,255,0.3)',
                        flexShrink: 0, zIndex: 1, position: 'relative',
                      }}
                    />

                    {/* Below slot */}
                    <div style={{
                      height: 'clamp(160px, 18vh, 220px)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      paddingTop: '20px',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                      {!isAbove ? (
                        <div
                          ref={(el) => { if (i % 2 !== 0) cardRefs.current[i] = el; }}
                          style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--card-radius)',
                            padding: 'clamp(14px, 1.5vw, 20px)',
                            width: '90%',
                            maxWidth: '260px',
                          }}
                        >
                          <span style={{
                            display: 'inline-block', marginBottom: '10px',
                            padding: '3px 10px', borderRadius: '999px',
                            background: tag.bg, color: tag.color,
                            fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
                          }}>
                            {event.tag}
                          </span>
                          <h3 style={{
                            fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 650,
                            color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em',
                          }}>
                            {event.title}
                          </h3>
                          <p style={{
                            fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1vw, 13px)',
                            color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5,
                          }}>
                            {event.description}
                          </p>
                        </div>
                      ) : (
                        <span
                          ref={(el) => { yearRefs.current[i] = el; }}
                          style={{
                            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 32px)',
                            fontWeight: 700, letterSpacing: '-0.03em',
                            background: 'var(--color-accent-gradient)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            display: 'block',
                          }}
                        >
                          {event.year}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Curtain — csak a vonal + pont sávját fedi (±20px a középtől) */}
            <div
              ref={curtainRef}
              style={{
                position: 'absolute',
                top: 'calc(50% - 20px)',
                left: 0,
                right: 0,
                height: '40px',
                background: 'var(--color-bg)',
                transformOrigin: 'right center',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '32px', right: 'var(--page-margin)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
              Scroll →
            </span>
          </div>
        </section>

        {/* ══ TIMELINE — Mobile (vertical, IntersectionObserver) ═ */}
        <MobileTimeline />

        {/* ══ BIO ════════════════════════════════════════════════ */}
        <BioSection />

        {/* ══ CTA ════════════════════════════════════════════════ */}
        <section
          className="page-container"
          style={{
            paddingTop: 'clamp(56px, 8vw, 96px)',
            paddingBottom: 'clamp(64px, 10vw, 120px)',
            textAlign: 'center',
          }}
        >
          <p className="section-label" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-accent)' }} />
            Következő lépés
          </p>
          <h2 className="text-h2" style={{ margin: '0 0 32px', color: 'var(--color-text-primary)' }}>
            Dolgozzunk együtt.
          </h2>
          <a href="/#contact" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
            Vedd fel a kapcsolatot →
          </a>
        </section>
      </main>

      <footer style={{
        padding: 'clamp(28px, 4vw, 40px) var(--page-margin)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '0.08em', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
          GASPAR
        </Link>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
          © 2026
        </span>
      </footer>
    </>
  );
}

// ─── Bio section ──────────────────────────────────────────────
function BioSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll('[data-reveal]')) as HTMLElement[];
    children.forEach((child) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(32px)';
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const child = entry.target as HTMLElement;
        const delay = child.dataset.delay ?? '0';
        setTimeout(() => {
          child.style.transition = 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, Number(delay));
        observer.unobserve(child);
      });
    }, { threshold: 0.15 });
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="page-container"
      style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>

        {/* Photo */}
        <div data-reveal data-delay="0">
          <div style={{
            width: '100%', aspectRatio: '4 / 5', maxWidth: '380px',
            borderRadius: 'var(--card-radius-lg)', border: '1px solid var(--color-border)',
            overflow: 'hidden', position: 'relative',
          }}>
            <img src={bio.photo} alt={bio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: '20px', left: '20px', right: '20px',
              background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(12px)',
              borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 18px',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                {bio.name}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'rgba(255,255,255,0.5)', margin: '3px 0 0' }}>
                {bio.role} · {bio.location}
              </p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2 data-reveal data-delay="100" className="text-h2" style={{ margin: 0, color: 'var(--color-text-primary)' }}>
            Identitások, amelyek hatnak.
          </h2>
          <p data-reveal data-delay="160" style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 'var(--leading-normal)', color: 'var(--color-text-secondary)', margin: 0,
          }}>
            {bio.summary}
          </p>

          {/* Stats */}
          <div data-reveal data-delay="220" style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', paddingTop: '24px', flexWrap: 'wrap' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)',
                  background: 'var(--color-accent-gradient)', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0, lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', color: 'var(--color-text-muted)', margin: '6px 0 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div data-reveal data-delay="280">
            <p className="section-label" style={{ marginBottom: '14px' }}>Eszközök</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tools.map((t) => (
                <span key={t} style={{
                  padding: '8px 16px', borderRadius: '999px',
                  border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-secondary)',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mobile timeline (vertical) ───────────────────────────────
function MobileTimeline() {
  return (
    <section
      className="md:hidden"
      style={{ paddingTop: 'clamp(64px, 10vw, 96px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}
    >
      <div className="page-container" style={{ marginBottom: '48px' }}>
        <div className="section-label" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-accent)' }} />
          04 · Rólam
        </div>
        <h1 className="text-h2" style={{ margin: 0, color: 'var(--color-text-primary)' }}>
          Mérföldkövek
        </h1>
      </div>

      <div style={{ padding: '0 var(--page-margin)', position: 'relative' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {timeline.map((event, i) => (
            <MobileItem key={event.year + i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileItem({ event, index }: { event: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tag = tagStyles[event.tag] ?? { bg: 'var(--color-surface)', color: 'var(--color-text-secondary)' };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setTimeout(() => {
        el.style.transition = 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, index * 60);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, marginTop: '14px' }}>
        <div style={{
          width: '13px', height: '13px', borderRadius: '50%',
          background: 'var(--color-accent-gradient)',
          boxShadow: '0 0 0 3px rgba(155,109,255,0.15)',
        }} />
      </div>
      <div style={{
        flex: 1, background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 'var(--card-radius)', padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '13px',
            background: 'var(--color-accent-gradient)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.04em', fontWeight: 700,
          }}>
            {event.year}
          </span>
          <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: tag.bg, color: tag.color,
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 600, letterSpacing: '0.06em',
          }}>
            {event.tag}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 650,
          color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2,
        }}>
          {event.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)',
          color: 'var(--color-text-secondary)', margin: 0, lineHeight: 'var(--leading-normal)',
        }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}
