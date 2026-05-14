'use client';

import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    index: '01',
    title: 'Mozzano',
    category: 'Brand Identity',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 40%, #2a1f1a 100%)',
    accentColor: '#F0EDE8',
    images: [
      '/works/mozzano/Artboard%201.png',
      '/works/mozzano/Artboard%203.png',
      '/works/mozzano/Artboard%206.png',
      '/works/mozzano/Artboard%207.png',
      '/works/mozzano/Artboard%208.png',
      '/works/mozzano/Artboard%209.png',
      '/works/mozzano/Artboard%204.png',
      '/works/mozzano/Artboard%205.png',
    ],
  },
  {
    index: '02',
    title: 'FACE',
    category: 'Logo Design',
    year: '2026',
    gradient: 'linear-gradient(135deg, #E8551A 0%, #8B2E08 40%, #1a0d08 100%)',
    accentColor: '#E8551A',
    images: [
      '/works/face/Artboard%201-03.png',
      '/works/face/Artboard%201-05.png',
      '/works/face/Artboard%201-07.png',
      '/works/face/Artboard%201-09.png',
      '/works/face/Artboard%201-11.png',
      '/works/face/Artboard%201-14.png',
    ],
  },
  {
    index: '03',
    title: 'Kámfor',
    category: 'Brand Identity',
    year: '2022',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 40%, #2a3a1a 100%)',
    accentColor: '#6BAF6B',
    images: [
      '/works/kamfor/1.png',
      '/works/kamfor/001.png',
      '/works/kamfor/002.png',
      '/works/kamfor/003.png',
    ],
  },
  {
    index: '04',
    title: 'Apex Motion',
    category: 'Motion Brand',
    year: '2024',
    gradient: 'linear-gradient(135deg, #1a1a3a 0%, #0d0d2a 40%, #1a2a4a 100%)',
    accentColor: '#4A7FCB',
  },
  {
    index: '05',
    title: 'Pulsar Campaign',
    category: 'Campaign',
    year: '2025',
    gradient: 'linear-gradient(135deg, #2a1a3a 0%, #1a0d2a 40%, #3a1a4a 100%)',
    accentColor: '#9B6BCB',
  },
];

interface ProjectCardProps {
  project: typeof projects[0] & { images?: string[] };
}

function ProjectCard({ project }: ProjectCardProps) {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex(i => (i + 1) % project.images!.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [project.images]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1.02)';
    card.style.boxShadow = '0 24px 64px rgba(0,0,0,0.6)';
    if (arrowRef.current) {
      arrowRef.current.style.transform = 'translateX(4px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.boxShadow = 'none';
    if (arrowRef.current) {
      arrowRef.current.style.transform = 'translateX(0)';
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 34vw, 480px)',
        aspectRatio: '4 / 5',
        borderRadius: 'var(--card-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease',
        cursor: 'none',
        position: 'relative',
        background: project.gradient,
      }}
      data-cursor-expand
    >
      {/* Images (cycling) or placeholder */}
      {project.images ? (
        project.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === imgIndex ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
          />
        ))
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '55%',
              height: '55%',
              borderRadius: '50%',
              border: `1px solid ${project.accentColor}22`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '28%',
              height: '28%',
              borderRadius: '50%',
              border: `1px solid ${project.accentColor}44`,
            }}
          />
        </>
      )}

      {/* Bottom gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Index — top left */}
      <span
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em',
        }}
      >
        {project.index}
      </span>

      {/* Arrow — top right */}
      <span
        ref={arrowRef}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'block',
        }}
      >
        →
      </span>

      {/* Text — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            fontWeight: 650,
            color: '#ffffff',
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
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {project.category} · {project.year}
        </p>
      </div>
    </div>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    let gsapInstance: typeof import('gsap')['gsap'] | null = null;
    let scrollTriggerInstance: unknown = null;

    const initGsap = async () => {
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsapInstance = gsapModule.gsap;
        gsapInstance.registerPlugin(ScrollTrigger);
        scrollTriggerInstance = ScrollTrigger;

        if (isMobileRef.current) return;

        const track = trackRef.current;
        const section = sectionRef.current;
        const sticky = stickyRef.current;

        if (!track || !section || !sticky) return;

        // Scroll all cards into view (last card near right edge)
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewWidth = sticky.offsetWidth;
          return -(trackWidth - viewWidth + 80);
        };

        // Extra scroll to bring last card to horizontal center
        const getCenterOffset = () => {
          const viewWidth = sticky.offsetWidth;
          const approxCardWidth = Math.min(Math.max(280, viewWidth * 0.34), 480);
          return Math.max(0, viewWidth / 2 - approxCardWidth / 2 - 80);
        };

        const startPause = 500;
        const endPause   = 800;
        const scrollAmt  = getScrollAmount();
        const centerOff  = getCenterOffset();
        const finalX     = scrollAmt - centerOff;

        const tl = gsapInstance.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount()) + getCenterOffset() + startPause + endPause}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: belépő pause
        tl.to(track, { x: 0, duration: startPause, ease: 'none' })
        // Phase 2: fő vízszintes scroll
          .to(track, { x: scrollAmt, ease: 'none', duration: Math.abs(scrollAmt) })
        // Phase 3: utolsó kártya középre
          .to(track, { x: finalX, ease: 'none', duration: centerOff || 1 })
        // Phase 4: kilépő pause
          .to(track, { x: finalX, duration: endPause, ease: 'none' });

        return () => {
          tl.kill();
          (ScrollTrigger as { getAll: () => { kill: () => void }[] }).getAll().forEach((t: { kill: () => void }) => t.kill());
        };
      } catch (err) {
        console.warn('GSAP load failed:', err);
      }
    };

    const cleanup = initGsap();

    return () => {
      window.removeEventListener('resize', checkMobile);
      cleanup?.then((fn) => fn?.());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      style={{
        background: 'var(--color-bg)',
      }}
    >
      <div
        ref={stickyRef}
        className="hidden md:flex"
        style={{
          position: 'relative',
          height: '100svh',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
            marginBottom: '40px',
            flexShrink: 0,
          }}
        >
          <div
            className="section-label"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '32px',
                height: '1px',
                background: 'var(--color-accent)',
              }}
            />
            03 · Munkák
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Válogatott projektek
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <div
          style={{
            paddingLeft: 'var(--page-margin)',
            overflow: 'visible',
          }}
        >
          <div
            ref={trackRef}
            className="works-track"
            style={{
              paddingRight: 'var(--page-margin)',
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.index} project={project} />
            ))}
          </div>
        </div>

        {/* Progress hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: 'var(--page-margin)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="hidden md:flex"
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em',
            }}
          >
            Scroll →
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-border)',
            }}
          />
        </div>
      </div>

      {/* Mobile: horizontal overflow scroll */}
      <div
        className="md:hidden"
        style={{
          paddingTop: 'var(--section-padding-v)',
          paddingBottom: 'var(--section-padding-v)',
        }}
      >
        <div
          style={{
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
            marginBottom: '40px',
          }}
        >
          <div
            className="section-label"
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '32px',
                height: '1px',
                background: 'var(--color-accent)',
              }}
            />
            03 · Munkák
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Válogatott projektek
          </h2>
        </div>

        <div
          style={{
            overflowX: 'auto',
            paddingLeft: 'var(--page-margin)',
            paddingBottom: '24px',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              paddingRight: 'var(--page-margin)',
            }}
          >
            {projects.map((project) => (
              <div
                key={project.index}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

