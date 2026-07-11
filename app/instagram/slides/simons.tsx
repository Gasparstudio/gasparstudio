import React from 'react'

const GREEN = '#0DA64F'
const INK   = '#0A0A0A'
const W = 1080, H = 1350, P = 80
const INTER = 'var(--font-inter)'

const tiny: React.CSSProperties = { fontFamily: INTER, fontSize: 22, letterSpacing: '2.5px', fontWeight: 600 }

// ── Slides ──────────────────────────────────────────────────────
// 4 oldal, fejléc/lábléc nélkül — csak az utolsón gasparstudio.hu

// 01 · Nyitó kép — full bleed (régi → új logó, zöld háttér)
export const SBSlide00 = () => (
  <div style={{ width: W, height: H, boxSizing: 'border-box', overflow: 'hidden' }}>
    <img
      src="/instagram-gallery/simons/cover.png"
      alt="Simon's Burger logó redesign"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  </div>
)

// 02 · Szöveges kifejtés — zöld háttér, csak szöveg
export const SBSlide01 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 52 }}>
      <img
        src="/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp"
        alt="Simon's Burger"
        style={{ width: 220, height: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }}
      />
      <span style={{ fontFamily: INTER, fontSize: 96, fontWeight: 900, color: '#fff', letterSpacing: '-3.5px', lineHeight: 1 }}>
        Nem kellett<br />mindent<br />lerombolni.
      </span>
      <span style={{ fontFamily: INTER, fontSize: 28, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, maxWidth: 760 }}>
        A ® jel és a betűközök használata következetlen volt, ez megbontotta a logó egyensúlyát.
        Egyetlen jól átgondolt változtatás elég volt: szűkebb betűközök és a ® precíz helye a jobb felső sarokban.
        Így az identitás végre azt mondja, amit a márka mindig is képviselt. Tisztán, felesleges zaj nélkül.
      </span>
    </div>
  </div>
)

// 03 · Referenciák — Régi vs Új social képek
export const SBSlide02 = () => (
  <div style={{ width: W, height: H, background: '#fff', padding: P, display: 'flex', boxSizing: 'border-box' }}>
    <div style={{ flex: 1, display: 'flex', gap: 20, minHeight: 0, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontFamily: INTER, fontSize: 44, fontWeight: 900, color: `${INK}35`, letterSpacing: '-1.5px' }}>Régi</span>
        <img src="/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185734.webp" alt="" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 14 }} />
        <img src="/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185740.webp" alt="" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 14 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontFamily: INTER, fontSize: 44, fontWeight: 900, color: GREEN, letterSpacing: '-1.5px' }}>Új</span>
        <img src="/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_burger.webp" alt="" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 14 }} />
        <img src="/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_fagyi.webp" alt="" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 14 }} />
      </div>
    </div>
  </div>
)

// 04 · Catering kreatívok — két kép egymás alatt
export const SBSlide03 = () => (
  <div style={{ width: W, height: H, background: '#fff', padding: P, display: 'flex', boxSizing: 'border-box' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 0 }}>
      <img src="/works/Simon's%20Burger/social/new/Simon%27s_catering_1x1_v2.webp" alt="" style={{ flex: 1, minHeight: 0, aspectRatio: '1 / 1', maxWidth: '100%', objectFit: 'cover', borderRadius: 16 }} />
      <img src="/works/Simon's%20Burger/social/new/Simon%27s_catering_1x1_v4.webp" alt="" style={{ flex: 1, minHeight: 0, aspectRatio: '1 / 1', maxWidth: '100%', objectFit: 'cover', borderRadius: 16 }} />
    </div>
  </div>
)

// 05 · CTA — csak itt marad a gasparstudio.hu
export const SBSlide04 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <img
        src="/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp"
        alt="Simon's Burger"
        style={{ width: 220, height: 'auto', filter: 'brightness(0) invert(1)', display: 'block', marginBottom: 52 }}
      />
      <span style={{ fontFamily: INTER, fontSize: 96, fontWeight: 900, color: '#fff', letterSpacing: '-4px', lineHeight: 0.98 }}>
        Néha egy<br />jó logónak<br />csak levegő kell.
      </span>
      <span style={{ fontFamily: INTER, fontSize: 26, color: 'rgba(255,255,255,0.85)', marginTop: 48, display: 'block' }}>
        A tiédnek mire van szüksége?
      </span>
      <span style={{ fontFamily: INTER, fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginTop: 40, display: 'block' }}>gasparstudio.hu</span>
      <span style={{ ...tiny, color: 'rgba(255,255,255,0.6)', marginTop: 14, display: 'block' }}>LINK A BIOBAN ↑</span>
    </div>
  </div>
)

export const slides = [SBSlide00, SBSlide01, SBSlide02, SBSlide03, SBSlide04]
