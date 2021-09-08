import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Consume extends Rule {
    constructor() {
        super();
    }
    public describe(_cache: DescriptionCache): string {
        return 'character';
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        if (index < state.context.source.length) {
            return Object.assign([state.context.source[index]], {
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
