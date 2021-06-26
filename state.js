module.exports = class State {
	constructor(context) {
		this.context = context;
		this.index = 0;
		this.items = [];
		this.valid = true;
	}
	clone() {
		const result = new State(this.context)
		result.index = this.index;
		result.items = this.items.slice();
		result.valid = this.valid;
		return result;
	}
	merge(state) {
		this.index = state.index;
		this.items = state.items;
		this.valid = state.valid;
	}
}