"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hide = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("./../core/And");
class Hide extends Rule_1.Rule {
    content;
    constructor(...items) {
        super();
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return `hidden ${this.content.describe(cache)}`;
    }
    run(state, index) {
        const result = this.content.parse(state, index);
        if ('message' in result)
            return result;
        return Object.assign([], {
            start: result.start,
            stop: result.stop,
        });
    }
}
exports.Hide = Hide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9tZXRhL0hpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBRXhDLHVDQUFvQztBQUVwQyxNQUFhLElBQUssU0FBUSxXQUFJO0lBQ25CLE9BQU8sQ0FBTztJQUNyQixZQUFZLEdBQUcsS0FBYTtRQUN4QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQXVCO1FBQ25DLE9BQU8sVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksU0FBUyxJQUFJLE1BQU07WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBakJELG9CQWlCQyJ9