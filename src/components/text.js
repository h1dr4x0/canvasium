"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var Text = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    var ctx = _a.ctx, node = _a.node, parent = _a.parent, _w = _a.offsetX, offsetX = _w === void 0 ? 0 : _w, _x = _a.offsetY, offsetY = _x === void 0 ? 0 : _x;
    var text = (_b = node.value) !== null && _b !== void 0 ? _b : '';
    var font = (_d = (_c = node.attributes) === null || _c === void 0 ? void 0 : _c.font) !== null && _d !== void 0 ? _d : '20px sans-serif';
    var color = (_f = (_e = node.attributes) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : '#222';
    var opacity = ((_g = node.attributes) === null || _g === void 0 ? void 0 : _g.opacity) ? Number(node.attributes.opacity) : undefined;
    var shadowColor = (_h = node.attributes) === null || _h === void 0 ? void 0 : _h.shadowColor;
    var shadowBlur = ((_j = node.attributes) === null || _j === void 0 ? void 0 : _j.shadowBlur) ? Number(node.attributes.shadowBlur) : undefined;
    var maxWidth = ((_k = node.attributes) === null || _k === void 0 ? void 0 : _k.maxWidth) ? Number(node.attributes.maxWidth) : undefined;
    var horizontalAlign = (_l = node.attributes) === null || _l === void 0 ? void 0 : _l.horizontalAlign;
    var verticalAlign = (_m = node.attributes) === null || _m === void 0 ? void 0 : _m.verticalAlign;
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    if (opacity !== undefined)
        ctx.globalAlpha = opacity;
    if (shadowColor)
        ctx.shadowColor = shadowColor;
    if (shadowBlur)
        ctx.shadowBlur = shadowBlur;
    var parentW = Number((_p = (_o = parent === null || parent === void 0 ? void 0 : parent.attributes) === null || _o === void 0 ? void 0 : _o.width) !== null && _p !== void 0 ? _p : 0);
    var parentH = Number((_r = (_q = parent === null || parent === void 0 ? void 0 : parent.attributes) === null || _q === void 0 ? void 0 : _q.height) !== null && _r !== void 0 ? _r : 0);
    var textWidth = ctx.measureText(text).width;
    var fontSize = font.match(/(\d+)px/) ? parseInt(font.match(/(\d+)px/)[1]) : 16;
    var x = Number((_t = (_s = node.attributes) === null || _s === void 0 ? void 0 : _s.x) !== null && _t !== void 0 ? _t : 0);
    var y = Number((_v = (_u = node.attributes) === null || _u === void 0 ? void 0 : _u.y) !== null && _v !== void 0 ? _v : 0);
    if (horizontalAlign === 'center') {
        x = (parentW - textWidth) / 2;
    }
    else if (horizontalAlign === 'right') {
        x = parentW - textWidth;
    }
    if (verticalAlign === 'center') {
        y = (parentH - fontSize) / 2;
    }
    else if (verticalAlign === 'bottom') {
        y = parentH - fontSize;
    }
    var finalX = offsetX + x;
    var finalY = offsetY + y;
    ctx.fillText(text, finalX, finalY, maxWidth);
    ctx.restore();
};
exports.Text = Text;
