import React from 'react'

const GREEN = '#2D6A4F'
const FERN  = '#52B788'
const CREAM = '#F5F0E4'
const NAVY  = '#1A2230'
const RED   = '#D34C2D'
const W = 1080, H = 1350, P = 80
const CG = 'CabinetGrotesk, var(--font-display)'
const DM = 'var(--font-body)'

const ICON_WHITE = '/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white_icon.png'
const ICON_COLOR = '/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png'
const LOGO_WHITE = '/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__white.png'

// ── Shared ──────────────────────────────────────────────────────

const Star = ({ size = 14, color = RED, style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0Z" fill={color} />
  </svg>
)

const tiny: React.CSSProperties = { fontFamily: DM, fontSize: 22, letterSpacing: '2.5px', fontWeight: 500 }

const Tag = ({ num, label, ink = NAVY }: { num: string; label: string; ink?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
    <Star size={11} color={ink === CREAM ? RED : RED} />
    <span style={{ ...tiny, color: RED }}>{num}</span>
    <span style={{ ...tiny, color: `${ink}70` }}>{label.toUpperCase()}</span>
  </div>
)

const Foot = ({ num, ink = NAVY }: { num: string; ink?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
    <span style={{ ...tiny, color: `${ink}55` }}>gasparstudio.hu</span>
    <span style={{ ...tiny, color: `${ink}40` }}>{num} / 05</span>
  </div>
)

// Pontos konstrukció a jel TÉNYLEGES geometriájából (1800x1800 koord-tér,
// pixelpontosan kimérve a logó PNG alfa-csatornájából).
const EYE = { cx: 939.7, cy: 514.3, r: 39.9 }      // valódi kör (a szem), pixelpontosan
const BB  = { x: 214, y: 36, w: 1377, h: 1727 }    // tartalmi befoglaló doboz
const AX  = 902.5                                    // függőleges középtengely
// A jel íveire pixelpontosan illesztett körök (Kasa-fit, err < 0.3):
const CIRCLES = [
  { cx: 1419, cy: 899, r: 171 },   // test, jobb felső sarok
  { cx: 1420, cy: 1240, r: 171 },  // test, jobb alsó sarok
  { cx: 812, cy: 554, r: 172 },    // pofa / száj íve
  { cx: 602, cy: 1490, r: 185 },   // alsó U kanyar
  { cx: 767, cy: 600, r: 383 },    // nagy nyak / hát ív
  { cx: 1266, cy: 108, r: 360 },   // orr / fej felső íve
]

const Construction = ({ ink }: { ink: string }) => {
  const guide = `${ink}45`
  const faint = `${ink}1c`
  const gridStep = BB.w / 8
  const g: React.ReactElement[] = []
  for (let i = 0; i <= 8; i++) {
    const x = BB.x + gridStep * i
    g.push(<line key={`v${i}`} x1={x} y1={BB.y} x2={x} y2={BB.y + BB.h} stroke={faint} strokeWidth={2} />)
  }
  const rows = Math.round(BB.h / gridStep)
  for (let i = 0; i <= rows; i++) {
    const y = BB.y + gridStep * i
    g.push(<line key={`h${i}`} x1={BB.x} y1={y} x2={BB.x + BB.w} y2={y} stroke={faint} strokeWidth={2} />)
  }
  return (
    <svg viewBox="0 0 1800 1800" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {g}
      <rect x={BB.x} y={BB.y} width={BB.w} height={BB.h} fill="none" stroke={guide} strokeWidth={3} />
      <line x1={AX} y1={0} x2={AX} y2={1800} stroke={guide} strokeWidth={2} strokeDasharray="10 10" />
      {/* az ívekre illesztett körök */}
      {CIRCLES.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={guide} strokeWidth={3} />
          <circle cx={c.cx} cy={c.cy} r={5} fill={guide} />
        </g>
      ))}
      {/* a valódi szem-kör, kiemelve */}
      <line x1={EYE.cx} y1={EYE.cy - 88} x2={EYE.cx} y2={EYE.cy + 88} stroke={RED} strokeWidth={3} />
      <line x1={EYE.cx - 88} y1={EYE.cy} x2={EYE.cx + 88} y2={EYE.cy} stroke={RED} strokeWidth={3} />
      <circle cx={EYE.cx} cy={EYE.cy} r={EYE.r} fill="none" stroke={RED} strokeWidth={6} />
    </svg>
  )
}

// ── Slides ──────────────────────────────────────────────────────

// 00 · Cover
export const MSlide00 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img src={ICON_COLOR} alt="" style={{ position: 'absolute', right: -140, top: 80, width: 600, height: 'auto', opacity: 0.9, pointerEvents: 'none' }} />
    <Tag num="✦" label="Hogyan készült" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 30, position: 'relative', zIndex: 1 }}>
      <span style={{ fontFamily: DM, fontSize: 23, color: `${NAVY}70`, letterSpacing: '0.5px', marginBottom: 30, display: 'block' }}>Hol volt, hol nem volt&hellip;</span>
      <span style={{ fontFamily: CG, fontSize: 130, fontWeight: 900, color: NAVY, letterSpacing: '-5px', lineHeight: 0.88, display: 'block' }}>Egy népmeséből</span>
      <span style={{ fontFamily: CG, fontSize: 130, fontWeight: 900, color: GREEN, letterSpacing: '-5px', lineHeight: 0.88, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        így lesz brand<Star size={28} style={{ marginTop: 22 }} />
      </span>
      <span style={{ fontFamily: DM, fontSize: 24, color: `${NAVY}75`, lineHeight: 1.6, maxWidth: 560, marginTop: 44, display: 'block' }}>
        Egy jel négy lépésben. Az alapformától a kész meséig. Lapozz.
      </span>
    </div>
    <Foot num="00" />
  </div>
)

// 01 · A gondolat
export const MSlide01 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="01" label="A gondolat" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontFamily: CG, fontSize: 100, fontWeight: 900, color: NAVY, letterSpacing: '-4px', lineHeight: 0.94 }}>
        Egy völgy,<br />ahol a sárkány<br /><span style={{ color: GREEN }}>nem ellenség.</span>
      </span>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 72 }}>
        <div style={{ maxWidth: 480, borderLeft: `3px solid ${RED}`, paddingLeft: 32 }}>
          <span style={{ fontFamily: DM, fontSize: 22, color: `${NAVY}75`, lineHeight: 1.7, display: 'block' }}>
            Hanem mesemondó. Innen indult minden vonal. A jelnek bátornak kellett lennie, de barátságosnak is.
          </span>
        </div>
      </div>
    </div>
    <Foot num="01" />
  </div>
)

