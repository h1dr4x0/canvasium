import type { CanvasComponent } from '../types/types';
import { loadImage } from 'canvas';

export const Image: CanvasComponent = async ({ ctx, node, offsetX = 0, offsetY = 0, parent }) => {
  const src = node.attributes?.src;
  if (!src) return;

  const img = await loadImage(src);

  const width = Number(node.attributes?.width ?? img.width);
  const height = Number(node.attributes?.height ?? img.height);

  const rounded = node.attributes?.rounded === 'true';
  const horizontalAlign = node.attributes?.horizontalAlign;
  const verticalAlign = node.attributes?.verticalAlign;

  const parentW = Number(parent?.attributes?.width ?? 0);
  const parentH = Number(parent?.attributes?.height ?? 0);

  let x = Number(node.attributes?.x ?? 0);
  let y = Number(node.attributes?.y ?? 0);

  // Center/Right alignment
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
  }
  ctx.drawImage(img, finalX, finalY, width, height);

  ctx.restore();
};
