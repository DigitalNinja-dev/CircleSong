#!/usr/bin/env node
/*
 * CircleSong - Interactive Music Theory & Composition Engine
 * Copyright (C) 2026 Nicolás Raul Jean-Pierre Figueroa
 * https://github.com/DigitalNinja-dev/CircleSong
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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

import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'assets/logo.svg'), 'utf8');

/** The one ground colour shared by the icons, the splash and the window. */
const BRAND_BG = '#0d0d0d';

// A maskable icon is cropped to whatever shape the launcher uses, so its
// content has to sit well inside the frame and the ground must be opaque —
// hence the tighter scale and filled background on that one.
const VARIANTS = [
  { file: 'icon-192.png', size: 192, scale: 0.92, bg: 'transparent' },
  { file: 'icon-512.png', size: 512, scale: 0.92, bg: 'transparent' },
  { file: 'maskable-512.png', size: 512, scale: 0.62, bg: '#0d0d0d' },
  { file: 'apple-touch-icon.png', size: 180, scale: 0.8, bg: '#0d0d0d' },
];

/**
 * The Android project, when there is one.
 *
 * A launcher icon is cropped to whatever shape the device uses — circle,
 * squircle, teardrop — so the artwork sits well inside the frame and the ground
 * is opaque, exactly as for the maskable web icon. The adaptive foreground is
 * looser still because the system crops it again and animates it.
 */
const ANDROID = [
  ['mipmap-mdpi', 48], ['mipmap-hdpi', 72], ['mipmap-xhdpi', 96],
  ['mipmap-xxhdpi', 144], ['mipmap-xxxhdpi', 192],
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

// --- Android, if the platform has been added ---------------------------------
const androidRes = join(root, 'android/app/src/main/res');
if (existsSync(androidRes)) {
  const shot = async (size, scale, bg, out, round = false) => {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    const inner = Math.round(size * scale);
    await page.setContent(
      `<body style="margin:0;width:${size}px;height:${size}px;background:${bg};` +
        `${round ? `border-radius:${size / 2}px;overflow:hidden;` : ''}` +
        `display:flex;align-items:center;justify-content:center">` +
        svg.replace('width="700" height="700"', `width="${inner}" height="${inner}"`) +
        `</body>`
    );
    await page.waitForTimeout(120);
    mkdirSync(dirname(out), { recursive: true });
    await page.screenshot({ path: out, omitBackground: bg === 'transparent' });
    await page.close();
  };

  for (const [dir, size] of ANDROID) {
    await shot(size, 0.66, BRAND_BG, join(androidRes, dir, 'ic_launcher.png'));
    await shot(size, 0.66, BRAND_BG, join(androidRes, dir, 'ic_launcher_round.png'), true);
    // The adaptive foreground is drawn on the background layer beneath it, so
    // it is transparent and sized for the system's own crop.
    await shot(size, 0.5, 'transparent', join(androidRes, dir, 'ic_launcher_foreground.png'));
    console.log(`android/${dir}  ${size}px`);
  }

  // The splash is the mark centred on the brand ground, at the largest size a
  // phone will ask for; Android scales it down.
  await shot(1280, 0.28, BRAND_BG, join(androidRes, 'drawable/splash.png'));
  console.log('android/drawable/splash.png  1280px');
}

await browser.close();
