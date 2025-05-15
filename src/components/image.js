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
exports.Image = void 0;
var canvas_1 = require("canvas");
var Image = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var src, img, parentW, parentH, width, height, horizontalAlign, verticalAlign, rounded, x, y, finalX, finalY, radius, cx, cy;
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var ctx = _b.ctx, node = _b.node, _u = _b.offsetX, offsetX = _u === void 0 ? 0 : _u, _v = _b.offsetY, offsetY = _v === void 0 ? 0 : _v, parent = _b.parent;
    return __generator(this, function (_w) {
        switch (_w.label) {
            case 0:
                src = (_c = node.attributes) === null || _c === void 0 ? void 0 : _c.src;
                if (!src)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, canvas_1.loadImage)(src)];
            case 1:
                img = _w.sent();
                parentW = Number((_e = (_d = parent === null || parent === void 0 ? void 0 : parent.attributes) === null || _d === void 0 ? void 0 : _d.width) !== null && _e !== void 0 ? _e : 0);
                parentH = Number((_g = (_f = parent === null || parent === void 0 ? void 0 : parent.attributes) === null || _f === void 0 ? void 0 : _f.height) !== null && _g !== void 0 ? _g : 0);
                width = Number((_j = (_h = node.attributes) === null || _h === void 0 ? void 0 : _h.width) !== null && _j !== void 0 ? _j : img.width);
                height = Number((_l = (_k = node.attributes) === null || _k === void 0 ? void 0 : _k.height) !== null && _l !== void 0 ? _l : img.height);
                horizontalAlign = (_m = node.attributes) === null || _m === void 0 ? void 0 : _m.horizontalAlign;
                verticalAlign = (_o = node.attributes) === null || _o === void 0 ? void 0 : _o.verticalAlign;
                rounded = ((_p = node.attributes) === null || _p === void 0 ? void 0 : _p.rounded) === 'true';
                x = Number((_r = (_q = node.attributes) === null || _q === void 0 ? void 0 : _q.x) !== null && _r !== void 0 ? _r : 0);
                y = Number((_t = (_s = node.attributes) === null || _s === void 0 ? void 0 : _s.y) !== null && _t !== void 0 ? _t : 0);
                if (horizontalAlign === 'center') {
                    x = (parentW - width) / 2;
                }
                else if (horizontalAlign === 'right') {
                    x = parentW - width;
                }
                if (verticalAlign === 'center') {
                    y = (parentH - height) / 2;
                }
                else if (verticalAlign === 'bottom') {
                    y = parentH - height;
                }
                finalX = offsetX + x;
                finalY = offsetY + y;
                ctx.save();
                if (rounded) {
                    radius = Math.min(width, height) / 2;
                    cx = finalX + width / 2;
                    cy = finalY + height / 2;
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                    ctx.clip();
                }
                ctx.drawImage(img, finalX, finalY, width, height);
                ctx.restore();
                return [2 /*return*/];
        }
    });
}); };
exports.Image = Image;
