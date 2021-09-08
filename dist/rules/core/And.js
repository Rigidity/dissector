"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.And = void 0;
const Rule_1 = require("../../types/Rule");
class And extends Rule_1.Rule {
    items;
    constructor(...items) {
        super();
        this.items = items;
    }
    describe(cache) {
        const result = this.items
            .map((item) => item.describe(cache))
            .join(' and ');
        return this.items.length === 1 ? result : `(${result})`;
    }
    run(state, index) {
        const result = Object.assign([], {
            start: index,
            stop: index,
        });
        for (const item of this.items) {
            const output = item.parse(state, result.stop);
            if ('message' in output)
                return output;
            for (const item of output)
                result.push(item);
            result.stop = output.stop;
        }
        return result;
    }
}
exports.And = And;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvQW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUd4QyxNQUFhLEdBQUksU0FBUSxXQUFJO0lBQ2xCLEtBQUssQ0FBUztJQUNyQixZQUFZLEdBQUcsS0FBYTtRQUN4QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUs7YUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDO0lBQzVELENBQUM7SUFDTSxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDbEMsTUFBTSxNQUFNLEdBQVksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDdEMsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxTQUFTLElBQUksTUFBTTtnQkFBRSxPQUFPLE1BQU0sQ0FBQztZQUN2QyxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU07Z0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDN0I7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUF6QkQsa0JBeUJDIn0=