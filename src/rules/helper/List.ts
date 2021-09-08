import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { And } from '../core/And';
import { Literal } from '../core/Literal';
import { Hide } from '../meta/Hide';
import { Optional } from './Optional';
import { Zero } from './Zero';

export class List extends And {
    public item: Rule;
    public delimiter: Rule;
    public trailing: boolean;
    constructor(
        item: Rule,
        delimiter: Rule = new Hide(new Literal(',')),
        trailing: boolean = false
    ) {
        super(
            item,
            new Zero(delimiter, item),
            ...(trailing ? [new Optional(delimiter)] : [])
        );
        this.item = item;
        this.delimiter = delimiter;
        this.trailing = trailing;
    }
    public describe(cache: DescriptionCache): string {
        return `${this.trailing ? 'trailing ' : ''}list of ${this.item.describe(
            cache
        )} delimited by ${this.delimiter.describe(cache)}`;
    }
}
