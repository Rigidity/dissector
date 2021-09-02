import { Failure, Options, Result, Rule, Token } from './types';

export class Parser<T, E> {
    /**
     * Some rules that are used internally.
     */
    public skip = [this.or(' ', '\t', '\r', '\n')];
    public boundary = this.or(
        this.range('a', 'z'),
        this.range('A', 'Z'),
        this.range('0', '9'),
        '_'
    );

    /**
     * Parses the source with the given rule.
     * @param source The text to parse.
     * @param token The default token.
     * @param error The default error.
     * @param items The rules to parse.
     * @returns The result or longest failure.
     */
    public parse(
        source: string,
        token: T,
        error: E,
        ...items: Rule<T, E>[]
    ): Result<T> | Failure<E> {
        const context = { source, stack: [], failure: null, cache: new Map() };
        const options = {
            context,
            token,
            error,
            skip: this.skip,
        };
        const item = items.length === 1 ? items[0] : this.and(...items);
        const result = this.applyRule(item, options, 0);
        if (Array.isArray(result)) return result;
        else return context.failure!;
    }

    /**
     * Applies a rule and returns the result.
     * @param rule The rule to apply.
     * @param options The current parser options/
     * @param index The index to start parsing at.
     * @returns Either the result or a failure.
     */
    protected applyRule(
        rule: Rule<T, E>,
        options: Options<T, E>,
        index: number
    ): Result<T> | Failure<E> {
        const cached = options.context.cache.get(index)?.get(rule);
        if (cached) return cached;
        let result: Result<T> | Failure<E>;
        if (typeof rule === 'string') {
            index = this.applySkip(options, index);
            if (options.context.source.startsWith(rule, index)) {
                result = this.createToken(
                    [rule],
                    options,
                    index,
                    index + rule.length
                );
            } else {
                result = {
                    error: options.error,
                    start: index,
                    stop: index,
                };
            }
        } else if (rule === null) {
            result = this.createToken([], options, index, index);
        } else {
            result = rule(options, index);
        }
        let cache;
        if (!options.context.cache.has(index))
            options.context.cache.set(index, new Map());
        cache = options.context.cache.get(index)!;
        cache.set(rule, result);
        if (
            !Array.isArray(result) &&
            typeof result !== 'string' &&
            (options.context.failure === null ||
                result.stop >= options.context.failure.stop)
        ) {
            options.context.failure = result;
        }
        return result;
    }

    /**
     *
     * @param tokens The token list to convert into a new token.
     * @param options The current parser options.
     * @param start The start index of the token.
     * @param stop The stop index of the token.
     * @returns A new token that encapsulates the input.
     */
    protected createToken(
        tokens: Token<T>[],
        options: Options<T, E>,
        start: number,
        stop: number
    ): Result<T> {
        return (
            typeof tokens === 'string'
                ? tokens
                : Object.assign(tokens, { start, stop, token: options.token })
        ) as typeof tokens extends string ? string : Result<T>;
    }

    /**
     * Prepares combinator application by skipping tokens.
     * @param options The current parser options.
     * @param index Where to start preparation.
     * @returns Where preparation was stopped.
     */
    protected applySkip(options: Options<T, E>, index: number): number {
        const skipOptions: Options<T, E> = { ...options, skip: [] };
        while (
            options.skip.find((rule) => {
                const result = this.applyRule(rule, skipOptions, index);
                if (Array.isArray(result)) {
                    index = result.stop;
                    return true;
                } else {
                    return false;
                }
            })
        );
        return index;
    }

