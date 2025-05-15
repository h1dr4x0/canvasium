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
exports.renderNode = renderNode;
var components_1 = require("../components");
function renderNode(node_1, ctx_1, data_1) {
    return __awaiter(this, arguments, void 0, function (node, ctx, data, offsetX, offsetY, parent) {
        var comp, _i, _a, child;
        var _b, _c, _d, _e;
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!parent && node.type === 'body') {
                        parent = {
                            type: 'virtual-root',
                            attributes: {
                                width: (_c = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : '0',
                                height: (_e = (_d = node.attributes) === null || _d === void 0 ? void 0 : _d.height) !== null && _e !== void 0 ? _e : '0',
                            },
                            children: [],
                            value: '',
                        };
                    }
                    comp = components_1.components[node.type];
                    if (!comp) return [3 /*break*/, 2];
                    return [4 /*yield*/, comp({
                            ctx: ctx,
                            node: node,
                            data: data,
                            offsetX: offsetX,
                            offsetY: offsetY,
                            parent: parent,
                            render: function (child, opts) { var _a, _b; return renderNode(child, ctx, data, (_a = opts === null || opts === void 0 ? void 0 : opts.offsetX) !== null && _a !== void 0 ? _a : offsetX, (_b = opts === null || opts === void 0 ? void 0 : opts.offsetY) !== null && _b !== void 0 ? _b : offsetY, node); },
                        })];
                case 1:
                    _f.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!node.children) return [3 /*break*/, 6];
                    _i = 0, _a = node.children;
                    _f.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    child = _a[_i];
                    return [4 /*yield*/, renderNode(child, ctx, data, offsetX, offsetY, node)];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
