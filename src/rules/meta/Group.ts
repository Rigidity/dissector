import { And } from '../..';
import { DescriptionCache } from '../../types/Description';
import { Failure } from '../../types/Failure';
import { Matches } from '../../types/Match';
import { Rule } from '../../types/Rule';
import { State } from '../../types/State';

export class Group extends Rule {
    public content: Rule;
    public name: string | null;
    constructor(name: string | null, ...items: Rule[]) {
        super();
        this.content = items.length === 1 ? items[0] : new And(...items);
        this.name = name;
    }
    public describe(cache: DescriptionCache): string {
        return this.name
            ? this.name
            : `group of ${this.content.describe(cache)}`;
    }
    public run(state: State, index: number): Matches | Failure {
        const result = this.content.parse(state, index);
        if ('message' in result) return result;
        return Object.assign(
            [
                Object.assign(
                    result,
                    this.name
                        ? {
                              name: this.name,
                              start: result.start,
                              stop: result.stop,
                          }
                        : {
                              start: result.start,
                              stop: result.stop,
                          }
                ),
            ],
            {
                start: result.start,
                stop: result.stop,
            }
        );
    }
}
