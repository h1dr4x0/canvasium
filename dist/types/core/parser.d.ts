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
export declare function parse(input: string): Node[];
