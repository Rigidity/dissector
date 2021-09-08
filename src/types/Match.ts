import { Interval } from './Interval';

export interface MatchInfo {
    name: string;
    info?: any;
}

export type Matches = Interval & Match[];
export type NamedMatch = MatchInfo & Interval & Match[];
export type Match = NamedMatch | Matches | string;
