import { toPosition } from '..';
import { Interval } from './Interval';

export interface FailureInfo {
    message: string;
    info?: any;
}

export type Failure = FailureInfo & Interval;

export function dumpFailure(source: string, failure: Failure): string {
    const position = toPosition(source, failure.start);
    return `${failure.message} at ${position.line}:${position.column}`;
}
