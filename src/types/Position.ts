export interface Position {
    line: number;
    column: number;
}

export function toPosition(source: string, index: number): Position {
    let line = 1;
    let column = 1;
    for (let i = 0; i < index; i++) {
        if (source[i] === '\r') {
            continue;
        } else if (source[i] === '\n') {
            line++;
            column = 1;
        } else {
            column++;
        }
    }
    return { line, column };
}
