module.exports = class Context {
	constructor(source) {
		if (typeof source !== 'string' && !Array.isArray(source)) throw new Error('Context sources must be either a string or an array.');
		this.type = typeof source === 'string' ? 'text' : 'tokens';
		this.infinite = false;
		this.source = source;
		this.errors = [];
		this.rules = {};
	}
	error() {
		return true;
	}
}