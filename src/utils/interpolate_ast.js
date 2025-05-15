"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolateAST = interpolateAST;
var replace_variables_1 = require("./replace_variables");
function interpolateAST(node, data) {
    if (node.value && typeof node.value === 'string') {
        node.value = (0, replace_variables_1.replaceVars)(node.value, data);
    }
    if (node.attributes) {
        for (var _i = 0, _a = Object.keys(node.attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (typeof node.attributes[key] === 'string') {
                node.attributes[key] = (0, replace_variables_1.replaceVars)(node.attributes[key], data);
            }
        }
    }
    if (node.children && node.children.length) {
        node.children.forEach(function (child) { return interpolateAST(child, data); });
    }
    return node;
}
