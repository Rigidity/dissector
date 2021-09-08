import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';
import { And } from './And';

export class Modify extends Rule {
    public changes: Partial<State>;
    public content: Rule;
    constructor(changes: Partial<State>, ...items: Rule[]) {
        super();
        this.changes = changes;
        this.content = items.length === 1 ? items[0] : new And(...items);
    }
    public describe(cache: DescriptionCache): string {
        return this.content.describe(cache);
    }
    public run(state: State, index: number): Matches | Failure {
        return this.content.parse({ ...state, ...this.changes }, index);
    }
}
