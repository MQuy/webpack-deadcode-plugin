const path = require('path');
const chalk = require('chalk');
const fg = require('fast-glob');

function detectDeadCode(compilation, options) {
  const assets = getWebpackAssets(compilation);
  const compiledFiles = filterWebpackAssets(assets);
  const usedPatterns = getPattern(options);
  const unusedFiles =
    fg
      .sync(usedPatterns)
      .filter((file) => !compiledFiles[file]);
  const unusedExportMap = getUsedExportMap(compilation);

  logUnusedFiles(unusedFiles);
  logUnusedExportMap(unusedExportMap);
}

function getPattern({ context, patterns, exclude }) {
  return patterns
    .concat(exclude.map((pattern) => `!${exclude}`));
}

function getUsedExportMap(compilation) {
  const unusedExportMap = {};

  compilation.chunks.forEach(function(chunk) {
    chunk.forEachModule(function(module) {
      if (module.usedExports !== true && module.providedExports !== true && /^((?!(node_modules|less)).)*$/.test(module.resource)) {
        if (module.usedExports === false) {
          unusedExportMap[module.resource] = module.providedExports;
        } else if (module.providedExports) {
          const unusedExports = module.providedExports.filter(x => !module.usedExports.includes(x));

          if (unusedExports.length > 0) {
            unusedExportMap[module.resource] = unusedExports;;
          }
        }
      }
    })
  });
  return unusedExportMap;
}

function logUnusedExportMap(unusedExportMap) {
  console.log(chalk.yellow('\n------- Unused Exports -------'));
  if (Object.keys(unusedExportMap).length > 0) {
    let numberOfUnusedExport = 0;

    Object.keys(unusedExportMap).forEach(modulePath => {
      const unusedExports = unusedExportMap[modulePath];

      console.log(chalk.yellow(`\n${modulePath}`));
      console.log(chalk.yellow(`    ⟶   ${unusedExports.join(', ')}`))
      numberOfUnusedExport += unusedExports.length;
    });
    console.log(chalk.yellow(`\nThere are ${numberOfUnusedExport} unused exports(¬º-°)¬.\n`));
  } else {
    console.log(chalk.green('\nPerfect, there is nothing to do ٩(◕‿◕｡)۶.'));
  }
}

function getWebpackAssets(compilation) {
  let assets = [...compilation.fileDependencies];

  compilation.chunks.forEach(function(chunk) {
    chunk.forEachModule(function(module) {
      assets = assets.concat(module.fileDependencies).filter(Boolean);
    })
  });

  Object.keys(compilation.assets).forEach(assetName => {
    const assetPath = compilation.assets[assetName].existsAt;

    assets.push(assetPath);
  });

  return assets;
}

function filterWebpackAssets(assets) {
  return assets
    .filter((file) => file.indexOf('node_modules') === -1)
    .reduce((acc, file) => {
      const unixFile = file.replace(/\\+/g, '/');
      acc[unixFile]= true;
      return acc;
    }, {});
}

function logUnusedFiles(unusedFiles) {
  console.log(chalk.yellow('\n------- Unused Files -------'));
  if (unusedFiles.length > 0) {
    unusedFiles.forEach((file) => console.log(chalk.yellow(file)));
    console.log(
      chalk.yellow(`\nThere are ${unusedFiles.length} unused files (¬º-°)¬.`),
      chalk.red.bold(`\n\nPlease be careful if you want to remove them.\n`),
    );
  } else {
    console.log(chalk.green('\nPerfect, there is nothing to do ٩(◕‿◕｡)۶.'));
  }
}

module.exports = detectDeadCode;