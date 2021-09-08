"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Describe = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("../core/And");
class Describe extends Rule_1.Rule {
    description;
    content;
    constructor(description, ...items) {
        super();
        this.description = description;
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(_cache) {
        return this.description;
    }
    run(state, index) {
        const output = this.content.parse(state, index);
        if ('message' in output) {
            return Rule_1.Rule.throw(state.context, {
                message: `Expected ${this.describe(new Map())}`,
                start: index,
                stop: index,
            });
        }
        return output;
    }
}
exports.Describe = Describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvbWV0YS9EZXNjcmliZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwyQ0FBd0M7QUFFeEMscUNBQWtDO0FBRWxDLE1BQWEsUUFBUyxTQUFRLFdBQUk7SUFDdkIsV0FBVyxDQUFTO0lBQ3BCLE9BQU8sQ0FBTztJQUNyQixZQUFZLFdBQW1CLEVBQUUsR0FBRyxLQUFhO1FBQzdDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTSxRQUFRLENBQUMsTUFBd0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNyQixPQUFPLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsT0FBTyxFQUFFLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUF0QkQsNEJBc0JDIn0=