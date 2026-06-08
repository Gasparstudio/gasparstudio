'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type Intensity = 'sm' | 'md' | 'lg';

interface LiquidGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  borderRadius?: string;
  blurIntensity?: Intensity;
  shadowIntensity?: Intensity;
  draggable?: boolean;
  style?: React.CSSProperties;
}

const blurMap: Record<Intensity, number> = { sm: 8, md: 16, lg: 28 };

const shadowMap: Record<Intensity, string> = {
  sm: '0 2px 12px rgba(0,0,0,0.20)',
  md: '0 4px 24px rgba(0,0,0,0.28)',
  lg: '0 8px 40px rgba(0,0,0,0.36)',
};

export function LiquidGlassCard({
  children,
  className,
  borderRadius = '16px',
  blurIntensity = 'md',
  shadowIntensity = 'md',
  draggable = false,
  style,
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null);

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    e.preventDefault();
    dragOrigin.current = { mx: e.clientX, my: e.clientY, ox: dragOffset.x, oy: dragOffset.y };
    setDragging(true);
    const onMove = (ev: MouseEvent) => {
      if (!dragOrigin.current) return;
      setDragOffset({
        x: dragOrigin.current.ox + ev.clientX - dragOrigin.current.mx,
        y: dragOrigin.current.oy + ev.clientY - dragOrigin.current.my,
      });
    };
    const onUp = () => {
      setDragging(false);
      dragOrigin.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const blur = blurMap[blurIntensity];
  const transition = dragging ? 'none' : 'transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms ease';

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      className={cn('relative overflow-hidden', className)}
      style={{
        borderRadius,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
        backdropFilter: `blur(${blur}px) saturate(80%) brightness(1.06)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(80%) brightness(1.06)`,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)'}`,
        boxShadow: hovered
          ? '0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.22)'
          : shadowMap[shadowIntensity],
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
        transition,
        willChange: draggable ? 'transform' : undefined,
        cursor: draggable ? (dragging ? 'grabbing' : 'grab') : undefined,
        userSelect: dragging ? 'none' : undefined,
        ...style,
      }}
    >
      {/* Noise grain — subtle surface texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.035,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
