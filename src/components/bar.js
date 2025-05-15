"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
var Bar = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    var ctx = _a.ctx, node = _a.node, _0 = _a.offsetX, offsetX = _0 === void 0 ? 0 : _0, _1 = _a.offsetY, offsetY = _1 === void 0 ? 0 : _1;
    var x = Number((_c = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.x) !== null && _c !== void 0 ? _c : 0) + offsetX;
    var y = Number((_e = (_d = node.attributes) === null || _d === void 0 ? void 0 : _d.y) !== null && _e !== void 0 ? _e : 0) + offsetY;
    var width = Number((_g = (_f = node.attributes) === null || _f === void 0 ? void 0 : _f.width) !== null && _g !== void 0 ? _g : 100);
    var height = Number((_j = (_h = node.attributes) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 10);
    var value = Number((_l = (_k = node.attributes) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : 0);
    var max = Number((_o = (_m = node.attributes) === null || _m === void 0 ? void 0 : _m.max) !== null && _o !== void 0 ? _o : 100);
    var outerRadius = Number((_q = (_p = node.attributes) === null || _p === void 0 ? void 0 : _p.outerRadius) !== null && _q !== void 0 ? _q : 0);
    var innerRadius = Number((_s = (_r = node.attributes) === null || _r === void 0 ? void 0 : _r.innerRadius) !== null && _s !== void 0 ? _s : 0);
    var progressColor = (_u = (_t = node.attributes) === null || _t === void 0 ? void 0 : _t.color) !== null && _u !== void 0 ? _u : '#00baff';
    var backgroundColor = (_w = (_v = node.attributes) === null || _v === void 0 ? void 0 : _v.background) !== null && _w !== void 0 ? _w : '#333';
    var safeWidthEnabled = ((_x = node.attributes) === null || _x === void 0 ? void 0 : _x.safeWidth) === 'true';
    var minDrawWidth = Number((_z = (_y = node.attributes) === null || _y === void 0 ? void 0 : _y.minDrawWidth) !== null && _z !== void 0 ? _z : 4);
    var percent = Math.max(0, Math.min(value / max, 1)); // Clamp 0–1
    var filledWidthRaw = percent * width;
    var filledWidth = safeWidthEnabled ? Math.max(filledWidthRaw, minDrawWidth) : filledWidthRaw;
    ctx.save();
    ctx.beginPath();
    roundedRect(ctx, x, y, width, height, outerRadius);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.closePath();
    if (filledWidthRaw > 0) {
        ctx.beginPath();
        var effectiveRadius = Math.min(innerRadius, filledWidth / 2, height / 2);
        roundedRect(ctx, x, y, filledWidth, height, effectiveRadius);
        ctx.fillStyle = progressColor;
        ctx.fill();
        ctx.closePath();
    }
    ctx.restore();
};
exports.Bar = Bar;
function roundedRect(ctx, x, y, width, height, radius) {
    var r = Math.min(radius, width / 2, height / 2);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
}
