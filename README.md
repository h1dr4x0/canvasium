<div align="center">
  <h1>Canvasium</h1>
  <p><b>Markup-based canvas rendering engine for Node.js</b></p>
  <img src="https://img.shields.io/npm/v/canvasium?color=blue" />
  <img src="https://img.shields.io/npm/dt/canvasium" />
</div>

---

## ✨ What is Canvasium?

Canvasium turns **HTML-like markup** into **Node.js canvas** drawings. Write declarative markup; get a rendered PNG/stream with cards, text, images, and bars—all without hand-writing canvas code.

```xml
<body width="360" height="200" background="#0f172a" radius="16">
  <card x="16" y="16" width="328" height="168" color="#111827" radius="12">
    <image src="https://i.pravatar.cc/100?img=12" x="18" y="18" width="64" height="64" rounded="true" />
    <text x="96" y="26" font="20px 'Poppins', sans-serif" color="#e5e7eb">Alex Morgan</text>
    <text x="96" y="54" font="14px 'Poppins', sans-serif" color="#9ca3af">Product Designer</text>
    <bar x="18" y="104" width="292" height="12" value="62" max="100" color="#22c55e" background="#1f2937" outerRadius="6" innerRadius="6" />
    <text x="18" y="124" font="14px 'Poppins', sans-serif" color="#9ca3af">Portfolio completeness</text>
    <text x="275" y="124" font="14px 'Poppins', sans-serif" color="#e5e7eb">62%</text>
  </card>
</body>
```

---

## 📦 Installation

```bash
npm install canvasium
```

Requires Node.js 16+ and the `canvas` native dependency (installed automatically via npm).

---

## 🚀 Quick Start

```ts
import { render } from 'canvasium';
import fs from 'fs';

const markup = `
<body width="320" height="140" background="#0b1221" radius="12">
  <card x="12" y="12" width="296" height="116" color="#111827" radius="10">
    <text x="16" y="18" font="18px 'Poppins', sans-serif" color="#e5e7eb">Hello, Canvasium!</text>
    <text x="16" y="46" font="14px 'Poppins', sans-serif" color="#94a3b8">Render canvas from markup.</text>
  </card>
</body>
`;

const ctx = await render(markup);
ctx.canvas.createPNGStream().pipe(fs.createWriteStream('output.png'));
```

---

## 🧩 Components

- `<body>`: required root element. Supports `width`, `height`, `background`, `radius` (or per-corner radius props).
- `<card>`: rectangle with fill and optional border/radius. Supports positioning (`x`, `y`, alignment), `width`, `height`, `color`, `borderWidth`, `borderColor`, radius props (uniform `radius` or per-corner: `radiusTopLeft`, `radiusTopRight`, `radiusBottomRight`, `radiusBottomLeft`), and `zIndex`.
- `<text>`: draws text. Props: `x`, `y`, `font`, `color`, `opacity`, `shadowColor`, `shadowBlur`, `horizontalAlign`, `verticalAlign`, `maxWidth`, `zIndex`.
- `<image>`: draws an image (URL or local). Props: `src`, `x`, `y`, `width`, `height`, `rounded` (circle), per-corner radius (`radius`, `radiusTopLeft`, `radiusTopRight`, `radiusBottomRight`, `radiusBottomLeft`), alignment props, `zIndex`.
- `<bar>`: progress bar. Props: `x`, `y`, `width`, `height`, `value`, `max`, `color`, `background`, `outerRadius`, `innerRadius`, per-corner radii (`outerRadiusTopLeft`, `outerRadiusTopRight`, `outerRadiusBottomRight`, `outerRadiusBottomLeft`, `innerRadiusTopLeft`, `innerRadiusTopRight`, `innerRadiusBottomRight`, `innerRadiusBottomLeft`), `safeWidth`, `minDrawWidth`, `zIndex`.

### 📐 Z-index & render order

- Lower `zIndex` draws first; higher draws last (on top).
- If `zIndex` is equal or absent, **earlier markup wins and renders on top** (top-to-bottom priority).

---

## 🎨 Advanced Examples

### 1) Profile hero with layered avatar and badge

