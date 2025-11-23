import type { CanvasComponent } from '../types/types';
import type { CanvasRenderingContext2D } from 'canvas';

export const Bar: CanvasComponent = ({ ctx, node, offsetX = 0, offsetY = 0 }) => {
  const x = Number(node.attributes?.x ?? 0) + offsetX;
  const y = Number(node.attributes?.y ?? 0) + offsetY;
  const width = Number(node.attributes?.width ?? 100);
  const height = Number(node.attributes?.height ?? 10);
  const value = Number(node.attributes?.value ?? 0);
  const max = Number(node.attributes?.max ?? 100);

  const outerRadii = getRadii(node, 'outerRadius');
  const innerRadii = getRadii(node, 'innerRadius');

  const progressColor = node.attributes?.color ?? '#00baff';
  const backgroundColor = node.attributes?.background ?? '#333';

  const safeWidthEnabled = node.attributes?.safeWidth === 'true';
  const minDrawWidth = Number(node.attributes?.minDrawWidth ?? 4);

  const percent = Math.max(0, Math.min(value / max, 1));
  const filledWidthRaw = percent * width;

  const filledWidth = safeWidthEnabled ? Math.max(filledWidthRaw, minDrawWidth) : filledWidthRaw;

  ctx.save();

  ctx.beginPath();
  roundedRectPerCorner(ctx, x, y, width, height, clampRadii(outerRadii, width, height));
  ctx.fillStyle = backgroundColor;
  ctx.fill();
  ctx.closePath();

  if (filledWidthRaw > 0) {
    ctx.beginPath();
    const radii = clampRadii(innerRadii, filledWidth, height);
    roundedRectPerCorner(ctx, x, y, filledWidth, height, radii);
    ctx.fillStyle = progressColor;
    ctx.fill();
    ctx.closePath();
  }

  ctx.restore();
};

type Radii = { tl: number; tr: number; br: number; bl: number };

function getRadii(node: any, base: string): Radii {
  const baseVal = Number(node.attributes?.[base] ?? 0);
  const tl = Number(node.attributes?.[`${base}TopLeft`] ?? baseVal);
  const tr = Number(node.attributes?.[`${base}TopRight`] ?? baseVal);
  const br = Number(node.attributes?.[`${base}BottomRight`] ?? baseVal);
  const bl = Number(node.attributes?.[`${base}BottomLeft`] ?? baseVal);
  return { tl, tr, br, bl };
}

function clampRadii(radii: Radii, width: number, height: number): Radii {
  const clamp = (r: number) => Math.min(r, width / 2, height / 2);
  return {
    tl: clamp(radii.tl),
    tr: clamp(radii.tr),
    br: clamp(radii.br),
    bl: clamp(radii.bl),
  };
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
}
