var webpack = require('webpack');
module.exports = {
	entry: {
		bundle:["./src/js/page/index.js","./src/js/page/index2.js"]
	},
	output: {
		path: __dirname,
		filename: "./dist/[name].js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	}
};