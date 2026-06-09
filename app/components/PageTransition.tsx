'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const FADE_IN = 350;
const HOLD = 2000;
const FADE_OUT = 400;
const CONTENT_FADE = 500;

// Only show the branded transition when entering a project detail page
function isProjectPage(path: string) {
  return /^\/works\/[^/]+/.test(path);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const label = labelRef.current;
    if (!content || !overlay || !label) return;

    // Always show content immediately for non-project pages
    if (!isProjectPage(pathname)) {
      overlay.style.transition = 'none';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      label.style.opacity = '0';
      content.style.transition = 'none';
      content.style.opacity = '1';
      return;
    }

    // Branded black fade for project pages
    overlay.style.transition = 'none';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    label.style.transition = 'none';
    label.style.opacity = '0';
    content.style.transition = 'none';
    content.style.opacity = '0';

    const timers: ReturnType<typeof setTimeout>[] = [];

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${FADE_IN}ms ease`;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';

        const t0 = setTimeout(() => {
          label.style.transition = `opacity 250ms ease`;
          label.style.opacity = '1';
        }, FADE_IN * 0.4);
        timers.push(t0);

        const t1 = setTimeout(() => {
          label.style.transition = `opacity 200ms ease`;
          label.style.opacity = '0';

          const t2 = setTimeout(() => {
            overlay.style.transition = `opacity ${FADE_OUT}ms ease`;
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';

            content.style.transition = `opacity ${CONTENT_FADE}ms ease`;
            content.style.opacity = '1';

            const t3 = setTimeout(() => {
              content.style.transition = '';
              content.style.opacity = '';
            }, CONTENT_FADE + 50);
            timers.push(t3);
          }, 180);
          timers.push(t2);
        }, FADE_IN + HOLD);
        timers.push(t1);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <>
      {/* Black fade overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 99998,
          opacity: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          ref={labelRef}
          src="/gaspar_logo_v1-01.png"
          alt="Gaspar"
          style={{
            opacity: 0,
            width: 'clamp(80px, 10vw, 140px)',
            filter: 'brightness(0) invert(1)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
