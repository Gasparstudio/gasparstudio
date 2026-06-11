import React from 'react'

const BLUE = '#1A7BFF'
const BG = '#000000'
const W = 1080, H = 1350, P = 72
const SORA = 'var(--font-display)'
const DM   = 'var(--font-body)'

const ART_W = Math.floor((W - P * 2 - 20) / 3) // 305px each

// ── Shared ─────────────────────────────────────────────────────

const Badge = ({ num, title, arrow = true }: { num: string; title: string; arrow?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: DM, fontSize: 18, fontWeight: 500, color: BLUE, letterSpacing: '2px' }}>{num}</span>
      <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
      <span style={{ fontFamily: DM, fontSize: 18, color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px' }}>{title.toUpperCase()}</span>
    </div>
    {arrow && (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 14h16M16 8l6 6-6 6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
)

const Footer = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexShrink: 0 }}>
    <span style={{ fontFamily: DM, fontSize: 18, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px' }}>gasparstudio.hu</span>
  </div>
)

const Frame = ({ num, title, children, bg = BG, arrow = true }: { num: string; title: string; children: React.ReactNode; bg?: string; arrow?: boolean }) => (
  <div style={{ width: W, height: H, background: bg, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num={num} title={title} arrow={arrow} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 40, paddingBottom: 40 }}>
      {children}
    </div>
    <Footer />
  </div>
)

// ── Slides ─────────────────────────────────────────────────────

export const Slide00 = () => (
  <div style={{ width: W, height: H, background: '#000', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <img
      src="/works/face/mockup_02.png"
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'calc(50% + 45px) center', display: 'block' }}
    />
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%)',
    }} />
    <div style={{
      position: 'absolute', bottom: P, left: P, right: P,
      display: 'flex', flexDirection: 'column',
    }}>
      <span style={{ fontFamily: SORA, fontSize: 96, fontWeight: 800, color: '#fff', letterSpacing: '-4px', lineHeight: 0.9 }}>FACE</span>
      <span style={{ fontFamily: DM, fontSize: 16, color: 'rgba(255,255,255,0.55)', letterSpacing: '2.5px', marginTop: 20, display: 'block' }}>BRAND IDENTITY · 2026</span>
      <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.25)', margin: '18px 0' }} />
      <span style={{ fontFamily: DM, fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px' }}>
        Logó · Szín · Tipográfia · Mockup
      </span>
    </div>
  </div>
)

export const Slide01 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="01" title="FACE" />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="/works/face/face_logo-02.png" alt="FACE" style={{ width: 680, height: 'auto' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24, flexShrink: 0 }}>
      <div style={{ width: 48, height: 2, background: BLUE }} />
      <span style={{ fontFamily: DM, fontSize: 18, color: BLUE, letterSpacing: '2px' }}>Brand Identity · 2026</span>
    </div>
    <Footer />
  </div>
)

