"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Or = void 0;
const Rule_1 = require("../../types/Rule");
class Or extends Rule_1.Rule {
    items;
    constructor(...items) {
        super();
        this.items = items;
    }
    describe(cache) {
        const text = this.items
            .map((item) => item.describe(cache))
            .join(' or ');
        return this.items.length === 1 ? text : `(${text})`;
    }
    run(state, index) {
        for (const item of this.items) {
            const output = item.parse(state, index);
            if (Array.isArray(output))
                return output;
        }
        return Rule_1.Rule.throw(state.context, {
            message: `Expected ${this.describe(new Map())}`,
            start: index,
            stop: index,
        });
    }
}
exports.Or = Or;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvY29yZS9Pci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwyQ0FBd0M7QUFHeEMsTUFBYSxFQUFHLFNBQVEsV0FBSTtJQUNqQixLQUFLLENBQVM7SUFDckIsWUFBWSxHQUFHLEtBQWE7UUFDeEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQXVCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLO2FBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQztJQUN4RCxDQUFDO0lBQ00sR0FBRyxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUFFLE9BQU8sTUFBTSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDN0IsT0FBTyxFQUFFLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDL0MsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXZCRCxnQkF1QkMifQ==