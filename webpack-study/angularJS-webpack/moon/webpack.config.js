var webpack=require('webpack');

module.exports = { //配置项
	entry: "./runoob1.js",//打包的入口文件，一个字符串或者一个对象
		　　　　output: //配置打包的结果，一个对象
		　　　　　　fileName： //定义输出文件名，一个字符串
	　　　　　　 path： //定义输出文件路径，一个字符串
	　　　　 module: //定义对模块的处理逻辑，一个对象
		　　　　　　loaders： //定义一系列的加载器，一个数组
	　　　　　　　　[　　　　　　　　　　{　　　　　　　　　　　　
		test: //正则表达式，用于匹配到的文件
			　　　　　　　　　　　　loader / loaders： //字符串或者数组，处理匹配到的文件。如果只需要用到一个模块加载器则使用　　　　　　　　　　　　　　　　　loader：string，如果要使用多个模块加载器，则使用loaders：array
		　　　　　　　　　　　　 include: //字符串或者数组，指包含的文件夹
			　　　　　　　　　　　　exclude： //字符串或者数组，指排除的文件夹
		　　　　　　　　　　
	}　　　　　　　　]　　　　 resolve: //影响对模块的解析，一个对象
		　　　　　　extensions： //自动补全识别后缀，是一个数组

	　　　　 plugins: //定义插件，一个数组
	　　　　
}