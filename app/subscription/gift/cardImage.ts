// The printable gift card: the same night-sky card as on the page, with a
// white strip below it that carries everything needed to redeem without the
// link — a QR code of the link, the code itself and where to type it.
export type CardImageText = {
  eyebrow: string;
  title: string;
  message: string;
  period: string;
  codeLabel: string;
  scan: string;
  or: string;
  validUntil: string;
};

const W = 1200;
const CARD_H = 800;
const H = 1140;
const PAD = 56;

async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = src;
  await image.decode();
  return image;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (!line || ctx.measureText(next).width <= width) {
      line = next;
      continue;
    }
    lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last && ctx.measureText(`${last}…`).width > width) last = last.slice(0, -1);
  kept[maxLines - 1] = `${last.trimEnd()}…`;
  return kept;
}

export async function giftCardImage({ code, url, text }: { code: string; url: string; text: CardImageText }): Promise<Blob> {
  const [{ encode }, art, icon] = await Promise.all([import('uqr'), loadImage('/art/gift-card.webp'), loadImage('/app-icon.png')]);
  await document.fonts?.ready;
  const font = getComputedStyle(document.body).fontFamily;
  const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unavailable');
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(art, 0, 0, W, CARD_H);
  const shade = ctx.createLinearGradient(0, 0, W, 0);
  shade.addColorStop(0, 'rgba(19, 17, 50, 0.9)');
  shade.addColorStop(0.5, 'rgba(19, 17, 50, 0.45)');
  shade.addColorStop(1, 'rgba(19, 17, 50, 0)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, W, CARD_H);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(PAD, 52, 72, 72, 18);
  ctx.clip();
  ctx.drawImage(icon, PAD, 52, 72, 72);
  ctx.restore();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 36px ${font}`;
  ctx.fillText('Yorix', PAD + 90, 100);

  // The dedication sits in the dark left part, centred between logo and pill.
  const column = W * 0.62 - PAD * 2;
  ctx.font = `600 60px ${font}`;
  const titleLines = wrap(ctx, text.title, column, 2);
  ctx.font = `italic 400 30px ${font}`;
  const messageLines = text.message ? wrap(ctx, text.message, column, 3) : [];
  const blockHeight = 30 + 16 + titleLines.length * 68 + (messageLines.length ? 14 + messageLines.length * 42 : 0);
  let y = Math.round((124 + 692) / 2 - blockHeight / 2) + 24;
  ctx.fillStyle = '#FDE68A';
  ctx.font = `700 24px ${font}`;
  ctx.fillText(text.eyebrow.toUpperCase(), PAD, y);
  y += 16;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 60px ${font}`;
  for (const line of titleLines) {
    y += 68;
    ctx.fillText(line, PAD, y - 12);
  }
  if (messageLines.length) {
    y += 14;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = `italic 400 30px ${font}`;
    for (const line of messageLines) {
      y += 42;
      ctx.fillText(line, PAD, y - 10);
    }
  }

  ctx.font = `600 26px ${font}`;
  const pillWidth = Math.min(column, ctx.measureText(text.period).width + 44);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.beginPath();
  ctx.roundRect(PAD, 692, pillWidth, 52, 26);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(text.period, PAD + 22, 727, column - 44);

  // The redeem strip.
  const qr = encode(url, { ecc: 'M', border: 0 });
  const qrSize = 240;
  const cell = qrSize / qr.size;
  const qrTop = CARD_H + 50;
  ctx.fillStyle = '#1E1B4B';
  qr.data.forEach((row, r) =>
    row.forEach((dark, c) => {
      if (dark) ctx.fillRect(PAD + c * cell, qrTop + r * cell, Math.ceil(cell), Math.ceil(cell));
    }),
  );
  const textX = PAD + qrSize + 48;
  const textWidth = W - PAD - textX;
  ctx.fillStyle = '#6B7280';
  ctx.font = `600 24px ${font}`;
  ctx.fillText(text.codeLabel, textX, qrTop + 26, textWidth);
  ctx.fillStyle = '#1E1B4B';
  ctx.font = `700 60px ${mono}`;
  ctx.fillText(code, textX, qrTop + 98, textWidth);
  ctx.fillStyle = '#374151';
  ctx.font = `500 26px ${font}`;
  ctx.fillText(text.scan, textX, qrTop + 156, textWidth);
  ctx.fillText(text.or, textX, qrTop + 192, textWidth);
  ctx.fillStyle = '#6B7280';
  ctx.font = `400 22px ${font}`;
  ctx.fillText(text.validUntil, textX, qrTop + 236, textWidth);

  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('no image'))), 'image/png'));
}

export async function downloadGiftCard(args: { code: string; url: string; text: CardImageText }): Promise<void> {
  const blob = await giftCardImage(args);
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `yorix-gift-${args.code}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 10_000);
}
