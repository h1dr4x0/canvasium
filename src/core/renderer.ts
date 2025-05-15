import { createCanvas } from 'canvas';
import { parse } from './parser';
import { renderNode } from './node_render';
import { interpolateAST } from '../utils/interpolate_ast';
import fs from 'fs/promises';

export async function render(markup: string, data?: Record<string, any>) {
  const ast = parse(markup);
  if (data) {
    ast.forEach((node) => interpolateAST(node, data));
  }

  const body = ast.find((node) => node.type === 'body');
  if (!body) throw new Error('Canvasium: <body> tag not found!');

  const width = Number(body.attributes?.width);
  const height = Number(body.attributes?.height);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = body.attributes?.background || '#fff';
  ctx.fillRect(0, 0, width, height);

  for (const child of body.children ?? []) {
    await renderNode(child, ctx, data, 0, 0, body);
  }

  return ctx;
}

export async function renderFile(path: string, data?: Record<string, any>) {
  const raw = await fs.readFile(path, 'utf-8');
  return render(raw, data);
}
