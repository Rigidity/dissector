import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class End extends Rule {
    constructor() {
        super();
    }
    public describe(_cache: DescriptionCache): string {
        return 'end of source';
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        if (index >= state.context.source.length) {
            return Object.assign([], {
                start: index,
                stop: index,
            });
        } else {
            return Rule.throw(state.context, {
                message: `Unexpected character ${JSON.stringify(
                    state.context.source[index]
                )}`,
                start: index,
                stop: index,
            });
        }
    }
}
