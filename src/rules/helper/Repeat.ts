import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Between } from '../core/Between';

export class Repeat extends Between {
    constructor(times: number, ...items: Rule[]) {
        super(times, times, ...items);
    }
    public describe(cache: DescriptionCache): string {
        return `${this.from} of ${this.content.describe(cache)}`;
    }
}
