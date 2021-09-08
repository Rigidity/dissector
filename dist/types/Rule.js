"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
class Rule {
    parse(state, index) {
        let cache = state.context.cache.get(index);
        let cached = cache?.get(this);
        if (cached)
            return cached;
        cached = this.run(state, index);
        if (!cache) {
            cache = new Map();
            state.context.cache.set(index, cache);
        }
        cache.set(this, cached);
        return cached;
    }
    parseString(source, options = {}) {
        const { Pick } = require('../rules/helper/Pick');
        const context = {
            source,
            cache: new Map(),
        };
        const state = {
            context,
            skip: [new Pick(' \t\r\n')],
            ...options,
        };
        let match = this.parse(state, 0);
        if ('message' in match)
            match = state.context.failure;
        return match;
    }
    static throw(context, failure) {
        if (!context.failure || context.failure.stop <= failure.stop) {
            context.failure = failure;
        }
        return failure;
    }
    static skip(state, index) {
        while (state.skip.find((item) => {
            const result = item.parse({ ...state, skip: [] }, index);
            if ('message' in result)
                return false;
            index = result.stop;
            return true;
        }))
            ;
        return index;
    }
}
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLE1BQXNCLElBQUk7SUFHZixLQUFLLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDcEMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxNQUFNO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLFdBQVcsQ0FDZCxNQUFjLEVBQ2QsVUFBMEIsRUFBRTtRQUU1QixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDakQsTUFBTSxPQUFPLEdBQVk7WUFDckIsTUFBTTtZQUNOLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtTQUNuQixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQVU7WUFDakIsT0FBTztZQUNQLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsT0FBTztTQUNiLENBQUM7UUFDRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLFNBQVMsSUFBSSxLQUFLO1lBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDO1FBQ3ZELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBZ0I7UUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUMxRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUM3QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQzFDLE9BQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pELElBQUksU0FBUyxJQUFJLE1BQU07Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDdEMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQWxERCxvQkFrREMifQ==