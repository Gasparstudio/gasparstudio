import React from 'react'

const GREEN = '#2D6A4F'
const CREAM = '#F5F0E4'
const NAVY  = '#1A2230'
const RED   = '#D34C2D'
const EMBER = '#E2603F'
const W = 1080, H = 1350, P = 80
const CG = 'CabinetGrotesk, var(--font-display)'
const DM = 'var(--font-body)'

const ICON_WHITE = '/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png'
const ICON_COLOR = '/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png'

// ── Shared ──────────────────────────────────────────────────────

const Star = ({ size = 14, color = RED, style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0Z" fill={color} />
  </svg>
)

const tiny: React.CSSProperties = { fontFamily: DM, fontSize: 22, letterSpacing: '2.5px', fontWeight: 500 }

// Egy plakát sablon: háttér + háttérkitöltő sárkány + cím + adatsor.
const Poster = ({
  bg, ink, accent, watermark, label, title, sub, foot,
}: {
  bg: string; ink: string; accent: string; watermark: string
  label: string; title: React.ReactNode; sub: string; foot: string
}) => (
  <div style={{ width: W, height: H, background: bg, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img src={watermark} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Star size={11} color={accent} />
        <span style={{ ...tiny, color: `${ink}80` }}>{label}</span>
      </div>
      <span style={{ ...tiny, color: `${ink}55` }}>2026 · NYÁR</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 36, position: 'relative', zIndex: 1 }}>
      <span style={{ ...tiny, color: `${ink}70`, display: 'block', marginBottom: 26 }}>{sub.toUpperCase()}</span>
      <span style={{ fontFamily: CG, fontSize: 124, fontWeight: 900, color: ink, letterSpacing: '-5px', lineHeight: 0.9, display: 'block' }}>
        {title}
      </span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
      <span style={{ ...tiny, color: `${ink}55` }}>gasparstudio.hu</span>
      <span style={{ ...tiny, color: `${ink}40` }}>{foot}</span>
    </div>
  </div>
)

// ── Slides ──────────────────────────────────────────────────────

// 00 · Cover — a sorozat keretezése
export const PSlide00 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img src={ICON_COLOR} alt="" style={{ position: 'absolute', right: -130, top: 90, width: 620, height: 'auto', opacity: 0.9, pointerEvents: 'none' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
      <Star size={11} />
      <span style={{ ...tiny, color: `${NAVY}70` }}>SÁRKÁNY VÖLGY MESE FESZTIVÁL</span>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 30, position: 'relative', zIndex: 1 }}>
      <span style={{ fontFamily: DM, fontSize: 23, color: `${NAVY}70`, letterSpacing: '0.5px', marginBottom: 30, display: 'block' }}>Hol volt, hol nem volt&hellip;</span>
      <span style={{ fontFamily: CG, fontSize: 132, fontWeight: 900, color: NAVY, letterSpacing: '-5px', lineHeight: 0.88, display: 'block' }}>A mese</span>
      <span style={{ fontFamily: CG, fontSize: 132, fontWeight: 900, color: GREEN, letterSpacing: '-5px', lineHeight: 0.88, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        plakátjai<Star size={28} style={{ marginTop: 22 }} />
      </span>
      <span style={{ fontFamily: DM, fontSize: 24, color: `${NAVY}75`, lineHeight: 1.6, maxWidth: 560, marginTop: 44, display: 'block' }}>
        Egy arculat. Száz plakát. Ugyanaz a hang minden meséhez. Lapozz.
      </span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ ...tiny, color: `${NAVY}55` }}>gasparstudio.hu</span>
      <span style={{ ...tiny, color: `${NAVY}40` }}>00 / 04</span>
    </div>
  </div>
)

export const PSlide01 = () => (
  <Poster bg={GREEN} ink={CREAM} accent={EMBER} watermark={ICON_WHITE}
    label="ESTI MESÉK A NAGYSZÍNPADON" sub="Pénteken, naplementekor"
    title={<>A Sárkány<br />és az ördög</>} foot="01 / 04" />
)

export const PSlide02 = () => (
  <Poster bg={NAVY} ink={CREAM} accent={RED} watermark={ICON_WHITE}
    label="BÁBSZÍNHÁZ A LIGETBEN" sub="Szombat délután"
    title={<>Az aranyhajú<br />királyfi</>} foot="02 / 04" />
)

export const PSlide03 = () => (
  <Poster bg={RED} ink={CREAM} accent={NAVY} watermark={ICON_WHITE}
    label="TÁBORTŰZ ÉS TÖRTÉNET" sub="Éjféli mese"
    title={<>A hétfejű<br />sárkány</>} foot="03 / 04" />
)

export const PSlide04 = () => (
  <Poster bg={CREAM} ink={NAVY} accent={RED} watermark={ICON_COLOR}
    label="ZÁRÓ DÍSZELŐADÁS" sub="Vasárnap este"
    title={<>Tündér Ilona<br />kertje</>} foot="04 / 04" />
)

export const slides = [PSlide00, PSlide01, PSlide02, PSlide03, PSlide04]
