import { identifierCharacters } from './constants';
import { or, Parser, pickFrom, zeroOrMore } from './parser';
import { Failure, GroupMatch, Match, Result, Rule } from './types';

export interface Defaults {
    keywordBoundary: Rule;
}

export class State {
    public readonly parser: Parser;
    public readonly parent?: State;
    public index: number;
    public strict: boolean;
    public skipped: Rule[];
    public defaults: Defaults;

    constructor(parent: State | Parser) {
        if (parent instanceof State) {
            this.parent = parent;
            this.parser = parent.parser;
            this.index = parent.index;
            this.strict = parent.strict;
            this.skipped = parent.skipped.slice();
            this.defaults = { ...parent.defaults };
        } else {
            this.parser = parent;
            this.index = 0;
            this.strict = true;
            this.skipped = [];
            this.defaults = {
                keywordBoundary: pickFrom(identifierCharacters),
            };
        }
    }

    public branch(): State {
        return new State(this);
    }

    public merge() {
        if (!this.parent) throw new Error('Cannot merge without parent.');
        this.parent.index = this.index;
    }

    public error(text: string): Failure {
        const error = { start: this.index, stop: this.index, error: text };
        if (!this.parser.failure || error.stop > this.parser.failure.stop)
            this.parser.failure = error;
        return error;
    }

    public unexpected(): Failure {
        return this.error(
            `Unexpected ${
                this.index < this.parser.source.length
                    ? JSON.stringify(this.parser.source[this.index])
                    : 'end of file'
            }`
        );
    }

    public fatal(text: string): Failure {
        return (this.parser.fatal = this.error(text));
    }

    public group(
        start: number = this.index,
        stop: number = this.index,
        items: Match[] = []
    ): GroupMatch {
        return Object.assign(items, { start, stop });
    }

    public named(
        name: string,
        start: number = this.index,
        stop: number = this.index,
        items: Match[] = []
    ): GroupMatch {
        return Object.assign(items, { start, stop, name });
    }

    public prepare() {
        if (this.skipped.length) {
            const branch = this.branch();
            branch.skipped = [];
            branch.match(zeroOrMore(or(...this.skipped)));
            branch.merge();
        }
    }

    public match(rule: Rule): Result {
        if (this.parser.fatal) return this.parser.fatal;
        const index = this.index;
        let rules = this.parser.cache?.get(index);
        let result = rules?.get(rule);
        if (result) return result;
        do result = this.run(rule);
        while (
            'error' in result &&
            !this.strict &&
            this.index + 1 < this.parser.source.length &&
            (++this.index, true)
        );
        if (this.parser.cache) {
            if (!rules) {
                rules = new Map();
                this.parser.cache.set(index, rules);
            }
            rules.set(rule, result);
        }
        if (this.parser.fatal) return this.parser.fatal;
        return result;
    }

    public run(rule: Rule): Result {
        if (typeof rule === 'string') {
            this.prepare();
            return this.parser.source.startsWith(rule, this.index)
                ? this.group(this.index, (this.index += rule.length), [rule])
                : this.error(`Expected ${JSON.stringify(rule)}`);
        } else if (rule === null) {
            this.prepare();
            return this.group(this.index, this.index, []);
        } else if (rule instanceof RegExp) {
            this.prepare();
            const match = this.parser.source.slice(this.index).match(rule);
            return match
                ? this.group(
                      this.index,
                      (this.index += match[0].length),
                      match.slice(1)
                  )
                : this.error(`Expected ${rule.toString()}`);
        } else return rule(this);
    }
}
