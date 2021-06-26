const { rule, hide, any } = require('.');
const Context = require('./context');
const State = require('./state');

module.exports = function parse(tokens = [], rules = {}, exact = true, include = []) {
	return new Proxy({}, {
		get: (_, name) => {
			if (!Array.isArray(tokens)) throw new Error('You can only execute parsers with token sources.');
			const context = new Context(tokens);
			Object.assign(context.rules, rules);
			for (const included of include) Object.assign(context.rules, included);
			const state = new State(context);
			const match = rule(name, false);
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
	});
}