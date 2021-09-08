"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modify = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("./And");
class Modify extends Rule_1.Rule {
    changes;
    content;
    constructor(changes, ...items) {
        super();
        this.changes = changes;
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return this.content.describe(cache);
    }
    run(state, index) {
        return this.content.parse({ ...state, ...this.changes }, index);
    }
}
exports.Modify = Modify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvTW9kaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUV4QywrQkFBNEI7QUFFNUIsTUFBYSxNQUFPLFNBQVEsV0FBSTtJQUNyQixPQUFPLENBQWlCO0lBQ3hCLE9BQU8sQ0FBTztJQUNyQixZQUFZLE9BQXVCLEVBQUUsR0FBRyxLQUFhO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ00sR0FBRyxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0o7QUFkRCx3QkFjQyJ9