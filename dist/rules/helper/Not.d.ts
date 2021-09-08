import { And } from '../..';
import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
export declare class Not extends And {
    item: Rule;
    constructor(item: Rule);
    describe(cache: DescriptionCache): string;
}
