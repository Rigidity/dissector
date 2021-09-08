import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';

export class Atleast extends Between {
    constructor(amount: number, ...items: Rule[]) {
        super(amount, Infinity, ...items);
    }
    public describe(cache: DescriptionCache): string {
        return `at least ${this.from} of ${this.content.describe(cache)}`;
    }
}
