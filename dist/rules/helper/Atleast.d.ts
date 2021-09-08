import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';
export declare class Atleast extends Between {
    constructor(amount: number, ...items: Rule[]);
    describe(cache: DescriptionCache): string;
}
