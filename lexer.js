const { zero, hide, longest, rule, any } = require('./index');
const Context = require('./context');
const State = require('./state');

module.exports = function lex(text = '', rules = {}, exact = true, include = []) {
	if (typeof text !== 'string') throw new Error('You can only execute lexers with string sources.');
	const context = new Context(text);
	Object.assign(context.rules, rules);
	for (const included of include) Object.assign(context.rules, included);
	const state = new State(context);
	const match = zero(longest(...Reflect.ownKeys(rules).map(item => rule(item))));
	let previous = state.index;
	match(state);
	if (exact) {
		if (state.index === previous || state.index < context.source.length) {
			state.valid = false;
			context.errors.push(state);
		}
	} else {
		state.valid = true;
		while (state.valid && state.index === previous && state.index < context.source.length) {
			hide(any())(state);
			previous = state.index;
			match(state);
			state.valid = true;
		}
		while (state.valid && state.index < context.source.length) hide(any())(state);
	}
	if (!state.valid) throw context.errors.sort((a, b) => b.index - a.index)[0];
	return state;
}