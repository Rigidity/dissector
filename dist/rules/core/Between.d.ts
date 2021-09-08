import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
export declare class Between extends Rule {
    from: number;
    to: number;
    content: Rule;
    constructor(from: number, to: number, ...items: Rule[]);
    describe(cache: DescriptionCache): string;
    run(state: State, index: number): Matches | Failure;
}
