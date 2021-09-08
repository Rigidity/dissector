"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beginning = void 0;
const Rule_1 = require("../../types/Rule");
class Beginning extends Rule_1.Rule {
    describe(_cache) {
        return 'beginning of source';
    }
    run(state, index) {
        if (index === 0) {
            return Object.assign([], {
                start: index,
                stop: index,
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
exports.Beginning = Beginning;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVnaW5uaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvQmVnaW5uaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUd4QyxNQUFhLFNBQVUsU0FBUSxXQUFJO0lBQ3hCLFFBQVEsQ0FBQyxNQUF3QjtRQUNwQyxPQUFPLHFCQUFxQixDQUFDO0lBQ2pDLENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBbEJELDhCQWtCQyJ9