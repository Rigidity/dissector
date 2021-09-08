import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Literal extends Rule {
    public text: string;
    constructor(text: string) {
        super();
        this.text = text;
    }
    public describe(_cache: DescriptionCache): string {
        return `${JSON.stringify(this.text)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        if (state.context.source.startsWith(this.text, index)) {
            return Object.assign([this.text], {
                start: index,
                stop: index + this.text.length,
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
