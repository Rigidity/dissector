"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Between = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("./And");
class Between extends Rule_1.Rule {
    from;
    to;
    content;
    constructor(from, to, ...items) {
        super();
        this.from = from;
        this.to = to;
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return `from ${this.from} to ${this.to} of ${this.content.describe(cache)}`;
    }
    run(state, index) {
        const result = Object.assign([], {
            start: index,
            stop: index,
        });
        for (let i = 0; i < this.to; i++) {
            const output = this.content.parse(state, result.stop);
            if ('message' in output) {
                if (i < this.from)
                    return output;
                return result;
            }
            for (const item of output)
                result.push(item);
            result.stop = output.stop;
        }
        return result;
    }
}
exports.Between = Between;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmV0d2Vlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9jb3JlL0JldHdlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBRXhDLCtCQUE0QjtBQUU1QixNQUFhLE9BQVEsU0FBUSxXQUFJO0lBQ3RCLElBQUksQ0FBUztJQUNiLEVBQUUsQ0FBUztJQUNYLE9BQU8sQ0FBTztJQUNyQixZQUFZLElBQVksRUFBRSxFQUFVLEVBQUUsR0FBRyxLQUFhO1FBQ2xELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLFFBQVEsSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM5RCxLQUFLLENBQ1IsRUFBRSxDQUFDO0lBQ1IsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxNQUFNLE1BQU0sR0FBWSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJO29CQUFFLE9BQU8sTUFBTSxDQUFDO2dCQUNqQyxPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUNELEtBQUssTUFBTSxJQUFJLElBQUksTUFBTTtnQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUM3QjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQS9CRCwwQkErQkMifQ==