import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from '../core/And';

export class Combine extends Rule {
    public content: Rule;
    constructor(...items: Rule[]) {
        super();
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return `combined ${this.content.describe(cache)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        const output = this.content.parse({ ...state, skip: [] }, index);
        if ('message' in output) return output;
        return Object.assign([combine(output)], {
            start: output.start,
            stop: output.stop,
        });
    }
}

function combine(matches: Matches): string {
    return matches
        .map((item) => (typeof item === 'string' ? item : combine(item)))
        .join('');
}
