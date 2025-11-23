import { Node } from './parser';
import type { CanvasRenderingContext2D } from 'canvas';
export declare function renderNode(node: Node, ctx: CanvasRenderingContext2D, data?: Record<string, any>, offsetX?: number, offsetY?: number, parent?: Node): Promise<void>;
