var webpack = require('webpack');
module.exports = {
	entry: "./app/js/runoob1.js",
	output: {
		path: __dirname,
		filename: "./dist/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	},
	plugins: [
		new webpack.BannerPlugin('菜鸟教程 webpack 实例')
	]
};