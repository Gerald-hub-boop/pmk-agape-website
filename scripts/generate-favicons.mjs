import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_IMAGE = path.join(ROOT, 'src', 'logo.png');
const PUBLIC_DIR = path.join(ROOT, 'public');

if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function generateAssets() {
  console.log('Generating favicon & OG image assets from:', SOURCE_IMAGE);

  // 1. Standard PNG Favicons
  await sharp(SOURCE_IMAGE)
    .resize(16, 16)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-16x16.png'));
  console.log('✓ Created favicon-16x16.png');

  await sharp(SOURCE_IMAGE)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('✓ Created favicon-32x32.png');

  await sharp(SOURCE_IMAGE)
    .resize(48, 48)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-48x48.png'));
  console.log('✓ Created favicon-48x48.png');

  // Replace default favicon.png with high quality 192x192 PNG
  await sharp(SOURCE_IMAGE)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
  console.log('✓ Updated favicon.png (192x192)');

  // 2. Apple Touch Icon (180x180)
  await sharp(SOURCE_IMAGE)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png (180x180)');

  // 3. Android Chrome Icons
  await sharp(SOURCE_IMAGE)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));
  console.log('✓ Created android-chrome-192x192.png');

  await sharp(SOURCE_IMAGE)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));
  console.log('✓ Created android-chrome-512x512.png');

  // 4. Favicon.ico fallback (using 32x32 PNG sharp output saved as favicon.ico)
  await sharp(SOURCE_IMAGE)
    .resize(32, 32)
    .toFormat('png')
    .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
  console.log('✓ Created favicon.ico');

  // 5. Open Graph & Social Media Preview Image (1200x630)
  // Create a beautiful background with brand color / soft pastel overlay and centered PMK logo
  const logoResized = await sharp(SOURCE_IMAGE)
    .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create 1200x630 background canvas with gradient/brand background color (#FAF5F0 or soft gradient)
  const svgBackground = Buffer.from(`
    <svg width="1200" height="630" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4A1F1F" />
          <stop offset="100%" stop-color="#2D1212" />
        </linearGradient>
        <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="150" cy="100" r="300" fill="#F7D9E3" opacity="0.06"/>
      <circle cx="1050" cy="530" r="250" fill="#F7D9E3" opacity="0.05"/>
      <rect x="60" y="60" width="1080" height="510" rx="24" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>
    </svg>
  `);

  await sharp(svgBackground)
    .composite([
      {
        input: logoResized,
        top: 115,
        left: 400
      }
    ])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('✓ Created og-image.png (1200x630)');

  console.log('All SEO image assets generated successfully!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
