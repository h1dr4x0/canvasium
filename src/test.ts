import { render } from './index';
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
