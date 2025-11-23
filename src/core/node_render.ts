import { components } from '../components';
import { Node } from './parser';
import type { CanvasRenderingContext2D } from 'canvas';

export async function renderNode(
  node: Node,
  ctx: CanvasRenderingContext2D,
  data?: Record<string, any>,
  offsetX = 0,
  offsetY = 0,
  parent?: Node,
) {
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
      render: (child, opts) =>
        renderNode(child, ctx, data, opts?.offsetX ?? offsetX, opts?.offsetY ?? offsetY, node),
    });
  } else if (node.children) {
    const orderedChildren = sortByZIndex(node.children);
    for (const child of orderedChildren) {
      await renderNode(child, ctx, data, offsetX, offsetY, node);
    }
  }
}

function getZIndex(node: Node) {
  const raw = node.attributes?.zIndex ?? (node.attributes as any)?.['z-index'];
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortByZIndex(children: Node[]) {
  return children
    .map((child, index) => ({ child, index }))
    .sort((a, b) => {
      const zA = getZIndex(a.child);
      const zB = getZIndex(b.child);
      if (zA === zB) return b.index - a.index;
      return zA - zB;
    })
    .map(({ child }) => child);
}
