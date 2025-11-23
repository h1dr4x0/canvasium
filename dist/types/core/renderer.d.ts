import type { CanvasRenderingContext2D } from 'canvas';
export declare function render(markup: string, data?: Record<string, any>): Promise<CanvasRenderingContext2D>;
export declare function renderFile(path: string, data?: Record<string, any>): Promise<CanvasRenderingContext2D>;
