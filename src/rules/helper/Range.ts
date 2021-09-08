import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Range extends Rule {
    public from: string;
    public to: string;
    constructor(from: string, to: string) {
        super();
        this.from = from;
        this.to = to;
    }
    public describe(_cache: DescriptionCache): string {
        return `${JSON.stringify(this.from)} to ${JSON.stringify(this.to)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        const char = state.context.source[index];
        if (char && char >= this.from && char <= this.to) {
            return Object.assign([char], {
                start: index,
                stop: index + 1,
            });
        } else {
            return Rule.throw(state.context, {
                message: `Expected ${this.describe(new Map())}`,
                start: index,
                stop: index,
            });
        }
    }
}