    /**
     * Matches all of the rules specified.
     * @param items The rules to match.
     */
    public and(...items: Rule<T, E>[]): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const results: Result<T> = this.createToken(
                [],
                options,
                index,
                index
            );
            for (const item of items) {
                const result = this.applyRule(item, options, results.stop);
                if (Array.isArray(result)) {
                    for (const item of result) results.push(item);
                    results.stop = result.stop;
                } else {
                    return result;
                }
            }
            return results;
        };
        return rule;
    }

    /**
     * Returns the first match of the rules specified.
     * @param items The rules to match.
     */
    public or(...items: Rule<T, E>[]): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            for (const item of items) {
                const result = this.applyRule(item, options, index);
                if (Array.isArray(result)) return result;
            }
            return {
                error: options.error,
                start: index,
                stop: index,
            };
        };
        return rule;
    }

    /**
     * Returns the longest match of the rules specified.
     * @param items The rules to match.
     */
    public longest(...items: Rule<T, E>[]): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            let longest: Result<T> | null = null;
            for (const item of items) {
                const result = this.applyRule(item, options, index);
                if (
                    Array.isArray(result) &&
                    (longest === null || result.stop > longest.stop)
                ) {
                    longest = result;
                }
            }
            return longest === null
                ? {
                      error: options.error,
                      start: index,
                      stop: index,
                  }
                : longest;
        };
        return rule;
    }

    /**
     * Matches a number of the rules between two values.
     * @param items The rules to match.
     */
    public between(
        from: number,
        to: number,
        ...items: Rule<T, E>[]
    ): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const results: Result<T> = this.createToken(
                [],
                options,
                index,
                index
            );
            for (let i = 0; i < to; i++) {
                const result = this.applyRule(item, options, results.stop);
                if (Array.isArray(result)) {
                    for (const item of result) results.push(item);
                    results.stop = result.stop;
                } else {
                    if (i < from) {
                        return {
                            error: options.error,
                            start: results.stop,
                            stop: results.stop,
                        };
                    } else break;
                }
            }
            return results;
        };
        return rule;
    }

    /**
     * Matches a fixed number of the rules.
     * @param items The rules to match.
     */
    public repeat(times: number, ...items: Rule<T, E>[]) {
        return this.between(times, times, ...items);
    }

    /**
     * Matches zero or one of the rules.
     * @param items The rules to match.
     */
    public optional(...items: Rule<T, E>[]) {
        return this.between(0, 1, ...items);
    }

    /**
     * Matches zero or more of the rules.
     * @param items The rules to match.
     */
    public zero(...items: Rule<T, E>[]) {
        return this.between(0, Infinity, ...items);
    }

    /**
     * Matches one or more of the rules.
     * @param items The rules to match.
     */
    public one(...items: Rule<T, E>[]) {
        return this.between(1, Infinity, ...items);
    }

    /**
     * Allows you to assign the rules later for recursive matching.
     */
    public recursive(): Rule<T, E> & { rule: Rule<T, E> } {
        const wrapper: Rule<T, E> & { rule: Rule<T, E> } = Object.assign(
            (options: Options<T, E>, index: number): Result<T> | Failure<E> => {
                return this.applyRule(wrapper.rule, options, index);
            },
            { rule: null }
        );
        return wrapper;
    }

    /**
     * Matches the end of the source.
     */
    public end(): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            index = this.applySkip(options, index);
            if (index >= options.context.source.length) {
                return this.createToken([], options, index, index);
            } else {
                return { error: options.error, start: index, stop: index };
            }
        };
        return rule;
    }

    /**
     * Matches any character.
     */
    public any(): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            index = this.applySkip(options, index);
            if (index < options.context.source.length) {
                return this.createToken(
                    [options.context.source[index]],
                    options,
                    index,
                    index + 1
                );
            } else {
                return { error: options.error, start: index, stop: index };
            }
        };
        return rule;
    }

    /**
     * Matches a single character between two bounds.
     * @param from The minimum character.
     * @param to The maximum character.
     */
    public range(from: string, to: string): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            index = this.applySkip(options, index);
            if (
                index >= options.context.source.length ||
                options.context.source[index] < from ||
                options.context.source[index] > to
            ) {
                return { error: options.error, start: index, stop: index };
            } else {
                return this.createToken(
                    [options.context.source[index]],
                    options,
                    index,
                    index + 1
                );
            }
        };
        return rule;
    }

    /**
     * Groups a set of rules into a new token.
     * @param items The rules to group.
     */
    public group(...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const result = this.applyRule(item, options, index);
            if (Array.isArray(result)) {
                return this.createToken(
                    [result],
                    options,
                    result.start,
                    result.stop
                );
            } else {
                return result;
            }
        };
        return rule;
    }

    /**
     * Changes which error the rules will throw.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    public error(error: E, ...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const newOptions = { ...options, error };
            const result = this.applyRule(item, newOptions, index);
            if (Array.isArray(result)) {
                return this.createToken(
                    result,
                    newOptions,
                    result.start,
                    result.stop
                );
            } else {
                return { ...result, error };
            }
        };
        return rule;
    }

    /**
     * Groups a set of rules together under a new token and error.
     * @param token The token that the rules represent.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    public token(token: T, ...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const newOptions = { ...options, token };
            const result = this.applyRule(item, newOptions, index);
            if (Array.isArray(result)) {
                return this.createToken(
                    [result],
                    newOptions,
                    result.start,
                    result.stop
                );
            } else {
                return result;
            }
        };
        return rule;
    }

    /**
     * Matches the rules but returns no tokens.
     * @param items The rules to hide.
     */
    public hide(...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const result = this.applyRule(item, options, index);
            if (Array.isArray(result)) {
                return this.createToken([], options, result.start, result.stop);
            } else {
                return result;
            }
        };
        return rule;
    }

    /**
     * Combines all of the rules inside into a single token.
     * @param items The rules to combine.
     */
    public combine(...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            index = this.applySkip(options, index);
            const combineOptions = { ...options, skip: [] };
            const result = this.applyRule(item, combineOptions, index);
            function stringify(result: Result<T>): string {
                return result
                    .map((item) =>
                        typeof item === 'string' ? item : stringify(item)
                    )
                    .join('');
            }
            if (Array.isArray(result)) {
                return this.createToken(
                    [stringify(result)],
                    options,
                    result.start,
                    result.stop
                );
            } else {
                return result;
            }
        };
        return rule;
    }

    /**
     * Pushes a new set of options onto the stack.
     * @param options The new options to use.
     * @param items The rules to combine.
     */
    public push(
        options: Partial<Options<T, E>>,
        ...items: Rule<T, E>[]
    ): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            currentOptions: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const pushOptions = { ...currentOptions, ...options };
            currentOptions.context.stack.push(pushOptions);
            const result = this.applyRule(item, pushOptions, index);
            currentOptions.context.stack.pop();
            return result;
        };
        return rule;
    }

    /**
     * Pops the old set of options off the stack.
     * @param items The rules to combine.
     */
    public pop(...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const oldOptions = options.context.stack.pop();
            const result = this.applyRule(
                item,
                options.context.stack.length > 0
                    ? options.context.stack[options.context.stack.length - 1]
                    : options,
                index
            );
            if (oldOptions) options.context.stack.push(oldOptions);
            return result;
        };
        return rule;
    }

    /**
     * Tests for a set of rules without matching them.
     * @param positive Whether the rules should match or not.
     * @param items The rules to test for.
     */
    public lookahead(positive: boolean, ...items: Rule<T, E>[]): Rule<T, E> {
        const item = items.length === 1 ? items[0] : this.and(...items);
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            const result = this.applyRule(item, options, index);
            return Array.isArray(result) === positive
                ? this.createToken([], options, index, index)
                : { error: options.error, start: index, stop: index };
        };
        return rule;
    }

    /**
     * Matches any character if the lookahead fails.
     * @param items The rules to match.
     */
    public not(...items: Rule<T, E>[]): Rule<T, E> {
        return this.and(this.lookahead(false, ...items), this.any());
    }

    /**
     * Fails without matching anything.
     */
    public exit(): Rule<T, E> {
        const rule = (
            options: Options<T, E>,
            index: number
        ): Result<T> | Failure<E> => {
            return { error: options.error, start: index, stop: index };
        };
        return rule;
    }

    /**
     * Matches a keyword that isn't followed by a rule.
     * @param text The keyword to match.
     * @param boundary What to ensure doesn't follow the keyword.
     */
    public keyword(word: Rule<T, E>, boundary: Rule<T, E> = this.boundary) {
        return this.combine(this.and(word, this.lookahead(false, boundary)));
    }
}
