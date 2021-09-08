import { Interval } from './Interval';

export interface FailureInfo {
    message: string;
    info?: any;
}

export type Failure = FailureInfo & Interval;
