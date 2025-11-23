import { components } from '../components/index.js';

async function renderNode(node, ctx, data, offsetX = 0, offsetY = 0, parent) {
    if (!parent && node.type === 'body') {
        parent = {
            type: 'virtual-root',
            attributes: {
                width: node.attributes?.width ?? '0',
                height: node.attributes?.height ?? '0',
            },
            children: [],
            value: '',
        };
    }
    const comp = components[node.type];
    if (comp) {
        await comp({
            ctx,
            node,
            data,
            offsetX,
            offsetY,
            parent,
            render: (child, opts) => renderNode(child, ctx, data, opts?.offsetX ?? offsetX, opts?.offsetY ?? offsetY, node),
        });
    }
    else if (node.children) {
        const orderedChildren = sortByZIndex(node.children);
        for (const child of orderedChildren) {
            await renderNode(child, ctx, data, offsetX, offsetY, node);
        }
    }
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

export { renderNode };
