import React from 'react'

const GREEN = '#2D6A4F'
const FERN  = '#52B788'
const CREAM = '#F5F0E4'
const NAVY  = '#1A2230'
const RED   = '#D34C2D'
const EMBER = '#E2603F'
const W = 1080, H = 1350, P = 80
const CG = 'CabinetGrotesk, var(--font-display)'
const DM = 'var(--font-body)'

// ── Shared ──────────────────────────────────────────────────────

const Star = ({ size = 14, color = RED, style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0Z" fill={color} />
  </svg>
)

const tiny: React.CSSProperties = { fontFamily: DM, fontSize: 22, letterSpacing: '2.5px', fontWeight: 500 }

const Tag = ({ num, label, ink = NAVY }: { num: string; label: string; ink?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
    <Star size={11} />
    <span style={{ ...tiny, color: RED }}>{num}</span>
    <span style={{ ...tiny, color: `${ink}70` }}>{label.toUpperCase()}</span>
  </div>
)

const Foot = ({ num, ink = NAVY }: { num: string; ink?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
    <span style={{ ...tiny, color: `${ink}55` }}>gasparstudio.hu</span>
    <span style={{ ...tiny, color: `${ink}40` }}>{num} / 10</span>
  </div>
)

// ── Slides ──────────────────────────────────────────────────────

// 00 · Cover — logo only, centered
export const SVSlide00 = () => (
  <div style={{ width: W, height: H, background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
    <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color.png" alt="Sárkány Völgy Mese Fesztivál" style={{ width: 720, height: 'auto' }} />
  </div>
)

// 01 · Title — oversized type, dragon bleeding off the right edge
export const SVSlide01 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img
      src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png"
      alt=""
      style={{ position: 'absolute', right: -110, top: 120, width: 660, height: 'auto', opacity: 0.95, pointerEvents: 'none' }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <Tag num="✦" label="Sárkány Völgy Mese Fesztivál" />
      <span style={{ ...tiny, color: `${NAVY}50` }}>2026</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 28, position: 'relative', zIndex: 1 }}>
      <span style={{ fontFamily: DM, fontSize: 23, color: `${NAVY}70`, letterSpacing: '0.5px', marginBottom: 30, display: 'block' }}>
        Hol volt, hol nem volt&hellip;
      </span>
      <span style={{ fontFamily: CG, fontSize: 152, fontWeight: 900, color: NAVY, letterSpacing: '-6px', lineHeight: 0.88, display: 'block' }}>Sárkány</span>
      <span style={{ fontFamily: CG, fontSize: 152, fontWeight: 900, color: GREEN, letterSpacing: '-6px', lineHeight: 0.88, display: 'block' }}>Völgy</span>
      <span style={{ fontFamily: CG, fontSize: 152, fontWeight: 900, color: NAVY, letterSpacing: '-6px', lineHeight: 0.88, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        Mese.<Star size={30} style={{ marginTop: 26 }} />
      </span>
      <span style={{ ...tiny, color: `${NAVY}55`, marginTop: 44, display: 'block' }}>BRAND IDENTITY · LOGÓ · SZÍN · TIPOGRÁFIA</span>
    </div>
    <Foot num="01" />
  </div>
)

// 02 · A mese — editorial: big statement + offset paragraph
export const SVSlide02 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="02" label="A mese" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontFamily: CG, fontSize: 104, fontWeight: 900, color: NAVY, letterSpacing: '-4px', lineHeight: 0.94 }}>
        Egy völgy,<br />ahol a sárkányok<br /><span style={{ color: GREEN }}>mesélnek.</span>
      </span>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 80 }}>
        <div style={{ maxWidth: 480, borderLeft: `3px solid ${RED}`, paddingLeft: 32 }}>
          <span style={{ fontFamily: DM, fontSize: 22, color: `${NAVY}75`, lineHeight: 1.7, display: 'block' }}>
            Modern mítosz, magyar népmesei gyökerekkel. A fesztivál jele bátor, tiszta és fegyelmezett.
            A formanyelve mai, a lelke hetedhét országon is túlról való.
          </span>
        </div>
      </div>
    </div>
    <Foot num="02" />
  </div>
)

