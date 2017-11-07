/**
 * Created by shy on 2016/12/14.
 */

app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
	$urlRouterProvider.otherwise("/main/index");
	//$urlRouterProvider.when('',"/center");
	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug: true
	});
	$stateProvider
		.state('main', { //有底部
			url: "/main",
			templateUrl: "views/common/content.html",
		})
		.state('info', { //没有底部
			url: "/info",
			templateUrl: "views/common/info.html",
		})
		.state('info.register', { //注册
			url: "/register-:memberId",
			templateUrl: "views/register/register.html",
			controller: 'registerController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/register/registerController.js",
							"js/services/register/registerService.js",
							"css/screen.css",
							"css/login.css"
						]
					}])
				}]
			}
		})
		.state('info.login', { //登录
			url: "/login",
			templateUrl: "views/login/login.html",
			controller: 'loginController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/login/loginController.js",
							"js/services/login/loginService.js",
							"css/screen.css",
							"css/login.css"
						]
					}])
				}]
			}
		})
		.state('info.forgetpwd', { //忘记密码
			url: "/forgetpwd",
			templateUrl: "views/login/ForgetPwd.html",
			controller: 'ForgetPwdController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/login/ForgetPwdController.js",
							"js/services/login/ForgetPwdService.js",
							"css/screen.css",
							"css/login.css"
						]
					}])
				}]
			}
		})
		.state('info.submitorder', { //提交订单
			url: "/submitorder-:type-:productId-:productCount-:consultantId",
			templateUrl: "views/order/SubmitOrder.html",
			controller: 'SubmitOrderController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/order/SubmitOrderController.js",
							"js/services/order/SubmitOrderService.js",
							"css/screen.css",
							"css/detail.css",
							"css/xuqiu.css",
							"css/bill.css",
							"css/orderdetails.css",
							"css/addresscarte.css"
						]
					}])
				}]
			}
		})
		.state('info.submitorder1', { //提交订单
			url: "/submitorder-:type",
			templateUrl: "views/order/SubmitOrder.html",
			controller: 'SubmitOrderController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/order/SubmitOrderController.js",
							"js/services/order/SubmitOrderService.js",
							"css/screen.css",
							"css/detail.css",
							"css/xuqiu.css",
							"css/bill.css",
							"css/orderdetails.css",
							"css/addresscarte.css"
						]
					}])
				}]
			}
		})
		.state('info.orderaddress', { //提交订单 的 收货地址 页面
			url: "/orderaddress",
			templateUrl: "views/order/orderAddress.html",
			controller: 'orderAddressController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/order/orderAddressController.js",
							"js/services/order/orderAddressService.js",
							"css/address.css",
							"css/editadress.css",
							"css/addresscarte.css"
						]
					}])
				}]
			}
		})
		.state('info.orderpay', { //支付页面
			url: "/orderpay-:orderId",
			templateUrl: "views/pay/OrderPay.html",
			controller: 'OrderPayController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/pay/OrderPayController.js",
							"js/services/pay/OrderPayService.js",
							"css/screen.css",
							"css/orderpay.css"
						]
					}])
				}]
			}
		})
		//商品详情
		.state('info.goods', {
			url: "/goods-:id",
			templateUrl: "views/goods/goods.html",
			controller: 'goodsController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/goods/goodsController.js",
							"js/services/goods/goodsService.js",
							"css/detail.css",
							"css/xuqiu.css",
							"css/bill.css",
							"css/addresscarte.css"
						]
					}])
				}]
			}
		})
		.state('main.index', { //首页
			url: "/index",
			templateUrl: "views/home/home.html",
			controller: 'HomeController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/home/HomeController.js",
							"js/services/home/HomeService.js",
							"css/index.css",
							"css/search.css",
						]
					}])
				}]
			}
		})
		//分类页
		.state('main.list', {
			url: "/list",
			templateUrl: "views/category/list.html",
			controller: 'classifyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/classify/classifyController.js",
							"js/services/classify/classifyServices.js",
							"css/carte.css",
							"css/search.css",
						]
					}])
				}]

			}
		})
		.state('main.cart', {
			url: "/cart",
			templateUrl: "views/cart/cart.html",
			controller: 'cartController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/cart/cartController.js",
							"js/services/cart/cartservice.js",
							"css/shop.css"
						]
					}])
				}]

			}
		})

		//我的
		.state('main.mine', {
			url: "/mine",
			templateUrl: "views/mine/mine.html",
			controller: 'mineController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/mineController.js",
							"js/services/mine/mineService.js",
							"css/mine.css"
						]
					}])
				}]

			}
		})
		//订单
		.state('main.orderlist', {
			url: "/orderlist",
			templateUrl: "views/orderList/orderlist.html",
			controller: 'orderlistController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/orderlist/orderlistController.js",
							"js/services/orderlist/orderlistService.js",
							"css/orderlist.css"
						]
					}])
				}]

			}
		})

		//文章
		.state('info.article', {
			url: "/article",
			templateUrl: "views/article/article.html",
			controller: 'articleController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/article/articleController.js",
							"js/services/article/articleService.js",
							"css/problem.css"
						]
					}])
				}]

			}
		})

		//收藏

		.state('info.collection', {
			url: "/collection",
			templateUrl: "views/mine/collection.html",
			controller: 'collectController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/collectionController.js",
							"js/services/mine/collectionService.js",
							"css/collect.css"
						]
					}])
				}]

			}
		})
		//优惠券
		.state('info.coupon', {
			url: "/coupon",
			templateUrl: "views/mine/coupon.html",
			controller: 'couponController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/couponController.js",
							"js/services/mine/couponService.js",
							"css/coupon.css"
						]
					}])
				}]

			}
		})
		//我的资产
		.state('info.property', {
			url: "/property",
			templateUrl: "views/mine/property.html",
			controller: 'propertyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/propertyController.js",
							"js/services/mine/propertyService.js",
							"css/property.css"
						]
					}])
				}]

			}
		})
		//资产明细
		.state('info.propertyDetail', {
			url: "/propertyDetail",
			templateUrl: "views/mine/propertyDetail.html",
			controller: 'propertyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/propertyController.js",
							"js/services/mine/propertyService.js",
							"css/propertyDetail.css"
						]
					}])
				}]

			}
		})
		//退单列表
		.state('info.returnOrder', {
			url: "/returnOrder",
			templateUrl: "views/mine/returnOrder.html",
			controller: 'returnOrderController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/returnOrderController.js",
							"js/services/mine/returnOrderService.js",
							"css/returnOrder.css"
						]
					}])
				}]

			}
		})
		//退单详情
		.state('info.returndetail', {
			url: "/returndetail",
			templateUrl: "views/mine/returndetail.html",
			controller: 'returndetailController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/returndetailController.js",
							"js/services/mine/returndetailService.js",
							"css/returndetail.css"
						]
					}])
				}]

			}
		})
		//地址管理
		.state('info.address', {
			url: "/address",
			templateUrl: "views/mine/address.html",
			controller: 'AddressController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/AddressController.js",
							"js/services/mine/AddressService.js",
							"css/address.css",
							"css/editadress.css",
							"css/addresscarte.css"
						]
					}])
				}]

			}
		})
		//分类列表页
		.state('info.list', {
			url: "/list-:paramsCategoryId-:paramsOrderid-:paramsInstock-:paramsBrandId-:paramsFilterId",
			templateUrl: "views/list/list.html",
			controller: 'ListController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/list/ListController.js",
							"js/services/list/ListService.js",
							"css/list.css",
							"css/search.css",
						]
					}])
				}]

			}
		})
		//会员推广页
		.state('info.generalize', {
			url: "/generalize",

			templateUrl: "views/mine/generalize.html",
			controller: 'GeneralizeController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/GeneralizeController.js",
							"js/services/mine/GeneralizeService.js",
							"css/spread.css",
						]
					}])
				}]

			}
		})
		//搜索列表页
		.state('info.search', {
			url: "/search-:paramsKeyWord-:paramsCategoryId-:paramsOrderid-:paramsInstock-:paramsBrandId-:paramsFilterId",
			templateUrl: "views/search/searchList.html",
			controller: 'SearchListController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/search/SearchListController.js",
							"js/services/search/SearchListService.js",
							"css/list.css",
							"css/search.css",
						]
					}])
				}]

			}
		})

		//关于鹿医生
		.state('info.about', {
			url: "/about",
			templateUrl: "views/mine/about.html",
			controller: 'aboutController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/aboutController.js",
							"js/services/mine/aboutService.js",
							"css/aboutly.css"
						]
					}])
				}]

			}
		})
		//申请售后
		.state('info.apply', {
			url: "/apply-:memberId-:orderId-:productId-:goodsId",
			templateUrl: "views/apply/apply.html",
			controller: 'applyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/apply/applyController.js",
							"js/services/apply/applyService.js",
							"css/apply.css"
						]
					}])
				}]
			}
		})
		//申请处方
		.state('info.prescription', {
			url: "/prescription",
			templateUrl: "views/mine/prescription.html",
			controller: 'prescriptionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/prescriptionController.js",
							"js/services/mine/prescriptionService.js",
							"css/rxapply.css"
						]
					}])
				}]
			}
		})
		//订单详情
		.state('info.orderId', {
			url: "/orderId-:orderId",
			templateUrl: "views/order/detailsord.html",
			controller: 'orderDetailController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/order/orderDetailController.js",
							"js/services/order/orderDetailService.js",
							"css/detailsord.css"
						]
					}])
				}]
			}
		})

		//个人信息
		.state('info.personinformation', {
			url: "/personinformation",
			templateUrl: "views/mine/personinformation.html",
			controller: 'personinformationController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/mine/personinformationController.js",
							"js/services/mine/personinformationService.js",
							"css/personinformation.css",
							"css/portrait .css"
						]
					}])
				}]
			}
		})
		//处方详情
		.state('info.proption', {
			url: "/proption-:id",
			templateUrl: "views/messageBoard/resproptionDetail.html",
			controller: 'resproptionDetailController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/messageBoard/resproptionDetailController.js",
							"js/services/messageBoard/resproptionDetailService.js",
							"css/appplydetail.css"
						]
					}])
				}]
			}
		})
		//留言板
		.state('info.messageBoard', {
			url: "/messageBoard-:id-:source",
			templateUrl: "views/messageBoard/messageBoard.html",
			controller: 'messageBoardController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							"js/controllers/messageBoard/messageBoardController.js",
							"js/services/messageBoard/messageBoardService.js",
							"css/returndetail.css"
						]
					}])
				}]
			}
		})
		//设置
		.state('info.set', { //登录
			url: "/set",
			templateUrl: "views/set/set.html",
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'mywapApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
//							"js/controllers/set/setController.js",
//							"js/services/set/setService.js",
							"css/screen.css",
							"css/set.css"
						]
					}])
				}]
			}
		})


});
//在config之后的在运行独立的代码块
// $rootScope.clickPage = 0;
app.run(["$rootScope", function($rootScope) {
	$rootScope.checkPage = function(index) {
		$rootScope.clickPage = index;
		// alert($rootScope.clickPage)
	}
}])
