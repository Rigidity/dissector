"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("../core/And");
class Message extends Rule_1.Rule {
    message;
    content;
    constructor(message, ...items) {
        super();
        this.message = message;
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return this.content.describe(cache);
    }
    run(state, index) {
        const output = this.content.parse(state, index);
        if ('message' in output) {
            return Rule_1.Rule.throw(state.context, {
                message: this.message,
                start: index,
                stop: index,
            });
        }
        return output;
    }
}
exports.Message = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9tZXRhL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXdDO0FBRXhDLHFDQUFrQztBQUVsQyxNQUFhLE9BQVEsU0FBUSxXQUFJO0lBQ3RCLE9BQU8sQ0FBUztJQUNoQixPQUFPLENBQU87SUFDckIsWUFBWSxPQUFlLEVBQUUsR0FBRyxLQUFhO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ00sR0FBRyxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUU7WUFDckIsT0FBTyxXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXRCRCwwQkFzQkMifQ==