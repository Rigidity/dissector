export interface Position {
    line: number;
    column: number;
}
export declare function toPosition(source: string, index: number): Position;
