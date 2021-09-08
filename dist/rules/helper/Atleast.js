"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atleast = void 0;
const Between_1 = require("../core/Between");
class Atleast extends Between_1.Between {
    constructor(amount, ...items) {
        super(amount, Infinity, ...items);
    }
    describe(cache) {
        return `at least ${this.from} of ${this.content.describe(cache)}`;
    }
}
exports.Atleast = Atleast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXRsZWFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9oZWxwZXIvQXRsZWFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2Q0FBMEM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsaUJBQU87SUFDaEMsWUFBWSxNQUFjLEVBQUUsR0FBRyxLQUFhO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLFlBQVksSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3RFLENBQUM7Q0FDSjtBQVBELDBCQU9DIn0=