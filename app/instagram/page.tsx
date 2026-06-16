'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import Link from 'next/link'
import { slides as faceSlides } from './slides/face'
import { slides as stresszSlides } from './slides/stresszteszt'
import { slides as svSlides } from './slides/sarkanyvolgy'
import { slides as svPosterSlides } from './slides/sarkany_plakatok'
import { slides as svMeseSlides } from './slides/sarkany_mese'
import { slides as sbSlides } from './slides/simons'

const SCALE = 0.25
const TW = Math.round(1080 * SCALE)
const TH = Math.round(1350 * SCALE)

const PROJECTS = [
  {
    id: 'face',
    title: 'FACE — Brand Identity',
    link: '/works/face',
    slides: faceSlides,
    accent: '#1A7BFF',
    prefix: 'face_slide_',
  },
  {
    id: 'face-stresszteszt',
    title: 'FACE — 16px vs 16m stresszteszt',
    link: '/works/face',
    slides: stresszSlides,
    accent: '#1A7BFF',
    prefix: 'face_stressz_slide_',
  },
  {
    id: 'sarkanyvolgy',
    title: 'Sárkány Völgy — Brand Identity',
    link: '/works/sarkanyvolgy',
    slides: svSlides,
    accent: '#2D6A4F',
    prefix: 'sarkanyvolgy_slide_',
  },
  {
    id: 'sarkany-plakatok',
    title: 'Sárkány Völgy — A mese plakátjai',
    link: '/works/sarkanyvolgy',
    slides: svPosterSlides,
    accent: '#D34C2D',
    prefix: 'sarkany_plakat_slide_',
  },
  {
    id: 'sarkany-mese',
    title: 'Sárkány Völgy — Egy népmeséből brand',
    link: '/works/sarkanyvolgy',
    slides: svMeseSlides,
    accent: '#2D6A4F',
    prefix: 'sarkany_mese_slide_',
  },
  {
    id: 'simons',
    title: "Simon's Burger — Redesign",
    link: '/works/simons-burger',
    slides: sbSlides,
    accent: '#0DA64F',
    prefix: 'simons_slide_',
  },
] as const

type LB = { project: number; slide: number } | null

async function captureSlides(
  slides: readonly React.ComponentType[],
  prefix: string,
  onProgress: (msg: string) => void
) {
  const { toPng } = await import('html-to-image')

  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;left:-9999px;top:0;width:1080px;height:1350px;overflow:hidden;z-index:9998;pointer-events:none'
  // Capture an inner, statically positioned node — html-to-image keeps the
  // clone's computed position, so capturing the fixed/off-screen container
  // itself yields a blank image.
  const target = document.createElement('div')
  target.style.cssText = 'width:1080px;height:1350px;position:relative'
  container.appendChild(target)
  document.body.appendChild(container)

  try {
    for (let i = 0; i < slides.length; i++) {
      onProgress(`${i + 1} / ${slides.length} — letöltés...`)
      const Slide = slides[i]

      const root = createRoot(target)
      root.render(<Slide />)
      try {
        await new Promise(r => setTimeout(r, 100))
        await document.fonts.ready
        const imgs = Array.from(target.querySelectorAll('img'))
        await Promise.all(imgs.map(img => img.decode().catch(() => {})))

        // Call twice: first pass embeds fonts, second pass renders correctly
        await toPng(target, { width: 1080, height: 1350, pixelRatio: 1 })
        const dataUrl = await toPng(target, { width: 1080, height: 1350, pixelRatio: 1 })
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `${prefix}${String(i).padStart(2, '0')}.png`
        a.click()
      } catch (e) { console.error(e) }
      root.unmount()

      await new Promise(r => setTimeout(r, 300))
    }
  } finally {
    document.body.removeChild(container)
  }
}

type LBState = { project: number; slide: number } | null

