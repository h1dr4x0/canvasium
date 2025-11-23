import { render } from './index.js';
import fs from 'fs';
const markup = `
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
</body>
`;
const ctx = await render(markup);
ctx.canvas.createPNGStream().pipe(fs.createWriteStream('asymmetric.png'));
