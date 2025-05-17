import { createCanvas } from 'canvas';
import { parse } from './parser';
import { renderNode } from './node_render';
import { interpolateAST } from '../utils/interpolate_ast';
import fs from 'fs/promises';
import type { CanvasRenderingContext2D } from 'canvas';

export async function render(markup: string, data?: Record<string, any>) {
  const ast = parse(markup);

  if (data) {
    ast.forEach((node) => interpolateAST(node, data));
  }

  const body = ast.find((node) => node.type === 'body');
  if (!body) throw new Error('Canvasium: <body> tag not found!');

  const width = Number(body.attributes?.width);
  const height = Number(body.attributes?.height);
  const bg = body.attributes?.background || '#fff';

  const radius = Number(body.attributes?.radius ?? 0);
  const radiusTL = Number(body.attributes?.radiusTopLeft ?? radius);
  const radiusTR = Number(body.attributes?.radiusTopRight ?? radius);
  const radiusBR = Number(body.attributes?.radiusBottomRight ?? radius);
  const radiusBL = Number(body.attributes?.radiusBottomLeft ?? radius);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.save();

  if (radiusTL || radiusTR || radiusBR || radiusBL) {
    drawRoundedRect(ctx, 0, 0, width, height, {
      tl: radiusTL,
      tr: radiusTR,
      br: radiusBR,
      bl: radiusBL,
    });
    ctx.clip();
  }

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();

  for (const child of body.children ?? []) {
    await renderNode(child, ctx, data, 0, 0, body);
  }

  return ctx;
}

export async function renderFile(path: string, data?: Record<string, any>) {
  const raw = await fs.readFile(path, 'utf-8');
  return render(raw, data);
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radii: {
    tl: number;
    tr: number;
    br: number;
    bl: number;
  },
) {
  const { tl, tr, br, bl } = radii;
  ctx.beginPath();
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
