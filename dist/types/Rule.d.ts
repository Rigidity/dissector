import { Context } from './Context';
import { DescriptionCache } from './Description';
import { Failure } from './Failure';
import { Matches } from './Match';
import { State } from './State';
export declare abstract class Rule {
    abstract run(state: State, index: number): Matches | Failure;
    abstract describe(cache: DescriptionCache): string;
    parse(state: State, index: number): Matches | Failure;
    parseString(source: string, options?: Partial<State>): Matches | Failure;
    static throw(context: Context, failure: Failure): Failure;
    static skip(state: State, index: number): number;
}