// 03 · Három alak — asymmetric panel grid
export const SVSlide03 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="03" label="A logó három alakja" />
    <div style={{ flex: 1, display: 'flex', gap: 14, paddingTop: 36, paddingBottom: 36, minHeight: 0 }}>
      <div style={{ flex: 5, background: GREEN, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: 0 }}>
        <span style={{ ...tiny, fontSize: 13, color: `${CREAM}80`, padding: '24px 28px 0' }}>A · ÁLLÓ</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white.png" alt="" style={{ width: '74%', height: 'auto' }} />
        </div>
      </div>
      <div style={{ flex: 4, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
        <div style={{ flex: 3, border: `1.5px solid ${NAVY}25`, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: 0 }}>
          <span style={{ ...tiny, fontSize: 13, color: RED, padding: '22px 26px 0' }}>B · VÉDJEGY</span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
            <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png" alt="" style={{ height: '64%', width: 'auto' }} />
          </div>
        </div>
        <div style={{ flex: 2, background: NAVY, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: 0 }}>
          <span style={{ ...tiny, fontSize: 13, color: EMBER, padding: '22px 26px 0' }}>C · VÍZSZINTES</span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
            <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_long.png" alt="" style={{ width: '78%', height: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
    <Foot num="03" />
  </div>
)

// 04 · Színek — full-bleed 60/30/10 stack
export const SVSlide04 = () => (
  <div style={{ width: W, height: H, background: GREEN, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden' }}>
    <div style={{ flex: 6, background: GREEN, padding: `${P}px ${P}px 48px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
      <Tag num="04" label="Színarány" ink={CREAM} />
      <div>
        <span style={{ fontFamily: CG, fontSize: 230, fontWeight: 900, color: CREAM, letterSpacing: '-8px', lineHeight: 0.85, display: 'block' }}>60</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 26 }}>
          <span style={{ fontFamily: CG, fontSize: 34, fontWeight: 900, color: CREAM, letterSpacing: '-1px' }}>Sárkány Zöld</span>
          <span style={{ fontFamily: DM, fontSize: 17, color: `${CREAM}60` }}>#2D6A4F · az erdő, ahol a mese él</span>
        </div>
      </div>
    </div>
    <div style={{ flex: 3, background: NAVY, padding: `40px ${P}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
      <div>
        <span style={{ fontFamily: CG, fontSize: 110, fontWeight: 900, color: CREAM, letterSpacing: '-4px', lineHeight: 0.9, display: 'block' }}>30</span>
        <span style={{ fontFamily: CG, fontSize: 26, fontWeight: 900, color: `${CREAM}90`, display: 'block', marginTop: 12 }}>Éjkobalt</span>
      </div>
      <span style={{ fontFamily: DM, fontSize: 18, color: `${CREAM}55`, lineHeight: 1.6, maxWidth: 380, textAlign: 'right' }}>
        Szerkezet és tipográfiai súly.<br />#1A2230
      </span>
    </div>
    <div style={{ flex: 1, background: RED, padding: `0 ${P}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <span style={{ fontFamily: CG, fontSize: 56, fontWeight: 900, color: CREAM, letterSpacing: '-2px' }}>10</span>
        <span style={{ fontFamily: CG, fontSize: 24, fontWeight: 900, color: CREAM }}>Sárkány Tűz</span>
      </div>
      <span style={{ fontFamily: DM, fontSize: 16, color: `${CREAM}80` }}>egyetlen szikra a sötét völgyben</span>
    </div>
  </div>
)

// 05 · Betűk — oversized specimen, two-column alphabets
export const SVSlide05 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden' }}>
    <Tag num="05" label="Betűk" />
    <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', minHeight: 0 }}>
      <span style={{ fontFamily: CG, fontSize: 380, fontWeight: 900, color: NAVY, letterSpacing: '-16px', lineHeight: 0.9, display: 'inline-flex', alignItems: 'flex-start', gap: 16 }}>
        Aa<Star size={40} style={{ marginTop: 80 }} />
      </span>
    </div>
    <div style={{ flex: 1, display: 'flex', gap: 48, alignItems: 'flex-end', paddingBottom: 40 }}>
      <div style={{ flex: 1 }}>
        <span style={{ ...tiny, fontSize: 13, color: RED, display: 'block', marginBottom: 18 }}>CABINET GROTESK · CÍMEK</span>
        <span style={{ fontFamily: CG, fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: '0.5px', lineHeight: 1.45, display: 'block' }}>
          ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ<br />abcdefghijklm<br />1234567890
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ ...tiny, fontSize: 13, color: RED, display: 'block', marginBottom: 18 }}>DM SANS · SZÖVEG</span>
        <span style={{ fontFamily: DM, fontSize: 30, fontWeight: 400, color: `${NAVY}80`, letterSpacing: '0.5px', lineHeight: 1.45, display: 'block' }}>
          ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ<br />abcdefghijklm<br />1234567890
        </span>
      </div>
    </div>
    <Foot num="05" />
  </div>
)

// 06 · Plakát — full-bleed green poster, watermark off the edge
export const SVSlide06 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img
      src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png"
      alt=""
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Tag num="06" label="Plakát" ink={CREAM} />
      <span style={{ ...tiny, color: `${CREAM}50` }}>2026 · NYÁR</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 36, position: 'relative', zIndex: 1 }}>
      <span style={{ ...tiny, color: `${CREAM}70`, display: 'block', marginBottom: 26 }}>ESTI MESÉK A NAGYSZÍNPADON</span>
      <span style={{ fontFamily: CG, fontSize: 124, fontWeight: 900, color: CREAM, letterSpacing: '-5px', lineHeight: 0.9, display: 'block' }}>
        A Sárkány<br />és az ördög
      </span>
    </div>
    <Foot num="06" ink={CREAM} />
  </div>
)

// 07 · Alkalmazás — asymmetric card collage
export const SVSlide07 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="07" label="Alkalmazás" />
    <div style={{ flex: 1, display: 'flex', gap: 14, paddingTop: 36, paddingBottom: 36, minHeight: 0 }}>
      <div style={{ flex: 11, background: NAVY, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 44, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="" style={{ width: 84, height: 'auto' }} />
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: RED }} />
        </div>
        <div>
          <span style={{ fontFamily: CG, fontSize: 84, fontWeight: 900, color: FERN, letterSpacing: '-3px', lineHeight: 0.92, display: 'block' }}>Jegyek</span>
          <span style={{ fontFamily: CG, fontSize: 84, fontWeight: 900, color: CREAM, letterSpacing: '-3px', lineHeight: 0.92, display: 'block' }}>élnek</span>
          <span style={{ ...tiny, fontSize: 13, color: `${CREAM}50`, display: 'block', marginTop: 28 }}>KÖZÖSSÉGI · AKCENTUS</span>
        </div>
      </div>
      <div style={{ flex: 8, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
        <div style={{ flex: 6, background: GREEN, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 36, minHeight: 0 }}>
          <img src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png" alt="" style={{ width: 64, height: 'auto' }} />
          <div>
            <span style={{ fontFamily: CG, fontSize: 34, fontWeight: 900, color: CREAM, letterSpacing: '-1px', display: 'block' }}>Sárkány Völgy</span>
            <span style={{ ...tiny, fontSize: 13, color: `${CREAM}70`, display: 'block', marginTop: 10 }}>MESE FESZTIVÁL · 2026</span>
          </div>
        </div>
        <div style={{ flex: 4, border: `1.5px solid ${NAVY}25`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 36, boxSizing: 'border-box', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: CG, fontSize: 34, fontWeight: 900, color: NAVY, letterSpacing: '-1px', lineHeight: 1 }}>Sárkány<br />Völgy</span>
            <Star size={18} />
          </div>
          <span style={{ ...tiny, fontSize: 13, color: RED }}>MESE FESZTIVÁL</span>
        </div>
      </div>
    </div>
    <Foot num="07" />
  </div>
)

// 08 · Kolofon — left-aligned fact rows, watermark numeral
export const SVSlide08 = () => (
  <div style={{ width: W, height: H, background: NAVY, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img
      src="/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png"
      alt=""
      style={{ position: 'absolute', right: -160, bottom: -120, width: 620, height: 'auto', opacity: 0.06, pointerEvents: 'none' }}
    />
    <Tag num="08" label="Kolofon" ink={CREAM} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      {[
        { label: 'ÜGYFÉL',    value: 'Sárkány Völgy Mese Fesztivál' },
        { label: 'KATEGÓRIA', value: 'Brand Identity' },
        { label: 'ÉV',        value: '2026' },
        { label: 'HATÓKÖR',   value: 'Logó · Kézikönyv · Tipográfia' },
      ].map(({ label, value }, i, arr) => (
        <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 36, padding: '36px 0', borderBottom: i < arr.length - 1 ? `1px solid ${CREAM}12` : 'none' }}>
          <span style={{ ...tiny, fontSize: 13, color: EMBER, width: 150, flexShrink: 0 }}>{label}</span>
          <span style={{ fontFamily: CG, fontSize: 46, fontWeight: 900, color: CREAM, letterSpacing: '-1.5px', lineHeight: 1.05 }}>{value}</span>
        </div>
      ))}
    </div>
    <Foot num="08" ink={CREAM} />
  </div>
)

// 09 · Vége — fairy tale ending CTA
export const SVSlide09 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Tag num="✦" label="Vége" />
      <span style={{ ...tiny, color: `${NAVY}50` }}>SÁRKÁNY VÖLGY · 2026</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontFamily: CG, fontSize: 128, fontWeight: 900, color: NAVY, letterSpacing: '-5px', lineHeight: 0.9, display: 'block' }}>Itt a vége,</span>
      <span style={{ fontFamily: CG, fontSize: 128, fontWeight: 900, color: GREEN, letterSpacing: '-5px', lineHeight: 0.9, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        fuss el véle.<Star size={26} style={{ marginTop: 22 }} />
      </span>
      <span style={{ fontFamily: DM, fontSize: 24, color: `${NAVY}75`, lineHeight: 1.65, maxWidth: 560, marginTop: 56, display: 'block' }}>
        A te márkád meséje viszont csak most kezdődik.
      </span>
      <span style={{ fontFamily: CG, fontSize: 34, fontWeight: 900, color: RED, letterSpacing: '-0.5px', marginTop: 36, display: 'block' }}>gasparstudio.hu</span>
      <span style={{ ...tiny, fontSize: 13, color: `${NAVY}50`, marginTop: 14, display: 'block' }}>LINK A BIOBAN ↑</span>
    </div>
    <Foot num="09" />
  </div>
)

export const slides = [SVSlide00, SVSlide01, SVSlide02, SVSlide03, SVSlide04, SVSlide05, SVSlide06, SVSlide07, SVSlide08, SVSlide09]
