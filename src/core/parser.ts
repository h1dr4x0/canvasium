export type Node = {
  type: string;
  attributes?: Record<string, string>;
  children?: Node[];
  value?: string;
  position?: {
    line: number;
    column: number;
  };
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
      const node: Node = { type: token.value, attributes: {}, children: [], position: { line: token.line, column: token.column } };
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
      if (stack.length === 0) {
        throw new Error(`Canvasium parse error: unexpected closing tag </${token.value}> at line ${token.line}, column ${token.column}`);
      }
      const top = stack[stack.length - 1];
      if (top.type !== token.value) {
        const opened = top.position ? ` (opened at line ${top.position.line}, column ${top.position.column})` : '';
        throw new Error(
          `Canvasium parse error: mismatched closing tag </${token.value}> at line ${token.line}, column ${token.column}; expected </${top.type}>${opened}`,
        );
      }
      stack.pop();
    }
    i++;
  }

  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    const pos = unclosed.position;
    const loc = pos ? ` at line ${pos.line}, column ${pos.column}` : '';
    throw new Error(`Canvasium parse error: unclosed tag <${unclosed.type}>${loc}`);
  }

  return root;
}
