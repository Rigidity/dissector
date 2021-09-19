import { Interval } from './Interval';
export interface FailureInfo {
    message: string;
    info?: any;
}
export declare type Failure = FailureInfo & Interval;
export declare function dumpFailure(source: string, failure: Failure): string;
