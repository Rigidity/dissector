import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
export declare class Describe extends Rule {
    description: string;
    content: Rule;
    constructor(description: string, ...items: Rule[]);
    describe(_cache: DescriptionCache): string;
    run(state: State, index: number): Matches | Failure;
}
