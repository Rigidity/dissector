"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Not = void 0;
const __1 = require("../..");
const Consume_1 = require("../core/Consume");
const Lookahead_1 = require("../core/Lookahead");
class Not extends __1.And {
    item;
    constructor(item) {
        super(new Lookahead_1.Lookahead(false, item), new Consume_1.Consume());
        this.item = item;
    }
    describe(cache) {
        return `character except ${this.item.describe(cache)}`;
    }
}
exports.Not = Not;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2hlbHBlci9Ob3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTRCO0FBRzVCLDZDQUEwQztBQUMxQyxpREFBOEM7QUFFOUMsTUFBYSxHQUFJLFNBQVEsT0FBRztJQUNqQixJQUFJLENBQU87SUFDbEIsWUFBWSxJQUFVO1FBQ2xCLEtBQUssQ0FBQyxJQUFJLHFCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksaUJBQU8sRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7Q0FDSjtBQVRELGtCQVNDIn0=