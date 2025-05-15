import { replaceVars } from './replace_variables';

export function interpolateAST(node: any, data: Record<string, any>) {
  if (node.value && typeof node.value === 'string') {
    node.value = replaceVars(node.value, data);
  }
  if (node.attributes) {
    for (const key of Object.keys(node.attributes)) {
      if (typeof node.attributes[key] === 'string') {
        node.attributes[key] = replaceVars(node.attributes[key], data);
      }
    }
  }
  if (node.children && node.children.length) {
    node.children.forEach((child: any) => interpolateAST(child, data));
  }
  return node;
}
