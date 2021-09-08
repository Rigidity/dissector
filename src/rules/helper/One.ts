import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';

export class One extends Between {
    constructor(...items: Rule[]) {
        super(1, Infinity, ...items);
    }
    public describe(cache: DescriptionCache): string {
        return `one or more of ${this.content.describe(cache)}`;
    }
}
