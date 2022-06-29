const path = require("path");
const detectDeadcode = require("./detect");

class WebpackDeadcodePlugin {
	constructor(options = {}) {
		this.options = options;
	}

	apply(compiler) {
		const options = Object.assign(
			{
				patterns: ["**/*.*"],
				exclude: [],
				context: compiler.context,
				failOnHint: false,
				detectUnusedFiles: true,
				detectUnusedExport: true,
				log: "all",
				exportJSON: false,
			},
			this.options,
		);

		if (compiler.hooks) {
			compiler.hooks.afterEmit.tapAsync("WebpackDeadcodePlugin", this.handleAfterEmit.bind(this, options));
		} else {
			compiler.plugin(`after-emit`, this.handleAfterEmit.bind(this, options));
		}
	}

	handleAfterEmit(options, compilation, callback) {
		detectDeadcode(compilation, options);
		callback();
	}
}

module.exports = WebpackDeadcodePlugin;
