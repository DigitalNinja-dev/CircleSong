// Fetch the latin subsets of the design's three faces and emit @font-face
// rules with the woff2 payloads inlined as data URIs.
import { writeFileSync } from 'node:fs';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700' +
  '&family=IBM+Plex+Sans:wght@400;500;600' +
  '&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();

// Blocks are preceded by a `/* subset */` comment; keep plain latin only.
const blocks = [...css.matchAll(/\/\* ([a-z0-9-]+) \*\/\s*(@font-face \{[^}]*\})/g)]
  .filter(([, subset]) => subset === 'latin')
  .map(([, , block]) => block);

let out = '';
let bytes = 0;
for (const block of blocks) {
  const url = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)[1];
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  bytes += buf.length;
  const family = block.match(/font-family: '([^']+)'/)[1];
  const weight = block.match(/font-weight: (\d+)/)[1];
  out +=
    `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;` +
    `src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');}\n`;
  console.log(`${family} ${weight}  ${(buf.length / 1024).toFixed(1)} KB`);
}

writeFileSync('/home/user/CircleSong/tools/fonts.css', out);
console.log(`\n${blocks.length} faces, ${(bytes / 1024).toFixed(0)} KB raw -> tools/fonts.css`);
