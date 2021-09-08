import { Failure } from './Failure';
import { Matches } from './Match';
import { Rule } from './Rule';

export interface Context {
    source: string;
    failure?: Failure;
    cache: ResultCache;
}

export type ResultCache = Map<number, Map<Rule, Matches | Failure>>;
