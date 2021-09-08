import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from './And';

export class Between extends Rule {
    public from: number;
    public to: number;
    public content: Rule;
    constructor(from: number, to: number, ...items: Rule[]) {
        super();
        this.from = from;
        this.to = to;
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return `from ${this.from} to ${this.to} of ${this.content.describe(
            cache
        )}`;
    }
    public run(state: State, index: number): Matches | Failure {
        const result: Matches = Object.assign([], {
            start: index,
            stop: index,
        });
        for (let i = 0; i < this.to; i++) {
            const output = this.content.parse(state, result.stop);
            if ('message' in output) {
                if (i < this.from) return output;
                return result;
            }
            for (const item of output) result.push(item);
            result.stop = output.stop;
        }
        return result;
    }
}
