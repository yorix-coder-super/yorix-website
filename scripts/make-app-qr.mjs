// Draws public/art/app-qr.svg — the code a desktop visitor points a phone at
// to open Yorix in the App Store. It is built from the real matrix (an image
// model cannot draw a code that scans): round modules, soft finder eyes and
// an empty window in the middle for the app icon, which the page lays on top.
// Error correction Q (25 %) pays for that window.
import { readFileSync, writeFileSync } from 'node:fs';
import { encode } from 'uqr';

const url = /appQrUrl = '([^']+)'/.exec(readFileSync(new URL('../app/content.ts', import.meta.url), 'utf8'))?.[1];
if (!url) throw new Error('appQrUrl not found in app/content.ts');

const QUIET = 2;
const WINDOW = 9;
const INK = '#1E1B4B';
const ACCENT = '#4338CA';

const { data, size } = encode(url, { ecc: 'Q', border: 0 });
const total = size + QUIET * 2;
const from = (size - WINDOW) / 2;
const inWindow = (x, y) => x >= from && x < from + WINDOW && y >= from && y < from + WINDOW;
const inEye = (x, y) => (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
const n = (value) => Number(value.toFixed(2));

// A dot per dark module: a zero-length line with round caps.
let dots = '';
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (data[y][x] && !inEye(x, y) && !inWindow(x, y)) dots += `M${n(x + QUIET + 0.5)} ${n(y + QUIET + 0.5)}h0`;
  }
}

const rounded = (x, y, side, radius) =>
  `M${n(x + radius)} ${n(y)}h${n(side - radius * 2)}a${radius} ${radius} 0 0 1 ${radius} ${radius}v${n(side - radius * 2)}a${radius} ${radius} 0 0 1 -${radius} ${radius}h-${n(side - radius * 2)}a${radius} ${radius} 0 0 1 -${radius} -${radius}v-${n(side - radius * 2)}a${radius} ${radius} 0 0 1 ${radius} -${radius}z`;
const eyes = [
  [0, 0],
  [size - 7, 0],
  [0, size - 7],
]
  .map(([x, y]) => {
    const left = x + QUIET;
    const top = y + QUIET;
    return `<path fill="${INK}" fill-rule="evenodd" d="${rounded(left, top, 7, 2.2)}${rounded(left + 1, top + 1, 5, 1.5)}"/><path fill="${ACCENT}" d="${rounded(left + 2, top + 2, 3, 1)}"/>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="geometricPrecision"><path d="${dots}" fill="none" stroke="${INK}" stroke-width="0.94" stroke-linecap="round"/>${eyes}</svg>\n`;
writeFileSync(new URL('../public/art/app-qr.svg', import.meta.url), svg);
console.log(`app-qr.svg: ${url} → ${size}×${size} modules, ${svg.length} bytes`);
