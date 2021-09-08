"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pick = void 0;
const Rule_1 = require("../../types/Rule");
class Pick extends Rule_1.Rule {
    characters;
    constructor(characters) {
        super();
        this.characters = characters;
    }
    describe(_cache) {
        return `pick from ${JSON.stringify(this.characters)}`;
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        const char = state.context.source[index];
        if (char && this.characters.includes(char)) {
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
exports.Pick = Pick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9oZWxwZXIvUGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwyQ0FBd0M7QUFHeEMsTUFBYSxJQUFLLFNBQVEsV0FBSTtJQUNuQixVQUFVLENBQVM7SUFDMUIsWUFBWSxVQUFrQjtRQUMxQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFDTSxRQUFRLENBQUMsTUFBd0I7UUFDcEMsT0FBTyxhQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxLQUFLLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQzthQUNsQixDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBekJELG9CQXlCQyJ9