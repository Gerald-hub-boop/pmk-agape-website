#!/usr/bin/env node
/**
 * optimize-images.mjs
 * 
 * Converts all PNG/JPG images in src/images/ to optimized WebP.
 * Resizes based on actual display context:
 *   - WhatWeDo photos → 1200px wide (retina-ready for ~600px display)
 *   - Landing hero    → 1920px wide
 *   - Team photos 1-45→ 480px wide  (retina-ready for ~200px display)
 *   - Logo            → 200px wide
 * 
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'images');
const OUT_DIR = path.join(ROOT, 'src', 'images-optimized');
const QUALITY = 82;

// Sizing rules
function getMaxWidth(relativePath, basename) {
  const lower = basename.toLowerCase();
  const rel = relativePath.toLowerCase();

  // WhatWeDo activity photos
  if (rel.includes('whatwedo')) return 1200;

  // Landing hero
  if (lower.startsWith('landing')) return 1920;

  // Logo
  if (lower.startsWith('logo')) return 200;

  // Team photos (numeric names 1-45)
  if (/^\d+\.(png|jpe?g)$/i.test(basename)) return 480;

  // Default
  return 1200;
}

async function findImages(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath, base));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push({
        input: fullPath,
        relative: path.relative(base, fullPath),
        basename: entry.name,
      });
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  console.log('\n🖼  PMK Agape — Image Optimizer\n');
  console.log(`   Source:  ${SRC_DIR}`);
  console.log(`   Output:  ${OUT_DIR}`);
  console.log(`   Quality: ${QUALITY}%\n`);

  const images = await findImages(SRC_DIR);
  if (images.length === 0) {
    console.log('   No images found.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    const outName = img.relative.replace(/\.(png|jpe?g)$/i, '.webp');
    const outPath = path.join(OUT_DIR, outName);

    // Ensure output directory exists
    await mkdir(path.dirname(outPath), { recursive: true });

    const maxWidth = getMaxWidth(img.relative, img.basename);
    const beforeStat = await stat(img.input);
    totalBefore += beforeStat.size;

    // Get original dimensions
    const metadata = await sharp(img.input).metadata();
    const needsResize = metadata.width && metadata.width > maxWidth;

    let pipeline = sharp(img.input);
    if (needsResize) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: QUALITY }).toFile(outPath);

    const afterStat = await stat(outPath);
    totalAfter += afterStat.size;

    const reduction = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(1);
    const resized = needsResize ? ` (${metadata.width}→${maxWidth}px)` : '';

    console.log(
      `   ✓ ${img.relative.padEnd(50)} ${formatBytes(beforeStat.size).padStart(10)} → ${formatBytes(afterStat.size).padStart(10)}  -${reduction}%${resized}`
    );
  }

  console.log(`\n   ─────────────────────────────────────────────────`);
  console.log(`   Total before: ${formatBytes(totalBefore)}`);
  console.log(`   Total after:  ${formatBytes(totalAfter)}`);
  console.log(`   Saved:        ${formatBytes(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  console.log(`   Images:       ${images.length}\n`);
}

main().catch(console.error);
