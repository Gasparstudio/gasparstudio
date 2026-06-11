const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 1080;
const H = 1350;
const ASSETS = `D:\\Claude\\gaspar_design\\public\\works\\Simon's Burger`;
const OUT = `D:\\Gaspar\\Marketing\\Tartalom\\simons_carousel`;

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const GREEN  = '#1da64f';
const BLACK  = '#0a0a0a';
const WHITE  = '#ffffff';

function read(rel) {
  return fs.readFileSync(path.join(ASSETS, rel));
}

async function fit(buf, w, h, pos = 'centre') {
  return sharp(buf).resize(w, h, { fit: 'cover', position: pos }).toBuffer();
}

async function slide01() {
  const base = await fit(read('_DSC5942.jpg'), W, H, 'top');
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#000" stop-opacity="0.05"/>
        <stop offset="55%"  stop-color="#000" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="${W/2}" y="${H-260}" text-anchor="middle" font-family="Segoe UI,Arial" font-size="26" font-weight="400" fill="${WHITE}" opacity="0.55" letter-spacing="0.32em">BRAND REDESIGN</text>
    <text x="${W/2}" y="${H-148}" text-anchor="middle" font-family="Segoe UI,Arial" font-size="104" font-weight="800" fill="${WHITE}" letter-spacing="0.04em">SIMON'S</text>
    <text x="${W/2}" y="${H-40}"  text-anchor="middle" font-family="Segoe UI,Arial" font-size="104" font-weight="800" fill="${WHITE}" letter-spacing="0.04em">BURGER</text>
  </svg>`;
  await sharp(base).composite([{ input: Buffer.from(svg) }]).png().toFile(path.join(OUT, '01_hook.png'));
  console.log('✓ 01 hook');
}

async function slide02() {
  const leftBuf = await sharp(read('old logo.png'))
    .resize(W/2, H, { fit: 'contain', background: '#1da64f' })
    .toBuffer();
  const rightBuf = await fit(read('_DSC5942.jpg'), W/2, H, 'top');
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0"     y="0" width="${W/2}" height="${H}" fill="#000" opacity="0.22"/>
    <rect x="${W/2}" y="0" width="${W/2}" height="${H}" fill="#000" opacity="0.38"/>
    <rect x="${W/2-1}" y="0" width="2" height="${H}" fill="${WHITE}" opacity="0.55"/>
    <text x="${W/4}"   y="76" text-anchor="middle" font-family="Segoe UI,Arial" font-size="20" fill="${WHITE}" opacity="0.65" letter-spacing="0.24em">ELŐTTE</text>
    <text x="${W*3/4}" y="76" text-anchor="middle" font-family="Segoe UI,Arial" font-size="20" fill="${WHITE}" opacity="0.65" letter-spacing="0.24em">UTÁNA</text>
  </svg>`;
  await sharp({ create: { width: W, height: H, channels: 3, background: BLACK } })
    .composite([
      { input: leftBuf,  left: 0,   top: 0 },
      { input: rightBuf, left: W/2, top: 0 },
      { input: Buffer.from(svg) },
    ]).png().toFile(path.join(OUT, '02_before_after.png'));
  console.log('✓ 02 before/after');
}

async function slide03() {
  const base = await fit(read(path.join('smashchamps', '01.png')), W, H, 'centre');
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${H-88}" width="${W}" height="88" fill="#000" opacity="0.72"/>
    <text x="${W/2}" y="${H-26}" text-anchor="middle" font-family="Segoe UI,Arial" font-size="19" fill="${WHITE}" opacity="0.55" letter-spacing="0.22em">BRAND EXTENSION · VISUAL SYSTEM</text>
  </svg>`;
  await sharp(base).composite([{ input: Buffer.from(svg) }]).png().toFile(path.join(OUT, '03_brand_system.png'));
  console.log('✓ 03 brand system');
}

async function slide04() {
  const base = await fit(read('_DSC6041.jpg'), W, H, 'centre');
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%"  stop-color="#000" stop-opacity="0.65"/>
        <stop offset="28%" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="56" y="${H-36}" font-family="Segoe UI,Arial" font-size="18" fill="${WHITE}" opacity="0.4" letter-spacing="0.14em">GASPAR.STUDIO</text>
  </svg>`;
  await sharp(base).composite([{ input: Buffer.from(svg) }]).png().toFile(path.join(OUT, '04_photography.png'));
  console.log('✓ 04 photography');
}

async function slide05() {
  const halfH = Math.floor(H / 2) - 2;
  const topBuf = await fit(read(path.join('social', 'old', 'Képernyőkép 2026-06-01 185734.png')), W, halfH, 'centre');
  const botBuf = await fit(read(path.join('social', 'new', "Simon's_catering_1x1_v2.png")), W, halfH, 'centre');
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${halfH}" width="${W}" height="4" fill="${BLACK}"/>
    <rect x="0" y="0"          width="${W}" height="${halfH}" fill="#000" opacity="0.2"/>
    <rect x="0" y="${halfH+4}" width="${W}" height="${halfH}" fill="#000" opacity="0.08"/>
    <text x="52" y="58" font-family="Segoe UI,Arial" font-size="19" fill="${WHITE}" opacity="0.65" letter-spacing="0.22em">ELŐTTE</text>
    <text x="52" y="${halfH+62}" font-family="Segoe UI,Arial" font-size="19" fill="${WHITE}" opacity="0.65" letter-spacing="0.22em">UTÁNA</text>
  </svg>`;
  await sharp({ create: { width: W, height: H, channels: 3, background: BLACK } })
    .composite([
      { input: topBuf, left: 0, top: 0 },
      { input: botBuf, left: 0, top: halfH + 4 },
      { input: Buffer.from(svg) },
    ]).png().toFile(path.join(OUT, '05_social.png'));
  console.log('✓ 05 social');
}

async function slide06() {
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${BLACK}"/>
    <rect x="${W/2-28}" y="${H/2-180}" width="56" height="3" fill="${GREEN}"/>
    <text x="${W/2}" y="${H/2-88}"  text-anchor="middle" font-family="Segoe UI,Arial" font-size="92" font-weight="800" fill="${WHITE}" letter-spacing="0.04em">SIMON'S</text>
    <text x="${W/2}" y="${H/2+24}"  text-anchor="middle" font-family="Segoe UI,Arial" font-size="92" font-weight="800" fill="${WHITE}" letter-spacing="0.04em">BURGER</text>
    <text x="${W/2}" y="${H/2+100}" text-anchor="middle" font-family="Segoe UI,Arial" font-size="22" font-weight="300" fill="${WHITE}" opacity="0.45" letter-spacing="0.22em">Brand Redesign · 2025</text>
    <text x="${W/2}" y="${H-56}"    text-anchor="middle" font-family="Segoe UI,Arial" font-size="17" fill="${WHITE}" opacity="0.3" letter-spacing="0.14em">gaspar.studio</text>
  </svg>`;
  await sharp(Buffer.from(svg)).resize(W, H).png().toFile(path.join(OUT, '06_closing.png'));
  console.log('✓ 06 closing');
}

async function main() {
  console.log('Generálás...\n');
  await slide01();
  await slide02();
  await slide03();
  await slide04();
  await slide05();
  await slide06();
  console.log(`\nMinden kész → ${OUT}`);
}

main().catch(console.error);
