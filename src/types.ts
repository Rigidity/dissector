import { State } from './state';

export interface Interval {
    start: number;
    stop: number;
}

export interface Position {
    line: number;
    column: number;
}

export interface Failure {
    index: number;
    error: string;
}

export type GroupMatch = Match[] & Interval;
export type NamedMatch = GroupMatch & { name: string };
export type Match = GroupMatch | NamedMatch | string;
export type Result = GroupMatch | Failure;
export type Matcher = (state: State) => Result;
export type Rule = Matcher | RegExp | string | null;
export type Cache = Map<number, Map<Rule, Result>>;

export function toPosition(source: string, index: number): Position {
    let line = 1;
    let column = 1;
    for (let i = 0; i < index; i++) {
        if (source[i] === '\r') continue;
        else if (source[i] === '\n') {
            line++;
            column = 1;
        } else column++;
    }
    return { line, column };
}

export function dumpPosition(position: Position): string {
    return `${position.line}:${position.column}`;
}

export function toPositonString(source: string, index: number): string {
    return dumpPosition(toPosition(source, index));
}

export function dumpFailure(source: string, failure: Failure): string {
    return `${failure.error} at ${toPositonString(source, failure.index)}`;
}

export function dumpMatch(
    source: string,
    match: Match,
    indent: string = '    ',
    depth: number = 0
): string {
    let result = indent.repeat(depth);
    if (typeof match === 'string') result += match;
    else {
        while (match.length === 1 && Array.isArray(match[0])) match = match[0];
        result += `${'name' in match ? `${match.name} ` : ''}(${toPositonString(
            source,
            match.start
        )})`;
        for (const child of match) {
            result += '\n' + dumpMatch(source, child, indent, depth + 1);
        }
    }
    return result;
}

export function dumpResult(source: string, result: Result): string {
    return 'error' in result
        ? dumpFailure(source, result)
        : dumpMatch(source, result);
}
