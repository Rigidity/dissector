const util = require('util');
const Context = require('./context');
const State = require('./state');
const createModifier = require('./modifier');

// Matches text.
const text = exports.text = createModifier(function(content) {
	if (this.context.type === 'text') {
		if (this.context.source.startsWith(content, this.index)) {
			const string = new String(content);
			string.start = this.index;
			string.stop = this.index + content.length;
			this.items.push(string);
			this.index += content.length;
		} else {
			this.valid = false;
		}
	} else if (this.context.type === 'tokens') {
		if (this.index >= this.context.source.length) return this.valid = false;
		let text = this.context.source[this.index];
		if (text instanceof String ? text === content : text.flat(Infinity).join('') === content) {
			this.items.push(text);
			this.index++;
		} else {
			this.valid = false;
		}
	}
});

// Matches regex.
const regex = exports.regex = createModifier(function(content) {
	if (this.context.type === 'text') {
		const match = this.context.source.slice(this.index).match(content);
		if (match === null || match.index !== 0) return this.valid = false;
		const string = new String(match[0]);
		string.start = this.index;
		string.stop = this.index + match[0].length;
		this.items.push(string);
		this.index += match[0].length;
	} else if (this.context.type === 'tokens') {
		if (this.index >= this.context.source.length) return this.valid = false;
		let text = this.context.source[this.index];
		if (text instanceof Array) text = text.flat(Infinity).join('');
		const match = text.match(content);
		if (match === null || match.index !== 0 || match[0].length < text.length) return this.valid = false;
		this.items.push(match[0]);
		this.index += text.length;
	}
});

// Matches in a row.
const and = exports.and = createModifier(function(...items) {
	const temp = this.clone();
	for (const item of items) {
		item(temp);
		if (!temp.valid) return this.valid = false;
	}
	this.merge(temp);
});

// Matches any of a set.
const or = exports.or = createModifier(function(...items) {
	for (const item of items) {
		const temp = this.clone();
		item(temp);
		if (temp.valid) return this.merge(temp);
	}
	this.valid = false;
});

// Matches the longest.
const longest = exports.longest = createModifier(function(...items) {
	let result;
	for (const item of items) {
		const temp = this.clone();
		item(temp);
		if (temp.valid && (result === undefined || temp.index > result.index)) result = temp;
	}
	if (result === undefined) return this.valid = false;
	this.merge(result);
});

// Matches multiple times.
const between = exports.between = createModifier(function(minimum, maximum, ...items) {
	items = items.length === 1 ? items[0] : and(...items);
	const temp = this.clone();
	for (let i = 0; i < maximum; i++) {
		const before = temp.index;
		items(temp);
		if (temp.valid) {
			if (maximum === Infinity && temp.index === before && !this.context.infinite) {
				this.context.infinite = true;
				console.warn(`An infinite loop occurred while processing a ${this.context.type === 'text' ? 'lexer' : 'parser'} rule.`);
			}
		} else {
			if (i < minimum) {
				return this.valid = false;
			} else {
				temp.valid = true;
				return this.merge(temp);
			}
		}
	}
	return this.merge(temp);
});

// Matches zero or more.
const zero = exports.zero = createModifier(function(...items) {
	return between(0, Infinity, ...items)(this);
});

// Matches one or more.
const one = exports.one = createModifier(function(...items) {
	return between(1, Infinity, ...items)(this);
});

// Matches optionally.
const optional = exports.optional = createModifier(function(...items) {
	return between(0, 1, ...items)(this);
});

// Matches a number.
const repeat = exports.repeat = createModifier(function(times, ...items) {
	return between(times, times, ...items)(this);
});

// Matches anything.
const any = exports.any = createModifier(function() {
	if (this.index >= this.context.source.length) return this.valid = false;
	let item = this.context.source[this.index];
	if (typeof item === 'string') {
		item = new String(item);
		item.start = this.index;
		item.stop = this.index + 1;
	}
	this.items.push(item);
	this.index++;
});

// Matches the beginning.
const beginning = exports.beginning = createModifier(function() {
	if (this.index > 1) return this.valid = false;
});

// Matches the end.
const end = exports.end = createModifier(function() {
	if (this.index < this.context.source.length) return this.valid = false;
});

