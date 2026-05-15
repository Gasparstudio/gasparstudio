'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { projects, Project } from '../data/projects';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';

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

// ─── Lightbox ────────────────────────────────────────────────
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const images = project.images;
  const total = images.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const current = images[idx];
  const isVideo = current.endsWith('.mp4');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.96)',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px clamp(20px, 4vw, 48px)',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontWeight: 650,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'rgba(255,255,255,0.45)',
              margin: '4px 0 0',
            }}
          >
            {project.category} · {project.year}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {total > 1 && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.06em',
              }}
            >
              {idx + 1} / {total}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '16px',
              transition: 'background 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px clamp(48px, 6vw, 80px)',
          position: 'relative',
          minHeight: 0,
        }}
      >
        {isVideo ? (
          <video
            key={current}
            src={current}
            autoPlay
            muted
            loop
            playsInline
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }}
          />
        ) : (
          <img
            key={current}
            src={current}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }}
          />
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '20px',
                transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            >
              ←
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '20px',
                transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px clamp(20px, 4vw, 48px) 24px',
            overflowX: 'auto',
            justifyContent: 'center',
            flexShrink: 0,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIdx(i)}
              style={{
                flexShrink: 0,
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: `2px solid ${i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                padding: 0,
                background: '#111',
                transition: 'border-color 200ms ease, opacity 200ms ease',
                opacity: i === idx ? 1 : 0.55,
              }}
            >
              {src.endsWith('.mp4') ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '14px',
                  }}
                >
                  ▶
                </div>
              ) : (
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const first = project.images?.[0];
  const isVideo = first?.endsWith('.mp4');

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
      {first && !isVideo && (
        <img
          src={first}
          alt={project.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

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
          left: '24px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.1em',
        }}
      >
        {project.index}
      </span>

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
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
          justifyContent: 'space-between',
          padding: '0 var(--page-margin)',
          height: '68px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'background 400ms ease, border-color 400ms ease',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            textDecoration: 'none',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          ← Vissza
        </Link>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            letterSpacing: '0.08em',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          GASPAR
        </Link>

        <a
          href="/#contact"
          className="btn btn-primary"
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          Írj nekem →
        </a>
      </nav>

      <main style={{ paddingTop: '68px', minHeight: '100vh' }}>
        {/* Header */}
        <div
          className="page-container"
          style={{ paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <div
            className="section-label"
            style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span
              style={{
                display: 'block',
                width: '32px',
                height: '1px',
                background: 'var(--color-accent)',
              }}
            />
            Portfólió
          </div>
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

        {/* Divider */}
        <div className="page-container">
          <div
            style={{
              height: '1px',
              background: 'var(--color-border)',
              marginBottom: 'clamp(32px, 5vw, 56px)',
            }}
          />
        </div>

        {/* Search + Filter */}
        <div
          className="page-container"
          style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}
        >
          {/* Search input */}
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

          {/* Category pills */}
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
                  onClick={() => setLightbox(project)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'clamp(28px, 4vw, 40px) var(--page-margin)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            letterSpacing: '0.08em',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
          }}
        >
          GASPAR
        </Link>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            color: 'var(--color-text-muted)',
          }}
        >
          © 2026
        </span>
      </footer>

      {/* Lightbox */}
      {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
