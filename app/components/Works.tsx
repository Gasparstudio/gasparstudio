'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects as realProjects } from '../data/projects';
import type { Project } from '../data/projects';
import { useLang } from '../context/LanguageContext';

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ctaCard = {
  index: String(realProjects.length + 1).padStart(2, '0'),
  title: '__cta__',
  category: null as string | null,
  year: null as string | null,
  gradient: '',
  accentColor: '',
  images: [] as string[],
  slug: '__cta__',
};

function WaitingText() {
  const { t } = useLang();
  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-muted)',
        letterSpacing: '0.06em',
      }}
    >
      {t('works.soon')}
    </span>
  );
}

function VoidCard({ index }: { index: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 34vw, 480px)',
        aspectRatio: '4 / 5',
        borderRadius: 'var(--card-radius-lg)',
        border: '1px dashed var(--color-border)',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        position: 'relative',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.1em',
          position: 'absolute',
          top: '20px',
          left: '24px',
        }}
      >
        {index}
      </span>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '18px',
          lineHeight: 1,
        }}
      >
        +
      </div>
      <WaitingText />
    </div>
  );
}

function VideoSlide({ src, visible }: { src: string; visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      ref.current.currentTime = 0;
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [visible]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: visible ? 1 : 0,
        transition: 'opacity 600ms ease',
      }}
    />
  );
}

const CTA_WORDS = ['A', 'TE', 'PROJEKTED'];

function CTACard({ wordIndex }: { wordIndex: number }) {
  const word = CTA_WORDS[wordIndex % CTA_WORDS.length];
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 34vw, 480px)',
        aspectRatio: '4 / 5',
        borderRadius: 'var(--card-radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
      }}
    >
      <span
        key={word}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          animation: 'ctaWordIn 0.15s ease forwards',
        }}
      >
        {word}
      </span>
    </div>
  );
}

function LogofolioCard({ project }: { project: { index: string; title: string; category: string | null; year: string | null; images: string[] } }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const imgs = project.images;
    if (!imgs || imgs.length < 2) return;
    const id = setInterval(() => {
      setIdx(prev => (prev + 1) % imgs.length);
    }, 1000);
    return () => clearInterval(id);
  }, [project.images]);

  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 34vw, 480px)',
        aspectRatio: '4 / 5',
        borderRadius: 'var(--card-radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        position: 'relative',
        background: '#000000',
      }}
    >
      {project.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            top: '22%',
            left: '18%',
            width: '63%',
            height: '50%',
            objectFit: 'contain',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
        />
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)' }} />

      <span style={{
        position: 'absolute', top: '20px', left: '24px',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)',
        fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em',
      }}>
        {project.index}
      </span>

      <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 30px)',
          fontWeight: 650, color: '#ffffff', margin: '0 0 6px',
          lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)',
          fontWeight: 400, color: 'rgba(255,255,255,0.6)', margin: 0,
          letterSpacing: '0.02em',
        }}>
          {project.category} · {project.year}
        </p>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: {
    slug: string;
    index: string;
    title: string;
    category: string | null;
    year: string | null;
    gradient: string;
    accentColor: string;
    images: string[];
  };
  imgIndex: number;
}

