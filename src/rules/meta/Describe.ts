import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from '../core/And';

export class Describe extends Rule {
    public description: string;
    public content: Rule;
    constructor(description: string, ...items: Rule[]) {
        super();
        this.description = description;
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(_cache: DescriptionCache): string {
        return this.description;
    }
    public run(state: State, index: number): Matches | Failure {
        const output = this.content.parse(state, index);
        if ('message' in output) {
            return Rule.throw(state.context, {
                message: `Expected ${this.describe(new Map())}`,
                start: index,
                stop: index,
            });
        }
        return output;
    }
}