// Matches a range.
const range = exports.range = createModifier(function(from, to) {
	if (this.index >= this.context.source.length) return this.valid = false;
	let text = this.context.source[this.index];
	if (text instanceof Array) {
		const items = text.flat(Infinity);
		if (items.length !== 1) return this.valid = false;
		text = items[0];
	}
	if (text.length === 1 && text[0] >= from && text[0] <= to) {
		this.index++;
		this.items.push(text);
	} else {
		this.valid = false;
	}
});

// Joins results.
const join = exports.join = createModifier(function(...items) {
	items = items.length === 1 ? items[0] : and(...items);
	const temp = this.clone();
	temp.items = [];
	items(temp);
	if (!temp.valid) return this.valid = false;
	let result = temp.items.flat(Infinity).join('');
	if (this.context.type === 'text') {
		result = new String(result);
		result.start = this.index;
		result.stop = temp.index;
	}
	this.index = temp.index;
	this.items.push(result);
});

// Peek ahead.
const peek = exports.peek = createModifier(function(positive, ...items) {
	items = items.length === 1 ? items[0] : and(...items);
	const temp = this.clone();
	items(temp);
	if (positive !== temp.valid) return this.valid = false;
});

// Hide contents.
const hide = exports.hide = createModifier(function(...items) {
	items = items.length === 1 ? items[0] : and(...items);
	const temp = this.clone();
	items(temp);
	if (!temp.valid) return this.valid = false;
	this.index = temp.index;
});


// Anything except.
const not = exports.not = createModifier(function(...items) {
	peek(false, ...items)(this);
	if (this.valid) any()(this);
});

// Execute a rule.
const rule = exports.rule = createModifier(function(rule, group = true) {
	const content = this.context.rules[rule];
	if (content === undefined) throw new Error(`Unknown rule "${typeof rule === 'symbol' ? util.inspect(rule) : rule}"`);
	const temp = this.clone();
	if (group) temp.items = [];
	content(temp);
	if (!temp.valid) return this.valid = false;
	if (group) {
		const result = temp.items.slice();
		result.rule = rule;
		if (this.context.type === 'text') {
			result.start = this.index;
			result.stop = temp.index;
		}
		this.index = temp.index;
		this.items.push(result);
	} else {
		this.merge(temp);
	}
});

// Match a rule.
const match = exports.match = createModifier(function(rule, group = true) {
	if (this.context.type !== 'tokens' || this.index >= this.context.source.length) return this.valid = false;
	const item = this.context.source[this.index];
	if (item instanceof String || item.rule !== rule) return this.valid = false;
	if (group) this.items.push(item);
	else item.forEach(child => this.items.push(child));
	this.index++;
});

// Resolves error position.
function errorPosition(state, text) {
	const index = state.context.type === 'tokens' ? (state.index === state.context.source.length ? text.length : state.context.source[state.index].start) : state.index;
	let line = 1, column = 1;
	for (let i = 0; i < index; i++) {
		if (text[i] === '\r') continue;
		if (text[i] === '\n') {
			line++;
			column = 1;
		} else {
			column++;
		}
	}
	return { index, line, column };
}

// Circular dependencies.
const lex = require('./lexer');
const parse = require('./parser');
const State = require('./state');

// Grammar fragments.
const grammarFragments = {
	doubleStringChar: or(not(or(text('"'), text('\\'), text('\r'), text('\n'))), and(text('\\'), rule('escape')), rule('lineContinuation')),
	singleStringChar: or(not(or(text("'"), text('\\'), text('\r'), text('\n'))), and(text('\\'), rule('escape')), rule('lineContinuation')),
	escape: or(text('0'), rule('charEscape'), rule('hexEscape'), rule('unicodeEscape'), rule('extendedUnicodeEscape')),
	charEscape: or(rule('singleEscapeChar'), rule('nonEscapeChar')),
	hexEscape: and(text('x'), repeat(2, rule('hexDigit'))),
	unicodeEscape: and(text('u'), or(repeat(4, rule('hexDigit')), and(text('{'), between(2, Infinity, rule('hexDigit')), text('}')))),
	extendedUnicodeEscape: and(text('u{'), one(rule('hexDigit')), text('}')),
	singleEscapeChar: or(text("'"), text('"'), text('\\'), text('b'), text('f'), text('n'), text('r'), text('t'), text('v')),
	nonEscapeChar: not(or(text("'"), text('"'), text('b'), text('f'), text('n'), text('r'), text('t'), text('v'), text('x'), text('u'), text('\r'), text('\n'), range('0', '9'))),
	escapeChar: or(rule('singleEscapeChar'), range('0', '9'), text('x'), text('u')),
	lineContinuation: and(text('\\'), or(text('\r'), text('\n'), text('\u2028'), text('\u2029'))),
	hexDigit: or(range('0-9'), range('a', 'f'), range('A', 'F'), text('_')),
}

