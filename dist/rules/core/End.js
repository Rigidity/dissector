"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.End = void 0;
const Rule_1 = require("../../types/Rule");
class End extends Rule_1.Rule {
    constructor() {
        super();
    }
    describe(_cache) {
        return 'end of source';
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        if (index >= state.context.source.length) {
            return Object.assign([], {
                start: index,
                stop: index,
            });
        }
        else {
            return Rule_1.Rule.throw(state.context, {
                message: `Unexpected character ${JSON.stringify(state.context.source[index])}`,
                start: index,
                stop: index,
            });
        }
    }
}
exports.End = End;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvRW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUd4QyxNQUFhLEdBQUksU0FBUSxXQUFJO0lBQ3pCO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ00sUUFBUSxDQUFDLE1BQXdCO1FBQ3BDLE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsS0FBSyxHQUFHLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxPQUFPLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsT0FBTyxFQUFFLHdCQUF3QixJQUFJLENBQUMsU0FBUyxDQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDOUIsRUFBRTtnQkFDSCxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBeEJELGtCQXdCQyJ9