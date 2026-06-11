import React from 'react'

const GREEN = '#0DA64F'
const INK   = '#0A0A0A'
const W = 1080, H = 1350, P = 80
const INTER = 'var(--font-inter)'

// ── Shared ──────────────────────────────────────────────────────

const tiny: React.CSSProperties = { fontFamily: INTER, fontSize: 22, letterSpacing: '2.5px', fontWeight: 600 }

const Tag = ({ num, label, ink = INK }: { num: string; label: string; ink?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
    <span style={{ ...tiny, color: ink === INK ? GREEN : ink }}>{num}</span>
    <span style={{ width: 28, height: 2, background: `${ink}30`, flexShrink: 0 }} />
    <span style={{ ...tiny, color: `${ink}70` }}>{label.toUpperCase()}</span>
  </div>
)

const Foot = ({ num, ink = INK }: { num: string; ink?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
    <span style={{ ...tiny, color: `${ink}55` }}>gasparstudio.hu</span>
    <span style={{ ...tiny, color: `${ink}40` }}>{num} / 04</span>
  </div>
)

// ── Slides ──────────────────────────────────────────────────────

// 00 · Cover — logo only, clean white
export const SBSlide00 = () => (
  <div style={{ width: W, height: H, background: '#fff', padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Tag num="●" label="Simon's Burger" />
      <span style={{ ...tiny, color: `${INK}50` }}>2026</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56 }}>
      <img src="/partners/Simon_s_Burger_all_CMYK_simon_s_burger_green.webp" alt="Simon's Burger" style={{ width: 620, height: 'auto' }} />
      <span style={{ ...tiny, color: `${INK}55` }}>LOGÓ ÉS ARCULAT REDESIGN</span>
    </div>
    <Foot num="00" />
  </div>
)

// 01 · Miért — explanation + old/new strip
export const SBSlide01 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="01" label="Miért" ink="#FFFFFF" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44 }}>
      <span style={{ fontFamily: INTER, fontSize: 88, fontWeight: 900, color: '#fff', letterSpacing: '-3.5px', lineHeight: 1 }}>
        Nem kellett<br />mindent<br />lerombolni.
      </span>
      <span style={{ fontFamily: INTER, fontSize: 24, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, maxWidth: 720 }}>
        A ® jel és a betűközök használata következetlen volt, ez megbontotta a logó egyensúlyát.
        Egyetlen jól átgondolt változtatás elég volt: szűkebb betűközök és a ® precíz helye a jobb felső sarokban.
      </span>
      <img src="/works/Simon's%20Burger/elvlaszto.png" alt="Régi és új logó" style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block' }} />
    </div>
    <Foot num="01" ink="#FFFFFF" />
  </div>
)

// 02 · Social — old vs new references
export const SBSlide02 = () => (
  <div style={{ width: W, height: H, background: '#fff', padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="02" label="Social média" />
    <div style={{ flex: 1, display: 'flex', gap: 20, paddingTop: 40, paddingBottom: 40, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
        <span style={{ fontFamily: INTER, fontSize: 44, fontWeight: 900, color: `${INK}35`, letterSpacing: '-1.5px', flexShrink: 0 }}>Régi</span>
        <img src="/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185734.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 14 }} />
        <img src="/works/Simon's%20Burger/social/old/K%C3%A9perny%C5%91k%C3%A9p%202026-06-01%20185740.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 14 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
        <span style={{ fontFamily: INTER, fontSize: 44, fontWeight: 900, color: GREEN, letterSpacing: '-1.5px', flexShrink: 0 }}>Új</span>
        <img src="/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_burger.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 14 }} />
        <img src="/works/Simon's%20Burger/social/new/simon%27s_burger_koki_1x1_fagyi.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 14 }} />
      </div>
    </div>
    <Foot num="02" />
  </div>
)

// 03 · A márka élőben — photo references
export const SBSlide03 = () => (
  <div style={{ width: W, height: H, background: '#fff', padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="03" label="A márka élőben" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 40, paddingBottom: 40, minHeight: 0 }}>
      <img src="/works/Simon's%20Burger/_DSC5942.jpg" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 16 }} />
      <img src="/works/Simon's%20Burger/_DSC6041.jpg" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', borderRadius: 16 }} />
    </div>
    <Foot num="03" />
  </div>
)

// 04 · CTA
export const SBSlide04 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="04" label="Simon's Burger · Redesign" ink="#FFFFFF" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontFamily: INTER, fontSize: 96, fontWeight: 900, color: '#fff', letterSpacing: '-4px', lineHeight: 0.98 }}>
        Néha egy<br />jó logónak<br />csak levegő kell.
      </span>
      <span style={{ fontFamily: INTER, fontSize: 26, color: 'rgba(255,255,255,0.85)', marginTop: 48, display: 'block' }}>
        A tiédnek mire van szüksége?
      </span>
      <span style={{ fontFamily: INTER, fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginTop: 40, display: 'block' }}>gasparstudio.hu</span>
      <span style={{ ...tiny, color: 'rgba(255,255,255,0.6)', marginTop: 14, display: 'block' }}>LINK A BIOBAN ↑</span>
    </div>
    <Foot num="04" ink="#FFFFFF" />
  </div>
)

export const slides = [SBSlide00, SBSlide01, SBSlide02, SBSlide03, SBSlide04]
