import type { CanvasComponent } from '../types/types';
import type { CanvasRenderingContext2D } from 'canvas';

export const Bar: CanvasComponent = ({ ctx, node, offsetX = 0, offsetY = 0 }) => {
  const x = Number(node.attributes?.x ?? 0) + offsetX;
  const y = Number(node.attributes?.y ?? 0) + offsetY;
  const width = Number(node.attributes?.width ?? 100);
  const height = Number(node.attributes?.height ?? 10);
  const value = Number(node.attributes?.value ?? 0);
  const max = Number(node.attributes?.max ?? 100);

  const outerRadius = Number(node.attributes?.outerRadius ?? 0);
  const innerRadius = Number(node.attributes?.innerRadius ?? 0);

  const progressColor = node.attributes?.color ?? '#00baff';
  const backgroundColor = node.attributes?.background ?? '#333';

  const safeWidthEnabled = node.attributes?.safeWidth === 'true';
  const minDrawWidth = Number(node.attributes?.minDrawWidth ?? 4);

  const percent = Math.max(0, Math.min(value / max, 1)); // Clamp 0–1
  const filledWidthRaw = percent * width;

  const filledWidth = safeWidthEnabled ? Math.max(filledWidthRaw, minDrawWidth) : filledWidthRaw;

  ctx.save();

  ctx.beginPath();
  roundedRect(ctx, x, y, width, height, outerRadius);
  ctx.fillStyle = backgroundColor;
  ctx.fill();
  ctx.closePath();

  if (filledWidthRaw > 0) {
    ctx.beginPath();
    const effectiveRadius = Math.min(innerRadius, filledWidth / 2, height / 2);
    roundedRect(ctx, x, y, filledWidth, height, effectiveRadius);
    ctx.fillStyle = progressColor;
    ctx.fill();
    ctx.closePath();
  }

  ctx.restore();
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}
