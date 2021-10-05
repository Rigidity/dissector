import { State } from './state';

export interface Interval {
    start: number;
    stop: number;
}

export interface Position {
    line: number;
    column: number;
}

export type GroupMatch = Match[] & Interval;
export type NamedMatch = GroupMatch & { name: string };
export type Match = GroupMatch | NamedMatch | string;
export type Failure = Interval & { error: string };
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
