import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from '../core/And';

export class Message extends Rule {
    public message: string;
    public content: Rule;
    constructor(message: string, ...items: Rule[]) {
        super();
        this.message = message;
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return this.content.describe(cache);
    }
    public run(state: State, index: number): Matches | Failure {
        const output = this.content.parse(state, index);
        if ('message' in output) {
            return Rule.throw(state.context, {
                message: this.message,
                start: index,
                stop: index,
            });
        }
        return output;
    }
}
