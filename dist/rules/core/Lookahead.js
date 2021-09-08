"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lookahead = void 0;
const Rule_1 = require("../../types/Rule");
const And_1 = require("./And");
class Lookahead extends Rule_1.Rule {
    positive;
    content;
    constructor(positive, ...items) {
        super();
        this.positive = positive;
        this.content = items.length === 1 ? items[0] : new And_1.And(...items);
    }
    describe(cache) {
        return `${this.positive ? 'positive' : 'negative'} lookahead ${this.content.describe(cache)}`;
    }
    run(state, index) {
        const output = this.content.parse(state, index);
        if ('message' in output === this.positive) {
            return {
                message: `${this.positive ? 'Expected' : 'Unexpected'} ${this.content.describe(new Map())}`,
                start: index,
                stop: index,
            };
        }
        else {
            return Object.assign([], {
                start: index,
                stop: index,
            });
        }
    }
}
exports.Lookahead = Lookahead;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9va2FoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3J1bGVzL2NvcmUvTG9va2FoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUV4QywrQkFBNEI7QUFFNUIsTUFBYSxTQUFVLFNBQVEsV0FBSTtJQUN4QixRQUFRLENBQVU7SUFDbEIsT0FBTyxDQUFPO0lBQ3JCLFlBQVksUUFBaUIsRUFBRSxHQUFHLEtBQWE7UUFDM0MsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNNLFFBQVEsQ0FBQyxLQUF1QjtRQUNuQyxPQUFPLEdBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUNqQyxjQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkMsT0FBTztnQkFDSCxPQUFPLEVBQUUsR0FDTCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUN0QyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FDSjtBQTlCRCw4QkE4QkMifQ==