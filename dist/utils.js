"use strict";
exports.__esModule = true;
exports.toPosition = void 0;
function toPosition(source, index) {
    var line = 1;
    var column = 1;
    for (var i = 0; i < index; i++) {
        if (source[i] === '\r') {
            continue;
        }
        else if (source[i] === '\n') {
            line++;
            column = 1;
        }
        else {
            column++;
        }
    }
    return { line: line, column: column };
}
exports.toPosition = toPosition;
//# sourceMappingURL=utils.js.map