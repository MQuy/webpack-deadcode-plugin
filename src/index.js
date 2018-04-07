const path = require('path');
const detectDeadcode = require('./detect');

class WebpackDeadcodePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const options = Object.assign({ patterns: ['**/*.*'], exclude: [], context: compiler.context }, this.options);

    compiler.plugin(`after-emit`, (compilation, callback) => {
      detectDeadcode(compilation, options);
      callback();
    });
  }
}

module.exports = WebpackDeadcodePlugin;
