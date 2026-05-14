'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    index: '01',
    title: 'Studio Noir',
    category: 'Brand Identity',
    year: '2025',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 40%, #2a1f1a 100%)',
    accentColor: '#F0EDE8',
  },
  {
    index: '02',
    title: 'Volta Energy',
    category: 'Visual System',
    year: '2024',
    gradient: 'linear-gradient(135deg, #E8551A 0%, #8B2E08 40%, #1a0d08 100%)',
    accentColor: '#E8551A',
  },
  {
    index: '03',
    title: 'Bloom Organic',
    category: 'Packaging',
    year: '2025',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 40%, #2a3a1a 100%)',
    accentColor: '#6BAF6B',
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
  project: typeof projects[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const arrowRef = useRef<HTMLSpanElement>(null);

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
        width: 'clamp(300px, 38vw, 520px)',
        borderRadius: 'var(--card-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease',
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      data-cursor-expand
    >
      {/* Cover gradient */}
      <div
        style={{
          height: 'clamp(260px, 35vw, 400px)',
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
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
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            border: `1px solid ${project.accentColor}44`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(17,17,17,0.8) 100%)',
          }}
        />
      </div>

      {/* Card footer */}
      <div
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border)',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em',
            }}
          >
            {project.index}
          </span>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-dm-sans), var(--font-body)',
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains), var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-text-muted)',
                margin: '4px 0 0',
                letterSpacing: '0.04em',
              }}
            >
              {project.category} · {project.year}
            </p>
          </div>
        </div>
        <span
          ref={arrowRef}
          style={{
            fontSize: '18px',
            color: 'var(--color-accent)',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block',
          }}
        >
          →
        </span>
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

        // Calculate how far we need to scroll horizontally
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewWidth = sticky.offsetWidth;
          return -(trackWidth - viewWidth + 80);
        };

        const tween = gsapInstance.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
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
              fontFamily: 'var(--font-bebas), var(--font-display)',
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
              fontFamily: 'var(--font-jetbrains), var(--font-mono)',
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
              fontFamily: 'var(--font-bebas), var(--font-display)',
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
