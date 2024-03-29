//后台管理配置
angular
	.module('managerApp')
	.constant('constMapiLocation', constMapiLocation) // 后台接口配置
	.constant('constManagerLocation', constManagerLocation) // 后台网站访问主机地址
	.constant('constPageSize', 10) //默认每页显示的条数
	.filter('priceFormatFilter', priceFormatFilter)
	//订单页面 confirm 提示语
	.constant('orderReminder', {
		"TobeCancel": "确定拒绝申请吗？", //待取消订单页面
		"shipped": "确定吗？", //已发货订单页面
		"refundable": "确定订单退款吗？", //待退款订单页面
		"pending": "确定结算订单吗？", //待结算订单页面
		"paid": { //待确认订单页面
			"ensure": "确定确定吗？",
			"cancel": "确定取消吗？"
		},
		"received": { //已收货订单页面
			"ensure": "确定要允许退货？",
			"cancel": "确定要禁止退货？"
		}
	})
	//商品页面 confirm 提示语
	.constant('goodsReminder', {
		"goodsinfo": "确定提交吗？", //商品管理页面
		"goodsinfoSpec": "已选择的属性的值不可为空！", 
		"goodsinfoSpecG": "已选择的规格的规格属性不可为空，至少选择一个！", 
		"goodsCateIdZero": "当前分类没有关联规格信息，请选择不启用！", 
		"goodsState": { //待售商品管理
			"repair": "确定维护吗？",
			"enable": "确定启用吗？",
			"forbidden": "确定禁用吗？",
			"deldden": "确定删除吗？"
		}, 
		"GoodsProperties": { //属性管理
			"enable": "确定启用吗？",
			"forbidden": "确定禁用吗？"
		},
		"goodsEditSuccess":"修改成功！",
		"goodsbranddelete":"确认删除吗"//商品管理-品牌管理
	})
	//系统管理页面 confirm 提示语
	.constant('sysReminder', {
		"sysDelete": "确定删除吗？" 
	})

	//促销管理 confirm 提示语
	.constant('promotionReminder', {
		"goodspromotion": "确定要提交审核吗？", //商品促销申请 页面
		"goodsPromotionMaintain": "确定要重新维护吗？", //商品促销 页面 维护按钮
		"disable": "确定要禁用吗？", //禁用按钮
		"addAllGoods": "确定要添加全站商品吗？" //商品促销 页面 添加全站商品
	})
	//定义系统提示编码
	//type:1 正常但不alert信息  2 正常并alert信息,  3 confirm信息  , 4 提示错误信息
	.constant('constMessageCode', {
		"-1008": {
			"type": 4,
			"message": "短信发送失败!"
		},
		"-1007": {
			"type": 4,
			"message": "发短信时间没有超过一分钟!"
		},
		"-1006": {
			"type": 4,
			"message": "type类型错误!"
		},
		"-1004": {
			"type": 4,
			"message": "该手机号未注册或已禁用!"
		},
		"-1002": {
			"type": 4,
			"message": "该手机号已注册!"
		},
		"-906": {
			"type": 4,
			"message": "该专题已推荐!"
		},
		"-905": {
			"type": 4,
			"message": "该配送员已审核完毕!"
		},
		"-904": {
			"type": 4,
			"message": "该配送员不存在!"
		},
		"-903": {
			"type": 4,
			"message": "该商品已存在!"
		},
		"-902": {
			"type": 4,
			"message": "新增失败，请先启用父级!"
		},
		"-901": {
			"type": 4,
			"message": "启用失败，请先启用父级!"
		},
		"-801": {
			"type": 4,
			"message": "该手机号已存在!"
		},
		"-708": {
			"type": 4,
			"message": "推荐品牌数量不能少于6个!"
		},
		"-707": {
			"type": 4,
			"message": "推荐品牌数量不能少于4个!"
		},
		"-706": {
			"type": 4,
			"message": "会员等级经验区间设置有误!"
		},
		"-705": {
			"type": 4,
			"message": "所有品牌均已存在,请勿重复导入!"
		},
		"-704": {
			"type": 4,
			"message": "上架时间不能为空!"
		},
		"-702": {
			"type": 4,
			"message": "-702异常，参数错误!"
		},
		"-701": {
			"type": 4,
			"message": "-701异常，校验不通过异常!"
		},
		"-700": {
			"type": 4,
			"message": "发送失败，服务器忙或今日短信发送次数已超过系统最大限制!"
		},
		"-523": {
			"type": 4,
			"message": "销售价格必须大于成本价！"
		},
		"-517": {
			"type": 4,
			"message": "请至少启用一张图片!"
		},
		"-516": {
			"type": 2,
			"message": "商品价格必须大于0！"
		},
		"-515": {
			"type": 2,
			"message": "该数据已被其他管理员处理过，请勿重复处理!"
		},
		"-510": {
			"type": 4,
			"message": "库存数量范围为0-10000！"
		},
		"-509": {
			"type": 4,
			"message": "商品描述不能为空！"
		},
		"-508": {
			"type": 4,
			"message": "说明书不能为空！"
		},
		"-505": {
			"type": 4,
			"message": "请检查商品所属分类，品牌，分店是否可用！"
		},
		"-504": {
			"type": 4,
			"message": "商品价格未填写完整无法上架！"
		},
		"-501": {
			"type": 4,
			"message": "商品图片不能为空！"
		},
		"-403": {
			"type": 4,
			"message": "token错误"
		},
		"-402": {
			"type": 4,
			"message": "密码错误"
		},
		"-401": {
			"type": 4,
			"message": "登录过期"
		},
		"-301": {
			"type": 4,
			"message": "该角色已存在"
		},
		"-203": {
			"type": 4,
			"message": "消息推送失败！"
		},
		"-202": {
			"type": 4,
			"message": "验证码已失效！"
		},
		"-201": {
			"type": 4,
			"message": "验证码输入有误！"
		},
		"-200": {
			"type": 4,
			"message": "状态错误！"
		},
		"-107": {
			"type": 4,
			"message": "非正常状态不能启用子级！"
		},
		"-106": {
			"type": 4,
			"message": "非正常状态不能添加子级！"
		},
		"-105": {
			"type": 4,
			"message": "该症状已存在！"
		},
		"-104": {
			"type": 4,
			"message": "该分类已存在！"
		},
		"-103": {
			"type": 4,
			"message": "该商品已存在！"
		},
		"-102": {
			"type": 4,
			"message": "该品牌已存在！"
		},
		"-101": {
			"type": 4,
			"message": "登录名已被使用！"
		},
		"-7": {
			"type": 4,
			"message": "密码不符合要求，请重新输入！"
		},
		"-6": {
			"type": 4,
			"message": "原密码输入错误，请重新输入！"
		},
		"-3": {
			"type": 4,
			"message": "请上传分类图片！"
		},
		"-2": {
			"type": 4,
			"message": "参数格式错误"
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
			"message": "保存成功！"
		},
		"3": {
			"type": 2,
			"message": "修改成功！"
		},
		"4": {
			"type": 2,
			"message": "密码重置成功！"
		},
		"6": {
			"type": 2,
			"message": "下架成功！"
		},
		"7": {
			"type": 2,
			"message": "上架成功！"
		},
		"8": {
			"type": 2,
			"message": "禁用成功！"
		},
		"9": {
			"type": 2,
			"message": "启用成功！"
		},
		"10": {
			"type": 2,
			"message": "删除成功！"
		},
		"11": {
			"type": 2,
			"message": "密码修改成功,请重新登录！"
		},
		"12": {
			"type": 2,
			"message": "审核成功！"
		},
		"16": {
			"type": 2,
			"message": "同步更新成功！"
		},
		"203": {
			"type": 2,
			"message": "消息发送成功！"
		},
		"401": {
			"type": 5,
			"message": "请重新登录!"
		},
		"403": {
			"type": 4,
			"message": "权限不足!"
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
		},
	});

/**
 * ngDialog默认属性值
 *
 */
var app = angular.module('managerApp');
/*
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
}]);*/