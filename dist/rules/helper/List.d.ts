import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { And } from '../core/And';
export declare class List extends And {
    item: Rule;
    delimiter: Rule;
    trailing: boolean;
    constructor(item: Rule, delimiter?: Rule, trailing?: boolean);
    describe(cache: DescriptionCache): string;
}
