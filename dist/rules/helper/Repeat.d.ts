import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';
export declare class Repeat extends Between {
    constructor(times: number, ...items: Rule[]);
    describe(cache: DescriptionCache): string;
}
