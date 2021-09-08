import { And } from '../..';
import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Consume } from '../core/Consume';
import { Lookahead } from '../core/Lookahead';

export class Not extends And {
    public item: Rule;
    constructor(item: Rule) {
        super(new Lookahead(false, item), new Consume());
        this.item = item;
    }
    public describe(cache: DescriptionCache): string {
        return `character except ${this.item.describe(cache)}`;
    }
}
