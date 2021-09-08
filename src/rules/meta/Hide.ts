import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from './../core/And';

export class Hide extends Rule {
    public content: Rule;
    constructor(...items: Rule[]) {
        super();
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return `hidden ${this.content.describe(cache)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        const result = this.content.parse(state, index);
        if ('message' in result) return result;
        return Object.assign([], {
            start: result.start,
            stop: result.stop,
        });
    }
}
