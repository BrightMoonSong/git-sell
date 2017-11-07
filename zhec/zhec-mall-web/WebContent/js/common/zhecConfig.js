var constMallLocation = "http://localhost:8081" // web网站访问主机地址
var constLapiLocation = "http://localhost:8081/lapi" //	商城接口配置

var constManagerLocation = "http://localhost:8086" // 后台网站访问主机地址
var constMapiLocation = "http://localhost:8086/mapi"; // 后台接口配置

var constConsultantLocation = "http://localhost:8087" // 顾问网站访问主机地址
var constCapiLocation = "http://localhost:8087/capi"; //	顾问接口配置

var ConstBaseLocation = constLapiLocation;

var zhecDisplayMessage = {
	welcome: '欢迎来到鹿医生！', //页面头部的欢迎语
	certificateNumber: '互联网药品交易服务资格证书编号: 京 C20140004 京ICP备11029626号 互联网药品信息服务资格证书:（京）-非经营性-2014-0014', //页面尾部的 互联网药品交易服务资格证书编号
	copyright: 'Copyright @ 2000-2016 北京众会技术有限公司-众会技术网上药店版权所有',
	serverBusy: '服务器忙！',
	injector401: '请您先登录！',
	passwordLength: '密码长度为6-12位，请重新输入！',
	//提交订单页面提示信息
	invoiceTitleWrite: '请您先填写单位发票抬头！',
	goLogin: '请您先登录，才可以提交订单！',
	ReceivingAddress: "收货地址太多了,大于20个不可再添加!",
	setAddress: "请先设置收货地址！",
	orderPriceChanges: '订单价格有变动！请稍后重试！',
	underStock: '库存不足！',
	orderPriceWrong: '订单价格有误！',
	goodsLaidDown: '商品已下架！',
	//支付页面
	orderError: '订单错误！',
	repeatedPayment: '重复支付！',
	orderNotExist: '订单不存在！',
	codeNotBeEmpty: '验证码不得为空！',
	//申请售后页面
	pleaseLoginFirst: '请您先登录！',
	goodsCanNotBeReturned: '该商品不可退货！',
	returnOrReturn: '该商品已在退货中或退货完成！',
	submitFailed: '提交失败！',
	//登录页面
	accountHasBeenDisabled: '该账户已被禁用！',
	//忘记密码页面
	enterYourPhoneNumber: '请输入手机号！',
	phoneNumberFormatNotCorrect: '输入手机号格式不正确！',
	pleaseRegisterFirst: '该手机号还未注册，请先去注册！',
	changeSuccess: '恭喜您，修改成功！',
	//详情页面
	detailInputTitle: '请输入发票抬头！',
	detailInputEmail: '请输入电子发票邮箱！',
	detailApplyAddress: '请先完善收货地址！',
	detailApplyname: '请先填写姓名！',
	detailNoPhone: '请输入电话信息！',
	detailNotPhone: '电话输入不正确！',
	detailApplyMobile: '请先填写手机号！',
	detailApplycheckMobile: '号码有误，请重填！',
	detailApplyPre: '请上传处方证明！',
	detailApplySuccess1: '提交成功,请等待工作人员联系您！',
	detailApplySuccess2: '提交成功,可以前去个人中心处方申请查看申请状态！',
	detailCollection: '收藏成功!',
	detailnoMoreStock: '抱歉！库存不足',
	detailIfCollect: '取消收藏！',
	//留言板页面
	messageBoardNoMessage: '请先填写文字或者上传图片！',
	//购物车页面
	cartUnderStock: '库存不足!',
	cartSelectGoods: '请先选择商品！',
	cartDeleteGoods: '确认删除商品？',
	cartRemoveCollection: '确认移入收藏？',
	saveSuccess: '保存成功！',
	//订单详情页面

	//注册页面
	registerCodeNotCorrect: '验证码不正确，请重新输入！',
	phoneCodeChecked1: '验证码不正确',
	phoneCodeChecked2: '验证码已失效',
	registerCodefailure: '验证码已失效，请重新获取！',
	registerSuccess: '恭喜您！注册成功',
	registerCodeWrong: '验证码不正确，请重新输入！',
	registerNoCode: '请重新获取验证码！',
	//个人中心头部
	welcomeBeerDoctor: "您好！欢迎来到鹿医生!",
	//取消总订单弹窗
	confirmCancleOrder: "确认取消订单?",
	cancleSuccess: "取消订单成功",
	//确认收货订单
	confirmReceiveOrder: "确认收货？",
	confirmReceiveSucess: "确认收货成功",
	//取消申请退单
	cancleOrderApply: "取消申请？",
	cancleOrderApplySuccess: "取消申请成功",
	//登录
	loginIdNull: "请输入用户名！",
	passwordNull: "请输入密码！",
	captchaNull: "请输入验证码！",

	//个人中心 地址管理页面
	addressSaveSuccess: '地址保存成功！',
	addressSaveDefeated: '地址保存失败！',
	addressDeleteSuccess: '地址删除成功！',
	addressDeleteDefeated: '地址删除失败！',
	addressSetDefaultSuccess: '设置默认地址成功！',
	addressSetDefaultDefeated: '设置默认地址失败！',
}

/**
 * OSS图片上传路径配置
 */
//dev:开发环境 、test:测试环境 、pro:生产环境 、pre:预生产环境
var currentEnvironment = 'dev';

//引入静态文件      true代表oss，false代表本地
var publicFlag = false; 


var localUrl = ".";
var localOssUrl = "https://lys613.oss-cn-beijing.aliyuncs.com/public";
var publicUrl = publicFlag?localOssUrl:localUrl;

var publicUrlMall = publicUrl + "/mall/";
var publicUrlManager = publicUrl + "/manager/";
var publicUrlConsultant = publicUrl + "/consultant/";
//业务 路径
//manager
var imgPathBrands = currentEnvironment + '/brand'; //品牌图片 路径 专有文件夹 brand
var imgPathGoods = currentEnvironment + '/goods'; //商品管理
var imgPathRefund = currentEnvironment + '/refund'; //退单管理
var imgPathOrder = currentEnvironment + '/order'; //订单管理
var imgPathWeb = currentEnvironment + '/web'; //WEB管理   (广告位管理)
var imgPathArticles = currentEnvironment + '/articles'; //文章管理   (文章管理)
//mall
var imgPathAfterSale = currentEnvironment + '/order/submitBill'; //申请售后
var imgPathPrescription = currentEnvironment + '/member/prescription'; //处方申请
//consultant
var imgPathConsultantsDetail = currentEnvironment + '/consultants'; //顾问

//页面title管理
var titleManage = {
	afterSales:'申请售后-鹿医生',//申请售后页面
	placeOrder:'提交订单-鹿医生',//提交订单页面
	payMoney:'支付页面 - 鹿医生',//支付页面
	ForgetPwd:'忘记密码 - 鹿医生',
	login:'登录 - 鹿医生',
	register: '注册 - 鹿医生'
}

var PiwikConfig = {
	url:'//192.168.1.111:81/piwik/',
	home:'piwik.php'
}
