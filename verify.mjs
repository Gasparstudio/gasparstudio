import { chromium } from 'playwright'
const CIRCLES = [
  { cx: 1419, cy: 899, r: 171 }, { cx: 1420, cy: 1240, r: 171 },
  { cx: 812, cy: 554, r: 172 }, { cx: 602, cy: 1490, r: 185 },
  { cx: 767, cy: 600, r: 383 }, { cx: 1266, cy: 108, r: 360 },
]
const EYE = { cx: 939.7, cy: 514.3, r: 39.9 }
const BB = { x: 214, y: 36, w: 1377, h: 1727 }
const circ = CIRCLES.map((c, i) => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="none" stroke="#1A7BFF" stroke-width="4"/><circle cx="${c.cx}" cy="${c.cy}" r="6" fill="#1A7BFF"/><text x="${c.cx + 8}" y="${c.cy - 8}" fill="#1A7BFF" font-size="40" font-family="monospace">${i}</text>`).join('')
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 950, height: 950 } })
await p.setContent(`<body style="margin:0;background:#fff"><svg width="950" height="950" viewBox="0 0 1800 1800">
  <image href="http://localhost:3000/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png" x="0" y="0" width="1800" height="1800"/>
  <rect x="${BB.x}" y="${BB.y}" width="${BB.w}" height="${BB.h}" fill="none" stroke="#e0392b" stroke-width="3"/>
  ${circ}
  <circle cx="${EYE.cx}" cy="${EYE.cy}" r="${EYE.r}" fill="none" stroke="#e0392b" stroke-width="6"/>
</svg></body>`)
await p.waitForTimeout(700)
await p.screenshot({ path: 'verify.png' })
await b.close()
console.log('done')
