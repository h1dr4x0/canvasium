"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
var tokenizer_1 = require("./tokenizer");
function parse(input) {
    var tokens = (0, tokenizer_1.tokenize)(input);
    var root = [];
    var stack = [];
    var i = 0;
    while (i < tokens.length) {
        var token = tokens[i];
        if (token.type === 'tagOpen') {
            var node = { type: token.value, attributes: {}, children: [] };
            while (tokens[i + 1] && tokens[i + 1].type === 'attribute') {
                i++;
                var attrToken = tokens[i];
                node.attributes[attrToken.name] = attrToken.value;
            }
            if (node.type === 'text' && tokens[i + 1] && tokens[i + 1].type === 'text') {
                i++;
                node.value = tokens[i].value;
            }
            if (stack.length > 0) {
                stack[stack.length - 1].children.push(node);
            }
            else {
                root.push(node);
            }
            stack.push(node);
        }
        else if (token.type === 'tagClose') {
            stack.pop();
        }
        i++;
    }
    return root;
}
