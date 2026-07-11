'use client';

import Link from 'next/link';
import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react';

/**
 * Outcrowd-minta "explode" gomb: a kurzort követő accent-színű kör
 * robban fel hoverre, kitöltve a gombot. A kör CSS transitionje csinálja
 * a mozgást (lásd globals.css: .explode-btn / .explode-dot).
 */
export default function ExplodeButton({
  href,
  children,
  style,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const dotRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const dot = dotRef.current;
    if (!dot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dot.style.left = `${e.clientX - rect.left}px`;
    dot.style.top = `${e.clientY - rect.top}px`;
    dot.style.transform = 'scale(60)';
  };

  const onLeave = () => {
    const dot = dotRef.current;
    if (dot) dot.style.transform = 'scale(0.1)';
  };

  return (
    <Link
      href={href}
      className="explode-btn"
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span ref={dotRef} className="explode-dot" aria-hidden="true" />
      <span className="explode-btn-label">{children}</span>
    </Link>
  );
}