```xml
<body width="420" height="220" background="#0b1221" radius="18">
  <card x="16" y="16" width="388" height="188" color="#111827" radius="14">
    <image src="https://i.pravatar.cc/120?img=47" x="22" y="24" width="88" height="88" rounded="true" zIndex="2" />
    <card x="16" y="20" width="356" height="100" color="#0f172a" radius="12" zIndex="0">
      <text x="110" y="14" font="20px 'Poppins', sans-serif" color="#e5e7eb">Alice Lee</text>
      <text x="110" y="42" font="14px 'Poppins', sans-serif" color="#9ca3af">Lead Frontend Engineer</text>
      <bar x="110" y="64" width="220" height="10" value="78" max="100" color="#22c55e" background="#1f2937" outerRadius="6" innerRadius="6" />
    </card>
    <card x="12" y="12" width="72" height="28" color="#22c55e" radius="8" zIndex="3">
      <text x="12" y="6" font="14px 'Poppins', sans-serif" color="#0b1221">Online</text>
    </card>
  </card>
</body>
```

Preview:  
<img src="./outputs/profile_hero.png" width="420" alt="Profile hero preview"/>

### 2) Metric tiles with alignment and safe-width bar

```xml
<body width="520" height="200" background="#0f172a" radius="16">
  <card x="16" y="16" width="240" height="168" color="#151e30ff" radius="12">
    <text x="16" y="16" font="16px 'Poppins', sans-serif" color="#cbd5e1">Downloads</text>
    <text x="16" y="44" font="28px 'Poppins', sans-serif" color="#e5e7eb">18,240</text>
    <bar x="16" y="88" width="208" height="12" value="84" max="100" color="#3b82f6" background="#1f2937" outerRadius="6" innerRadius="6" safeWidth="true" minDrawWidth="6" />
    <text x="16" y="108" font="13px 'Poppins', sans-serif" color="#94a3b8">Goal 22,000</text>
  </card>
  <card x="264" y="16" width="240" height="168" color="#151e30ff" radius="12">
    <image src="https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=400" width="240" height="120" radiusTopLeft="12" radiusTopRight="12" />
    <text x="16" y="136" font="16px 'Poppins', sans-serif" color="#e5e7eb">New collection</text>
  </card>
</body>
```

Preview:  
<img src="./outputs/metric_tiles.png" width="520" alt="Metric tiles preview"/>

### 3) Asymmetric corners on bars and cards

```xml
<body width="380" height="220" background="#0b1221" radiusTopLeft="16" radiusBottomRight="16">
  <card x="16" y="16" width="348" height="188" color="#111827" radiusTopLeft="14" radiusBottomRight="14">
    <image
      src="https://i.pravatar.cc/140?img=32"
      x="18"
      y="18"
      width="120"
      height="120"
      radiusTopLeft="18"
      radiusBottomRight="18"
    />
    <bar
      x="154"
      y="28"
      width="180"
      height="14"
      value="45"
      max="100"
      color="#22c55e"
      background="#1f2937"
      outerRadiusTopLeft="10"
      outerRadiusBottomRight="10"
      innerRadiusTopLeft="10"
      innerRadiusBottomRight="10"
    />
  </card>
</body>
```

Preview:  
<img src="./outputs/asymmetric.png" width="380" alt="Asymmetric corners preview"/>

---

## 🌀 Dynamic Data

Canvasium supports `{}` interpolation:

```xml
<text x="20" y="20" color="#fff">Welcome, {username}!</text>
```

```ts
await render(markup, { username: 'Alex' });
```

---

## 🛠 API

- `render(markup: string, data?)`: parse and render markup. Returns a 2D context whose `canvas` can stream/write.
- `renderFile(path: string, data?)`: load `.canvasium` file and render.
- `parse(markup: string)`: returns the AST.
- `interpolateAST(node, data)`: perform variable replacement on a parsed AST.
- Parser errors include line/column details for missing or mismatched tags.

---

## 📝 Changelog

### 1.2.0

- Fixed self-closing parsing so siblings render correctly.
- Ensured async child rendering inside `<card>` waits for images.
- Added `zIndex` support to all elements; default tie-break favors earlier markup on top.
- Adjusted default stacking to respect document order (top-to-bottom priority).
- Added per-corner radius for bars (outer/inner) and documented corner-specific radius on body/cards/images.
- Parser now reports detailed line/column info for missing or mismatched tags.

### 1.1.x

- Initial stable renderer with `<body>`, `<card>`, `<text>`, `<image>`, `<bar>` and AST utilities.

---

## 📄 License

MIT
