import { Context } from './Context';
import { DescriptionCache } from './Description';
import { Failure } from './Failure';
import { Matches } from './Match';
import { State } from './State';

export abstract class Rule {
    public abstract run(state: State, index: number): Matches | Failure;
    public abstract describe(cache: DescriptionCache): string;
    public parse(state: State, index: number): Matches | Failure {
        let cache = state.context.cache.get(index);
        let cached = cache?.get(this);
        if (cached) return cached;
        cached = this.run(state, index);
        if (!cache) {
            cache = new Map();
            state.context.cache.set(index, cache);
        }
        cache.set(this, cached);
        return cached;
    }
    public parseString(
        source: string,
        options: Partial<State> = {}
    ): Matches | Failure {
        const { Pick } = require('../rules/helper/Pick');
        const context: Context = {
            source,
            cache: new Map(),
        };
        const state: State = {
            context,
            skip: [new Pick(' \t\r\n')],
            ...options,
        };
        let match = this.parse(state, 0);
        if ('message' in match) match = state.context.failure!;
        return match;
    }
    public static throw(context: Context, failure: Failure): Failure {
        if (!context.failure || context.failure.stop <= failure.stop) {
            context.failure = failure;
        }
        return failure;
    }
    public static skip(state: State, index: number): number {
        while (
            state.skip.find((item) => {
                const result = item.parse({ ...state, skip: [] }, index);
                if ('message' in result) return false;
                index = result.stop;
                return true;
            })
        );
        return index;
    }
}
