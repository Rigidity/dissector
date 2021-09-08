import { Rule } from './Rule';

export type DescriptionCache = Map<
    Rule,
    [index: number, description: string, referenced: boolean]
>;
