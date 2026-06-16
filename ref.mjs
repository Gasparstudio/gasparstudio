import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 1 })
const grid = []
for (let i = 0; i <= 1800; i += 100) {
  grid.push(`<line x1="${i}" y1="0" x2="${i}" y2="1800" stroke="${i % 500 === 0 ? '#e0392b' : '#39a'}" stroke-width="${i % 500 === 0 ? 3 : 1}" opacity="0.5"/>`)
  grid.push(`<line x1="0" y1="${i}" x2="1800" y2="${i}" stroke="${i % 500 === 0 ? '#e0392b' : '#39a'}" stroke-width="${i % 500 === 0 ? 3 : 1}" opacity="0.5"/>`)
  grid.push(`<text x="${i + 4}" y="40" fill="#e0392b" font-size="34" font-family="monospace">${i}</text>`)
  grid.push(`<text x="4" y="${i - 6}" fill="#e0392b" font-size="34" font-family="monospace">${i}</text>`)
}
await p.setContent(`<body style="margin:0"><svg width="1000" height="1000" viewBox="0 0 1800 1800">
  <image href="http://localhost:3000/Sarkany_volgy_mese_fesztival_logo/PNG/sarkany_volgy__color_icon.png" x="0" y="0" width="1800" height="1800"/>
  ${grid.join('')}
</svg></body>`)
await p.waitForTimeout(800)
await p.screenshot({ path: 'ref.png' })
await b.close()
console.log('done')
