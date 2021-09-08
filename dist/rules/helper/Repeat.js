"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repeat = void 0;
const Between_1 = require("../core/Between");
class Repeat extends Between_1.Between {
    constructor(times, ...items) {
        super(times, times, ...items);
    }
    describe(cache) {
        return `${this.from} of ${this.content.describe(cache)}`;
    }
}
exports.Repeat = Repeat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2hlbHBlci9SZXBlYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkNBQTBDO0FBRTFDLE1BQWEsTUFBTyxTQUFRLGlCQUFPO0lBQy9CLFlBQVksS0FBYSxFQUFFLEdBQUcsS0FBYTtRQUN2QyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0NBQ0o7QUFQRCx3QkFPQyJ9