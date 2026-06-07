'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { projects, Project } from '../data/projects';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../components/Footer';

const ALL = 'Összes';

const filterCategories = [
  ALL,
  ...Array.from(
    new Set(
      projects
        .map((p) => p.category)
        .filter((c) => !c.includes('ERR') && !c.includes('REDACTED'))
    )
  ),
];

// ─── Video Slide ──────────────────────────────────────────────
function VideoSlide({ src, visible }: { src: string; visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (visible) { ref.current.currentTime = 0; ref.current.play(); }
    else ref.current.pause();
  }, [visible]);
  return (
    <video ref={ref} src={src} muted playsInline style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', opacity: visible ? 1 : 0, transition: 'opacity 600ms ease',
    }} />
  );
}

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, onClick, imgIndex }: { project: Project; onClick: () => void; imgIndex: number }) {
  const [hovered, setHovered] = useState(false);
  const isLogofolio = project.slug === 'logofolio';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-expand
      style={{
        aspectRatio: '4 / 5',
        borderRadius: 'var(--card-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: project.gradient,
        cursor: 'none',
        position: 'relative',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      {project.images?.map((src, i) => {
        const isVideo = src.endsWith('.mp4');
        const visible = i === imgIndex;
        return isVideo ? (
          <VideoSlide key={src} src={src} visible={visible} />
        ) : (
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              top:    isLogofolio ? '22%'  : 0,
              left:   isLogofolio ? '18%'  : 0,
              width:  isLogofolio ? '63%'  : '100%',
              height: isLogofolio ? '56%'  : '100%',
              objectFit: isLogofolio ? 'contain' : 'cover',
              opacity: visible ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.82) 100%)',
        }}
      />

      <span
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.65)',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        →
      </span>

      <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2vw, 26px)',
            fontWeight: 650,
            color: '#fff',
            margin: '0 0 6px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            color: 'rgba(255,255,255,0.55)',
            margin: 0,
          }}
        >
          {project.category} · {project.year}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function WorksPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [scrolled, setScrolled] = useState(false);
  const [imgIndices, setImgIndices] = useState<number[]>(() => projects.map(() => 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sequence = projects
      .map((p, i) => ({ i, len: p.images?.length ?? 0 }))
      .filter(({ len }) => len > 1);
    if (sequence.length === 0) return;
    let pointer = 0;
    const id = setInterval(() => {
      const { i, len } = sequence[pointer];
      setImgIndices(prev => { const next = [...prev]; next[i] = (next[i] + 1) % len; return next; });
      pointer = (pointer + 1) % sequence.length;
    }, 500);
    return () => clearInterval(id);
  }, []);

  const filtered = projects.filter((p) => {
    const matchQ = p.title.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCategory === ALL || p.category === activeCategory;
    return matchQ && matchC;
  });

  return (
    <>
      <ScrollProgress />
      <CustomCursor />

      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--page-margin)',
          height: '68px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'background 400ms ease, border-color 400ms ease',
        }}
      >
        <div style={{ flex: 1 }} />

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            letterSpacing: '0.08em',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
          }}
        >
          GASPAR
        </Link>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="/arajanlat"
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            Írj nekem →
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: '68px', minHeight: '100vh' }}>
        {/* Header */}
        <div
          className="page-container"
          style={{ paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h1
              className="text-h2"
              style={{ margin: 0, color: 'var(--color-text-primary)' }}
            >
              Munkák
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {projects.length} projekt
            </span>
          </div>
        </div>

        {/* Search + Filter */}
        <div
          className="page-container"
          style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}
        >
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                fontSize: '16px',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              ⌕
            </span>
            <input
              type="text"
              placeholder="Projekt keresése..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '420px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '13px 16px 13px 42px',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                outline: 'none',
                transition: 'border-color 200ms ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filterCategories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: active ? 'var(--color-accent-gradient)' : 'var(--color-surface)',
                    border: `1px solid ${active ? 'transparent' : 'var(--color-border)'}`,
                    borderRadius: '999px',
                    padding: '8px 18px',
                    color: active ? '#fff' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div
          className="page-container"
          style={{ paddingBottom: 'var(--section-padding-v)' }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                letterSpacing: '0.04em',
              }}
            >
              Nincs találat.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'clamp(16px, 2vw, 24px)',
              }}
            >
              {filtered.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  imgIndex={imgIndices[projects.indexOf(project)]}
                  onClick={() => router.push(`/works/${project.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
