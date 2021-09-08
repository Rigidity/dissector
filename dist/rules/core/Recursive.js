"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recursive = void 0;
const Rule_1 = require("../../types/Rule");
class Recursive extends Rule_1.Rule {
    rule;
    constructor() {
        super();
        this.rule = null;
    }
    describe(cache) {
        let cached = cache.get(this);
        if (cached) {
            cached[2] = true;
            return cached[1];
        }
        const index = cache.size + 1;
        cached = [index, index.toString(), false];
        cache.set(this, cached);
        let result;
        if (this.rule) {
            const description = this.rule.describe(cache);
            result = cached[2] ? `(${index} = ${description})` : description;
        }
        else {
            result = 'unimplemented recursive rule';
        }
        cache.set(this, [index, result, false]);
        return result;
    }
    run(state, index) {
        if (!this.rule)
            throw new Error('Recursive rule is never implemented.');
        return this.rule.run(state, index);
    }
}
exports.Recursive = Recursive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdXJzaXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvUmVjdXJzaXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUd4QyxNQUFhLFNBQVUsU0FBUSxXQUFJO0lBQ3hCLElBQUksQ0FBYztJQUN6QjtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNqQixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsSUFBSSxNQUFjLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUNwRTthQUFNO1lBQ0gsTUFBTSxHQUFHLDhCQUE4QixDQUFDO1NBQzNDO1FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNKO0FBN0JELDhCQTZCQyJ9