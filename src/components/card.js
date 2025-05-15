'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Card = void 0;
var Card = function (_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
  var ctx = _a.ctx,
    node = _a.node,
    render = _a.render,
    _0 = _a.offsetX,
    offsetX = _0 === void 0 ? 0 : _0,
    _1 = _a.offsetY,
    offsetY = _1 === void 0 ? 0 : _1,
    parent = _a.parent;
  var width = Number(
    (_c = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.width) !== null &&
      _c !== void 0
      ? _c
      : 300,
  );
  var height = Number(
    (_e = (_d = node.attributes) === null || _d === void 0 ? void 0 : _d.height) !== null &&
      _e !== void 0
      ? _e
      : 200,
  );
  var radius = Number(
    (_g = (_f = node.attributes) === null || _f === void 0 ? void 0 : _f.radius) !== null &&
      _g !== void 0
      ? _g
      : 16,
  );
  var horizontalAlign =
    (_h = node.attributes) === null || _h === void 0 ? void 0 : _h.horizontalAlign;
  var verticalAlign = (_j = node.attributes) === null || _j === void 0 ? void 0 : _j.verticalAlign;
  var parentW = Number(
    (_l =
      (_k = parent === null || parent === void 0 ? void 0 : parent.attributes) === null ||
      _k === void 0
        ? void 0
        : _k.width) !== null && _l !== void 0
      ? _l
      : 0,
  );
  var parentH = Number(
    (_o =
      (_m = parent === null || parent === void 0 ? void 0 : parent.attributes) === null ||
      _m === void 0
        ? void 0
        : _m.height) !== null && _o !== void 0
      ? _o
      : 0,
  );
  var x = Number(
    (_q = (_p = node.attributes) === null || _p === void 0 ? void 0 : _p.x) !== null &&
      _q !== void 0
      ? _q
      : 0,
  );
  var y = Number(
    (_s = (_r = node.attributes) === null || _r === void 0 ? void 0 : _r.y) !== null &&
      _s !== void 0
      ? _s
      : 0,
  );
  if (horizontalAlign === 'center') {
    x = (parentW - width) / 2;
  } else if (horizontalAlign === 'right') {
    x = parentW - width;
  }
  if (verticalAlign === 'center') {
    y = (parentH - height) / 2;
  } else if (verticalAlign === 'bottom') {
    y = parentH - height;
  }
  var finalX = offsetX + x;
  var finalY = offsetY + y;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(finalX + radius, finalY);
  ctx.lineTo(finalX + width - radius, finalY);
  ctx.quadraticCurveTo(finalX + width, finalY, finalX + width, finalY + radius);
  ctx.lineTo(finalX + width, finalY + height - radius);
  ctx.quadraticCurveTo(finalX + width, finalY + height, finalX + width - radius, finalY + height);
  ctx.lineTo(finalX + radius, finalY + height);
  ctx.quadraticCurveTo(finalX, finalY + height, finalX, finalY + height - radius);
  ctx.lineTo(finalX, finalY + radius);
  ctx.quadraticCurveTo(finalX, finalY, finalX + radius, finalY);
  ctx.closePath();
  ctx.fillStyle =
    (_u = (_t = node.attributes) === null || _t === void 0 ? void 0 : _t.color) !== null &&
    _u !== void 0
      ? _u
      : '#fff';
  ctx.fill();
  var borderWidth = Number(
    (_w = (_v = node.attributes) === null || _v === void 0 ? void 0 : _v.borderWidth) !== null &&
      _w !== void 0
      ? _w
      : 0,
  );
  if (borderWidth > 0) {
    ctx.strokeStyle =
      (_y = (_x = node.attributes) === null || _x === void 0 ? void 0 : _x.borderColor) !== null &&
      _y !== void 0
        ? _y
        : '#222';
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  }
  ctx.restore();
  (_z = node.children) === null || _z === void 0
    ? void 0
    : _z.forEach(function (child) {
        return render(child, { offsetX: finalX, offsetY: finalY });
      });
};
exports.Card = Card;
