export type Token =
  | { type: 'tagOpen'; value: string }
  | { type: 'tagClose'; value: string }
  | { type: 'attribute'; name: string; value: string }
  | { type: 'text'; value: string };

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] === '<') {
      if (input[i + 1] === '/') {
        const end = input.indexOf('>', i);
        const tag = input.slice(i + 2, end).trim();
        tokens.push({ type: 'tagClose', value: tag });
        i = end + 1;
      } else {
        const end = input.indexOf('>', i);
        const tagContent = input.slice(i + 1, end);
        const [tag, ...attrParts] = tagContent.trim().split(' ');
        tokens.push({ type: 'tagOpen', value: tag });

        attrParts.forEach((part) => {
          const match = part.match(/^(\w+)="([^"]*)"$/);
          if (match) {
            tokens.push({
              type: 'attribute',
              name: match[1],
              value: match[2],
            });
          }
        });

        i = end + 1;
      }
    } else {
      const nextTag = input.indexOf('<', i);
      const text = input.slice(i, nextTag === -1 ? undefined : nextTag);
      if (text.trim().length > 0) {
        tokens.push({ type: 'text', value: text.trim() });
      }
      i = nextTag === -1 ? input.length : nextTag;
    }
  }

  return tokens;
}
