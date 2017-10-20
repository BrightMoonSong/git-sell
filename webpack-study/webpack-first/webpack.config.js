var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var jqueryPlugin = new webpack.ProvidePlugin({
	$: "jquery",
	jQuery: "jquery"
});
module.exports = {
	//插件项
	plugins: [commonsPlugin, jqueryPlugin],
	//页面入口文件配置
	entry: {
		page1: "./src/js/page1/1.js",
		//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
		page2: ["./src/js/entry1/entry1.js", "./src/js/entry2/entry2.js"]
		//该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。
		//index: './src/js/page/index.js'
	},
	//入口文件输出配置
	output: {
		path: __dirname,
		filename: './dist/[name].bundle.js'
	},
	module: {
		//加载器配置
		//"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
		loaders: [
			//.css 文件使用 style-loader 和 css-loader 来处理
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			//.js 文件使用 jsx-loader 来编译处理--已经废弃，用babel-loader
			{
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			},
			//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
			{
				test: /\.scss$/,
				loader: 'style!css!sass?sourceMap'
			},
			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			},
			//字体文件
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			},
			{
				test: /\.(woff|woff2)$/,
				loader: "url?prefix=font/&limit=5000"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	}
	/*,
	    //其它解决方案配置
	    resolve: {
	    	//查找module的话从这里开始查找
	        root: 'E:/github/flux-example/src', //绝对路径
	        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
	        extensions: ['', '.js', '.json', '.scss'],
	        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
	        alias: {
	            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
	            ActionType : 'js/actions/ActionType.js',
	            AppAction : 'js/actions/AppAction.js'
	        }
	    }*/
};