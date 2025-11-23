const Card = async ({ ctx, node, render, offsetX = 0, offsetY = 0, parent, }) => {
    const width = Number(node.attributes?.width ?? 300);
    const height = Number(node.attributes?.height ?? 200);
    const radius = Number(node.attributes?.radius ?? 0);
    const radiusTL = Number(node.attributes?.radiusTopLeft ?? radius);
    const radiusTR = Number(node.attributes?.radiusTopRight ?? radius);
    const radiusBR = Number(node.attributes?.radiusBottomRight ?? radius);
    const radiusBL = Number(node.attributes?.radiusBottomLeft ?? radius);
    const horizontalAlign = node.attributes?.horizontalAlign;
    const verticalAlign = node.attributes?.verticalAlign;
    const parentW = Number(parent?.attributes?.width ?? 0);
    const parentH = Number(parent?.attributes?.height ?? 0);
    let x = Number(node.attributes?.x ?? 0);
    let y = Number(node.attributes?.y ?? 0);
    if (horizontalAlign === 'center')
        x = (parentW - width) / 2;
    else if (horizontalAlign === 'right')
        x = parentW - width;
    if (verticalAlign === 'center')
        y = (parentH - height) / 2;
    else if (verticalAlign === 'bottom')
        y = parentH - height;
    const finalX = offsetX + x;
    const finalY = offsetY + y;
    ctx.save();
    ctx.beginPath();
    drawRoundedRectPerCorner(ctx, finalX, finalY, width, height, {
        tl: radiusTL,
        tr: radiusTR,
        br: radiusBR,
        bl: radiusBL,
    });
    ctx.fillStyle = node.attributes?.color ?? '#fff';
    ctx.fill();
    const borderWidth = Number(node.attributes?.borderWidth ?? 0);
    if (borderWidth > 0) {
        ctx.strokeStyle = node.attributes?.borderColor ?? '#222';
        ctx.lineWidth = borderWidth;
        ctx.stroke();
    }
    ctx.restore();
    if (node.children && node.children.length) {
        const orderedChildren = sortByZIndex(node.children);
        for (const child of orderedChildren) {
            await render(child, { offsetX: finalX, offsetY: finalY });
        }
    }
};
function drawRoundedRectPerCorner(ctx, x, y, width, height, radii) {
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
function getZIndex(node) {
    const raw = node.attributes?.zIndex ?? node.attributes?.['z-index'];
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
}
function sortByZIndex(children) {
    return children
        .map((child, index) => ({ child, index }))
        .sort((a, b) => {
        const zA = getZIndex(a.child);
        const zB = getZIndex(b.child);
        if (zA === zB)
            return b.index - a.index;
        return zA - zB;
    })
        .map(({ child }) => child);
}

export { Card };
