import type { CanvasRenderingContext2D } from 'canvas';

export type Node = {
  type: string;
  attributes?: Record<string, string>;
  children?: Node[];
  value?: string;
  position?: {
    line: number;
    column: number;
  };
};

export type RenderContext = {
  ctx: CanvasRenderingContext2D;
  node: Node;
  data?: Record<string, any>;
  offsetX?: number;
  offsetY?: number;
  parent?: Node;
  render: (node: Node, opts?: { offsetX?: number; offsetY?: number }) => Promise<void>;
};

export type CanvasComponent = (context: RenderContext) => void | Promise<void>;
