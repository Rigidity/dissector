import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';

export class Zero extends Between {
    constructor(...items: Rule[]) {
        super(0, Infinity, ...items);
    }
    public describe(cache: DescriptionCache): string {
        return `zero or more of ${this.content.describe(cache)}`;
    }
}
