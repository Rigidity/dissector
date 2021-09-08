import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Pick extends Rule {
    public characters: string;
    constructor(characters: string) {
        super();
        this.characters = characters;
    }
    public describe(_cache: DescriptionCache): string {
        return `pick from ${JSON.stringify(this.characters)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        index = Rule.skip(state, index);
        const char = state.context.source[index];
        if (char && this.characters.includes(char)) {
            return Object.assign([char], {
                start: index,
                stop: index + 1,
            });
        } else {
            return Rule.throw(state.context, {
                message: `Expected ${this.describe(new Map())}`,
                start: index,
                stop: index,
            });
        }
    }
}
