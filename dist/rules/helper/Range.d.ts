import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
export declare class Range extends Rule {
    from: string;
    to: string;
    constructor(from: string, to: string);
    describe(_cache: DescriptionCache): string;
    run(state: State, index: number): Matches | Failure;
}
