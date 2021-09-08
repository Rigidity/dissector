"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combine = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("../core/And");
class Combine extends Rule_1.Rule {
    content;
    constructor(...items) {
        super();
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return `combined ${this.content.describe(cache)}`;
    }
    run(state, index) {
        index = Rule_1.Rule.skip(state, index);
        const output = this.content.parse({ ...state, skip: [] }, index);
        if ('message' in output)
            return output;
        return Object.assign([combine(output)], {
            start: output.start,
            stop: output.stop,
        });
    }
}
exports.Combine = Combine;
function combine(matches) {
    return matches
        .map((item) => (typeof item === 'string' ? item : combine(item)))
        .join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYmluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9tZXRhL0NvbWJpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBRXhDLHFDQUFrQztBQUVsQyxNQUFhLE9BQVEsU0FBUSxXQUFJO0lBQ3RCLE9BQU8sQ0FBTztJQUNyQixZQUFZLEdBQUcsS0FBYTtRQUN4QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQXVCO1FBQ25DLE9BQU8sWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsS0FBSyxHQUFHLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksU0FBUyxJQUFJLE1BQU07WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtZQUNwQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWxCRCwwQkFrQkM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxPQUFnQjtJQUM3QixPQUFPLE9BQU87U0FDVCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDIn0=