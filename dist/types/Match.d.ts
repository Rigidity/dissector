import { Interval } from './Interval';
export interface MatchInfo {
    name: string;
    info?: any;
}
export declare type Matches = Interval & Match[];
export declare type NamedMatch = MatchInfo & Interval & Match[];
export declare type Match = NamedMatch | Matches | string;
export declare function dumpMatch(source: string, match: Match, indent?: number): string;
