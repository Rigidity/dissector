import { toPosition } from '..';
import { Interval } from './Interval';

export interface MatchInfo {
    name: string;
    info?: any;
}

export type Matches = Interval & Match[];
export type NamedMatch = MatchInfo & Interval & Match[];
export type Match = NamedMatch | Matches | string;

export function dumpMatch(
    source: string,
    match: Match,
    indent: number = 0
): string {
    let result: string;
    if (typeof match === 'string') {
        result = JSON.stringify(match);
    } else if ('name' in match) {
        const start = toPosition(source, match.start);
        const stop = toPosition(source, match.stop);
        result = `${match.name} (${start.line}:${start.column} to ${
            stop.line
        }:${stop.column})${match.length > 0 ? ':' : ''}\n${match
            .map((item) => dumpMatch(source, item, indent + 1))
            .join('\n')}`;
    } else {
        const start = toPosition(source, match.start);
        const stop = toPosition(source, match.stop);
        result = `(${start.line}:${start.column} to ${stop.line}:${
            stop.column
        })${match.length > 0 ? ':' : ''}\n${match
            .map((item) => dumpMatch(source, item, indent + 1))
            .join('\n')}`;
    }
    return '  '.repeat(indent) + result;
}
