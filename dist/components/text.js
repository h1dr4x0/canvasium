const Text = ({ ctx, node, parent, offsetX = 0, offsetY = 0 }) => {
    const text = node.value ?? '';
    const font = node.attributes?.font ?? '20px sans-serif';
    const color = node.attributes?.color ?? '#222';
    const opacity = node.attributes?.opacity ? Number(node.attributes.opacity) : undefined;
    const shadowColor = node.attributes?.shadowColor;
    const shadowBlur = node.attributes?.shadowBlur ? Number(node.attributes.shadowBlur) : undefined;
    const maxWidth = node.attributes?.maxWidth ? Number(node.attributes.maxWidth) : undefined;
    const horizontalAlign = node.attributes?.horizontalAlign;
    const verticalAlign = node.attributes?.verticalAlign;
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    if (opacity !== undefined)
        ctx.globalAlpha = opacity;
    if (shadowColor)
        ctx.shadowColor = shadowColor;
    if (shadowBlur)
        ctx.shadowBlur = shadowBlur;
    const parentW = Number(parent?.attributes?.width ?? 0);
    const parentH = Number(parent?.attributes?.height ?? 0);
    const textWidth = ctx.measureText(text).width;
    const fontSize = font.match(/(\d+)px/) ? parseInt(font.match(/(\d+)px/)[1]) : 16;
    let x = Number(node.attributes?.x ?? 0);
    let y = Number(node.attributes?.y ?? 0);
    if (horizontalAlign === 'center') {
        x = (parentW - textWidth) / 2;
    }
    else if (horizontalAlign === 'right') {
        x = parentW - textWidth;
    }
    if (verticalAlign === 'center') {
        y = (parentH - fontSize) / 2;
    }
    else if (verticalAlign === 'bottom') {
        y = parentH - fontSize;
    }
    const finalX = offsetX + x;
    const finalY = offsetY + y;
    ctx.fillText(text, finalX, finalY, maxWidth);
    ctx.restore();
};

export { Text };
