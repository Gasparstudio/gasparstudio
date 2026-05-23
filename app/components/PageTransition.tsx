'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const overlay = overlayRef.current;
    if (!content || !overlay) return;

    // Reset
    overlay.style.transition = 'none';
    overlay.style.transform = 'scaleY(0)';
    overlay.style.transformOrigin = 'top center';
    content.style.transition = 'none';
    content.style.opacity = '0';
    content.style.transform = 'translateY(18px)';

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Overlay sweeps in from top
        overlay.style.transition = 'transform 220ms cubic-bezier(0.76, 0, 0.24, 1)';
        overlay.style.transform = 'scaleY(1)';

        const t1 = setTimeout(() => {
          // Overlay sweeps out downward
          overlay.style.transformOrigin = 'bottom center';
          overlay.style.transition = 'transform 280ms cubic-bezier(0.76, 0, 0.24, 1)';
          overlay.style.transform = 'scaleY(0)';

          // Content enters
          content.style.transition =
            'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1)';
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';

          // After animation completes, clear inline styles.
          // transform/opacity set inline create a containing block for position:fixed
          // descendants (browser spec), which breaks the custom cursor outside Hero.
          const t2 = setTimeout(() => {
            content.style.transition = '';
            content.style.opacity = '';
            content.style.transform = '';
          }, 580);

          return () => clearTimeout(t2);
        }, 230);

        return () => clearTimeout(t1);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-accent-gradient)',
          zIndex: 99998,
          transform: 'scaleY(0)',
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
