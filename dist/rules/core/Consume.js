"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consume = void 0;
const Rule_1 = require("../../types/Rule");
class Consume extends Rule_1.Rule {
    constructor() {
        super();
    }
    describe(_cache) {
        return 'character';
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        if (index < state.context.source.length) {
            return Object.assign([state.context.source[index]], {
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
exports.Consume = Consume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9jb3JlL0NvbnN1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBR3hDLE1BQWEsT0FBUSxTQUFRLFdBQUk7SUFDN0I7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDTSxRQUFRLENBQUMsTUFBd0I7UUFDcEMsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxLQUFLLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3JDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hELEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQzthQUNsQixDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBdEJELDBCQXNCQyJ9