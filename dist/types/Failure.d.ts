import { Interval } from './Interval';
export interface FailureInfo {
    message: string;
    info?: any;
}
export declare type Failure = FailureInfo & Interval;
