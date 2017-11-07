var constMallLocation       =  "http://192.168.1.17:8081"	         // web网站访问主机地址
var constLapiLocation       =  "http://192.168.1.17:8081/lapi"	     //	商城接口配置

var constManagerLocation    =  "http://localhost:8086"		     // 后台网站访问主机地址
var constMapiLocation       =  "http://localhost:8086/mapi";     // 后台接口配置

var constConsultantLocation =  "http://localhost:8087"	         // 顾问网站访问主机地址
var constCapiLocation       =  "http://localhost:8087/capi";	 //	顾问接口配置

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
