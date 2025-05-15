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
    for (const child of node.children) {
      await renderNode(child, ctx, data, offsetX, offsetY, node);
    }
  }
}
