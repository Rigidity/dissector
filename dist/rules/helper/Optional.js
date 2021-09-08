"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = void 0;
const Between_1 = require("../core/Between");
class Optional extends Between_1.Between {
    constructor(...items) {
        super(0, 1, ...items);
    }
    describe(cache) {
        return `optional ${this.content.describe(cache)}`;
    }
}
exports.Optional = Optional;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvaGVscGVyL09wdGlvbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDZDQUEwQztBQUUxQyxNQUFhLFFBQVMsU0FBUSxpQkFBTztJQUNqQyxZQUFZLEdBQUcsS0FBYTtRQUN4QixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsT0FBTyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDdEQsQ0FBQztDQUNKO0FBUEQsNEJBT0MifQ==