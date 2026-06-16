import { chromium } from 'playwright'
import fs from 'fs'

const svgPath = 'public/Sarkany_volgy_mese_fesztival_logo/Vector/Sarkany_volgy_mese_fesztival_logo.svg'
const svg = fs.readFileSync(svgPath, 'utf8')

const b = await chromium.launch()
const p = await b.newPage()
await p.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`)

const out = await p.evaluate(() => {
  const svgEl = document.querySelector('svg')
  const vbW = svgEl.viewBox.baseVal.width, vbH = svgEl.viewBox.baseVal.height
  svgEl.setAttribute('width', vbW); svgEl.setAttribute('height', vbH)
  const svgRect = svgEl.getBoundingClientRect()
  const SX = vbW / svgRect.width, SY = vbH / svgRect.height
  const shapes = [...svgEl.querySelectorAll('path, polygon')]

  // sample a shape's outline in VIEWBOX coords via screen CTM
  function sampleShape(el) {
    let len; try { len = el.getTotalLength() } catch { return null }
    if (!len || len < 8) return null
    const m = el.getScreenCTM()
    if (!m) return null
    const n = Math.max(8, Math.floor(len / 1.2))
    const pts = []
    for (let i = 0; i <= n; i++) {
      const q = el.getPointAtLength((i / n) * len).matrixTransform(m)
      pts.push({ x: (q.x - svgRect.left) * SX, y: (q.y - svgRect.top) * SY })
    }
    return pts
  }

  const items = shapes.map(s => ({ s, pts: sampleShape(s) })).filter(it => it.pts)
  for (const it of items) {
    let a = 1e9, c = 1e9, bx = -1e9, dy = -1e9
    for (const q of it.pts) { a = Math.min(a, q.x); c = Math.min(c, q.y); bx = Math.max(bx, q.x); dy = Math.max(dy, q.y) }
    it.bb = { x: a, y: c, w: bx - a, h: dy - c, cx: (a + bx) / 2 }
  }
  const centers = items.map(it => it.bb.cx).sort((a, b) => a - b)
  let gap = 0, splitX = Infinity
  for (let i = 1; i < centers.length; i++) {
    if (centers[i] - centers[i - 1] > gap) { gap = centers[i] - centers[i - 1]; splitX = (centers[i] + centers[i - 1]) / 2 }
  }
  const iconItems = items.filter(it => it.bb.cx < splitX)
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9
  for (const it of iconItems) {
    minX = Math.min(minX, it.bb.x); minY = Math.min(minY, it.bb.y)
    maxX = Math.max(maxX, it.bb.x + it.bb.w); maxY = Math.max(maxY, it.bb.y + it.bb.h)
  }
  const iconBB = { x: +minX.toFixed(1), y: +minY.toFixed(1), w: +(maxX - minX).toFixed(1), h: +(maxY - minY).toFixed(1) }

  function circum(a, b, c) {
    const ax = a.x, ay = a.y, bx = b.x, by = b.y, cx = c.x, cy = c.y
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    if (Math.abs(d) < 1e-9) return null
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d
    return { cx: ux, cy: uy, r: Math.hypot(ax - ux, ay - uy) }
  }
  function kasa(pts) {
    let Sx = 0, Sy = 0, Sxx = 0, Syy = 0, Sxy = 0, Sxz = 0, Syz = 0, Sz = 0, n = pts.length
    for (const q of pts) { const z = q.x * q.x + q.y * q.y; Sx += q.x; Sy += q.y; Sxx += q.x * q.x; Syy += q.y * q.y; Sxy += q.x * q.y; Sxz += q.x * z; Syz += q.y * z; Sz += z }
    // solve [Sxx Sxy Sx; Sxy Syy Sy; Sx Sy n] [a b c] = [Sxz Syz Sz]
    const A = [[Sxx, Sxy, Sx], [Sxy, Syy, Sy], [Sx, Sy, n]], B = [Sxz, Syz, Sz]
    // gaussian elim
    for (let i = 0; i < 3; i++) {
      let piv = A[i][i]; let mr = i
      for (let r = i + 1; r < 3; r++) if (Math.abs(A[r][i]) > Math.abs(piv)) { piv = A[r][i]; mr = r }
      if (mr !== i) { [A[i], A[mr]] = [A[mr], A[i]];[B[i], B[mr]] = [B[mr], B[i]] }
      for (let r = 0; r < 3; r++) { if (r === i) continue; const f = A[r][i] / A[i][i]; for (let cc = 0; cc < 3; cc++) A[r][cc] -= f * A[i][cc]; B[r] -= f * B[i] }
    }
    const a = B[0] / A[0][0], bb = B[1] / A[1][1], c = B[2] / A[2][2]
    const cx = a / 2, cy = bb / 2, r = Math.sqrt(c + cx * cx + cy * cy)
    let err = 0; for (const q of pts) err += Math.abs(Math.hypot(q.x - cx, q.y - cy) - r)
    return { cx, cy, r, err: err / n }
  }

  const arcs = []
  const Rmax = iconBB.h * 0.7
  for (const it of iconItems) {
    const pts = it.pts
    if (pts.length < 10) continue
    const W = 3
    const triR = [], triC = []
    for (let i = 0; i < pts.length; i++) {
      if (i - W < 0 || i + W >= pts.length) { triR.push(null); triC.push(null); continue }
      const cc = circum(pts[i - W], pts[i], pts[i + W])
      triR.push(cc ? cc.r : null); triC.push(cc)
    }
    // group runs of stable small circles
    let i = 0
    while (i < pts.length) {
      const c0 = triC[i]
      if (!c0 || c0.r > Rmax) { i++; continue }
      let j = i
      while (j + 1 < pts.length && triC[j + 1] && triC[j + 1].r <= Rmax &&
        Math.hypot(triC[j + 1].cx - c0.cx, triC[j + 1].cy - c0.cy) < c0.r * 0.35) j++
      if (j - i >= 4) {
        const seg = pts.slice(Math.max(0, i - W), Math.min(pts.length, j + W + 1))
        const fit = kasa(seg)
        // angular span
        const a1 = Math.atan2(seg[0].y - fit.cy, seg[0].x - fit.cx)
        const a2 = Math.atan2(seg[seg.length - 1].y - fit.cy, seg[seg.length - 1].x - fit.cx)
        let span = Math.abs(a2 - a1); if (span > Math.PI) span = 2 * Math.PI - span
        if (fit.r > 4 && fit.r < Rmax && fit.err < fit.r * 0.04 && span > 0.35) {
          arcs.push({ cx: +fit.cx.toFixed(1), cy: +fit.cy.toFixed(1), r: +fit.r.toFixed(1), span: +(span * 180 / Math.PI).toFixed(0), err: +fit.err.toFixed(2) })
        }
      }
      i = j + 1
    }
  }
  // merge near-duplicate circles
  const merged = []
  for (const a of arcs) {
    const m = merged.find(b => Math.hypot(b.cx - a.cx, b.cy - a.cy) < Math.max(b.r, a.r) * 0.12 && Math.abs(b.r - a.r) < Math.max(b.r, a.r) * 0.15)
    if (m) { if (a.span > m.span) { m.cx = a.cx; m.cy = a.cy; m.r = a.r; m.span = a.span } } else merged.push({ ...a })
  }
  merged.sort((a, b) => b.r - a.r)
  return { iconBB, count: merged.length, arcs: merged }
})

await b.close()
fs.writeFileSync('arcs.json', JSON.stringify(out, null, 2))
console.log('iconBB', out.iconBB, 'aspect', (out.iconBB.w / out.iconBB.h).toFixed(3))
console.log('arcs found:', out.count)
console.log(out.arcs.map(a => `r=${a.r} @(${a.cx},${a.cy}) span=${a.span}° err=${a.err}`).join('\n'))
