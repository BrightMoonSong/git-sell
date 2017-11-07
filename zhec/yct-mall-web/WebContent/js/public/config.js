//后台管理配置   
app.constant('constMapiLocation', "http://localhost:9099/yucaotang/web") // 后台接口配置
	.constant('constPageSize', 10) //默认每页显示的条数
	.constant('constManagerLocation', 'http://localhost:9099') // 后台网站访问主机地址
	//系统管理页面 confirm 提示语
	.constant('sysReminder', {
		"sysDelete": "确定删除吗？" 
	})
	//定义系统提示编码
	//type:1 正常但不alert信息  2 正常并alert信息,  3 confirm信息  , 4 提示错误信息
	.constant('constMessageCode', {
		"-403": {
			"type": 4,
			"message": "token错误"
		},
		"-401": {
			"type": 4,
			"message": "该导航栏已存在"
		},
		"-1": {
			"type": 4,
			"message": "系统错误，操作失败"
		},
		"0": {
			"type": 1,
			"message": ""
		},
		"1": {
			"type": 2,
			"message": "保存成功"
		},
		"2": {
			"type": 4,
			"message": "保存失败"
		},
		"406": {
			"type": 4,
			"message": "请稍后重试!"
		}
	})
	//定义系统提示编码`
	//type:1 正常但不alert信息  2 正常并alert信息,  3 confirm信息  , 4 提示错误信息 5 登录错误，需要重新登录
	.constant('constHttpCode', {
		"403": {
			"type": 4,
			"message": "权限不足!"
		},
		"401": {
			"type": 5,
			"message": "请重新登录!"
		},
		"406": {
			"type": 6,
			"message": "请稍后重试!"
		}
	});

/**
 * ngDialog默认属性值
 *
 */
app.config(['ngDialogProvider', function(ngDialogProvider) {
	ngDialogProvider.setDefaults({
		className: 'ngdialog-theme-default',
		plain: false,
		showClose: true,
		closeByDocument: true,
		closeByEscape: true,
		appendTo: false,
		preCloseCallback: function() {
		}
	});
}]);