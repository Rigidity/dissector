"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const __1 = require("../..");
const Rule_1 = require("../../types/Rule");
class Group extends Rule_1.Rule {
    content;
    name;
    constructor(name, ...items) {
        super();
        this.content = items.length === 1 ? items[0] : new __1.And(...items);
        this.name = name;
    }
    describe(cache) {
        return this.name
            ? this.name
            : `group of ${this.content.describe(cache)}`;
    }
    run(state, index) {
        const result = this.content.parse(state, index);
        if ('message' in result)
            return result;
        return Object.assign([
            Object.assign(result, this.name
                ? {
                    name: this.name,
                    start: result.start,
                    stop: result.stop,
                }
                : {
                    start: result.start,
                    stop: result.stop,
                }),
        ], {
            start: result.start,
            stop: result.stop,
        });
    }
}
exports.Group = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvbWV0YS9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNEI7QUFJNUIsMkNBQXdDO0FBR3hDLE1BQWEsS0FBTSxTQUFRLFdBQUk7SUFDcEIsT0FBTyxDQUFPO0lBQ2QsSUFBSSxDQUFnQjtJQUMzQixZQUFZLElBQW1CLEVBQUUsR0FBRyxLQUFhO1FBQzdDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTSxRQUFRLENBQUMsS0FBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSTtZQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNYLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUNNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLElBQUksTUFBTTtZQUFFLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDaEI7WUFDSSxNQUFNLENBQUMsTUFBTSxDQUNULE1BQU0sRUFDTixJQUFJLENBQUMsSUFBSTtnQkFDTCxDQUFDLENBQUM7b0JBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztvQkFDbkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2lCQUNwQjtnQkFDSCxDQUFDLENBQUM7b0JBQ0ksS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO29CQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7aUJBQ3BCLENBQ1Y7U0FDSixFQUNEO1lBQ0ksS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtTQUNwQixDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0Q0Qsc0JBc0NDIn0=