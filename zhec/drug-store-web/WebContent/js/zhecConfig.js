var constManagerLocation = "http://localhost:8089" // 后台网站访问主机地址
var constMapiLocation = "http://localhost:8089/sapi"; // 后台接口配置

var constMessageCode = {
	/*
	 * 1~200配置公共字符串信息
	 */
	"1": "保存成功",
	"-104": {
		"type": 4,
		"message": "该分类已存在!"
	}
	/*
	 * 201~300配置登录注册字符串信息
	 */

	/*
	 * 301~1301配置顾问个人中心字符串信息
	 */
	//301~400配置顾问个人中心基本信息修改字符串信息
	//前50作为提示信息

	//后50作为校验信息

	//401~500配置顾问个人中心资料审核字符串信息
	//前50作为提示信息

	//后50作为校验信息

}
var constHttpCode = {
	"403": {
		"type": 4,
		"message": "权限不足!"
	},
	"401": {
		"type": 5,
		"message": "请重新登录!"
	},
}

/**
 * OSS图片上传路径配置
 */
//dev:开发环境 、test:测试环境 、pro:生产环境 、pre:预生产环境
var currentEnvironment = 'dev';

//引入静态文件      true代表oss，false代表本地
var publicFlag = false; 


var localUrl = ".";
var localOssUrl = "https://zhydl.oss-cn-beijing.aliyuncs.com/public";
var publicUrl = publicFlag?localOssUrl:localUrl;

var publicUrlMall = publicUrl + "/mall/";
var publicUrlManager = publicUrl + "/manager/";
var publicUrlConsultant = publicUrl + "/consultant/";
//业务 路径
//manager
var imgPathBrands = currentEnvironment + '/brand'; //品牌图片 路径 专有文件夹 brand

var imgPathSymptoms = currentEnvironment + '/symptoms'; //症状图片 路径 专有文件夹 symptoms
var imgPathCates = currentEnvironment + '/cate'; //分类图片 路径 专有文件夹 cate

var imgPathGoods = currentEnvironment + '/goods'; //商品管理
var imgPathRefund = currentEnvironment + '/refund'; //退单管理
var imgPathOrder = currentEnvironment + '/order'; //订单管理
var imgPathWeb = currentEnvironment + '/web'; //WEB管理   (广告位管理)
var imgPathArticles = currentEnvironment + '/articles'; //文章管理   (文章管理)
var imgPathTopic = currentEnvironment + '/topic'; //专题管理   (专题管理)
var imgPathHomeTopic = currentEnvironment + '/HomeTopic'; //首页专题管理   (首页专题主图管理)
var imgPathHomeBanner = currentEnvironment + '/HomeBanner'; //首页管理   (首页轮播图管理)
var imgPathHomeBannerType = currentEnvironment + '/HomeBannerType'; //首页管理   (首页轮播图管理--富文本)
//mall
var imgPathAfterSale = currentEnvironment + '/order/submitBill'; //申请售后
var imgPathPrescription = currentEnvironment + '/member/prescription'; //处方申请
var imgPathRank = currentEnvironment + '/member/rank'; //会员等级
//consultant
var imgPathConsultantsDetail = currentEnvironment + '/consultants'; //顾问
