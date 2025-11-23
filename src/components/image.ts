import type { CanvasComponent } from '../types/types';
import type { CanvasRenderingContext2D } from 'canvas';
import { loadImage } from 'canvas';

export const Image: CanvasComponent = async ({ ctx, node, offsetX = 0, offsetY = 0, parent }) => {
  const src = node.attributes?.src;
  if (!src) return;

  const img = await loadImage(src);

  const width = Number(node.attributes?.width ?? img.width);
  const height = Number(node.attributes?.height ?? img.height);

  const rounded = node.attributes?.rounded === 'true';
  const radii = getRadii(node);
  const horizontalAlign = node.attributes?.horizontalAlign;
  const verticalAlign = node.attributes?.verticalAlign;

  const parentW = Number(parent?.attributes?.width ?? 0);
  const parentH = Number(parent?.attributes?.height ?? 0);

  let x = Number(node.attributes?.x ?? 0);
  let y = Number(node.attributes?.y ?? 0);

  if (horizontalAlign && parentW > 0) {
    if (horizontalAlign === 'center') x = (parentW - width) / 2;
    else if (horizontalAlign === 'right') x = parentW - width;
  }

  if (verticalAlign && parentH > 0) {
    if (verticalAlign === 'center') y = (parentH - height) / 2;
    else if (verticalAlign === 'bottom') y = parentH - height;
  }

  const finalX = offsetX + x;
  const finalY = offsetY + y;

  ctx.save();

  if (rounded) {
    const radius = Math.min(width, height) / 2;
    const cx = finalX + width / 2;
    const cy = finalY + height / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
  } else if (hasAnyRadius(radii)) {
    const clamped = clampRadii(radii, width, height);
    ctx.beginPath();
    roundedRectPerCorner(ctx, finalX, finalY, width, height, clamped);
    ctx.clip();
  }
  ctx.drawImage(img, finalX, finalY, width, height);

  ctx.restore();
};

type Radii = { tl: number; tr: number; br: number; bl: number };

function getRadii(node: any): Radii {
  const base = Number(node.attributes?.radius ?? 0);
  const tl = Number(node.attributes?.radiusTopLeft ?? base);
  const tr = Number(node.attributes?.radiusTopRight ?? base);
  const br = Number(node.attributes?.radiusBottomRight ?? base);
  const bl = Number(node.attributes?.radiusBottomLeft ?? base);
  return { tl, tr, br, bl };
}

function hasAnyRadius(r: Radii) {
  return r.tl > 0 || r.tr > 0 || r.br > 0 || r.bl > 0;
}

function clampRadii(radii: Radii, width: number, height: number): Radii {
  const clamp = (v: number) => Math.min(v, width / 2, height / 2);
  return { tl: clamp(radii.tl), tr: clamp(radii.tr), br: clamp(radii.br), bl: clamp(radii.bl) };
}

function roundedRectPerCorner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radii: Radii,
) {
  const { tl, tr, br, bl } = radii;
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + width - tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + tr);
  ctx.lineTo(x + width, y + height - br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
  ctx.lineTo(x + bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}
