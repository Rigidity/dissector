import { identifierChar } from '../../characters';
import { DescriptionCache } from '../../types/Description';
import { Rule } from '../../types/Rule';
import { Literal } from '../core/Literal';
import { Lookahead } from '../core/Lookahead';
import { Combine } from '../meta/Combine';
import { Pick } from './Pick';

export class Keyword extends Combine {
    public text: string;
    public lookahead: Rule;
    constructor(text: string, lookahead: Rule = new Pick(identifierChar)) {
        super(new Literal(text), new Lookahead(false, lookahead));
        this.text = text;
        this.lookahead = lookahead;
    }
    public describe(cache: DescriptionCache): string {
        return `keyword ${JSON.stringify(
            this.text
        )} with boundary of ${this.lookahead.describe(cache)}`;
    }
}
