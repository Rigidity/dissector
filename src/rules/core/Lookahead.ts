import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from './And';

export class Lookahead extends Rule {
    public positive: boolean;
    public content: Rule;
    constructor(positive: boolean, ...items: Rule[]) {
        super();
        this.positive = positive;
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return `${
            this.positive ? 'positive' : 'negative'
        } lookahead ${this.content.describe(cache)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        const output = this.content.parse(state, index);
        if ('message' in output === this.positive) {
            return {
                message: `${
                    this.positive ? 'Expected' : 'Unexpected'
                } ${this.content.describe(new Map())}`,
                start: index,
                stop: index,
            };
        } else {
            return Object.assign([], {
                start: index,
                stop: index,
            });
        }
    }
}
