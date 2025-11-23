function tokenize(input) {
    const tokens = [];
    let i = 0;
    let line = 1;
    let column = 1;
    const voidTags = new Set(['image']);
    const advance = (chunk) => {
        for (const ch of chunk) {
            if (ch === '\n') {
                line++;
                column = 1;
            }
            else {
                column++;
            }
        }
    };
    while (i < input.length) {
        if (input[i] === '<') {
            const startLine = line;
            const startCol = column;
            if (input[i + 1] === '/') {
                const end = input.indexOf('>', i);
                if (end === -1) {
                    throw new Error(`Canvasium tokenizer error: missing '>' for closing tag starting at line ${startLine}, column ${startCol}`);
                }
                const tag = input.slice(i + 2, end).trim();
                tokens.push({ type: 'tagClose', value: tag, line: startLine, column: startCol });
                advance(input.slice(i, end + 1));
                i = end + 1;
            }
            else {
                const end = input.indexOf('>', i);
                if (end === -1) {
                    throw new Error(`Canvasium tokenizer error: missing '>' for opening tag starting at line ${startLine}, column ${startCol}`);
                }
                const tagContent = input.slice(i + 1, end).trim();
                const tagMatch = tagContent.match(/^([^\s/>]+)/);
                const tagName = tagMatch ? tagMatch[1] : undefined;
                if (tagName) {
                    tokens.push({ type: 'tagOpen', value: tagName, line: startLine, column: startCol });
                }
                const attrRegex = /([\w:-]+)\s*=\s*"([^"]*)"/g;
                let match;
                while ((match = attrRegex.exec(tagContent))) {
                    tokens.push({
                        type: 'attribute',
                        name: match[1],
                        value: match[2],
                        line: startLine,
                        column: startCol,
                    });
                }
                const isSelfClosing = /\/\s*$/.test(tagContent) || (tagName ? voidTags.has(tagName) : false);
                if (isSelfClosing && tagName) {
                    tokens.push({ type: 'tagClose', value: tagName, line: startLine, column: startCol });
                }
                advance(input.slice(i, end + 1));
                i = end + 1;
            }
        }
        else {
            const nextTag = input.indexOf('<', i);
            const text = input.slice(i, nextTag === -1 ? undefined : nextTag);
            if (text.trim().length > 0) {
                tokens.push({ type: 'text', value: text.trim(), line, column });
            }
            advance(text);
            i = nextTag === -1 ? input.length : nextTag;
        }
    }
    return tokens;
}

export { tokenize };