function ProjectCard({ project, imgIndex }: ProjectCardProps) {
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
    <Link
      href={`/works/${project.slug}`}
      onMouseEnter={handleMouseEnter as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={handleMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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
        display: 'block',
        textDecoration: 'none',
      }}
      data-cursor-expand
    >
      {/* Images/videos (cycling) or placeholder */}
      {project.images ? (
        project.images.map((src: string, i: number) => {
          const isVideo = src.endsWith('.mp4');
          const visible = i === imgIndex;
          const mediaStyle: React.CSSProperties = {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: visible ? 1 : 0,
            transition: 'opacity 600ms ease',
          };
          return isVideo ? (
            <VideoSlide key={src} src={src} visible={visible} />
          ) : (
            <img key={src} src={src} alt="" style={mediaStyle} />
          );
        })
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
    </Link>
  );
}

export default function Works() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  const [projects, setProjects] = useState(() => [...realProjects, ctaCard]);
  useEffect(() => { setProjects([...shuffleArr(realProjects), ctaCard]); }, []);
  const [imgIndices, setImgIndices] = useState<number[]>(() => projects.map(() => 0));
  const [ctaWordIndex, setCtaWordIndex] = useState(0);

  useEffect(() => {
    const sequence = projects
      .map((p, i) => ({ i, type: p.title === '__cta__' ? 'cta' : 'img', len: p.images?.length ?? 0 }))
      .filter(({ type, len }) => type === 'cta' || len > 1);
    if (sequence.length === 0) return;
    let pointer = 0;
    const interval = setInterval(() => {
      const item = sequence[pointer];
      if (item.type === 'cta') {
        setCtaWordIndex(prev => (prev + 1) % CTA_WORDS.length);
      } else {
        setImgIndices(prev => {
          const next = [...prev];
          next[item.i] = (next[item.i] + 1) % projects[item.i].images!.length;
          return next;
        });
      }
      pointer = (pointer + 1) % sequence.length;
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Set section height so CSS sticky has room to scroll
  useEffect(() => {
    const update = () => {
      isMobileRef.current = window.innerWidth < 768;
      const track = trackRef.current;
      const sticky = stickyRef.current;
      const section = sectionRef.current;
      if (!track || !sticky || !section || isMobileRef.current) {
        if (section) section.style.height = '';
        return;
      }
      const trackW = track.scrollWidth;
      const viewW = sticky.offsetWidth;
      const scrollDist = Math.max(0, trackW - viewW + 80);
      // section height = viewport + full scroll distance (+ padding for start/end pauses)
      section.style.height = `${window.innerHeight + scrollDist + 800}px`;
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  // GSAP scrub — no pin, CSS sticky handles the viewport lock
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let killed = false;

    const initGsap = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);

        if (isMobileRef.current) return;

        const track = trackRef.current;
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        if (!track || !section || !sticky) return;

        const getScrollAmount = () => {
          const trackW = track.scrollWidth;
          const viewW = sticky.offsetWidth;
          return -(trackW - viewW + 80);
        };

        const getCenterOffset = () => {
          const viewW = sticky.offsetWidth;
          const approxCard = Math.min(Math.max(280, viewW * 0.34), 480);
          return Math.max(0, viewW / 2 - approxCard / 2 - 80);
        };

        const scrollAmt = getScrollAmount();
        const centerOff = getCenterOffset();
        const finalX    = scrollAmt - centerOff;

        // Timeline duration units map 1:1 to the scroll distance set above
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, { x: 0,       duration: 400,                     ease: 'none' })
          .to(track, { x: scrollAmt, duration: Math.abs(scrollAmt),    ease: 'none' })
          .to(track, { x: finalX,   duration: Math.max(centerOff, 1),  ease: 'none' })
          .to(track, { x: finalX,   duration: 400,                     ease: 'none' });

        return () => {
          tl.kill();
          (ScrollTrigger as { getAll: () => { kill: () => void }[] })
            .getAll().forEach((t: { kill: () => void }) => t.kill());
        };
      } catch (err) {
        console.warn('GSAP load failed:', err);
      }
    };

    const cleanup = initGsap();
    return () => {
      killed = true;
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
          position: 'sticky',
          top: 0,
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
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
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
              {t('works.heading')}
            </h2>
            <Link
              href="/works"
              className="btn-text"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', marginBottom: '6px', whiteSpace: 'nowrap' }}
            >
              {t('works.all')}
            </Link>
          </div>
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
            {projects.map((project, i) => {
              if (project.title === null) return <VoidCard key={project.index} index={project.index} />;
              if (project.title === '__cta__') return <CTACard key={project.index} wordIndex={ctaWordIndex} />;
              if (project.slug === 'logofolio') return <LogofolioCard key={project.index} project={project} />;
              return <ProjectCard key={project.index} project={project} imgIndex={imgIndices[i]} />;
            })}
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
            {t('works.scroll')}
          </span>
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
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {t('works.heading')}
            </h2>
            <Link
              href="/works"
              className="btn-text"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', marginBottom: '4px', whiteSpace: 'nowrap' }}
            >
              {t('works.all')}
            </Link>
          </div>
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
                {project.title === null
                  ? <VoidCard index={project.index} />
                  : project.title === '__cta__'
                    ? <CTACard wordIndex={ctaWordIndex} />
                    : project.slug === 'logofolio'
                      ? <LogofolioCard project={project} />
                      : <ProjectCard project={project} imgIndex={imgIndices[projects.indexOf(project)]} />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

