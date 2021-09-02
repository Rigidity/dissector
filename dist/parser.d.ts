import { Failure, Options, Result, Rule, Token } from './types';
export declare class Parser<T, E> {
    /**
     * Some rules that are used internally.
     */
    skip: Rule<T, E>[];
    boundary: Rule<T, E>;
    /**
     * Parses the source with the given rule.
     * @param source The text to parse.
     * @param token The default token.
     * @param error The default error.
     * @param items The rules to parse.
     * @returns The result or longest failure.
     */
    parse(source: string, token: T, error: E, ...items: Rule<T, E>[]): Result<T> | Failure<E>;
    /**
     * Applies a rule and returns the result.
     * @param rule The rule to apply.
     * @param options The current parser options/
     * @param index The index to start parsing at.
     * @returns Either the result or a failure.
     */
    protected applyRule(rule: Rule<T, E>, options: Options<T, E>, index: number): Result<T> | Failure<E>;
    /**
     *
     * @param tokens The token list to convert into a new token.
     * @param options The current parser options.
     * @param start The start index of the token.
     * @param stop The stop index of the token.
     * @returns A new token that encapsulates the input.
     */
    protected createToken(tokens: Token<T>[], options: Options<T, E>, start: number, stop: number): Result<T>;
    /**
     * Prepares combinator application by skipping tokens.
     * @param options The current parser options.
     * @param index Where to start preparation.
     * @returns Where preparation was stopped.
     */
    protected applySkip(options: Options<T, E>, index: number): number;
    /**
     * Matches all of the rules specified.
     * @param items The rules to match.
     */
    and(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Returns the first match of the rules specified.
     * @param items The rules to match.
     */
    or(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Returns the longest match of the rules specified.
     * @param items The rules to match.
     */
    longest(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches a number of the rules between two values.
     * @param items The rules to match.
     */
    between(from: number, to: number, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches a fixed number of the rules.
     * @param items The rules to match.
     */
    repeat(times: number, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches zero or one of the rules.
     * @param items The rules to match.
     */
    optional(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches zero or more of the rules.
     * @param items The rules to match.
     */
    zero(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches one or more of the rules.
     * @param items The rules to match.
     */
    one(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Allows you to assign the rules later for recursive matching.
     */
    recursive(): Rule<T, E> & {
        rule: Rule<T, E>;
    };
    /**
     * Matches the end of the source.
     */
    end(): Rule<T, E>;
    /**
     * Matches any character.
     */
    any(): Rule<T, E>;
    /**
     * Matches a single character between two bounds.
     * @param from The minimum character.
     * @param to The maximum character.
     */
    range(from: string, to: string): Rule<T, E>;
    /**
     * Groups a set of rules into a new token.
     * @param items The rules to group.
     */
    group(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Changes which error the rules will throw.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    error(error: E, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Groups a set of rules together under a new token and error.
     * @param token The token that the rules represent.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    token(token: T, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches the rules but returns no tokens.
     * @param items The rules to hide.
     */
    hide(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Combines all of the rules inside into a single token.
     * @param items The rules to combine.
     */
    combine(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Pushes a new set of options onto the stack.
     * @param options The new options to use.
     * @param items The rules to combine.
     */
    push(options: Partial<Options<T, E>>, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Pops the old set of options off the stack.
     * @param items The rules to combine.
     */
    pop(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Tests for a set of rules without matching them.
     * @param positive Whether the rules should match or not.
     * @param items The rules to test for.
     */
    lookahead(positive: boolean, ...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Matches any character if the lookahead fails.
     * @param items The rules to match.
     */
    not(...items: Rule<T, E>[]): Rule<T, E>;
    /**
     * Fails without matching anything.
     */
    exit(): Rule<T, E>;
    /**
     * Matches a keyword that isn't followed by a rule.
     * @param text The keyword to match.
     * @param boundary What to ensure doesn't follow the keyword.
     */
    keyword(word: Rule<T, E>, boundary?: Rule<T, E>): Rule<T, E>;
}
