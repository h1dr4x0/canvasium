<div align="center">
  <h1>Canvasium</h1>
  <p><b>Markup-based canvas rendering engine for Node.js</b></p>
  <img src="https://img.shields.io/npm/v/canvasium?color=blue" />
  <img src="https://img.shields.io/npm/dt/canvasium" />
  <br />
  <br />
</div>

---

## 🧩 What is Canvasium?

Canvasium is a lightweight renderer that turns **HTML-like markup** into **Node.js canvas images**.

```xml
<body width="300" height="100" background="#000">
  <card x="20" y="20" width="260" height="60" color="#222" radius="8">
    <text x="10" y="20" font="20px sans-serif" color="#fff">Hello, Canvasium!</text>
  </card>
</body>
```

---

## ⚙️ Installation

```bash
npm install canvasium
```

---

## 🚀 Basic Usage

```ts
import { render } from 'canvasium';
import fs from 'fs';

const markup = `
<body width="300" height="100" background="#1e1e2f">
  <card x="20" y="20" width="260" height="60" color="#333" radius="10">
    <text x="10" y="20" font="20px sans-serif" color="#fff">Hello Canvasium!</text>
  </card>
</body>
`;

const ctx = await render(markup);
ctx.canvas.createPNGStream().pipe(fs.createWriteStream('output.png'));
```

Result →  
<img src="https://raw.githubusercontent.com/h1dr4x0/canvasium/refs/heads/main/output.png" width="300"/>

---

## 🔀 Dynamic Data

Canvasium supports `{}`-style interpolation:

```xml
<text x="20" y="20" color="#fff">Welcome, {username}!</text>
```

```ts
await render(markup, { username: 'Alex' });
```

---

## 📦 Components

- `<body>`: required root element
- `<card>`: box with background, radius, border
- `<text>`: draws text with styling
- `<image>`: renders remote image, supports rounded
- `<bar>`: progress bar with radius and safe width

---

## 📂 Also Available

- `renderFile(path, data?)`: render from `.canvasium` file
- `interpolateAST(node, data)`: inject values manually
- `parse(markup)`: get the AST of your markup

---

## 📚 Documentation

Full docs: Coming soon!  
Demo templates, example cards, and integration guides included.

---

## 🛠 Requirements

- Node.js 16+
- `canvas` native dependency (installed automatically)

---

## 🧠 Author

Made with ☕ and 🎧 by [h1dr4x](https://github.com/h1dr4x)

---

## 📄 License

MIT
