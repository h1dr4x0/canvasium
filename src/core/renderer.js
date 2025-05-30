"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
exports.renderFile = renderFile;
var canvas_1 = require("canvas");
var parser_1 = require("./parser");
var node_render_1 = require("./node_render");
var interpolate_ast_1 = require("../utils/interpolate_ast");
var promises_1 = require("fs/promises");
function render(markup, data) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, body, width, height, canvas, ctx, _i, _a, child;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    ast = (0, parser_1.parse)(markup);
                    if (data) {
                        ast.forEach(function (node) { return (0, interpolate_ast_1.interpolateAST)(node, data); });
                    }
                    body = ast.find(function (node) { return node.type === 'body'; });
                    if (!body)
                        throw new Error('Canvasium: <body> tag not found!');
                    width = Number((_b = body.attributes) === null || _b === void 0 ? void 0 : _b.width);
                    height = Number((_c = body.attributes) === null || _c === void 0 ? void 0 : _c.height);
                    canvas = (0, canvas_1.createCanvas)(width, height);
                    ctx = canvas.getContext('2d');
                    ctx.fillStyle = ((_d = body.attributes) === null || _d === void 0 ? void 0 : _d.background) || '#fff';
                    ctx.fillRect(0, 0, width, height);
                    _i = 0, _a = (_e = body.children) !== null && _e !== void 0 ? _e : [];
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    child = _a[_i];
                    return [4 /*yield*/, (0, node_render_1.renderNode)(child, ctx, data, 0, 0, body)];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, ctx];
            }
        });
    });
}
function renderFile(path, data) {
    return __awaiter(this, void 0, void 0, function () {
        var raw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.default.readFile(path, 'utf-8')];
                case 1:
                    raw = _a.sent();
                    return [2 /*return*/, render(raw, data)];
            }
        });
    });
}
