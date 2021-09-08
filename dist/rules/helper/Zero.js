"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zero = void 0;
const Between_1 = require("../core/Between");
class Zero extends Between_1.Between {
    constructor(...items) {
        super(0, Infinity, ...items);
    }
    describe(cache) {
        return `zero or more of ${this.content.describe(cache)}`;
    }
}
exports.Zero = Zero;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWmVyby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9oZWxwZXIvWmVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2Q0FBMEM7QUFFMUMsTUFBYSxJQUFLLFNBQVEsaUJBQU87SUFDN0IsWUFBWSxHQUFHLEtBQWE7UUFDeEIsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQXVCO1FBQ25DLE9BQU8sbUJBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDN0QsQ0FBQztDQUNKO0FBUEQsb0JBT0MifQ==