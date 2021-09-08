import { Rule } from './Rule';
export declare type DescriptionCache = Map<Rule, [
    index: number,
    description: string,
    referenced: boolean
]>;
