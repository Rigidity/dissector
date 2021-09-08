import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';

export class Optional extends Between {
    constructor(...items: Rule[]) {
        super(0, 1, ...items);
    }
    public describe(cache: DescriptionCache): string {
        return `optional ${this.content.describe(cache)}`;
    }
}
