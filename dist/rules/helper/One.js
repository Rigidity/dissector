"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.One = void 0;
const Between_1 = require("../core/Between");
class One extends Between_1.Between {
    constructor(...items) {
        super(1, Infinity, ...items);
    }
    describe(cache) {
        return `one or more of ${this.content.describe(cache)}`;
    }
}
exports.One = One;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2hlbHBlci9PbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkNBQTBDO0FBRTFDLE1BQWEsR0FBSSxTQUFRLGlCQUFPO0lBQzVCLFlBQVksR0FBRyxLQUFhO1FBQ3hCLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLGtCQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQzVELENBQUM7Q0FDSjtBQVBELGtCQU9DIn0=