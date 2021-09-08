import { Context } from './Context';
import { Rule } from './Rule';
export interface State {
    parent?: State;
    skip: Rule[];
    context: Context;
}
