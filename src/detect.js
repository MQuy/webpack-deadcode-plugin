const path = require("path");
const chalk = require("chalk");
const fg = require("fast-glob");

function detectDeadCode(compilation, options) {
  const assets = getWebpackAssets(compilation);
  const compiledFiles = convertFilesToDict(assets);
  const includedFiles = fg.sync(getPattern(options));

  let unusedFiles = [];
  let unusedExportMap = [];

  if (options.detectUnusedFiles) {
    unusedFiles = includedFiles.filter(file => !compiledFiles[file]);
    logUnusedFiles(unusedFiles);
  }

  if (options.detectUnusedExport) {
    unusedExportMap = getUsedExportMap(convertFilesToDict(includedFiles), compilation);
    logUnusedExportMap(unusedExportMap);
  }

  if (unusedFiles.length > 0 || unusedExportMap.length > 0) {
    if (options.failOnHint) {
      process.exit(2);
    }
  }
}

function getPattern({ context, patterns, exclude }) {
  return patterns
    .map(pattern => path.resolve(context, pattern))
    .concat(exclude.map(pattern => `!${pattern}`))
    .map(convertToUnixPath);
}

function getUsedExportMap(includedFileMap, compilation) {
  const unusedExportMap = {};

  compilation.chunks.forEach(function(chunk) {
    const isWebpack5 = compilation.chunkGraph ? true : false;
    for (const module of chunk.modulesIterable) {
      if (!module.resource) continue;
      let providedExports;
      if(isWebpack5) {
        providedExports = compilation.chunkGraph.moduleGraph.getProvidedExports(module);
      } else {
        providedExports = module.providedExports || module.buildMeta.providedExports;
      }
      let usedExports;
      if(isWebpack5) {
        usedExports = compilation.chunkGraph.moduleGraph.getUsedExports(module, chunk.runtime);
      } else {
        usedExports = module.usedExports;
      }
      const path = convertToUnixPath(module.resource);
      let usedExportsArr = [];
      // in webpack 4 usedExports can be null | boolean | Array<string>
      // in webpack 5 it can be null | boolean | SortableSet<string>
      if(usedExports instanceof Set) {
        usedExportsArr = Array.from(usedExports);
      } else {
        usedExportsArr = usedExports;
      }

      if (
        usedExports !== true &&
        providedExports !== true &&
        /^((?!(node_modules)).)*$/.test(path) &&
        includedFileMap[path]
      ) {
        if (usedExports === false) {
          unusedExportMap[path] = providedExports;
        } else if (providedExports instanceof Array) {
          const unusedExports = providedExports.filter(
            x => usedExportsArr instanceof Array && !usedExportsArr.includes(x)
          );

          if (unusedExports.length > 0) {
            unusedExportMap[path] = unusedExports;
          }
        }
      }
    }
  });
  return unusedExportMap;
}

function logUnusedExportMap(unusedExportMap) {
  console.log(chalk.yellow("\n--------------------- Unused Exports ---------------------"));
  if (Object.keys(unusedExportMap).length > 0) {
    let numberOfUnusedExport = 0;

    Object.keys(unusedExportMap).forEach(modulePath => {
      const unusedExports = unusedExportMap[modulePath];

      console.log(chalk.yellow(`\n${modulePath}`));
      console.log(chalk.yellow(`    ⟶   ${unusedExports.join(", ")}`));
      numberOfUnusedExport += unusedExports.length;
    });
    console.log(chalk.yellow(`\nThere are ${numberOfUnusedExport} unused exports (¬º-°)¬.\n`));
  } else {
    console.log(chalk.green("\nPerfect, there is nothing to do ٩(◕‿◕｡)۶."));
  }
}

function getWebpackAssets(compilation) {
  let assets = Array.from(compilation.fileDependencies);

  Object.keys(compilation.assets).forEach(assetName => {
    const assetPath = compilation.assets[assetName].existsAt;

    assets.push(assetPath);
  });
  return assets;
}

function convertFilesToDict(assets) {
  return assets
    .filter(file => file && file.indexOf("node_modules") === -1)
    .reduce((acc, file) => {
      const unixFile = convertToUnixPath(file);

      acc[unixFile] = true;
      return acc;
    }, {});
}

function logUnusedFiles(unusedFiles) {
  console.log(chalk.yellow("\n--------------------- Unused Files ---------------------"));
  if (unusedFiles.length > 0) {
    unusedFiles.forEach(file => console.log(`\n${chalk.yellow(file)}`));
    console.log(
      chalk.yellow(`\nThere are ${unusedFiles.length} unused files (¬º-°)¬.`),
      chalk.red.bold(`\n\nPlease be careful if you want to remove them.\n`)
    );
  } else {
    console.log(chalk.green("\nPerfect, there is nothing to do ٩(◕‿◕｡)۶."));
  }
}

function convertToUnixPath(path) {
  return path.replace(/\\+/g, "/");
}
module.exports = detectDeadCode;
