"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const And_1 = require("../core/And");
const Literal_1 = require("../core/Literal");
const Hide_1 = require("../meta/Hide");
const Optional_1 = require("./Optional");
const Zero_1 = require("./Zero");
class List extends And_1.And {
    item;
    delimiter;
    trailing;
    constructor(item, delimiter = new Hide_1.Hide(new Literal_1.Literal(',')), trailing = false) {
        super(item, new Zero_1.Zero(delimiter, item), ...(trailing ? [new Optional_1.Optional(delimiter)] : []));
        this.item = item;
        this.delimiter = delimiter;
        this.trailing = trailing;
    }
    describe(cache) {
        return `${this.trailing ? 'trailing ' : ''}list of ${this.item.describe(cache)} delimited by ${this.delimiter.describe(cache)}`;
    }
}
exports.List = List;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydWxlcy9oZWxwZXIvTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBa0M7QUFDbEMsNkNBQTBDO0FBQzFDLHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFDdEMsaUNBQThCO0FBRTlCLE1BQWEsSUFBSyxTQUFRLFNBQUc7SUFDbEIsSUFBSSxDQUFPO0lBQ1gsU0FBUyxDQUFPO0lBQ2hCLFFBQVEsQ0FBVTtJQUN6QixZQUNJLElBQVUsRUFDVixZQUFrQixJQUFJLFdBQUksQ0FBQyxJQUFJLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDNUMsV0FBb0IsS0FBSztRQUV6QixLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFDekIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQXVCO1FBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDbkUsS0FBSyxDQUNSLGlCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQXZCRCxvQkF1QkMifQ==