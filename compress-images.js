const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, 'public');
const MAX_WIDTH = 1800;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 82;
const MIN_SAVING_KB = 100;

function getAllImages(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllImages(full, files);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function compress(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = fs.statSync(filePath).size;

  let pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  let buf;
  if (ext === '.png') {
    buf = await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer();
  } else {
    buf = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  }

  const saving = originalSize - buf.length;
  if (saving < MIN_SAVING_KB * 1024) {
    return null;
  }

  fs.writeFileSync(filePath, buf);
  return { original: originalSize, compressed: buf.length };
}

async function main() {
  const images = getAllImages(INPUT_DIR);
  console.log(`${images.length} kép találva\n`);

  let totalSaved = 0;
  for (const img of images) {
    const rel = path.relative(INPUT_DIR, img);
    try {
      const result = await compress(img);
      if (result) {
        const saved = ((result.original - result.compressed) / result.original * 100).toFixed(0);
        const savedMB = ((result.original - result.compressed) / 1024 / 1024).toFixed(1);
        totalSaved += result.original - result.compressed;
        console.log(`✓ ${rel} — ${(result.original/1024/1024).toFixed(1)}MB → ${(result.compressed/1024/1024).toFixed(1)}MB (-${saved}%, -${savedMB}MB)`);
      } else {
        console.log(`· ${rel} — már optimalizált`);
      }
    } catch (e) {
      console.log(`✗ ${rel} — hiba: ${e.message}`);
    }
  }

  console.log(`\nÖsszesen megtakarítva: ${(totalSaved/1024/1024).toFixed(1)}MB`);
}

main();
