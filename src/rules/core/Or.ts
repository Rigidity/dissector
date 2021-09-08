import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Or extends Rule {
    public items: Rule[];
    constructor(...items: Rule[]) {
        super();
        this.items = items;
    }
    public describe(cache: DescriptionCache): string {
        const text = this.items
            .map((item) => item.describe(cache))
            .join(' or ');
        return this.items.length === 1 ? text : `(${text})`;
    }
    public run(state: State, index: number): Matches | Failure {
        for (const item of this.items) {
            const output = item.parse(state, index);
            if (Array.isArray(output)) return output;
        }
        return Rule.throw(state.context, {
            message: `Expected ${this.describe(new Map())}`,
            start: index,
            stop: index,
        });
    }
}
