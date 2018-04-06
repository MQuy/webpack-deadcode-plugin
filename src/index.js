const path = require('path');
const detectDeadcode = require('./detect');

class WebpackDeadcodePlugin {
  constructor(options = {}) {
    this.options = Object.assign(options, { patterns: options.patterns || [`**/*.*`]});
  }

  apply(compiler) {
    compiler.plugin(`after-emit`, (compilation, callback) => {
      const options = Object.assign({ context: compiler.context, patterns: ["**/*.*"], exclude: [] }, this.options);

      detectDeadcode(compilation, options);
      callback();
    });
  }
}

module.exports = WebpackDeadcodePlugin;
