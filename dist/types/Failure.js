"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpFailure = void 0;
const __1 = require("..");
function dumpFailure(source, failure) {
    const position = __1.toPosition(source, failure.start);
    return `${failure.message} at ${position.line}:${position.column}`;
}
exports.dumpFailure = dumpFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFpbHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9GYWlsdXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBCQUFnQztBQVVoQyxTQUFnQixXQUFXLENBQUMsTUFBYyxFQUFFLE9BQWdCO0lBQ3hELE1BQU0sUUFBUSxHQUFHLGNBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxPQUFPLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZFLENBQUM7QUFIRCxrQ0FHQyJ9