export default function InstagramPage() {
  const [lb, setLb] = useState<LBState>(null)
  const [lbScale, setLbScale] = useState(0.55)
  const [genState, setGenState] = useState<Record<string, { loading: boolean; msg: string }>>({})

  useEffect(() => {
    const update = () => setLbScale(Math.min(
      (window.innerHeight * 0.88) / 1350,
      (window.innerWidth * 0.85) / 1080
    ))
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!lb) return
    const project = PROJECTS[lb.project]
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null)
      if (e.key === 'ArrowRight') setLb(s => s && s.slide < project.slides.length - 1 ? { ...s, slide: s.slide + 1 } : s)
      if (e.key === 'ArrowLeft')  setLb(s => s && s.slide > 0 ? { ...s, slide: s.slide - 1 } : s)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lb])

  const download = useCallback(async (projectIndex: number) => {
    const proj = PROJECTS[projectIndex]
    const id = proj.id
    setGenState(s => ({ ...s, [id]: { loading: true, msg: '1 / ' + proj.slides.length + ' — letöltés...' } }))
    try {
      await captureSlides(proj.slides, proj.prefix, msg =>
        setGenState(s => ({ ...s, [id]: { loading: true, msg } }))
      )
      setGenState(s => ({ ...s, [id]: { loading: false, msg: '✓ Kész' } }))
    } catch {
      setGenState(s => ({ ...s, [id]: { loading: false, msg: '✗ Hiba' } }))
    } finally {
      setTimeout(() => setGenState(s => ({ ...s, [id]: { loading: false, msg: '' } })), 4000)
    }
  }, [])

  const lbProject = lb !== null ? PROJECTS[lb.project] : null
  const ActiveSlide = lb !== null ? lbProject!.slides[lb.slide] : null
  const lbW = Math.round(1080 * lbScale)
  const lbH = Math.round(1350 * lbScale)

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'CabinetGrotesk';
          src: url('/works/mozzano/CabinetGrotesk_Complete/Fonts/WEB/fonts/CabinetGrotesk-Black.woff2') format('woff2');
          font-weight: 900; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'CabinetGrotesk';
          src: url('/works/mozzano/CabinetGrotesk_Complete/Fonts/WEB/fonts/CabinetGrotesk-Bold.woff2') format('woff2');
          font-weight: 700; font-style: normal; font-display: swap;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 48px' }}>

          <Link href="/" style={{ display: 'inline-block', fontSize: 11, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 48 }}>
            ← Vissza
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-1px', margin: '0 0 72px' }}>
            Instagram Carousels
          </h1>

          {PROJECTS.map((proj, pi) => {
            const gs = genState[proj.id] ?? { loading: false, msg: '' }
            return (
              <div key={proj.id} style={{ marginBottom: 96 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Link href={proj.link} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '-0.5px' }}>
                      {proj.title}
                    </Link>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>{proj.slides.length} slide</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {gs.msg && (
                      <span style={{ fontSize: 12, color: gs.msg.startsWith('✓') ? '#4ade80' : gs.msg.startsWith('✗') ? '#f87171' : 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>
                        {gs.msg}
                      </span>
                    )}
                    <button
                      onClick={() => download(pi)}
                      disabled={gs.loading}
                      style={{
                        padding: '8px 18px', borderRadius: 8,
                        border: `1px solid ${proj.accent}55`,
                        background: gs.loading ? `${proj.accent}08` : `${proj.accent}18`,
                        color: proj.accent, fontSize: 12,
                        cursor: gs.loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)', letterSpacing: '0.5px',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {gs.loading ? 'Folyamatban...' : 'PNG letöltés'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, ${TW}px)`, gap: 16 }}>
                  {proj.slides.map((Slide, si) => (
                    <div
                      key={si}
                      onClick={() => setLb({ project: pi, slide: si })}
                      style={{
                        width: TW, height: TH,
                        position: 'relative', overflow: 'hidden',
                        borderRadius: 10, cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.025)'
                        e.currentTarget.style.borderColor = `${proj.accent}70`
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left', width: 1080, height: 1350, position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                        <Slide />
                      </div>
                      <div style={{ position: 'absolute', bottom: 7, right: 8, fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                        {String(si).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* Lightbox */}
      {ActiveSlide && lb && (
        <div onClick={() => setLb(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          {lb.slide > 0 && (
            <button onClick={e => { e.stopPropagation(); setLb(s => s ? { ...s, slide: s.slide - 1 } : s) }}
              style={navBtn} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>←</button>
          )}

          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: lbW, height: lbH, overflow: 'hidden', borderRadius: 12, boxShadow: '0 40px 100px rgba(0,0,0,0.9)', position: 'relative' }}>
              <div style={{ transform: `scale(${lbScale})`, transformOrigin: 'top left', width: 1080, height: 1350 }}>
                <ActiveSlide />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
              {lb.slide + 1} / {lbProject!.slides.length}
            </div>
          </div>

          {lb.slide < lbProject!.slides.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLb(s => s ? { ...s, slide: s.slide + 1 } : s) }}
              style={{ ...navBtn, left: 'auto', right: 24 }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>→</button>
          )}

          <button onClick={() => setLb(null)} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      )}
    </>
  )
}

const navBtn: React.CSSProperties = {
  position: 'fixed', left: 24, top: '50%', transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.6)', borderRadius: 8,
  width: 44, height: 44, cursor: 'pointer', fontSize: 20,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 150ms ease',
}
