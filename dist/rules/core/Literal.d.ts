import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
export declare class Literal extends Rule {
    text: string;
    constructor(text: string);
    describe(_cache: DescriptionCache): string;
    run(state: State, index: number): Matches | Failure;
}
