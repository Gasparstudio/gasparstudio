import satori from 'satori'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const W = 1080, H = 1350, PAD = 72
const BLUE = '#1A7BFF', BG = '#080808'
const ROOT = path.resolve('D:/Claude/gaspar_design')

// ── Fonts (static TTF — legmegbízhatóbb satori-val) ──────────
function ab(rel: string): ArrayBuffer {
  const b = fs.readFileSync(path.join(ROOT, rel))
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer
}

const fonts = [
  { name: 'Sora', data: ab('public/fonts/Sora/static/Sora-ExtraBold.ttf'), weight: 800 as const, style: 'normal' as const },
  { name: 'Sora', data: ab('public/fonts/Sora/static/Sora-Bold.ttf'),      weight: 700 as const, style: 'normal' as const },
  { name: 'Sora', data: ab('public/fonts/Sora/static/Sora-Regular.ttf'),   weight: 400 as const, style: 'normal' as const },
  { name: 'DM Sans', data: ab('public/fonts/DM_Sans/static/DMSans-Medium.ttf'),  weight: 500 as const, style: 'normal' as const },
  { name: 'DM Sans', data: ab('public/fonts/DM_Sans/static/DMSans-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
]

// ── Image helper ──────────────────────────────────────────────
function loadImg(pubRel: string): string | null {
  const decoded = decodeURIComponent(pubRel.replace(/^\//, ''))
  const abs = path.join(ROOT, 'public', decoded)
  if (!fs.existsSync(abs)) { console.warn(`⚠  Missing: ${abs}`); return null }
  const ext = path.extname(abs).toLowerCase()
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
  return `data:${mime};base64,${fs.readFileSync(abs).toString('base64')}`
}

// ── Output ────────────────────────────────────────────────────
const OUT = path.join(ROOT, 'public/instagram-gallery/face')
fs.mkdirSync(OUT, { recursive: true })

async function save(n: number, node: object) {
  const svg = await satori(node as any, { width: W, height: H, fonts })
  const file = path.join(OUT, `face_slide_${String(n).padStart(2, '0')}.png`)
  await sharp(Buffer.from(svg)).png().toFile(file)
  console.log(`✓ face_slide_${String(n).padStart(2, '0')}.png`)
}

// ── UI helpers ────────────────────────────────────────────────
type S = Record<string, any>

const d = (style: S, children: any = ' ') => ({
  type: 'div', props: { style: { display: 'flex', ...style }, children }
})
const t = (content: string, style: S) => ({
  type: 'span', props: { style, children: content }
})
const image = (src: string, style: S) => ({
  type: 'img', props: { src, style }
})

const badge = (num: string, title: string) => d(
  { alignItems: 'center', gap: 8, flexShrink: 0 },
  [
    t(num, { fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500, color: BLUE, letterSpacing: 2 }),
    d({ width: 1, height: 10, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }),
    t(title.toUpperCase(), { fontFamily: 'DM Sans', fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.5 }),
  ]
)

const foot = () => d(
  { justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  [
    t('Gáspárstudio', { fontFamily: 'DM Sans', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5 }),
    t('@gaspar_design', { fontFamily: 'DM Sans', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: 1 }),
  ]
)

// Standard szöveg-slide: badge + center-content + footer
const slide = (num: string, title: string, content: object) => d(
  { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD },
  [
    badge(num, title),
    d({ flexGrow: 1, flexDirection: 'column', justifyContent: 'center', paddingTop: 40, paddingBottom: 40 }, [content]),
    foot(),
  ]
)

// ── SLIDES ────────────────────────────────────────────────────
async function main() {

  // 01 — Hook
  await save(1, slide('01', 'FACE',
    d({ flexDirection: 'column' }, [
      t('FACE', { fontFamily: 'Sora', fontSize: 210, fontWeight: 800, color: '#fff', letterSpacing: -7, lineHeight: 0.85 }),
      d({ width: 936, height: 2, background: BLUE, flexShrink: 0, marginTop: 32, marginBottom: 32 }),
      t('Elég tiszta,', { fontFamily: 'Sora', fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1 }),
      t('hogy betont is', { fontFamily: 'Sora', fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1 }),
      t('átvágjon.', { fontFamily: 'Sora', fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1 }),
      d({ marginTop: 28 }, [
        t('Brand Identity · 2026', { fontFamily: 'DM Sans', fontSize: 13, fontWeight: 400, color: BLUE, letterSpacing: 2 }),
      ]),
    ])
  ))

  // 02 — Brief
  await save(2, slide('02', 'Brief',
    d({ flexDirection: 'column' }, [
      t('Nem egy', { fontFamily: 'Sora', fontSize: 80, fontWeight: 700, color: '#fff', letterSpacing: -2.5, lineHeight: 1 }),
      t('logót akart.', { fontFamily: 'Sora', fontSize: 80, fontWeight: 700, color: '#fff', letterSpacing: -2.5, lineHeight: 1 }),
      d({ height: 36, flexShrink: 0 }),
      t('Rendszert — ami 16 pixelnél', { fontFamily: 'DM Sans', fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }),
      t('és 16 méternél is tartja magát.', { fontFamily: 'DM Sans', fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }),
      d({ height: 48, flexShrink: 0 }),
      d({ flexDirection: 'column', gap: 10 }, [
        d({ gap: 20, alignItems: 'center' }, [
          t('Ügyfél', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5, width: 64 }),
          t('Face', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.5)' }),
        ]),
        d({ gap: 20, alignItems: 'center' }, [
          t('Iparág', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5, width: 64 }),
          t('Tech / App', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.5)' }),
        ]),
        d({ gap: 20, alignItems: 'center' }, [
          t('Év', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5, width: 64 }),
          t('2026', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.5)' }),
        ]),
        d({ gap: 20, alignItems: 'center' }, [
          t('Hatókör', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5, width: 64 }),
          t('Brand Identity', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.5)' }),
        ]),
      ]),
    ])
  ))

  // 03 — Inspiráció
  await save(3, slide('03', 'Inspiráció',
    d({ flexDirection: 'column' }, [
      t('Techbrand', { fontFamily: 'Sora', fontSize: 90, fontWeight: 800, color: '#fff', letterSpacing: -3, lineHeight: 1 }),
      t('monumentaliz-', { fontFamily: 'Sora', fontSize: 90, fontWeight: 800, color: '#fff', letterSpacing: -3, lineHeight: 1 }),
      t('mus.', { fontFamily: 'Sora', fontSize: 90, fontWeight: 800, color: '#fff', letterSpacing: -3, lineHeight: 1 }),
      d({ width: 48, height: 2, background: BLUE, flexShrink: 0, marginTop: 44, marginBottom: 44 }),
      t('Industrial fegyelem.', { fontFamily: 'Sora', fontSize: 36, fontWeight: 400, color: 'rgba(255,255,255,0.38)', letterSpacing: -1, lineHeight: 1.2 }),
      d({ marginTop: 18 }, [
        t('Ahol a precizitás maga az üzenet.', { fontFamily: 'DM Sans', fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.22)', lineHeight: 1.5 }),
      ]),
    ])
  ))

  // 04 — Első gondolatok (képpel)
  const logoGrid = loadImg('/works/face/face_logo_1.png')
  await save(4, d(
    { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD },
    [
      badge('04', 'Process'),
      d({ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }, [
        logoGrid
          ? image(logoGrid, { width: 860, height: 540, objectFit: 'contain' })
          : d({ width: 860, height: 540, background: '#111', borderRadius: 8 }),
      ]),
      d({ flexDirection: 'column', gap: 8, flexShrink: 0, paddingBottom: 24 }, [
        t('A rácsból indultam.', { fontFamily: 'Sora', fontSize: 46, fontWeight: 700, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1 }),
        t('Mielőtt bármi ívelt lett, minden egyenes volt.', { fontFamily: 'DM Sans', fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }),
      ]),
      foot(),
    ]
  ))

  // 05 — Színpaletta
  await save(5, d(
    { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD },
    [
      badge('05', 'Színpaletta'),
      d({ flexDirection: 'column', gap: 10, flexGrow: 1, paddingTop: 28, paddingBottom: 28 }, [
        d({ background: BLUE, borderRadius: 12, flexDirection: 'column', justifyContent: 'space-between', padding: 44, flexGrow: 2 }, [
          d({ justifyContent: 'space-between' }, [
            t('Face Blue', { fontFamily: 'DM Sans', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5 }),
            t('#1A7BFF', { fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }),
          ]),
          t('A működő rendszerek színe.', { fontFamily: 'Sora', fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: -0.5, lineHeight: 1.2 }),
        ]),
        d({ gap: 10, flexGrow: 1 }, [
          d({ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, flexDirection: 'column', justifyContent: 'space-between', padding: 32, flexGrow: 1 }, [
            d({ justifyContent: 'space-between' }, [
              t('Fekete', { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.5 }),
              t('#000000', { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 }),
            ]),
            t('A jelek közötti csend.', { fontFamily: 'Sora', fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: -0.3, lineHeight: 1.25 }),
          ]),
          d({ background: '#ffffff', borderRadius: 12, flexDirection: 'column', justifyContent: 'space-between', padding: 32, flexGrow: 1 }, [
            d({ justifyContent: 'space-between' }, [
              t('Fehér', { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(0,0,0,0.38)', letterSpacing: 0.5 }),
              t('#FFFFFF', { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(0,0,0,0.22)', letterSpacing: 0.5 }),
            ]),
            t('Tér, ami nem verseng.', { fontFamily: 'Sora', fontSize: 20, fontWeight: 700, color: 'rgba(0,0,0,0.55)', letterSpacing: -0.3, lineHeight: 1.25 }),
          ]),
        ]),
      ]),
      foot(),
    ]
  ))

  // 06 — Tipográfia
  await save(6, slide('06', 'Tipográfia',
    d({ flexDirection: 'column' }, [
      t('SORA', { fontFamily: 'DM Sans', fontSize: 11, fontWeight: 400, color: BLUE, letterSpacing: 3 }),
      t('Face', { fontFamily: 'Sora', fontSize: 160, fontWeight: 800, color: '#fff', letterSpacing: -6, lineHeight: 0.85, marginTop: 8 }),
      d({ marginTop: 16, marginBottom: 44 }, [
        t('ExtraBold · Bold · SemiBold · Regular · Light', { fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.8 }),
      ]),
      d({ height: 1, background: 'rgba(255,255,255,0.07)', flexShrink: 0 }),
      d({ marginTop: 44, flexDirection: 'column', gap: 14 }, [
        t('DM SANS', { fontFamily: 'DM Sans', fontSize: 11, fontWeight: 400, color: BLUE, letterSpacing: 3 }),
        t('Rendszerre tervezve.', { fontFamily: 'DM Sans', fontSize: 38, fontWeight: 500, color: '#fff', letterSpacing: -0.5, lineHeight: 1.2 }),
        t('Felületen tesztelve. Emberi jóváhagyással.', { fontFamily: 'DM Sans', fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }),
        t('Kettő betűtípus. Egyik sem véletlenszerű.', { fontFamily: 'DM Sans', fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.18)', letterSpacing: 0.3, lineHeight: 1.6 }),
      ]),
    ])
  ))

  // 07 — Logo evolúció
  const art1 = loadImg('/works/face/Artboard%201-03.png')
  const art2 = loadImg('/works/face/Artboard%201-07.png')
  const art3 = loadImg('/works/face/Artboard%201-11.png')
  const artW = Math.floor((W - PAD * 2 - 20) / 3)

  await save(7, d(
    { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD },
    [
      badge('07', 'Evolúció'),
      d({ gap: 10, marginTop: 28, marginBottom: 24, flexShrink: 0 }, [
        art1 ? image(art1, { width: artW, height: 800, objectFit: 'cover', borderRadius: 10 }) : d({ width: artW, height: 800, background: '#111', borderRadius: 10 }),
        art2 ? image(art2, { width: artW, height: 800, objectFit: 'cover', borderRadius: 10 }) : d({ width: artW, height: 800, background: '#111', borderRadius: 10 }),
        art3 ? image(art3, { width: artW, height: 800, objectFit: 'cover', borderRadius: 10 }) : d({ width: artW, height: 800, background: '#111', borderRadius: 10 }),
      ]),
      d({ flexDirection: 'column', gap: 8, flexShrink: 0 }, [
        t('Minden vonal szándékos volt.', { fontFamily: 'Sora', fontSize: 44, fontWeight: 700, color: '#fff', letterSpacing: -1.2, lineHeight: 1.1 }),
        t('Így nézett ki, mielőtt kész lett.', { fontFamily: 'DM Sans', fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }),
      ]),
      d({ flexGrow: 1 }),
      foot(),
    ]
  ))

  // 08 — Részletek
  const logoDetail = loadImg('/works/face/face_logo_1.png')
  await save(8, d(
    { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD },
    [
      badge('08', 'Részletek'),
      d({ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }, [
        logoDetail
          ? image(logoDetail, { width: 700, height: 700, objectFit: 'contain' })
          : d({ width: 700, height: 700, background: '#111', borderRadius: 8 }),
      ]),
      d({ flexDirection: 'column', gap: 10, flexShrink: 0, paddingBottom: 24 }, [
        t('A lekerekített végpontok nem díszítés.', { fontFamily: 'Sora', fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: -1, lineHeight: 1.15 }),
        t('A modern felületek puhasága, engineering fegyelmével.', { fontFamily: 'DM Sans', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }),
      ]),
      foot(),
    ]
  ))

  // 09 — Mockup
  const mockupSrc = loadImg('/works/face/mockup_02_v2.png')
  await save(9, d(
    { width: W, height: H, background: '#050505', flexDirection: 'column', padding: PAD },
    [
      badge('09', 'Végeredmény'),
      d({ flexGrow: 1, paddingTop: 24, paddingBottom: 24 }, [
        mockupSrc
          ? image(mockupSrc, { width: W - PAD * 2, height: 800, objectFit: 'cover', objectPosition: '50% 22%', borderRadius: 12 })
          : d({ width: W - PAD * 2, height: 800, background: '#111', borderRadius: 12 }),
      ]),
      d({ flexDirection: 'column', gap: 8, flexShrink: 0, paddingBottom: 24 }, [
        t('Névjegykártyától épülethomlokzatig.', { fontFamily: 'Sora', fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: -1.2, lineHeight: 1.1 }),
        t('Módosítás nélkül, kompromisszum nélkül.', { fontFamily: 'DM Sans', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }),
      ]),
      foot(),
    ]
  ))

  // 10 — CTA
  await save(10, d(
    { width: W, height: H, background: BG, flexDirection: 'column', padding: PAD, justifyContent: 'space-between' },
    [
      badge('10', 'FACE · Brand Identity'),
      d({ flexDirection: 'column' }, [
        t('Hasonló', { fontFamily: 'Sora', fontSize: 100, fontWeight: 800, color: '#fff', letterSpacing: -4, lineHeight: 0.88 }),
        t('projekted', { fontFamily: 'Sora', fontSize: 100, fontWeight: 800, color: '#fff', letterSpacing: -4, lineHeight: 0.88 }),
        t('van?', { fontFamily: 'Sora', fontSize: 100, fontWeight: 800, color: BLUE, letterSpacing: -4, lineHeight: 0.88 }),
        d({ width: 56, height: 2, background: BLUE, flexShrink: 0, marginTop: 44, marginBottom: 44 }),
        t('gasparstudio.hu', { fontFamily: 'DM Sans', fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }),
        d({ marginTop: 12 }, [
          t('Link a bio-ban ↑', { fontFamily: 'DM Sans', fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.28)', letterSpacing: 1 }),
        ]),
      ]),
      d({ justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }, [
        t('Gáspárstudio · Brand Design', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1.5 }),
        t('@gaspar_design', { fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(255,255,255,0.15)', letterSpacing: 1 }),
      ]),
    ]
  ))

  console.log('\n✅ Kész.')
  console.log('📁', OUT)
}

main().catch(console.error)
