import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';
export declare class One extends Between {
    constructor(...items: Rule[]);
    describe(cache: DescriptionCache): string;
}
