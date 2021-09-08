import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
export declare class Message extends Rule {
    message: string;
    content: Rule;
    constructor(message: string, ...items: Rule[]);
    describe(cache: DescriptionCache): string;
    run(state: State, index: number): Matches | Failure;
}
