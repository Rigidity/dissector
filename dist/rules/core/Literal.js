"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
const Rule_1 = require("../../types/Rule");
class Literal extends Rule_1.Rule {
    text;
    constructor(text) {
        super();
        this.text = text;
    }
    describe(_cache) {
        return `${JSON.stringify(this.text)}`;
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        if (state.context.source.startsWith(this.text, index)) {
            return Object.assign([this.text], {
                start: index,
                stop: index + this.text.length,
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
exports.Literal = Literal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGl0ZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9jb3JlL0xpdGVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBR3hDLE1BQWEsT0FBUSxTQUFRLFdBQUk7SUFDdEIsSUFBSSxDQUFTO0lBQ3BCLFlBQVksSUFBWTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTSxRQUFRLENBQUMsTUFBd0I7UUFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxLQUFLLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNuRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ2pDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxPQUFPLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsT0FBTyxFQUFFLFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0o7QUF4QkQsMEJBd0JDIn0=