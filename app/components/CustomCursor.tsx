'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      cursor.style.opacity = '1';
    };

    // Esemény-delegálás: egyetlen listener a document-en, nem kell
    // MutationObserver-rel figyelni és minden elemre külön feliratkozni
    // (az korábban minden DOM-változásnál végigpásztázta az oldalt és
    // sok ezer listenert halmozott fel percek alatt).
    const isHoverable = (el: Element | null) =>
      el?.closest('a, button, [data-cursor-expand]') != null;

    const onOver = (e: MouseEvent) => {
      if (isHoverable(e.target as Element)) cursor.classList.add('expanded');
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (isHoverable(e.target as Element) && !isHoverable(related)) {
        cursor.classList.remove('expanded');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
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