export const Slide02 = () => (
  <Frame num="02" title="Brief · Inspiráció">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
      {/* Brief */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: SORA, fontSize: 70, fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>Nem egy</span>
        <span style={{ fontFamily: SORA, fontSize: 70, fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>logót akart.</span>
        <span style={{ fontFamily: DM, fontSize: 20, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginTop: 22, display: 'block' }}>
          Rendszert — ami 16 pixelnél és 16 méternél is tartja magát.
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Inspiráció */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: SORA, fontSize: 70, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>Techbrand</span>
        <span style={{ fontFamily: SORA, fontSize: 70, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>monumentalizmus.</span>
        <span style={{ fontFamily: DM, fontSize: 20, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, marginTop: 22, display: 'block' }}>
          Industrial fegyelem. Ahol a precizitás maga az üzenet.
        </span>
      </div>
    </div>
  </Frame>
)

export const Slide04 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="03" title="Process" />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
      <img src="/works/face/face_logo_1.png" alt="" style={{ width: 860, height: 540, objectFit: 'contain' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24, flexShrink: 0 }}>
      <span style={{ fontFamily: SORA, fontSize: 46, fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1 }}>A rácsból indultam.</span>
      <span style={{ fontFamily: DM, fontSize: 17, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>Mielőtt bármi ívelt lett, minden egyenes volt.</span>
    </div>
    <Footer />
  </div>
)

export const Slide05 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="04" title="Színpaletta" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 28, paddingBottom: 28 }}>
      <div style={{ background: BLUE, borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 44, flex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: DM, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>Face Blue</span>
          <span style={{ fontFamily: DM, fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>#1A7BFF</span>
        </div>
        <span style={{ fontFamily: SORA, fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>A működő rendszerek színe.</span>
      </div>
      <div style={{ display: 'flex', gap: 10, flex: 1 }}>
        <div style={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: DM, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>Fekete</span>
            <span style={{ fontFamily: DM, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>#000000</span>
          </div>
          <span style={{ fontFamily: SORA, fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.3px', lineHeight: 1.25 }}>A jelek közötti csend.</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: DM, fontSize: 12, color: 'rgba(0,0,0,0.38)' }}>Fehér</span>
            <span style={{ fontFamily: DM, fontSize: 12, color: 'rgba(0,0,0,0.22)' }}>#FFFFFF</span>
          </div>
          <span style={{ fontFamily: SORA, fontSize: 20, fontWeight: 700, color: 'rgba(0,0,0,0.55)', letterSpacing: '-0.3px', lineHeight: 1.25 }}>Tér, ami nem verseng.</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

const CHAR_ROWS = [
  'ABCDEFGHIJKLMNOP',
  'QRSTUVWXYZabcdef',
  'ghijklmnopqrstuv',
  'wxyz1234567890!?@%$&*',
]

export const Slide06 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="05" title="Tipográfia" />

    {/* SORA */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 24 }}>
      <span style={{ fontFamily: DM, fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: 16, display: 'block' }}>Sora</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CHAR_ROWS.map((row, i) => (
          <span key={i} style={{ fontFamily: SORA, fontSize: 60, fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1.12 }}>{row}</span>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', flexShrink: 0, margin: '28px 0' }} />

    {/* DM Sans */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 24 }}>
      <span style={{ fontFamily: DM, fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: 16, display: 'block' }}>DM Sans</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CHAR_ROWS.map((row, i) => (
          <span key={i} style={{ fontFamily: DM, fontSize: 60, fontWeight: 400, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.5px', lineHeight: 1.12 }}>{row}</span>
        ))}
      </div>
    </div>

    <Footer />
  </div>
)

export const Slide07 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="06" title="Evolúció" />
    <div style={{ flex: 1, display: 'flex', gap: 10, marginTop: 28, marginBottom: 28 }}>
      {[
        '/works/face/Artboard%201-03.png',
        '/works/face/Artboard%201-07.png',
        '/works/face/Artboard%201-11.png',
      ].map(src => (
        <img key={src} src={src} alt="" style={{ flex: 1, minWidth: 0, height: '100%', objectFit: 'cover', borderRadius: 10 }} />
      ))}
    </div>
    <Footer />
  </div>
)

export const Slide08 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="07" title="Alkalmazás" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, paddingBottom: 20, minHeight: 0 }}>
      <img src="/works/face/mockup_01.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', objectPosition: '50% calc(50% + 20px)', borderRadius: 12 }} />
      <img src="/works/face/mockup_02.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', objectPosition: '50% 50%', borderRadius: 12 }} />
    </div>
    <Footer />
  </div>
)

export const Slide09 = () => (
  <div style={{ width: W, height: H, background: '#000000', padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="08" title="Végeredmény" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, paddingBottom: 20, minHeight: 0 }}>
      <img src="/works/face/mockup_05.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', objectPosition: '50% calc(50% - 30px)', borderRadius: 12 }} />
      <img src="/works/face/mockup_06.png" alt="" style={{ flex: 1, minHeight: 0, width: '100%', objectFit: 'cover', objectPosition: '50% 50%', borderRadius: 12 }} />
    </div>
    <Footer />
  </div>
)

export const Slide10 = () => (
  <div style={{ width: W, height: H, background: BG, padding: P, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Badge num="09" title="FACE · Brand Identity" arrow={false} />
    <img
      src="/works/face/mockup_03.png"
      alt=""
      style={{ width: '100%', height: 'auto', borderRadius: 12, marginTop: 28, flexShrink: 0 }}
    />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {['Hasonló', 'projekted'].map(l => (
        <span key={l} style={{ fontFamily: SORA, fontSize: 96, fontWeight: 800, color: '#fff', letterSpacing: '-4px', lineHeight: 0.88 }}>{l}</span>
      ))}
      <span style={{ fontFamily: SORA, fontSize: 96, fontWeight: 800, color: BLUE, letterSpacing: '-4px', lineHeight: 0.88 }}>van?</span>
      <div style={{ width: 56, height: 2, background: BLUE, margin: '36px 0', flexShrink: 0 }} />
      <span style={{ fontFamily: DM, fontSize: 20, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px' }}>gasparstudio.hu</span>
      <span style={{ fontFamily: DM, fontSize: 13, color: 'rgba(255,255,255,0.28)', letterSpacing: '1px', marginTop: 10, display: 'block' }}>Link a bio-ban ↑</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: DM, fontSize: 14, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px' }}>gasparstudio.hu</span>
    </div>
  </div>
)

export const slides = [Slide00, Slide01, Slide02, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10]
