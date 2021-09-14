const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const express = require("express");

const app = express();
const compiler = webpack(webpackConfig);

app.set("port", 3000);

app.use(
	webpackDevMiddleware(compiler, {
		noInfo: false,
		quite: false,
		overlay: false,
		historyApiFallback: true,
		stats: {
			colors: true,
			entrypoints: true,
			assets: false,
			modules: false,
			children: false,
			hash: false,
			moduleTrace: false,
		},
	}),
);
app.use(
	webpackHotMiddleware(compiler, {
		path: "/__webpack_hmr",
	}),
);

app.listen(app.get("port"), function () {
	console.log("Node app is running on port:" + app.get("port"));

	if (process.env.npm_config_openBrowser) {
		openBrowser(process.env.BROWSER_URL);
	}
});