// 02 · Az alapforma — silhouette
export const MSlide02 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="02" label="Az alapforma" ink={CREAM} />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
      <img src={ICON_WHITE} alt="" style={{ width: '74%', height: 'auto' }} />
    </div>
    <div style={{ paddingBottom: 30 }}>
      <span style={{ fontFamily: CG, fontSize: 46, fontWeight: 900, color: CREAM, letterSpacing: '-1.5px', lineHeight: 1.1, display: 'block' }}>Először csak egy forma.</span>
      <span style={{ fontFamily: DM, fontSize: 20, color: `${CREAM}80`, lineHeight: 1.6, display: 'block', marginTop: 12, maxWidth: 620 }}>Bátor, kerek, egyetlen sziluettben megjegyezhető. Ha innen működik, már jó úton járunk.</span>
    </div>
    <Foot num="02" ink={CREAM} />
  </div>
)

// 03 · A geometria — grid overlay
export const MSlide03 = () => (
  <div style={{ width: W, height: H, background: GREEN, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="03" label="A geometria" ink={CREAM} />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
      <div style={{ position: 'relative', width: 720, height: 720, flexShrink: 0 }}>
        <img src={ICON_WHITE} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
        <Construction ink={CREAM} />
      </div>
    </div>
    <div style={{ paddingBottom: 30 }}>
      <span style={{ fontFamily: CG, fontSize: 46, fontWeight: 900, color: CREAM, letterSpacing: '-1.5px', lineHeight: 1.1, display: 'block' }}>Aztán jött a rend.</span>
      <span style={{ fontFamily: DM, fontSize: 20, color: `${CREAM}80`, lineHeight: 1.6, display: 'block', marginTop: 12, maxWidth: 620 }}>Minden ív egy körre, minden arány a rácsra simul. A mese mögött matematika van.</span>
    </div>
    <Foot num="03" ink={CREAM} />
  </div>
)

// 04 · A szín
export const MSlide04 = () => (
  <div style={{ width: W, height: H, background: CREAM, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Tag num="04" label="A szín" />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
      <img src={ICON_COLOR} alt="" style={{ width: '72%', height: 'auto' }} />
    </div>
    <div style={{ paddingBottom: 30 }}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        {[GREEN, NAVY, RED].map(c => <div key={c} style={{ width: 40, height: 40, borderRadius: '50%', background: c }} />)}
      </div>
      <span style={{ fontFamily: CG, fontSize: 46, fontWeight: 900, color: NAVY, letterSpacing: '-1.5px', lineHeight: 1.1, display: 'block' }}>És végül színt kapott.</span>
      <span style={{ fontFamily: DM, fontSize: 20, color: `${NAVY}75`, lineHeight: 1.6, display: 'block', marginTop: 12, maxWidth: 620 }}>Sárkány zöld, éjkobalt és egyetlen szikra tűz. Itt vált a forma karakterré.</span>
    </div>
    <Foot num="04" />
  </div>
)

// 05 · A mese kész — CTA
export const MSlide05 = () => (
  <div style={{ width: W, height: H, background: NAVY, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <img src={ICON_WHITE} alt="" style={{ position: 'absolute', right: -160, bottom: -120, width: 600, height: 'auto', opacity: 0.06, pointerEvents: 'none' }} />
    <Tag num="✦" label="A mese kész" ink={CREAM} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <img src={LOGO_WHITE} alt="" style={{ width: 420, height: 'auto', marginBottom: 56 }} />
      <span style={{ fontFamily: CG, fontSize: 88, fontWeight: 900, color: CREAM, letterSpacing: '-3px', lineHeight: 0.92, display: 'block' }}>A te márkád</span>
      <span style={{ fontFamily: CG, fontSize: 88, fontWeight: 900, color: FERN, letterSpacing: '-3px', lineHeight: 0.92, display: 'block' }}>meséje?</span>
      <span style={{ fontFamily: DM, fontSize: 23, color: `${CREAM}75`, lineHeight: 1.65, maxWidth: 540, marginTop: 40, display: 'block' }}>
        Megírjuk együtt. Az alapformától a kész rendszerig.
      </span>
      <span style={{ fontFamily: CG, fontSize: 34, fontWeight: 900, color: RED, letterSpacing: '-0.5px', marginTop: 34, display: 'block' }}>gasparstudio.hu</span>
      <span style={{ ...tiny, fontSize: 13, color: `${CREAM}50`, marginTop: 14, display: 'block' }}>LINK A BIOBAN ↑</span>
    </div>
    <Foot num="05" ink={CREAM} />
  </div>
)

export const slides = [MSlide00, MSlide01, MSlide02, MSlide03, MSlide04, MSlide05]
