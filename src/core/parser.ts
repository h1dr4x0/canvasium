export type Node = {
  type: string;
  attributes?: Record<string, string>;
  children?: Node[];
  value?: string;
};

import { tokenize, Token } from './tokenizer';

export function parse(input: string): Node[] {
  const tokens = tokenize(input);
  const root: Node[] = [];
  const stack: Node[] = [];

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.type === 'tagOpen') {
      const node: Node = { type: token.value, attributes: {}, children: [] };
      while (tokens[i + 1] && tokens[i + 1].type === 'attribute') {
        i++;
        const attrToken = tokens[i] as { type: 'attribute'; name: string; value: string };
        node.attributes![attrToken.name] = attrToken.value;
      }
      if (node.type === 'text' && tokens[i + 1] && tokens[i + 1].type === 'text') {
        i++;
        node.value = tokens[i].value;
      }
      if (stack.length > 0) {
        stack[stack.length - 1].children!.push(node);
      } else {
        root.push(node);
      }
      stack.push(node);
    } else if (token.type === 'tagClose') {
      stack.pop();
    }
    i++;
  }
  return root;
}
