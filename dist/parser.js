"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Parser = void 0;
var Parser = /** @class */ (function () {
    function Parser() {
        /**
         * Some rules that are used internally.
         */
        this.skip = [this.or(' ', '\t', '\r', '\n')];
        this.boundary = this.or(this.range('a', 'z'), this.range('A', 'Z'), this.range('0', '9'), '_');
    }
    /**
     * Parses the source with the given rule.
     * @param source The text to parse.
     * @param token The default token.
     * @param error The default error.
     * @param items The rules to parse.
     * @returns The result or longest failure.
     */
    Parser.prototype.parse = function (source, token, error) {
        var items = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            items[_i - 3] = arguments[_i];
        }
        var context = { source: source, stack: [], failure: null, cache: new Map() };
        var options = {
            context: context,
            token: token,
            error: error,
            skip: this.skip
        };
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var result = this.applyRule(item, options, 0);
        if (Array.isArray(result))
            return result;
        else
            return context.failure;
    };
    /**
     * Applies a rule and returns the result.
     * @param rule The rule to apply.
     * @param options The current parser options/
     * @param index The index to start parsing at.
     * @returns Either the result or a failure.
     */
    Parser.prototype.applyRule = function (rule, options, index) {
        var _a;
        var cached = (_a = options.context.cache.get(index)) === null || _a === void 0 ? void 0 : _a.get(rule);
        if (cached)
            return cached;
        var result;
        if (typeof rule === 'string') {
            index = this.applySkip(options, index);
            if (options.context.source.startsWith(rule, index)) {
                result = this.createToken([rule], options, index, index + rule.length);
            }
            else {
                result = {
                    error: options.error,
                    start: index,
                    stop: index
                };
            }
        }
        else if (rule === null) {
            result = this.createToken([], options, index, index);
        }
        else {
            result = rule(options, index);
        }
        var cache;
        if (!options.context.cache.has(index))
            options.context.cache.set(index, new Map());
        cache = options.context.cache.get(index);
        cache.set(rule, result);
        if (!Array.isArray(result) &&
            typeof result !== 'string' &&
            (options.context.failure === null ||
                result.stop >= options.context.failure.stop)) {
            options.context.failure = result;
        }
        return result;
    };
    /**
     *
     * @param tokens The token list to convert into a new token.
     * @param options The current parser options.
     * @param start The start index of the token.
     * @param stop The stop index of the token.
     * @returns A new token that encapsulates the input.
     */
    Parser.prototype.createToken = function (tokens, options, start, stop) {
        return (typeof tokens === 'string'
            ? tokens
            : Object.assign(tokens, { start: start, stop: stop, token: options.token }));
    };
    /**
     * Prepares combinator application by skipping tokens.
     * @param options The current parser options.
     * @param index Where to start preparation.
     * @returns Where preparation was stopped.
     */
    Parser.prototype.applySkip = function (options, index) {
        var _this = this;
        var skipOptions = __assign(__assign({}, options), { skip: [] });
        while (options.skip.find(function (rule) {
            var result = _this.applyRule(rule, skipOptions, index);
            if (Array.isArray(result)) {
                index = result.stop;
                return true;
            }
            else {
                return false;
            }
        }))
            ;
        return index;
    };
    /**
     * Matches all of the rules specified.
     * @param items The rules to match.
     */
    Parser.prototype.and = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var rule = function (options, index) {
            var e_1, _a, e_2, _b;
            var results = _this.createToken([], options, index, index);
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    var result = _this.applyRule(item, options, results.stop);
                    if (Array.isArray(result)) {
                        try {
                            for (var result_1 = (e_2 = void 0, __values(result)), result_1_1 = result_1.next(); !result_1_1.done; result_1_1 = result_1.next()) {
                                var item_1 = result_1_1.value;
                                results.push(item_1);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (result_1_1 && !result_1_1.done && (_b = result_1["return"])) _b.call(result_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        results.stop = result.stop;
                    }
                    else {
                        return result;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1["return"])) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        };
        return rule;
    };
    /**
     * Returns the first match of the rules specified.
     * @param items The rules to match.
     */
    Parser.prototype.or = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var rule = function (options, index) {
            var e_3, _a;
            try {
                for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var item = items_2_1.value;
                    var result = _this.applyRule(item, options, index);
                    if (Array.isArray(result))
                        return result;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_a = items_2["return"])) _a.call(items_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return {
                error: options.error,
                start: index,
                stop: index
            };
        };
        return rule;
    };
    /**
     * Returns the longest match of the rules specified.
     * @param items The rules to match.
     */
    Parser.prototype.longest = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var rule = function (options, index) {
            var e_4, _a;
            var longest = null;
            try {
                for (var items_3 = __values(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
                    var item = items_3_1.value;
                    var result = _this.applyRule(item, options, index);
                    if (Array.isArray(result) &&
                        (longest === null || result.stop > longest.stop)) {
                        longest = result;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (items_3_1 && !items_3_1.done && (_a = items_3["return"])) _a.call(items_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return longest === null
                ? {
                    error: options.error,
                    start: index,
                    stop: index
                }
                : longest;
        };
        return rule;
    };
    /**
     * Matches a number of the rules between two values.
     * @param items The rules to match.
     */
    Parser.prototype.between = function (from, to) {
        var _this = this;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var e_5, _a;
            var results = _this.createToken([], options, index, index);
            for (var i = 0; i < to; i++) {
                var result = _this.applyRule(item, options, results.stop);
                if (Array.isArray(result)) {
                    try {
                        for (var result_2 = (e_5 = void 0, __values(result)), result_2_1 = result_2.next(); !result_2_1.done; result_2_1 = result_2.next()) {
                            var item_2 = result_2_1.value;
                            results.push(item_2);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (result_2_1 && !result_2_1.done && (_a = result_2["return"])) _a.call(result_2);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    results.stop = result.stop;
                }
                else {
                    if (i < from) {
                        return {
                            error: options.error,
                            start: results.stop,
                            stop: results.stop
                        };
                    }
                    else
                        break;
                }
            }
            return results;
        };
        return rule;
    };
    /**
     * Matches a fixed number of the rules.
     * @param items The rules to match.
     */
    Parser.prototype.repeat = function (times) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        return this.between.apply(this, __spreadArray([times, times], __read(items)));
    };
    /**
     * Matches zero or one of the rules.
     * @param items The rules to match.
     */
    Parser.prototype.optional = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this.between.apply(this, __spreadArray([0, 1], __read(items)));
    };
    /**
     * Matches zero or more of the rules.
     * @param items The rules to match.
     */
    Parser.prototype.zero = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this.between.apply(this, __spreadArray([0, Infinity], __read(items)));
    };
    /**
     * Matches one or more of the rules.
     * @param items The rules to match.
     */
    Parser.prototype.one = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this.between.apply(this, __spreadArray([1, Infinity], __read(items)));
    };
    /**
     * Allows you to assign the rules later for recursive matching.
     */
    Parser.prototype.recursive = function () {
        var _this = this;
        var wrapper = Object.assign(function (options, index) {
            return _this.applyRule(wrapper.rule, options, index);
        }, { rule: null });
        return wrapper;
    };
    /**
     * Matches the end of the source.
     */
    Parser.prototype.end = function () {
        var _this = this;
        var rule = function (options, index) {
            index = _this.applySkip(options, index);
            if (index >= options.context.source.length) {
                return _this.createToken([], options, index, index);
            }
            else {
                return { error: options.error, start: index, stop: index };
            }
        };
        return rule;
    };
    /**
     * Matches any character.
     */
    Parser.prototype.any = function () {
        var _this = this;
        var rule = function (options, index) {
            index = _this.applySkip(options, index);
            if (index < options.context.source.length) {
                return _this.createToken([options.context.source[index]], options, index, index + 1);
            }
            else {
                return { error: options.error, start: index, stop: index };
            }
        };
        return rule;
    };
    /**
     * Matches a single character between two bounds.
     * @param from The minimum character.
     * @param to The maximum character.
     */
    Parser.prototype.range = function (from, to) {
        var _this = this;
        var rule = function (options, index) {
            index = _this.applySkip(options, index);
            if (index >= options.context.source.length ||
                options.context.source[index] < from ||
                options.context.source[index] > to) {
                return { error: options.error, start: index, stop: index };
            }
            else {
                return _this.createToken([options.context.source[index]], options, index, index + 1);
            }
        };
        return rule;
    };
    /**
     * Groups a set of rules into a new token.
     * @param items The rules to group.
     */
    Parser.prototype.group = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var result = _this.applyRule(item, options, index);
            if (Array.isArray(result)) {
                return _this.createToken([result], options, result.start, result.stop);
            }
            else {
                return result;
            }
        };
        return rule;
    };
    /**
     * Changes which error the rules will throw.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    Parser.prototype.error = function (error) {
        var _this = this;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var newOptions = __assign(__assign({}, options), { error: error });
            var result = _this.applyRule(item, newOptions, index);
            if (Array.isArray(result)) {
                return _this.createToken(result, newOptions, result.start, result.stop);
            }
            else {
                return __assign(__assign({}, result), { error: error });
            }
        };
        return rule;
    };
    /**
     * Groups a set of rules together under a new token and error.
     * @param token The token that the rules represent.
     * @param error The error that the rules throw.
     * @param items The rules to match.
     */
    Parser.prototype.token = function (token) {
        var _this = this;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var newOptions = __assign(__assign({}, options), { token: token });
            var result = _this.applyRule(item, newOptions, index);
            if (Array.isArray(result)) {
                return _this.createToken([result], newOptions, result.start, result.stop);
            }
            else {
                return result;
            }
        };
        return rule;
    };
    /**
     * Matches the rules but returns no tokens.
     * @param items The rules to hide.
     */
    Parser.prototype.hide = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var result = _this.applyRule(item, options, index);
            if (Array.isArray(result)) {
                return _this.createToken([], options, result.start, result.stop);
            }
            else {
                return result;
            }
        };
        return rule;
    };
    /**
     * Combines all of the rules inside into a single token.
     * @param items The rules to combine.
     */
    Parser.prototype.combine = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            index = _this.applySkip(options, index);
            var combineOptions = __assign(__assign({}, options), { skip: [] });
            var result = _this.applyRule(item, combineOptions, index);
            function stringify(result) {
                return result
                    .map(function (item) {
                    return typeof item === 'string' ? item : stringify(item);
                })
                    .join('');
            }
            if (Array.isArray(result)) {
                return _this.createToken([stringify(result)], options, result.start, result.stop);
            }
            else {
                return result;
            }
        };
        return rule;
    };
    /**
     * Pushes a new set of options onto the stack.
     * @param options The new options to use.
     * @param items The rules to combine.
     */
    Parser.prototype.push = function (options) {
        var _this = this;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (currentOptions, index) {
            var pushOptions = __assign(__assign({}, currentOptions), options);
            currentOptions.context.stack.push(pushOptions);
            var result = _this.applyRule(item, pushOptions, index);
            currentOptions.context.stack.pop();
            return result;
        };
        return rule;
    };
    /**
     * Pops the old set of options off the stack.
     * @param items The rules to combine.
     */
    Parser.prototype.pop = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var oldOptions = options.context.stack.pop();
            var result = _this.applyRule(item, options.context.stack.length > 0
                ? options.context.stack[options.context.stack.length - 1]
                : options, index);
            if (oldOptions)
                options.context.stack.push(oldOptions);
            return result;
        };
        return rule;
    };
    /**
     * Tests for a set of rules without matching them.
     * @param positive Whether the rules should match or not.
     * @param items The rules to test for.
     */
    Parser.prototype.lookahead = function (positive) {
        var _this = this;
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var item = items.length === 1 ? items[0] : this.and.apply(this, __spreadArray([], __read(items)));
        var rule = function (options, index) {
            var result = _this.applyRule(item, options, index);
            return Array.isArray(result) === positive
                ? _this.createToken([], options, index, index)
                : { error: options.error, start: index, stop: index };
        };
        return rule;
    };
    /**
     * Matches any character if the lookahead fails.
     * @param items The rules to match.
     */
    Parser.prototype.not = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this.and(this.lookahead.apply(this, __spreadArray([false], __read(items))), this.any());
    };
    /**
     * Fails without matching anything.
     */
    Parser.prototype.exit = function () {
        var rule = function (options, index) {
            return { error: options.error, start: index, stop: index };
        };
        return rule;
    };
    /**
     * Matches a keyword that isn't followed by a rule.
     * @param text The keyword to match.
     * @param boundary What to ensure doesn't follow the keyword.
     */
    Parser.prototype.keyword = function (word, boundary) {
        if (boundary === void 0) { boundary = this.boundary; }
        return this.combine(this.and(word, this.lookahead(false, boundary)));
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map