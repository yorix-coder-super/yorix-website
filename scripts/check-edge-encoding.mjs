import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const base = 'https://yorix-app.com';
const page = await fetch(`${base}/ru/start`);
assert.equal(page.status, 200);
const html = await page.text();
const asset = html.match(/\/_next\/static\/chunks\/index-[A-Za-z0-9_-]+\.js/)?.[0];
assert.ok(asset, 'The public page must reference its client entry');
const variants = [
  { accept: 'gzip, deflate, br, zstd', supported: new Set(['gzip', 'br', 'zstd', null]) },
  { accept: 'gzip, deflate, br', supported: new Set(['gzip', 'br', null]) },
  { accept: 'gzip', supported: new Set(['gzip', null]) },
  { accept: 'identity', supported: new Set([null]) },
];
let expectedHash;
for (let pass = 0; pass < 2; pass++) {
  for (const { accept, supported } of variants) {
    const response = await fetch(`${base}${asset}`, { headers: { 'Accept-Encoding': accept } });
    assert.equal(response.status, 200);
    const encoding = response.headers.get('content-encoding');
    assert.ok(supported.has(encoding), `${accept} received unsupported ${encoding}`);
    assert.match(response.headers.get('vary') ?? '', /accept-encoding/i);
    const source = await response.text();
    assert.ok(!source.includes('\ufffd'), 'The decoded JavaScript must not contain replacement characters');
    const hash = createHash('sha256').update(source).digest('hex');
    expectedHash ??= hash;
    assert.equal(hash, expectedHash, 'Every compression variant must decode to identical JavaScript');
    console.log(`PASS ${pass + 1}: ${accept} → ${encoding ?? 'identity'} (${response.headers.get('x-edge-cache')})`);
  }
}
