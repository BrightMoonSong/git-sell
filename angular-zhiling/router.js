/**
 * 路径配置
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
	$urlRouterProvider.otherwise("/manager/index");

	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug: true
	});

	$stateProvider
		.state('manager', {
			url: "/manager",
			templateUrl: "views/common/content.html",
		})
		.state('manager.index', {
			url: "/index",
			templateUrl: "views/main.html",
			data: {
				pageTitle: '管理首页'
			}
		})
		//系统管理
		.state('manager.sysconfig', {
			abstract: true,
			url: "/sysconfig",
			template: "<ui-view/>",
		})
		.state('manager.sysconfig.sysuserlist', {
			url: "/sysuserlist/:funcId",
			templateUrl: "views/system/SysUserList.html",
			data: {
				pageTitle: '管理员'
			},
			controller: 'SysUserController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysUserService.js',
							'js/controllers/system/SysUserController.js',
							'js/controllers/system/SysUserDragData.js',
							'js/controllers/common/drag.js'
						]
					}])
				}]
			}
		})
		//区域管理
		.state('manager.sysconfig.sysarealist', {
			url: "/sysarealist/:funcId",
			templateUrl: "views/system/SysAreaList.html",
			data: {
				pageTitle: '区域管理'
			},
			controller: 'SysAreaController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysAreaService.js',
							'js/controllers/system/SysAreaController.js'
						]
					}])
				}]
			}
		})
		//平台用户管理
		.state('manager.sysconfig.authsysuserlist', {
			url: "/authsysuserlist/:funcId",
			templateUrl: "views/system/AuthSysUserList.html",
			data: {
				pageTitle: '平台用户管理'
			},
			controller: 'AuthSysUserController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/AuthSysUserService.js',
							'js/controllers/system/AuthSysUserController.js'
						]
					}])
				}]
			}
		})
		//热门搜索管理
		.state('manager.sysconfig.syssearchhotlist', {
			url: "/syssearchhotlist/:funcId",
			templateUrl: "views/system/SysSearchHotList.html",
			data: {
				pageTitle: '热门搜索管理'
			},
			controller: 'SysSearchHotController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysSearchHotService.js',
							'js/controllers/system/SysSearchHotController.js'
						]
					}])
				}]
			}
		})
		//角色管理
		.state('manager.sysconfig.authrole', {
			url: "/authrole/:funcId",
			templateUrl: "views/system/AuthRole.html",
			data: {
				pageTitle: '角色管理'
			},
			controller: 'AuthRoleController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/AuthRoleService.js',
							'js/controllers/system/AuthRoleController.js'
						]
					}])
				}]
			}
		})
		//功能点管理
		.state('manager.sysconfig.authfunction', {
			url: "/authfunction/:funcId",
			templateUrl: "views/system/AuthFunction.html",
			data: {
				pageTitle: '功能点管理'
			},
			controller: 'AuthFunctionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/AuthFunctionService.js',
							'js/controllers/system/AuthFunctionController.js'
						]
					}])
				}]
			}
		})
		.state('manager.sysconfig.syscode', {
			url: "/syscode/:funcId",
			templateUrl: "views/system/syscode.html",
			data: {
				pageTitle: '字典查询'
			},
			controller: 'syscodeController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/syscodeService.js',
							'js/controllers/system/syscodeController.js'
						]
					}]);
				}
			}
		})
		.state('manager.sysconfig.syspermissionconfigurationlist', {
			url: "/syspermissionconfigurationlist/:funcId",
			templateUrl: "views/system/SysPermissionConfigurationList.html",
			data: {
				pageTitle: '功能点配置'
			},
			controller: 'SysPermissionConfigurationController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysPermissionConfigurationService.js',
							'js/controllers/system/SysPermissionConfigurationController.js'
						]
					}])
				}]

			}
		})
		//用户反馈管理
		.state('manager.sysconfig.sysuserfeedbacklist', {
			url: "/sysuserfeedbacklist/:funcId",
			templateUrl: "views/system/SysUserFeedBackList.html",
			data: {
				pageTitle: '用户反馈管理'
			},
			controller: 'SysUserFeedBackController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysUserFeedBackService.js',
							'js/controllers/system/SysUserFeedBackController.js'
						]
					}])
				}]

			}
		})
		//商品管理
		.state('manager.goodsconfig', {
			abstract: true,
			url: "/goodsconfig",
			template: "<ui-view/>",
		})
		.state('manager.goodsconfig.goodsbrandlist', {
			url: "/goodsbrandlist/:funcId",
			templateUrl: "views/goods/GoodsBrandList.html",
			data: {
				pageTitle: '品牌管理'
			},
			controller: 'GoodsBrandController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsBrandService.js',
							'js/controllers/goods/GoodsBrandController.js'
						]
					}])
				}]
			}
		})
		//症状管理
		.state('manager.goodsconfig.symptomslist', {
			url: "/symptomslist/:funcId",
			templateUrl: "views/goods/SymptomsList.html",
			data: {
				pageTitle: '症状管理'
			},
			controller: 'SymptomsController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/SymptomsServices.js',
							'js/controllers/goods/SymptomsController.js'
						]
					}])
				}]
			}
		})
		//商品库管理
		.state('manager.goodsconfig.goodslibrarylist', {
			url: "/goodslibrarylist/:funcId",
			templateUrl: "views/goods/GoodsLibraryList.html",
			data: {
				pageTitle: '商品库管理'
			},
			controller: 'GoodsLibraryController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsLibraryService.js',
							'js/controllers/goods/GoodsLibraryController.js'
						]
					}])
				}]
			}
		})
		.state('manager.goodsconfig.goodscatelist', {
			url: "/goodscatelist/:funcId",
			templateUrl: "views/goods/GoodsCate.html",
			data: {
				pageTitle: '分类管理'
			},
			controller: 'GoodsCateController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsCateService.js',
							'js/controllers/goods/GoodsCateController.js'
						]
					}, {
						name: 'ngJsTree',
						files: ['css/plugins/jsTree/style.min.css',
							'js/plugins/jsTree/ngJsTree.min.js',
							'js/plugins/jsTree/jstree.min.js'
						]
					}]);
				}
			}
		})
		.state('manager.goodsconfig.goodsinfolist', {
			url: "/goodsinfolist/:funcId",
			templateUrl: "views/goods/GoodsInfoList.html",
			data: {
				pageTitle: '待售商品'
			},
			controller: 'GoodsInfoController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsInfoService.js',
							'js/controllers/goods/GoodsInfoController.js'
						]
					}]);
				}
			}
		})
		//在售商品
		.state('manager.goodsconfig.goodsonsalelist', {
			url: "/goodsonsalelist/:funcId",
			templateUrl: "views/goods/GoodsOnSaleList.html",
			data: {
				pageTitle: '在售商品管理'
			},
			controller: 'GoodsOnSaleController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsInfoService.js',
							'js/services/goods/GoodsOnSaleService.js',
							'js/controllers/goods/GoodsOnSaleController.js'
						]
					}]);
				}
			}
		})
		//上架待审核商品列表
		.state('manager.goodsconfig.goodscheckinfoslist', {
			url: "/goodscheckinfoslist/:funcId",
			templateUrl: "views/goods/GoodsCheckInfosList.html",
			data: {
				pageTitle: '待审核商品管理'
			},
			controller: 'GoodsCheckInfosController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsCheckInfosService.js',
							'js/controllers/goods/GoodsCheckInfosController.js'
						]
					}]);
				}
			}
		})
		//连锁店管理
		.state('manager.csconfig', {
			abstract: true,
			url: "/csconfig",
			template: "<ui-view/>",
		})
		//连锁店列表
		.state('manager.csconfig.chainstoreList', {
			url: "/chainstoreList/:funcId",
			templateUrl: "views/chainstore/ChainStoreList.html",
			data: {
				pageTitle: '连锁店列表'
			},
			controller: 'ChainStoreListController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/chainstore/ChainStoreListService.js',
							'js/controllers/chainstore/ChainStoreListController.js',
						]
					}])
				}]
			}
		})
		//所有分店列表
		.state('manager.csconfig.listallbranches', {
			url: "/listallbranches/:funcId",
			templateUrl: "views/chainstore/ListAllBranches.html",
			data: {
				pageTitle: '所有分店列表'
			},
			controller: 'ListAllBranchesController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/chainstore/ListAllBranchesService.js',
							'js/controllers/chainstore/ListAllBranchesController.js'
						]
					}])
				}]
			}
		})
		//药店店员管理
		.state('manager.csconfig.chainstoreuser', {
			url: "/chainstoreuser/:funcId",
			templateUrl: "views/chainstore/ChainStoreUser.html",
			data: {
				pageTitle: '药店店员管理'
			},
			controller: 'ChainStoreUserController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/chainstore/ChainStoreUserService.js',
							'js/controllers/chainstore/ChainStoreUserController.js'
						]
					}])
				}]
			}
		})
		//资金结算
		.state('manager.csconfig.fundsettlementlist', {
			url: "/fundsettlementlist/:funcId",
			templateUrl: "views/chainstore/FundSettlementList.html",
			data: {
				pageTitle: '资金结算'
			},
			controller: 'FundSettlementController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/chainstore/FundSettlementService.js',
							'js/controllers/chainstore/FundSettlementController.js',
						]
					}])
				}]
			}
		})
		//专题管理
		.state('manager.tpconfig', {
			abstract: true,
			url: "/tpconfig",
			template: "<ui-view/>",
		})
		//专题管理
		.state('manager.tpconfig.topic', {
			url: "/topic/:funcId",
			templateUrl: "views/topic/topic.html",
			data: {
				pageTitle: '专题管理'
			},
			controller: 'topicController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/topic/topicService.js',
							'js/controllers/topic/topicController.js',
						]
					}])
				}]
			}
		})
		//首页管理
		.state('manager.hmconfig', {
			abstract: true,
			url: "/hmconfig",
			template: "<ui-view/>",
		})
		//首页轮播图管理
		.state('manager.hmconfig.carousel', {
			url: "/carousel/:funcId",
			templateUrl: "views/homemanagement/carousel.html",
			data: {
				pageTitle: '首页轮播图管理'
			},
			controller: 'carouselController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homemanagement/carouselService.js',
							'js/controllers/homemanagement/carouselController.js'
						]
					}])
				}]
			}
		})
		//首页楼层管理
		.state('manager.hmconfig.homefloorlist', {
			url: "/homefloor/:funcId",
			templateUrl: "views/homemanagement/homeFloorList.html",
			data: {
				pageTitle: '首页楼层管理'
			},
			controller: 'HomeFloorController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homemanagement/HomeFloorService.js',
							'js/controllers/homemanagement/HomeFloorController.js'
						]
					}])
				}]
			}
		})
		//首页药到头条管理
		.state('manager.hmconfig.homenewslist', {
			url: "/homenewslist/:funcId",
			templateUrl: "views/homemanagement/homeNewsList.html",
			data: {
				pageTitle: '首页药到头条管理'
			},
			controller: 'HomeNewsController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homemanagement/HomeNewsService.js',
							'js/controllers/homemanagement/HomeNewsController.js'
						]
					}])
				}]
			}
		})
		//首页专题推荐管理
		.state('manager.hmconfig.hometopiclist', {
			url: "/hometopiclist/:funcId",
			templateUrl: "views/homemanagement/homeTopicList.html",
			data: {
				pageTitle: '首页专题推荐管理'
			},
			controller: 'HomeTopicController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homemanagement/HomeTopicService.js',
							'js/controllers/homemanagement/HomeTopicController.js'
						]
					}])
				}]
			}
		})
		//首页热门推荐管理
		.state('manager.hmconfig.homehotrecommendlist', {
			url: "/homehotrecommendlist/:funcId",
			templateUrl: "views/homemanagement/homeHotRecommendList.html",
			data: {
				pageTitle: '热门推荐管理'
			},
			controller: 'HomeHotRecommendController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/topic/topicService.js',
							'js/services/goods/GoodsOnSaleService.js',
							'js/services/homemanagement/HomeHotRecommendService.js',
							'js/controllers/homemanagement/HomeHotRecommendController.js'
						]
					}])
				}]
			}
		})

		//首页楼层商品推荐管理
		.state('manager.hmconfig.homefloorrecommendlist', {
			url: "/homefloorrecommendlist/:funcId",
			templateUrl: "views/homemanagement/homeFloorRecommendList.html",
			data: {
				pageTitle: '楼层商品推荐管理'
			},
			controller: 'HomeFloorRecommendController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homemanagement/HomeFloorRecommendService.js',
							'js/controllers/homemanagement/HomeFloorRecommendController.js'
						]
					}])
				}]
			}
		})
		//订单管理
		.state('manager.ordersconfig', {
			abstract: true,
			url: "/ordersconfig",
			template: "<ui-view/>",
		})
		.state('manager.ordersconfig.orderslist', {
			url: "/orderslist/:funcId",
			templateUrl: "views/orders/OrdersList.html",
			data: {
				pageTitle: '订单管理'
			},
			controller: 'OrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersService.js',
							'js/controllers/orders/OrdersController.js'
						]
					}]);
				}
			}
		})
		//配送员管理
		.state('manager.deliveryconfig', {
			abstract: true,
			url: "/deliveryconfig",
			template: "<ui-view/>",
		})
		//待审核管理
		.state('manager.deliveryconfig.delipendingauditlist', {
			url: "/delipendingauditlist/:funcId",
			templateUrl: "views/delivery/DeliPendingAuditList.html",
			data: {
				pageTitle: '待审核管理'
			},
			controller: 'DeliPendingAuditController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/delivery/DeliveryService.js',
							'js/controllers/delivery/DeliPendingAuditController.js'
						]
					}]);
				}
			}
		})
		//审核通过管理
		.state('manager.deliveryconfig.deliauditedlist', {
			url: "/deliauditedlist/:funcId",
			templateUrl: "views/delivery/DeliAuditedList.html",
			data: {
				pageTitle: '审核通过管理'
			},
			controller: 'DeliAuditedController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/delivery/DeliveryService.js',
							'js/controllers/delivery/DeliAuditedController.js'
						]
					}]);
				}
			}
		})
		//审核未通过管理
		.state('manager.deliveryconfig.deliauditfailedlist', {
			url: "/deliauditfailedlist/:funcId",
			templateUrl: "views/delivery/DeliAuditFailedList.html",
			data: {
				pageTitle: '审核未通过管理'
			},
			controller: 'DeliAuditFailedController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/delivery/DeliveryService.js',
							'js/controllers/delivery/DeliAuditFailedController.js'
						]
					}]);
				}
			}
		})
		//家庭常备药品推荐管理
		.state('manager.homestanconfig', {
			abstract: true,
			url: "/homestanconfig",
			template: "<ui-view/>",
		})
		//家庭常备药品推荐管理
		.state('manager.homestanconfig.homestandinglist', {
			url: "/homestandinglist/:funcId",
			templateUrl: "views/homestanding/HomeStandingList.html",
			data: {
				pageTitle: '家庭常备药品推荐管理'
			},
			controller: 'HomeStandingController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/homestanding/HomeStandingService.js',
							'js/controllers/homestanding/HomeStandingController.js'
						]
					}]);
				}
			}
		})
		//消息推送管理
		.state('manager.pushconfig', {
			abstract: true,
			url: "/pushconfig",
			template: "<ui-view/>",
		})
		//消息群发推送管理
		.state('manager.pushconfig.pushsenglist', {
			url: "/pushsenglist/:funcId",
			templateUrl: "views/push/PushSendList.html",
			data: {
				pageTitle: '消息群发推送管理'
			},
			controller: 'PushSendController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/push/PushSendService.js',
							'js/controllers/push/PushSendController.js'
						]
					}]);
				}
			}
		})
		//消息单发推送管理
		.state('manager.pushconfig.pushshotlist', {
			url: "/pushshotlist/:funcId",
			templateUrl: "views/push/PushShotList.html",
			data: {
				pageTitle: '消息单发推送管理'
			},
			controller: 'PushShotController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/push/PushSendService.js',
							'js/controllers/push/PushShotController.js'
						]
					}]);
				}
			}
		})
		//用户管理
		.state('manager.userconfig', {
			abstract: true,
			url: "/userconfig",
			template: "<ui-view/>",
		})
		//用户管理
		.state('manager.userconfig.userlist', {
			url: "/userlist/:funcId",
			templateUrl: "views/user/UserList.html",
			data: {
				pageTitle: '用户管理'
			},
			controller: 'UserController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/user/UserService.js',
							'js/controllers/user/UserController.js'
						]
					}]);
				}
			}
		})
}
angular
	.module('managerApp')
	.config(config)
	.run(function($rootScope, $state) {
		$rootScope.$state = $state;
	});
