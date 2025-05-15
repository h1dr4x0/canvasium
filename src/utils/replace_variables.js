"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceVars = replaceVars;
function replaceVars(str, data) {
    if (data === void 0) { data = {}; }
    return str.replace(/\{(\w+)\}/g, function (_, key) { var _a; return (_a = data[key]) !== null && _a !== void 0 ? _a : "{".concat(key, "}"); });
}
