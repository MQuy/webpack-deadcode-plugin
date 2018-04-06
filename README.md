## Webpack Deadcode Plugin

Webpack plugin to detect unused files and unused exports in used files

### Installation

Via npm:

```
$ npm install webpack-deadcode-plugin --save-dev
```

Via yarn:

```
$ yarn add -D webpack-deadcode-plugin
```

### Usage

The plugin will report unused files and unused exports into your terminal but those are not part of your webpack build process, therefore, it will not fail your build (warning you). Simple add into your webpack config as follows:

```
const DeadCodePlugin = require('webpack-deadcode-plugin);

const webpackConfig = {
  ...
  plugins: [
    new DeadCodePlugin({
      patterns: [
        'src/**/*.(js|jsx|css)',
      ],
      exclude: [
        '**/*.(stories|spec).(js|jsx)',
      ],
    })
  ]
}
``` 

### Configuration

```
new DeadCodePlugin(options)
```

#### options.patterns

The array of patterns to look for unused files and unused export in used files.

+ Default: `["**/*.*"]`
+ Directly pass to `[fast-glob](https://github.com/mrmlnc/fast-glob)`

#### options.exclude

The array of patterns to not look at.

#### options.context

Current working directoy for patterns above. If you don't set explicitly, your webpack context will be used.