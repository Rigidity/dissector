import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class And extends Rule {
    public items: Rule[];
    constructor(...items: Rule[]) {
        super();
        this.items = items;
    }
    public describe(cache: DescriptionCache): string {
        const result = this.items
            .map((item) => item.describe(cache))
            .join(' and ');
        return this.items.length === 1 ? result : `(${result})`;
    }
    public run(state: State, index: number): Matches | Failure {
        const result: Matches = Object.assign([], {
            start: index,
            stop: index,
        });
        for (const item of this.items) {
            const output = item.parse(state, result.stop);
            if ('message' in output) return output;
            for (const item of output) result.push(item);
            result.stop = output.stop;
        }
        return result;
    }
}
