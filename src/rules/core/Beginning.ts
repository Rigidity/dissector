import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Beginning extends Rule {
    public describe(_cache: DescriptionCache): string {
        return 'beginning of source';
    }
    public run(state: State, index: number): Matches | Failure {
        if (index === 0) {
            return Object.assign([], {
                start: index,
                stop: index,
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
