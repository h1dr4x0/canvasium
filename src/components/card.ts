import type { CanvasComponent } from '../types/types';

export const Card: CanvasComponent = ({ ctx, node, render, offsetX = 0, offsetY = 0, parent }) => {
  const width = Number(node.attributes?.width ?? 300);
  const height = Number(node.attributes?.height ?? 200);
  const radius = Number(node.attributes?.radius ?? 16);

  const horizontalAlign = node.attributes?.horizontalAlign;
  const verticalAlign = node.attributes?.verticalAlign;

  const parentW = Number(parent?.attributes?.width ?? 0);
  const parentH = Number(parent?.attributes?.height ?? 0);
  let x = Number(node.attributes?.x ?? 0);
  let y = Number(node.attributes?.y ?? 0);

  if (horizontalAlign === 'center') {
    x = (parentW - width) / 2;
  } else if (horizontalAlign === 'right') {
    x = parentW - width;
  }

  if (verticalAlign === 'center') {
    y = (parentH - height) / 2;
  } else if (verticalAlign === 'bottom') {
    y = parentH - height;
  }

  const finalX = offsetX + x;
  const finalY = offsetY + y;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(finalX + radius, finalY);
  ctx.lineTo(finalX + width - radius, finalY);
  ctx.quadraticCurveTo(finalX + width, finalY, finalX + width, finalY + radius);
  ctx.lineTo(finalX + width, finalY + height - radius);
  ctx.quadraticCurveTo(finalX + width, finalY + height, finalX + width - radius, finalY + height);
  ctx.lineTo(finalX + radius, finalY + height);
  ctx.quadraticCurveTo(finalX, finalY + height, finalX, finalY + height - radius);
  ctx.lineTo(finalX, finalY + radius);
  ctx.quadraticCurveTo(finalX, finalY, finalX + radius, finalY);
  ctx.closePath();

  ctx.fillStyle = node.attributes?.color ?? '#fff';
  ctx.fill();

  const borderWidth = Number(node.attributes?.borderWidth ?? 0);
  if (borderWidth > 0) {
    ctx.strokeStyle = node.attributes?.borderColor ?? '#222';
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  }

  ctx.restore();

  node.children?.forEach((child) => render(child, { offsetX: finalX, offsetY: finalY }));
};
