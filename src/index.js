const { fork } = require('child_process');
const path = require('path');
const detectDeadcode = require('./detect');

class WebpackDeadcodePlugin {
  constructor(options = {}) {
    this.options = {
      ...options,
      patterns: options.patterns || options.pattern || [`**/*.*`],
    };
  }

  apply(compiler) {
    compiler.plugin(`after-emit`, (compilation, done) => {
      detectDeadcode(
        compilation,
        {
          context: compiler.context,
          exclude: [],
          ...this.options
        }
      );
    });
  }
}

module.exports = WebpackDeadcodePlugin;