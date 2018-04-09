## Webpack Deadcode Plugin

Webpack plugin to detect unused files and unused exports in used files

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![licenses][licenses]][licenses-url]

### Installation

Via npm:

```bash
$ npm install webpack-deadcode-plugin --save-dev
```

Via yarn:

```bash
$ yarn add -D webpack-deadcode-plugin
```

![output](https://i.imgur.com/mowUPx5.png)

### Usage

The plugin will report unused files and unused exports into your terminal but those are not part of your webpack build process, therefore, it will not fail your build (warning you). Simple add into your webpack config as follows:

✍️ If you use `babel-loader`, you have to set `modules: false` to make it works

```bash
# in .babelrc
{
  "presets": [
    ["env", { modules: false }]
  ]
}

# or in webpack.config.js -> module/rules
{
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', { modules: false }
    ]
  }
}
```

**Webpack 3**

```js
const DeadCodePlugin = require('webpack-deadcode-plugin');

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

**Webpack 4**

```js
const DeadCodePlugin = require('webpack-deadcode-plugin');

const webpackConfig = {
  ...
  optimization: {
    usedExports: true,
  },
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

```js
new DeadCodePlugin(options)
```

#### options.patterns

The array of patterns to look for unused files and unused export in used files.

+ Default: `["**/*.*"]`
+ Directly pass to [`fast-glob`](https://github.com/mrmlnc/fast-glob)

#### options.exclude

The array of patterns to not look at.

#### options.context

Current working directoy for patterns above. If you don't set explicitly, your webpack context will be used.


[npm]: https://img.shields.io/npm/v/webpack.svg
[npm-url]: https://npmjs.com/package/webpack

[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/MQuy/webpack-deadcode-plugin.svg
[deps-url]: https://david-dm.org/MQuy/webpack-deadcode-plugin

[licenses]:	https://img.shields.io/github/license/MQuy/webpack-deadcode-plugin.svg
[licenses-url]: https://github.com/MQuy/webpack-deadcode-plugin/blob/master/LICENSE
