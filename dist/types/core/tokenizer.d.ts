export type Token = {
    type: 'tagOpen';
    value: string;
    line: number;
    column: number;
} | {
    type: 'tagClose';
    value: string;
    line: number;
    column: number;
} | {
    type: 'attribute';
    name: string;
    value: string;
    line: number;
    column: number;
} | {
    type: 'text';
    value: string;
    line: number;
    column: number;
};
export declare function tokenize(input: string): Token[];