// Grammar lexer.
const grammarLexer = {
	string: join(or(and(text("'"), zero(rule('singleStringChar')), text("'")), and(text('"'), zero(rule('doubleStringChar')), text('"')))),
	identifier: join(or(range('a', 'z'), range('A', 'Z'), text('_')), zero(or(range('a', 'z'), range('A', 'Z'), range('0', '9'), text('_')))),
	number: join(one(range('0', '9'))),
	whitespace: regex(/\s+/),
	lbrace: text('{'),
	rbrace: text('}'),
	lbrack: text('['),
	rbrack: text(']'),
	lparen: text('('),
	rparen: text(')'),
	langle: text('<'),
	rangle: text('>'),
	comma: text(','),
	colon: text(':'),
	namespace: text('::'),
	expand: text('...'),
	semicolon: text(';'),
	pipe: text('|'),
	range: text('..'),
	one: text('+'),
	zero: text('*'),
	optional: text('?'),
	not: text('!'),
	positive: text('='),
	negative: text('-'),
	hide: text('~'),
	any: text('.'),
	beginning: text('^'),
	end: text('$'),
	single_comment: and(text('//'), zero(not(or(text('\r'), text('\n'))))),
	multi_comment: and(text('/*'), zero(or(rule('multi_comment'), not(text('*/')))), text('*/'))
}

// Grammar parser.
const grammarParser = {
	main: one(rule('rules')),
	rules: and(match('identifier'), hide(text('{')), one(rule('rule')), hide(text('}'))),
	rule: and(match('identifier'), hide(text(':')), rule('or'), hide(text(';'))),
	or: and(rule('longest'), zero(hide(text('|')), rule('longest'))),
	longest: and(rule('and'), zero(hide(text(':')), rule('and'))),
	and: one(rule('prefix')),
	prefix: and(zero(or(text('~'), text('!'), text('='), text('-'))), rule('postfix')),
	postfix: and(rule('item'), zero(or(text('?'), text('*'), text('+'), rule('between')))),
	between: and(hide(text('{')), or(and(optional(match('number')), text(','), optional(match('number'))), match('number')), hide(text('}'))),
	join: and(hide(text('[')), rule('or'), hide(text(']'))),
	reference: and(optional(text('...')), match('identifier'), optional(hide(text('::')), match('identifier'))),
	insert: and(hide(text('<')), match('identifier'), hide(text('>'))),
	item: or(rule('reference'), rule('range'), rule('join'), rule('insert'), match('string'), text('.'), text('^'), text('$'), and(hide(text('(')), rule('or'), hide(text(')')))),
	range: and(match('string'), hide(text('..')), match('string'))
}

// Grammar transpiler.
function grammar(text) {
	try {
		const tokens = lex(text, grammarLexer, true, [grammarFragments]).items.filter(item => !['whitespace', 'single_comment', 'multi_comment'].includes(item.rule));
		const ast = parse(tokens, grammarParser).main.items;
		const objects = {};
		const symbols = ['const symbols = {};'];
		for (const section of ast) {
			const name = section[0][0].toString()
			objects[name] = [];
			symbols.push(`symbols.${name} = {};`);
			for (const rule of section.slice(1)) {
				const ruleName = rule[0][0].toString();
				objects[name].push(ruleName);
				symbols.push(`symbols.${name}.${ruleName} = Symbol(${util.inspect(ruleName)});`);
			}
		}
		const grammar = ['const grammar = {};'];
		for (const section of ast) {
			const name = section[0][0].toString();
			grammar.push(`grammar.${name} = {};`);
			for (const rule of section.slice(1)) {
				const ruleName = rule[0][0].toString();
				grammar.push(`grammar.${name}[symbols.${name}.${ruleName}] = ${grammarRule(objects, name, rule[1])};`);
			}
		}
		return `($ => {\n${[...symbols, ...grammar, 'return { symbols, grammar };'].map(line => `    ${line}`).join('\n')}\n})(require(${util.inspect(__filename)}))`;
	} catch(error) {
		if (!(error instanceof State)) throw error;
		const { line, column } = errorPosition(error, text);
		throw new Error(`Syntax error while ${error.context.type === 'text' ? 'lexing' : 'parsing'} grammar at line ${line}, column ${column}.`);
	}
}

