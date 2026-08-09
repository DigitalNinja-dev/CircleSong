#!/usr/bin/env node
/**
 * Renders the launcher icons in icons/ from assets/logo.svg.
 *
 * Run after changing the brand mark: `npm run icons`. Android needs raster
 * icons in the manifest, so these are generated rather than hand-made — the SVG
 * stays the single source of truth for the artwork.
 *
 * Requires Playwright for the headless renderer; it is the only dev-time
 * dependency and the app itself has none.
 */

import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'assets/logo.svg'), 'utf8');

// A maskable icon is cropped to whatever shape the launcher uses, so its
// content has to sit well inside the frame and the ground must be opaque —
// hence the tighter scale and filled background on that one.
const VARIANTS = [
  { file: 'icon-192.png', size: 192, scale: 0.92, bg: 'transparent' },
  { file: 'icon-512.png', size: 512, scale: 0.92, bg: 'transparent' },
  { file: 'maskable-512.png', size: 512, scale: 0.62, bg: '#0d0d0d' },
  { file: 'apple-touch-icon.png', size: 180, scale: 0.8, bg: '#0d0d0d' },
];

mkdirSync(join(root, 'icons'), { recursive: true });
const browser = await chromium.launch();

for (const v of VARIANTS) {
  const page = await browser.newPage({
    viewport: { width: v.size, height: v.size },
    deviceScaleFactor: 1,
  });
  const inner = Math.round(v.size * v.scale);
  await page.setContent(
    `<body style="margin:0;width:${v.size}px;height:${v.size}px;background:${v.bg};` +
      `display:flex;align-items:center;justify-content:center">` +
      svg.replace('width="700" height="700"', `width="${inner}" height="${inner}"`) +
      `</body>`
  );
  await page.waitForTimeout(150);
  await page.screenshot({
    path: join(root, 'icons', v.file),
    omitBackground: v.bg === 'transparent',
  });
  await page.close();
  console.log(`icons/${v.file}  ${v.size}px`);
}

await browser.close();
