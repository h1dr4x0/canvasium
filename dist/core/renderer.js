import { createCanvas } from 'canvas';
import { parse } from './parser.js';
import { renderNode } from './node_render.js';
import { interpolateAST } from '../utils/interpolate_ast.js';
import fs from 'fs/promises';

async function render(markup, data) {
    const ast = parse(markup);
    if (data) {
        ast.forEach((node) => interpolateAST(node, data));
    }
    const body = ast.find((node) => node.type === 'body');
    if (!body)
        throw new Error('Canvasium: <body> tag not found!');
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
async function renderFile(path, data) {
    const raw = await fs.readFile(path, 'utf-8');
    return render(raw, data);
}
function drawRoundedRect(ctx, x, y, width, height, radii) {
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

export { render, renderFile };
