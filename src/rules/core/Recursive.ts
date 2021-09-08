import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Recursive extends Rule {
    public rule: Rule | null;
    constructor() {
        super();
        this.rule = null;
    }
    public describe(cache: DescriptionCache): string {
        let cached = cache.get(this);
        if (cached) {
            cached[2] = true;
            return cached[1];
        }
        const index = cache.size + 1;
        cached = [index, index.toString(), false];
        cache.set(this, cached);
        let result: string;
        if (this.rule) {
            const description = this.rule.describe(cache);
            result = cached[2] ? `(${index} = ${description})` : description;
        } else {
            result = 'unimplemented recursive rule';
        }
        cache.set(this, [index, result, false]);
        return result;
    }
    public run(state: State, index: number): Matches | Failure {
        if (!this.rule) throw new Error('Recursive rule is never implemented.');
        return this.rule.run(state, index);
    }
}
