//后台管理配置
angular
	.module('managerApp')
	.constant('constMapiLocation', constMapiLocation) // 后台接口配置
	.constant('constCapiLocation', constCapiLocation) //	顾问接口配置
	.constant('constLapiLocation', constLapiLocation) //	商城接口配置  
	.constant('constConsultantLocation', constConsultantLocation) // 顾问网站访问主机地址
	.constant('constMallLocation', constMallLocation) // web网站访问主机地址
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
			"forbidden": "确定禁用吗？"
		}, 
		"GoodsProperties": { //属性管理
			"enable": "确定启用吗？",
			"forbidden": "确定禁用吗？"
		},
		"goodsEditSuccess":"修改成功！"
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
		"-612": {
			"type": 4,
			"message": "请选择活动使用平台！"
		},
		"-611": {
			"type": 4,
			"message": "商品促销价不能低于销售底价！"
		},
		"-610": {
			"type": 4,
			"message": "促销开始时间必须小于结束时间！"
		},
		"-609": {
			"type": 4,
			"message": "所选商品已经参加过同类促销活动，请勿重复添加！"
		},
		"-608": {
			"type": 4,
			"message": "优惠额度必须小于使用门槛!"
		},
		"-607": {
			"type": 4,
			"message": "商品促销价不能大于原价!"
		},
		"-606": {
			"type": 4,
			"message": "活动已结束!"
		},
		"-605": {
			"type": 4,
			"message": "请选择促销商品!"
		},
		"-604": {
			"type": 4,
			"message": "可发放优惠券数量为0!"
		},
		"-603": {
			"type": 4,
			"message": "所选会员均已拥有此优惠券，请勿重复发放!"
		},
		"-602": {
			"type": 4,
			"message": "该会员已拥有此优惠券，请勿重复发放!"
		},
		"-601": {
			"type": 4,
			"message": "促销活动正在进行中，无法修改!"
		},
		"-523": {
			"type": 4,
			"message": "销售价格必须大于成本价。"
		},
		"-522": {
			"type": 4,
			"message": "销售底价必须大于或等于成本价。"
		},
		"-521": {
			"type": 4,
			"message": "销售价格必须大于或等于销售底价。"
		},
		"-520": {
			"type": 4,
			"message": "属性输入类型为单选或多选时请至少选择一项属性值！"
		},
		"-519": {
			"type": 4,
			"message": "商品重量非空"
		},
		"-518": {
			"type": 4,
			"message": "商品库存预警值不能小于或等于0!"
		},
		"-517": {
			"type": 4,
			"message": "请至少启用一张图片!"
		},
		"-516": {
			"type": 2,
			"message": "商品价格不可以为0."
		},
		"-515": {
			"type": 2,
			"message": "该数据已被其他管理员处理过，请勿重复处理!"
		},
		"-513": {
			"type": 4,
			"message": "销售底价校验未通过!"
		},
		"-512": {
			"type": 4,
			"message": "保存失败,请检查'SKU'等相关信息是否正确!"
		},
		"-511": {
			"type": 4,
			"message": "非'待售'状态的商品无法上架"
		},
		"-510": {
			"type": 4,
			"message": "商品描述和说明书不能为空"
		},
		"-509": {
			"type": 4,
			"message": "商品描述不能为空"
		},
		"-508": {
			"type": 4,
			"message": "说明书不能为空"
		},
		"-507": {
			"type": 4,
			"message": "过滤属性不能为空"
		},
		"-506": {
			"type": 4,
			"message": "商品规格不能为空"
		},
		"-504": {
			"type": 4,
			"message": "商品价格未填写完整无法上架。"
		},
		"-503": {
			"type": 4,
			"message": "请上传规格图片！"
		},
		"-502": {
			"type": 4,
			"message": "库存数量不能低于预警数量"
		},
		"-501": {
			"type": 4,
			"message": "商品图片不能为空"
		},
		"-403": {
			"type": 4,
			"message": "token错误"
		},
		"-401": {
			"type": 4,
			"message": "该导航栏已存在"
		},
		"-301": {
			"type": 4,
			"message": "该角色已存在"
		},
		"-203": {
			"type": 4,
			"message": "拒绝申请时，请填写备注信息！"
		},
		"-202": {
			"type": 4,
			"message": "状态不可修改，请检查上级分类状态"
		},
		"-201": {
			"type": 4,
			"message": "审核状态错误"
		},
		"-200": {
			"type": 4,
			"message": "状态错误"
		},
		"-111": {
			"type": 4,
			"message": "有重复分组名存在，请重新填写！"
		},
		"-110": {
			"type": 4,
			"message": "有重复的规格属性名称存在，请重新填写！"
		},
		"-109": {
			"type": 4,
			"message": "有重复的属性值存在，请重新填写！"
		},
		"-108": {
			"type": 4,
			"message": "该属性已存在，请重新填写！"
		},
		"-107": {
			"type": 4,
			"message": "该SKU已存在，请重新填写！"
		},

		"-106": {
			"type": 4,
			"message": "需要上传主图的规格只能选择一个！"
		},
		"-105": {
			"type": 4,
			"message": "该规格已存在"
		},
		"-104": {
			"type": 4,
			"message": "该分类已存在"
		},
		"-103": {
			"type": 4,
			"message": "该商品已存在"
		},
		"-102": {
			"type": 4,
			"message": "该品牌已存在"
		},
		"-101": {
			"type": 4,
			"message": "登录名已被使用"
		},
		"-7": {
			"type": 4,
			"message": "密码不符合要求，请重新输入！"
		},
		"-6": {
			"type": 4,
			"message": "原密码输入错误，请重新输入！"
		},
		"-5": {
			"type": 4,
			"message": "筛选属性的输入类型只能是选择输入！"
		},
		"-4": {
			"type": 4,
			"message": "输入类型为单选或多选时请至少新增两条可用的属性信息！"
		},
		"-3": {
			"type": 4,
			"message": "请至少填写一条属性信息！"
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
			"message": "保存成功"
		},
		"2": {
			"type": 4,
			"message": "保存失败"
		},
		"3": {
			"type": 2,
			"message": "状态修改成功"
		},
		"4": {
			"type": 2,
			"message": "密码重置成功"
		},
		"5": {
			"type": 2,
			"message": "商品提交成功"
		},
		"6": {
			"type": 2,
			"message": "下架成功"
		},
		"7": {
			"type": 2,
			"message": "上架成功"
		},
		"8": {
			"type": 2,
			"message": "禁用成功"
		},
		"9": {
			"type": 2,
			"message": "启用成功"
		},
		"10": {
			"type": 2,
			"message": "移入成功!"
		},
		"11": {
			"type": 2,
			"message": "密码修改成功,请重新登录！"
		},
		"12": {
			"type": 2,
			"message": "优惠券发放成功！"
		},
		"13": {
			"type": 2,
			"message": "提交成功，等待审核！"
		},
		"14": {
			"type": 2,
			"message": "修改成功"
		},
		"15": {
			"type": 2,
			"message": "新增成功"
		},
		"16": {
			"type": 2,
			"message": "操作成功"
		},
		"17": {
			"type": 2,
			"message": "库存不足，请重新填写。"
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