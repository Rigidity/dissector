"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const Rule_1 = require("../../types/Rule");
class Range extends Rule_1.Rule {
    from;
    to;
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }
    describe(_cache) {
        return `${JSON.stringify(this.from)} to ${JSON.stringify(this.to)}`;
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        const char = state.context.source[index];
        if (char && char >= this.from && char <= this.to) {
            return Object.assign([char], {
                start: index,
                stop: index + 1,
            });
        }
        else {
            return Rule_1.Rule.throw(state.context, {
                message: `Expected ${this.describe(new Map())}`,
                start: index,
                stop: index,
            });
        }
    }
}
exports.Range = Range;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvaGVscGVyL1JhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUd4QyxNQUFhLEtBQU0sU0FBUSxXQUFJO0lBQ3BCLElBQUksQ0FBUztJQUNiLEVBQUUsQ0FBUztJQUNsQixZQUFZLElBQVksRUFBRSxFQUFVO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNNLFFBQVEsQ0FBQyxNQUF3QjtRQUNwQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBQ00sR0FBRyxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLEtBQUssR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxPQUFPLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsT0FBTyxFQUFFLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0o7QUEzQkQsc0JBMkJDIn0=