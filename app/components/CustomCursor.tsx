'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.opacity = '0';

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      cursor.style.opacity = '1';
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.18);
      current.current.y = lerp(current.current.y, pos.current.y, 0.18);
      if (cursor) {
        cursor.style.left = `${current.current.x}px`;
        cursor.style.top = `${current.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onEnterHoverable = () => cursor?.classList.add('expanded');
    const onLeaveHoverable = () => cursor?.classList.remove('expanded');

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-expand]').forEach(el => {
        el.addEventListener('mouseenter', onEnterHoverable);
        el.addEventListener('mouseleave', onLeaveHoverable);
      });
    };

    addListeners();

    // Observe DOM changes to re-add listeners
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