// Rule transpiler.
function grammarRule(objects, section, token) {
	switch (token.rule) {
		case 'or': return token.length === 1 ? grammarRule(objects, section, token[0]) : `$.or(${token.map(item => grammarRule(objects, section, item)).join(', ')})`;
		case 'longest': return token.length === 1 ? grammarRule(objects, section, token[0]) : `$.longest(${token.map(item => grammarRule(objects, section, item)).join(', ')})`;
		case 'and': return token.length === 1 ? grammarRule(objects, section, token[0]) : `$.and(${token.map(item => grammarRule(objects, section, item)).join(', ')})`;
		case 'join': return `$.join(${grammarRule(objects, section, token[0])})`;
		case 'item': return grammarRule(objects, section, token[0]);
		case 'string': return `$.text(${token[0].toString()})`;
		case 'range': return `$.range(${token[0].toString()}, ${token[1].toString()})`;
		case 'any': return '$.any()';
		case 'beginning': return '$.beginning()';
		case 'end': return '$.end()';
		case 'insert': {
			const name = token[0][0].toString();
			if (name === 'parser') throw new Error('You cannot insert the parser.');
			else if (section === 'parser') throw new Error('You cannot insert lexers into parsers.');
			return `$.longest(...Reflect.ownKeys(symbols.${name}).map(symbol => $.rule(symbols.${name}[symbol])))`;
		}
		case 'reference': {
			const expand = token[0].rule === 'expand' ? token.shift() !== undefined : false;
			const namespaced = token.length === 2;
			const id = namespaced ? token[1][0].toString() : token[0][0].toString();
			if (namespaced && !objects[token[0][0].toString()].includes(id)) throw new Error(`Cannot find rule "${id}" in the namespace "${token[0][0].toString()}"`);
			const namespace = namespaced ? token[0][0].toString() : objects[section].includes(id) ? section : Object.entries(objects).find(entry => entry[1].includes(id))?.[0];
			if (namespace === undefined) throw new Error(`Cannot find rule "${id}" in namespace "${section}"`);
			return `$.${(namespace === 'parser' || section !== 'parser' ? 'rule' : 'match')}(symbols.${namespace}.${id}, ${!expand})`;
		}
		case 'prefix': {
			let result = grammarRule(objects, section, token[token.length - 1]);
			for (let i = token.length - 2; i >= 0; i--) {
				const op = token[i];
				if (op.rule === 'not') result = `$.not(${result})`;
				else if (op.rule === 'positive') result = `$.peek(true, ${result})`;
				else if (op.rule === 'negative') result = `$.peek(false, ${result})`;
				else if (op.rule === 'hide') result = `$.hide(${result})`;
			}
			return result;
		}
		case 'postfix': {
			let result = grammarRule(objects, section, token[0]);
			for (let i = 1; i < token.length; i++) {
				const op = token[i];
				if (op.rule === 'optional') result = `$.optional(${result})`;
				else if (op.rule === 'zero') result = `$.zero(${result})`;
				else if (op.rule === 'one') result = `$.one(${result})`;
				else if (op.rule === 'between') {
					if (op.length === 1) {
						if (op[0].rule === 'number') result = `$.repeat(${op[0][0].toString()}, ${result})`;
						else result = `$.zero(${result})`;
					} else {
						let min = '0', max = 'Infinity';
						if (op.length === 3) {
							min = op[0][0].toString();
							max = op[2][0].toString();
						} else {
							if (op[0].rule === 'number') {
								min = op[0][0].toString();
							} else {
								max = op[1][0].toString();
							}
						}
						if (min === '0' && max === 'Infinity') result = `$.zero(${result})`;
						else if (min === '1' && max === 'Infinity') result = `$.one(${result})`;
						else if (min === '0' && max === '1') result = `$.optional(${result})`;
						else result = `$.between(${min}, ${max}, ${result})`;
					}
				}
			}
			return result;
		}
		default: throw new Error(`Unhandled rule "${token.rule}"`);
	}
}

// Export the rest.
exports.Context = Context;
exports.State = State;
exports.lex = lex;
exports.parse = parse;
exports.createModifier = createModifier;
exports.errorPosition = errorPosition;
exports.grammar = grammar;