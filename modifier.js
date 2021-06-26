// Modifier generator.
module.exports = function createModifier(handler) {
	return (...args) => state => {
		let attempted = false;
		function error() {
			if (state.context.error.apply(state)) {
				state.context.errors.push(state);
				return true;
			} else {
				return false;
			}
		}
		while (!attempted || (!state.valid && !error())) {
			handler.apply(state, args);
			attempted = true;
		}
		return state;
	}
}