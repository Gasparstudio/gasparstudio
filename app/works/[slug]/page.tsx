'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { projects } from '../../data/projects';
import CustomCursor from '../../components/CustomCursor';
import ScrollProgress from '../../components/ScrollProgress';
import Nav from '../../components/Nav';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: 'var(--text-small)', letterSpacing: '0.06em' }}>
          Projekt nem található.
        </p>
        <Link href="/works" className="btn btn-ghost">← Munkák</Link>
      </div>
    );
  }

  const images = project.images ?? [];
  const coverImage = images.find((s) => !s.endsWith('.mp4')) ?? images[0];

  return (
    <>
      <ScrollProgress />
      <CustomCursor />

      <Nav />

      <main style={{ paddingTop: '68px' }}>

        {/* Hero cover */}
        {coverImage && (
          <div
            style={{
              width: '100%',
              height: 'clamp(340px, 55vw, 680px)',
              position: 'relative',
              overflow: 'hidden',
              background: project.gradient,
            }}
          >
            {coverImage.endsWith('.mp4') ? (
              <video
                src={coverImage}
                autoPlay muted loop playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={coverImage}
                alt={project.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.0) 40%, rgba(10,10,10,0.7) 100%)',
            }} />
            {/* Title overlay */}
            <div style={{
              position: 'absolute', bottom: 'clamp(28px, 4vw, 48px)',
              left: 'var(--page-margin)', right: 'var(--page-margin)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 500,
                color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginBottom: '8px',
              }}>
                {project.index}
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)',
                fontWeight: 700, letterSpacing: '-0.03em', color: '#fff',
                margin: '0 0 8px', lineHeight: 1,
              }}>
                {project.title}
              </h1>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.5vw, 16px)',
                color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.03em',
              }}>
                {project.category} · {project.year}
              </p>
            </div>
          </div>
        )}

        {/* Gallery grid */}
        {images.length > 0 && (
          <section
            className="page-container"
            style={{ paddingTop: 'clamp(40px, 6vw, 80px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
                gap: 'clamp(12px, 2vw, 20px)',
              }}
            >
              {images.map((src, i) => {
                const isVideo = src.endsWith('.mp4');
                return (
                  <div
                    key={src}
                    onClick={() => setLightboxIdx(i)}
                    data-cursor-expand
                    style={{
                      borderRadius: 'var(--card-radius)',
                      overflow: 'hidden',
                      border: '1px solid var(--color-border)',
                      cursor: 'none',
                      aspectRatio: isVideo ? '16/9' : undefined,
                      background: project.gradient,
                      transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {isVideo ? (
                      <video
                        src={src}
                        muted loop playsInline autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <img
                        src={src}
                        alt=""
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Project nav */}
        <div className="page-container" style={{ paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
          <div style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {prevProject ? (
              <Link
                href={`/works/${prevProject.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  textDecoration: 'none', color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <span style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>← Előző</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 650, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            <Link
              href="/works"
              style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)', textDecoration: 'none',
                letterSpacing: '0.04em', transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              Összes munka
            </Link>

            {nextProject ? (
              <Link
                href={`/works/${nextProject.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right',
                  textDecoration: 'none', color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <span style={{ fontSize: 'var(--text-micro)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Következő →</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 650, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                  {nextProject.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>

      {/* Footer */}
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

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          initial={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────
function Lightbox({
  images,
  initial,
  onClose,
}: {
  images: string[];
  initial: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initial);
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
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)',
        zIndex: 9000, display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px clamp(20px, 4vw, 48px)', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
          {idx + 1} / {total}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '16px',
            transition: 'background 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px clamp(48px, 6vw, 80px)', position: 'relative', minHeight: 0,
        }}
      >
        {isVideo ? (
          <video key={current} src={current} autoPlay muted loop playsInline
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} />
        ) : (
          <img key={current} src={current} alt=""
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} />
        )}

        {total > 1 && (
          <>
            <button onClick={prev}
              style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: '48px', height: '48px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                color: '#fff', fontSize: '20px', transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            >←</button>
            <button onClick={next}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: '48px', height: '48px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                color: '#fff', fontSize: '20px', transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            >→</button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex', gap: '8px', padding: '16px clamp(20px, 4vw, 48px) 24px',
            overflowX: 'auto', justifyContent: 'center', flexShrink: 0,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIdx(i)}
              style={{
                flexShrink: 0, width: '52px', height: '52px', borderRadius: '8px',
                overflow: 'hidden', border: `2px solid ${i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer', padding: 0, background: '#111',
                transition: 'border-color 200ms ease', opacity: i === idx ? 1 : 0.55,
              }}
            >
              {src.endsWith('.mp4') ? (
                <div style={{ width: '100%', height: '100%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
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
