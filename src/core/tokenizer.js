"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
function tokenize(input) {
    var tokens = [];
    var i = 0;
    while (i < input.length) {
        if (input[i] === '<') {
            if (input[i + 1] === '/') {
                var end = input.indexOf('>', i);
                var tag = input.slice(i + 2, end).trim();
                tokens.push({ type: 'tagClose', value: tag });
                i = end + 1;
            }
            else {
                var end = input.indexOf('>', i);
                var tagContent = input.slice(i + 1, end);
                var _a = tagContent.trim().split(' '), tag = _a[0], attrParts = _a.slice(1);
                tokens.push({ type: 'tagOpen', value: tag });
                attrParts.forEach(function (part) {
                    var match = part.match(/^(\w+)="([^"]*)"$/);
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
        }
        else {
            var nextTag = input.indexOf('<', i);
            var text = input.slice(i, nextTag === -1 ? undefined : nextTag);
            if (text.trim().length > 0) {
                tokens.push({ type: 'text', value: text.trim() });
            }
            i = nextTag === -1 ? input.length : nextTag;
        }
    }
    return tokens;
}
