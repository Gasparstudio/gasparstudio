'use client'

import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react'

const BLUE = '#1A7BFF'
const BG = '#000000'
const W = 1080, H = 1350, P = 72
const SORA = 'var(--font-display)'
const DM   = 'var(--font-body)'

// ── Shared ─────────────────────────────────────────────────────

const Footer = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexShrink: 0 }}>
    <span style={{ fontFamily: DM, fontSize: 18, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px' }}>gasparstudio.hu</span>
  </div>
)

// Pure full-bleed photo slide — no text, no overlay, just the image.
// `shiftY` nudges the content vertically (negative = up); a small overscan
// scale keeps the frame fully covered with no black edges.
const PlainImage = ({ src, objectPosition, shiftY = 0 }: {
  src: string; objectPosition?: string; shiftY?: number
}) => (
  <div style={{ width: W, height: H, background: '#000', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <img
      src={src}
      alt=""
      style={{
        width: '100%', height: '100%', objectFit: 'cover',
        objectPosition: objectPosition ?? 'center', display: 'block',
        transform: shiftY ? `scale(1.08) translateY(${shiftY}px)` : undefined,
      }}
    />
  </div>
)

// ── Slides ─────────────────────────────────────────────────────

// 00 — Cover: csak a rácsos logó, középen, nagyban
export const Slide00 = () => (
  <div style={{ width: W, height: H, background: BG, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="/works/face/face_logo_1.png" alt="" style={{ width: 1040, height: 760, objectFit: 'contain' }} />
    </div>
  </div>
)

// 00b — Szöveg slide: uppercase, NEM torzított. Egységes betűméret, amit
// úgy számolunk, hogy a leghosszabb sor pontosan az oldalszélekig érjen;
// a rövidebb sorok természetes szélességűek maradnak, középen, fent/lent
// maradhat üres rész.
const TXT_LINES: { t: string; color: string }[] = [
  { t: '16PX',        color: '#fff' },
  { t: '16M',         color: BLUE },
  { t: 'SAME LOGO',   color: '#fff' },
  { t: 'SAME ENERGY', color: '#fff' },
]

export const SlideText = () => {
  const M = 40                         // oldalsó margó
  const TARGET = W - M * 2             // minden sor ennyit érjen el
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [sizes, setSizes] = useState<number[]>(() => TXT_LINES.map(() => 160))

  // Soronként akkora betűméret, hogy a sor természetes szélessége = TARGET
  // (nincs glyph-torzítás, csak a font-size változik soronként).
  const measure = useCallback(() => {
    let changed = false
    const next = sizes.map((cur, i) => {
      const el = refs.current[i]
      if (el && el.offsetWidth > 0) {
        const d = cur * TARGET / el.offsetWidth
        if (Math.abs(d - cur) > 0.5) { changed = true; return d }
      }
      return cur
    })
    if (changed) setSizes(next)
  }, [TARGET, sizes])

  useLayoutEffect(() => { measure() })
  useEffect(() => {
    let on = true
    document.fonts.ready.then(() => { if (on) measure() })
    return () => { on = false }
  }, [measure])

  return (
    <div style={{
      width: W, height: H, background: BG, position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: `0 ${M}px`,
    }}>
      {TXT_LINES.map((ln, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          style={{ fontFamily: SORA, fontWeight: 800, fontSize: sizes[i], lineHeight: 0.9, letterSpacing: '-2px', color: ln.color, whiteSpace: 'nowrap' }}
        >
          {ln.t}
        </div>
      ))}
    </div>
  )
}

// 01 — 16 px / kis lépték: hímzett jel pólón (csak kép)
export const Slide01 = () => (
  <PlainImage src="/works/face/mockup_04.png" objectPosition="center" />
)

// 02 — 16 méter / nagy lépték: irodaépület (csak kép, 30px feljebb)
export const Slide02 = () => (
  <PlainImage src="/works/face/face_mockup_07.png" objectPosition="50% 38%" shiftY={-30} />
)

// 03 — Záró / CTA
export const Slide03 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontFamily: SORA, fontSize: 80, fontWeight: 800, color: '#fff', letterSpacing: '-3px', lineHeight: 0.98 }}>Ha 16 pixelnél</span>
      <span style={{ fontFamily: SORA, fontSize: 80, fontWeight: 800, color: '#fff', letterSpacing: '-3px', lineHeight: 0.98 }}>és 16 méternél</span>
      <span style={{ fontFamily: SORA, fontSize: 80, fontWeight: 800, color: '#fff', letterSpacing: '-3px', lineHeight: 0.98 }}>is működik,</span>
      <span style={{ fontFamily: SORA, fontSize: 80, fontWeight: 800, color: BLUE, letterSpacing: '-3px', lineHeight: 0.98 }}>jó a logó.</span>
      <span style={{ fontFamily: DM, fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px', marginTop: 44 }}>Hasonló rendszert szeretnél?</span>
      <span style={{ fontFamily: DM, fontSize: 20, color: BLUE, letterSpacing: '0.5px', marginTop: 12, display: 'block' }}>gasparstudio.hu · Link a bio-ban ↑</span>
    </div>
    <Footer />
  </div>
)

export const slides = [Slide00, SlideText, Slide01, Slide02, Slide03]
