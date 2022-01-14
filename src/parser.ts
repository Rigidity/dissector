import { State } from './state';
import { Failure, GroupMatch, Result, Rule } from './types';

export class Parser {
    public readonly source: string;
    public fatal?: Failure;
    public failure?: Failure;
    public base: State;

    constructor(source: string) {
        this.source = source;
        this.base = new State(this);
    }

    public match(rule: Rule): Result {
        const result = this.base.match(rule);
        if ('error' in result) return this.failure!;
        return result;
    }
}

export function and(...rules: Rule[]): Rule {
    if (rules.length === 1) return rules[0];
    return (state: State): Result => {
        const branch = state.branch();
        const matches = branch.group();
        for (const rule of rules) {
            const result = branch.match(rule);
            if ('error' in result) return result;
            for (const item of result) matches.push(item);
        }
        matches.stop = branch.index;
        branch.merge();
        return matches;
    };
}

export function or(...rules: Rule[]): Rule {
    if (rules.length === 1) return rules[0];
    return (state: State): Result => {
        for (const rule of rules) {
            const result = state.match(rule);
            if (Array.isArray(result)) return result;
        }
        return state.unexpected();
    };
}

export function longest(...rules: Rule[]): Rule {
    if (rules.length === 1) return rules[0];
    return (state: State): Result => {
        let longestBranch: State | undefined;
        let longestMatch: GroupMatch | undefined;
        for (const rule of rules) {
            const branch = state.branch();
            const result = branch.match(rule);
            if (
                Array.isArray(result) &&
                (!longestMatch || result.stop > longestMatch.stop)
            ) {
                longestBranch = branch;
                longestMatch = result;
            }
        }
        if (!longestMatch || !longestBranch) return state.unexpected();
        longestBranch.merge();
        return longestMatch;
    };
}

export function shortest(...rules: Rule[]): Rule {
    if (rules.length === 1) return rules[0];
    return (state: State): Result => {
        let shortestBranch: State | undefined;
        let shortestMatch: GroupMatch | undefined;
        for (const rule of rules) {
            const branch = state.branch();
            const result = branch.match(rule);
            if (
                Array.isArray(result) &&
                (!shortestMatch || result.stop < shortestMatch.stop)
            ) {
                shortestBranch = branch;
                shortestMatch = result;
            }
        }
        if (!shortestMatch || !shortestBranch) return state.unexpected();
        shortestBranch.merge();
        return shortestMatch;
    };
}

export function hide(...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const start = state.index;
        const result = state.match(rule);
        if ('error' in result) return result;
        return state.group(start);
    };
}

export function between(from: number, to: number, ...rules: Rule[]): Rule {
    const rule = and(...rules);
    if (from === 1 && to === 1) return rule;
    return (state: State): Result => {
        const branch = state.branch();
        const matches = branch.group();
        for (let i = 0; i < to; i++) {
            const result = branch.match(rule);
            if ('error' in result) {
                if (i < from) return result;
                break;
            }
            for (const item of result) matches.push(item);
        }
        matches.stop = branch.index;
        branch.merge();
        return matches;
    };
}

export function zeroOrMore(...rules: Rule[]): Rule {
    return between(0, Infinity, ...rules);
}

export function oneOrMore(...rules: Rule[]): Rule {
    return between(1, Infinity, ...rules);
}

export function optional(...rules: Rule[]): Rule {
    return between(0, 1, ...rules);
}

export function repeat(times: number, ...rules: Rule[]): Rule {
    return between(times, times, ...rules);
}

export function atleast(times: number, ...rules: Rule[]): Rule {
    return between(times, Infinity, ...rules);
}

export function lookahead(expect: boolean, ...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const branch = state.branch();
        const result = branch.match(rule);
        if ('error' in result === expect)
            return expect ? result : state.unexpected();
        return state.group();
    };
}

export function groupOf(...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const result = state.match(rule);
        if ('error' in result) return result;
        return state.group(result.start, result.stop, [result]);
    };
}

export function namedGroupOf(name: string, ...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const result = state.match(rule);
        if ('error' in result) return result;
        return state.group(result.start, result.stop, [
            state.named(name, result.start, result.stop, result),
        ]);
    };
}

export function sourceOf(...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const result = state.match(rule);
        if ('error' in result) return result;
        return state.group(result.start, result.stop, [
            state.parser.source.slice(result.start, result.stop),
        ]);
    };
}

export function textOf(...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const result = state.match(rule);
        if ('error' in result) return result;
        return state.group(result.start, result.stop, [
            result.flat(Infinity).join(''),
        ]);
    };
}

export function glueTogether(...rules: Rule[]): Rule {
    return and(null, raw(...rules));
}

export function raw(...rules: Rule[]): Rule {
    const rule = and(...rules);
    return (state: State): Result => {
        const branch = state.branch();
        branch.skipped = [];
        const result = branch.match(rule);
        branch.merge();
        return result;
    };
}

export function listOf(
    rule: Rule,
    delimiter: Rule = hide(','),
    trailing: boolean = false
): Rule {
    return trailing
        ? and(rule, zeroOrMore(delimiter, rule), optional(delimiter))
        : and(rule, zeroOrMore(delimiter, rule));
}

export function word(start: string, characters: string = start): Rule {
    return textOf(glueTogether(start, zeroOrMore(characters)));
}

export function keyword(text: string, boundary?: Rule): Rule {
    return textOf(
        glueTogether(
            text,
            lookahead(
                false,
                boundary ??
                    ((state) => state.match(state.defaults.keywordBoundary))
            )
        )
    );
}

export function recursive(): Rule & { rule?: Rule } {
    const self: Rule & { rule?: Rule } = (state: State): Result => {
        if (!self.rule) throw new Error('Unimplemented recursive rule.');
        return state.match(self.rule);
    };
    return self;
}

export function not(...rules: Rule[]): Rule {
    return and(lookahead(false, ...rules), any);
}

export function oneOf(items: string): Rule {
    return or(...items.trim().split(/\s+/));
}

export function combine(...rules: Rule[]): Rule {
    return textOf(glueTogether(...rules));
}

export function pickFrom(from: string): Rule {
    return (state: State): Result => {
        state.prepare();
        const char = state.parser.source[state.index];
        return from.includes(char)
            ? state.group(state.index, (state.index += 1), [char])
            : state.unexpected();
    };
}

export function range(from: string, to: string): Rule {
    return (state: State): Result => {
        state.prepare();
        const char = state.parser.source[state.index];
        return char >= from && char <= to
            ? state.group(state.index, (state.index += 1), [char])
            : state.unexpected();
    };
}

export function any(state: State): Result {
    state.prepare();
    const char = state.parser.source[state.index];
    return char
        ? state.group(state.index, (state.index += 1), [char])
        : state.unexpected();
}

export function end(state: State): Result {
    state.prepare();
    return state.index < state.parser.source.length
        ? state.error('Expected end of source')
        : state.group();
}

export const empty = and();
