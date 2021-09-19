"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpMatch = void 0;
const __1 = require("..");
function dumpMatch(source, match, indent = 0) {
    let result;
    if (typeof match === 'string') {
        result = JSON.stringify(match);
    }
    else if ('name' in match) {
        const start = __1.toPosition(source, match.start);
        const stop = __1.toPosition(source, match.stop);
        result = `${match.name} (${start.line}:${start.column} to ${stop.line}:${stop.column})${match.length > 0 ? ':' : ''}\n${match
            .map((item) => dumpMatch(source, item, indent + 1))
            .join('\n')}`;
    }
    else {
        const start = __1.toPosition(source, match.start);
        const stop = __1.toPosition(source, match.stop);
        result = `(${start.line}:${start.column} to ${stop.line}:${stop.column})${match.length > 0 ? ':' : ''}\n${match
            .map((item) => dumpMatch(source, item, indent + 1))
            .join('\n')}`;
    }
    return '  '.repeat(indent) + result;
}
exports.dumpMatch = dumpMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvTWF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEJBQWdDO0FBWWhDLFNBQWdCLFNBQVMsQ0FDckIsTUFBYyxFQUNkLEtBQVksRUFDWixTQUFpQixDQUFDO0lBRWxCLElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxNQUFNLElBQUksS0FBSyxFQUFFO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLGNBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLGNBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxPQUNqRCxJQUFJLENBQUMsSUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEtBQUs7YUFDbkQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDckI7U0FBTTtRQUNILE1BQU0sS0FBSyxHQUFHLGNBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLGNBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxJQUNuRCxJQUFJLENBQUMsTUFDVCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLO2FBQ3BDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN4QyxDQUFDO0FBMUJELDhCQTBCQyJ9