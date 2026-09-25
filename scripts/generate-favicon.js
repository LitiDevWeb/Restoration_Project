// Generates the favicon / app-icon set from the brand mark.
//
// Source:  public/images/logo.png  (transparent PNG, yellow Fennec mark)
// Output:  public/favicon.ico, public/icon-32.png, public/icon-192.png,
//          public/icon-512.png, public/apple-touch-icon.png
//
// The icon artwork is the logo itself: the mark is centred on a transparent,
// square canvas and the browser/OS chrome supplies the background, so the mark
// stays readable on light and dark tab bars alike.
//
// Run with: npm run favicons

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// package.json declares "type": "module", so this file is ESM: `__dirname` is
// gone and has to be rebuilt from `import.meta.url`.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const LOGO_PATH = path.join(PUBLIC_DIR, 'images', 'logo.png');

// Transparent canvas: the logo is the icon, no background tile is added.
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
// Breathing room around the mark, as a ratio of the icon size.
const PADDING_RATIO = 0.08;

const ICO_SIZES = [16, 32, 48, 256];
const PNG_ICONS = [
  { file: 'icon-32.png', size: 32 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

/** Renders one square icon (centred brand mark, transparent background) as a PNG buffer. */
const renderIcon = async (size) => {
  const markSize = Math.max(1, Math.round(size * (1 - PADDING_RATIO * 2)));
  const mark = await sharp(LOGO_PATH)
    .resize(markSize, markSize, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: TRANSPARENT } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
};

/**
 * Builds a Windows .ico container. Every entry is stored as PNG, which Vista+
 * and all evergreen browsers (Chrome, Edge, Firefox, Safari) support.
 */
const buildIco = (entries) => {
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = HEADER_SIZE + ENTRY_SIZE * entries.length;
  const directory = [];
  const payload = [];

  entries.forEach(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY_SIZE);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8); // bytes of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    directory.push(entry);
    payload.push(data);
    offset += data.length;
  });

  return Buffer.concat([header, ...directory, ...payload]);
};

const main = async () => {
  if (!fs.existsSync(LOGO_PATH)) {
    throw new Error(`Brand mark not found at ${LOGO_PATH}`);
  }

  const icoEntries = [];
  for (const size of ICO_SIZES) {
    icoEntries.push({ size, data: await renderIcon(size) });
  }
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  const icoBuffer = buildIco(icoEntries);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`favicon.ico -> ${icoBuffer.length} bytes (${ICO_SIZES.join(', ')} px)`);

  for (const { file, size } of PNG_ICONS) {
    const data = await renderIcon(size);
    fs.writeFileSync(path.join(PUBLIC_DIR, file), data);
    console.log(`${file} -> ${data.length} bytes (${size} px)`);
  }
};

main().catch((error) => {
  console.error(`Favicon generation failed: ${error.message}`);
  process.exit(1);
});
