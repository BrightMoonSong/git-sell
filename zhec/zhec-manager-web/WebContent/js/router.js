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
		//促销管理
		.state('manager.promotionmanage', {
			abstract: true,
			url: "/promotionmanage",
			template: "<ui-view/>",
		})
		//优惠券
		.state('manager.promotionmanage.couponslist', {
			url: "/couponslist/:funcId",
			templateUrl: "views/promotionmanage/couponsList.html",
			data: {
				pageTitle: '优惠券'
			},
			controller: 'couponsController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/couponsService.js',
							'js/controllers/promotionmanage/couponsController.js'
						]
					}])
				}]
			}
		})
		//优惠券促销申请
		.state('manager.promotionmanage.couponspromotionapplylist', {
			url: "/couponspromotionapplylist/:funcId",
			templateUrl: "views/promotionmanage/couponsPromotionApplyList.html",
			data: {
				pageTitle: '优惠券促销申请'
			},
			controller: 'couponsPromotionApplyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/couponsPromotionApplyService.js',
							'js/controllers/promotionmanage/couponsPromotionApplyController.js'
						]
					}])
				}]
			}
		})
		//优惠券促销
		.state('manager.promotionmanage.couponspromotionlist', {
			url: "/couponspromotionlist/:funcId",
			templateUrl: "views/promotionmanage/couponsPromotionList.html",
			data: {
				pageTitle: '优惠券促销'
			},
			controller: 'couponsPromotionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/couponsPromotionService.js',
							'js/controllers/promotionmanage/couponsPromotionController.js'
						]
					}])
				}]
			}
		})
		//优惠券促销审核
		.state('manager.promotionmanage.couponspromotionauditlist', {
			url: "/couponspromotionauditlist/:funcId",
			templateUrl: "views/promotionmanage/couponsPromotionAuditList.html",
			data: {
				pageTitle: '优惠券促销审核'
			},
			controller: 'couponsPromotionAuditController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/couponsPromotionAuditService.js',
							'js/controllers/promotionmanage/couponsPromotionAuditController.js'
						]
					}])
				}]
			}
		})
		//商品促销审核
		.state('manager.promotionmanage.goodspromotionauditlist', {
			url: "/goodspromotionauditlist/:funcId",
			templateUrl: "views/promotionmanage/goodsPromotionAuditList.html",
			data: {
				pageTitle: '商品促销审核'
			},
			controller: 'goodsPromotionAuditController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/goodsPromotionAuditService.js',
							'js/controllers/promotionmanage/goodsPromotionAuditController.js'
						]
					}])
				}]
			}
		})
		//商品促销
		.state('manager.promotionmanage.goodspromotionlist', {
			url: "/goodspromotionlist/:funcId",
			templateUrl: "views/promotionmanage/goodsPromotionList.html",
			data: {
				pageTitle: '商品促销'
			},
			controller: 'goodsPromotionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/goodsPromotionService.js',
							'js/controllers/promotionmanage/goodsPromotionController.js'
						]
					}])
				}]
			}
		})
		//商品促销申请
		.state('manager.promotionmanage.goodspromotionaddlist', {
			url: "/goodspromotionaddlist/:funcId",
			templateUrl: "views/promotionmanage/goodsPromotionAddList.html",
			data: {
				pageTitle: '商品促销申请'
			},
			controller: 'goodsPromotionAddController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/goodsPromotionAddService.js',
							'js/controllers/promotionmanage/goodsPromotionAddController.js'
						]
					}])
				}]
			}
		})
		//订单满减审核
		.state('manager.promotionmanage.orderspromotionauditlist', {
			url: "/orderspromotionauditlist/:funcId",
			templateUrl: "views/promotionmanage/ordersPromotionAuditList.html",
			data: {
				pageTitle: '订单满减审核'
			},
			controller: 'ordersPromotionAuditController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/ordersPromotionAuditService.js',
							'js/controllers/promotionmanage/ordersPromotionAuditController.js'
						]
					}])
				}]
			}
		})
		//订单满减申请
		.state('manager.promotionmanage.orderspromotionapplylist', {
			url: "/orderspromotionapplylist/:funcId",
			templateUrl: "views/promotionmanage/ordersPromotionApplyList.html",
			data: {
				pageTitle: '订单满减申请'
			},
			controller: 'ordersPromotionApplyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/ordersPromotionApplyService.js',
							'js/controllers/promotionmanage/ordersPromotionApplyController.js'
						]
					}])
				}]
			}
		})
		//订单满减
		.state('manager.promotionmanage.orderspromotionlist', {
			url: "/orderspromotionlist/:funcId",
			templateUrl: "views/promotionmanage/ordersPromotionList.html",
			data: {
				pageTitle: '订单满减'
			},
			controller: 'ordersPromotionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/promotionmanage/ordersPromotionService.js',
							'js/controllers/promotionmanage/ordersPromotionController.js'
						]
					}])
				}]
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
							'js/controllers/system/SysUserController.js'
						]
					}])
				}]
			}
		})
		.state('manager.sysconfig.sysrolelist', {
			url: "/sysrolelist/:funcId",
			templateUrl: "views/system/SysRoleList.html",
			data: {
				pageTitle: '角色管理'
			},
			controller: 'SysRoleController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysRoleService.js',
							'js/controllers/system/SysRoleController.js'
						]
					}])
				}]
			}
		})
		.state('manager.sysconfig.syssearch', {
			url: "/syssearch/:funcId",
			templateUrl: "views/system/SysSearch.html",
			data: {
				pageTitle: '搜索管理'
			},
			controller: 'SysSearchController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/system/SysSearchService.js',
							'js/controllers/system/SysSearchController.js'
						]
					}])
				}]

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
		//商品管理
		.state('manager.goodsconfig', {
			abstract: true,
			url: "/goodsconfig",
			template: "<ui-view/>",
		})
		.state('manager.goodsconfig.goodstypelist', {
			url: "/goodstypelist/:funcId",
			templateUrl: "views/goods/GoodsTypeList.html",
			data: {
				pageTitle: '类型管理'
			},
			controller: 'GoodsTypeController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsTypeService.js',
							'js/controllers/goods/GoodsTypeController.js'
						]
					}])
				}]
			}
		})
		.state('manager.goodsconfig.goodsclassifylist', {
			url: "/goodsclassifylist/:funcId",
			templateUrl: "views/goods/GoodsClassifyList.html",
			data: {
				pageTitle: '归类管理'
			},
			controller: 'GoodsClassifyController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsClassifyService.js',
							'js/controllers/goods/GoodsClassifyController.js'
						]
					}])
				}]
			}
		})
		.state('manager.goodsconfig.goodsspeclist', {
			url: "/goodsspeclist/:funcId",
			templateUrl: "views/goods/GoodsSpecList.html",
			data: {
				pageTitle: '规格管理'
			},
			controller: 'GoodsSpecController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsSpecService.js',
							'js/controllers/goods/GoodsSpecController.js'
						]
					}])
				}]
			}
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
		.state('manager.goodsconfig.goodspropertieslist', {
			url: "/goodspropertieslist/:funcId",
			templateUrl: "views/goods/GoodsPropertiesList.html",
			data: {
				pageTitle: '属性管理'
			},
			controller: 'GoodsPropertiesController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsPropertiesService.js',
							'js/controllers/goods/GoodsPropertiesController.js'
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
				pageTitle: '商品管理'
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
		.state('manager.goodsconfig.goodsstatelist', {
			url: "/goodsstatelist/:funcId",
			templateUrl: "views/goods/GoodsStateList.html",
			data: {
				pageTitle: '待售商品管理'
			},
			controller: 'GoodsStateController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsStateService.js',
							'js/controllers/goods/GoodsStateController.js'
						]
					}]);
				}
			}
		})
		//禁用商品列表
		.state('manager.goodsconfig.disablegoodslist', {
			url: "/disablegoodslist/:funcId",
			templateUrl: "views/goods/GoodsDisable.html",
			data: {
				pageTitle: '禁用商品列表'
			},
			controller: 'GoodsDisableController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsDisableService.js',
							'js/controllers/goods/GoodsDisableController.js'
						]
					}]);
				}
			}
		})
		.state('manager.goodsconfig.goodspriceauditList', {
			url: "/goodspriceauditList/:funcId",
			templateUrl: "views/goods/GoodsPriceAuditList.html",
			data: {
				pageTitle: '商品价格审核'
			},
			controller: 'GoodsPriceAuditController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsPriceAuditService.js',
							'js/controllers/goods/GoodsPriceAuditController.js'
						]
					}]);
				}
			}
		})
		//在售商品
		.state('manager.goodsconfig.goodsonselllist', {
			url: "/goodsonselllist/:funcId",
			templateUrl: "views/goods/GoodsOnSellList.html",
			data: {
				pageTitle: '在售商品管理'
			},
			controller: 'GoodsOnSellController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/GoodsOnSellService.js',
							'js/controllers/goods/GoodsOnSellController.js'
						]
					}]);
				}
			}
		})
		//库存管理
		.state('manager.goodsconfig.stock', {
			url: "/stock/:funcId",
			templateUrl: "views/goods/Stock.html",
			data: {
				pageTitle: '库存管理'
			},
			controller: 'stockController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/goods/StockService.js',
							'js/controllers/goods/StockController.js'
						]
					}]);
				}
			}
		})
		//订单管理
		.state('manager.ordersconfig', {
			abstract: true,
			url: "/ordersconfig",
			template: "<ui-view/>",
		})
		.state('manager.ordersconfig.ordersallorderslist', {
			url: "/ordersallorderslist/:funcId",
			templateUrl: "views/orders/OrdersALLOrdersList.html",
			data: {
				pageTitle: '全部订单'
			},
			controller: 'OrdersALLOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersALLOrdersService.js',
							'js/controllers/orders/OrdersALLOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersunpaidorderslist', {
			url: "/ordersunpaidorderslist/:funcId",
			templateUrl: "views/orders/OrdersUnpaidordersList.html",
			data: {
				pageTitle: '待付款订单'
			},
			controller: 'OrdersUnpaidordersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersUnpaidordersService.js',
							'js/controllers/orders/OrdersUnpaidordersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderspaidorderslist', {
			url: "/orderspaidorderslist/:funcId",
			templateUrl: "views/orders/OrdersPaidOrdersList.html",
			data: {
				pageTitle: '待确认订单'
			},
			controller: 'OrdersPaidOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersPaidOrdersService.js',
							'js/controllers/orders/OrdersPaidOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersconfirmedorderslist', {
			url: "/ordersconfirmedorderslist/:funcId",
			templateUrl: "views/orders/OrdersConfirmedOrdersList.html",
			data: {
				pageTitle: '已确认订单'
			},
			controller: 'OrdersConfirmedOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersConfirmedOrdersService.js',
							'js/controllers/orders/OrdersConfirmedOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersshippeddorderslist', {
			url: "/ordersshippeddorderslist/:funcId",
			templateUrl: "views/orders/OrdersShippeddOrdersList.html",
			data: {
				pageTitle: '已发货订单'
			},
			controller: 'OrdersShippeddOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersShippeddOrdersService.js',
							'js/controllers/orders/OrdersShippeddOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersreceivedorderslist', {
			url: "/ordersreceivedorderslist/:funcId",
			templateUrl: "views/orders/OrdersReceivedOrdersList.html",
			data: {
				pageTitle: '已收货订单'
			},
			controller: 'OrdersReceivedOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersReceivedOrdersService.js',
							'js/controllers/orders/OrdersReceivedOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderssafeorderslist', {
			url: "/orderssafeorderslist/:funcId",
			templateUrl: "views/orders/OrdersSafeOrdersList.html",
			data: {
				pageTitle: '已安全订单'
			},
			controller: 'OrdersSafeOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersSafeOrdersService.js',
							'js/controllers/orders/OrdersSafeOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderspendingorderslist', {
			url: "/orderspendingorderslist/:funcId",
			templateUrl: "views/orders/OrdersPendingOrdersList.html",
			data: {
				pageTitle: '待结算订单'
			},
			controller: 'OrdersPendingOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersPendingOrdersService.js',
							'js/controllers/orders/OrdersPendingOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderscompletedorderslist', {
			url: "/orderscompletedorderslist/:funcId",
			templateUrl: "views/orders/OrdersCompletedOrdersList.html",
			data: {
				pageTitle: '已完成订单'
			},
			controller: 'OrdersCompletedOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersCompletedOrdersService.js',
							'js/controllers/orders/OrdersCompletedOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderstobecanceledorderslist', {
			url: "/orderstobecanceledorderslist/:funcId",
			templateUrl: "views/orders/OrdersTobeCanceledOrdersList.html",
			data: {
				pageTitle: '待取消订单'
			},
			controller: 'OrdersTobeCanceledOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersTobeCanceledOrdersService.js',
							'js/controllers/orders/OrdersTobeCanceledOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersrefundableorderslist', {
			url: "/ordersrefundableorderslist/:funcId",
			templateUrl: "views/orders/OrdersRefundableOrdersList.html",
			data: {
				pageTitle: '待退款订单'
			},
			controller: 'OrdersRefundableOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersRefundableOrdersService.js',
							'js/controllers/orders/OrdersRefundableOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.ordersreturnedorderslist', {
			url: "/ordersreturnedorderslist/:funcId",
			templateUrl: "views/orders/OrdersReturnedOrdersList.html",
			data: {
				pageTitle: '已退货订单'
			},
			controller: 'OrdersReturnedOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersReturnedOrdersService.js',
							'js/controllers/orders/OrdersReturnedOrdersController.js'
						]
					}]);
				}
			}
		})
		.state('manager.ordersconfig.orderscancelledorderslist', {
			url: "/orderscancelledorderslist/:funcId",
			templateUrl: "views/orders/OrdersCancelledOrdersList.html",
			data: {
				pageTitle: '已取消订单'
			},
			controller: 'OrdersCancelledOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersCancelledOrdersService.js',
							'js/controllers/orders/OrdersCancelledOrdersController.js'
						]
					}]);
				}
			}
		})

	.state('manager.ordersconfig.ordersprescriptionmobileorderslist', {
		url: "/ordersprescriptionmobileorderslist/:funcId",
		templateUrl: "views/orders/OrdersPrescriptionMobileOrdersList.html",
		data: {
			pageTitle: '处方药电话咨询订单'
		},
		controller: 'OrdersPrescriptionMobileOrdersController',
		resolve: {
			loadPlugin: function($ocLazyLoad) {
				return $ocLazyLoad.load([{
					name: 'managerApp',
					insertbefore: "#ng_load_plugins_before",
					files: [
						'js/services/orders/OrdersPrescriptionMobileOrdersService.js',
						'js/controllers/orders/OrdersPrescriptionMobileOrdersController.js'
					]
				}]);
			}
		}
	})

	.state('manager.ordersconfig.ordersprescriptionorderslist', {
			url: "/ordersprescriptionorderslist/:funcId",
			templateUrl: "views/orders/OrdersPrescriptionOrdersList.html",
			data: {
				pageTitle: '处方药订单'
			},
			controller: 'OrdersPrescriptionOrdersController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/orders/OrdersPrescriptionOrdersService.js',
							'js/controllers/orders/OrdersPrescriptionOrdersController.js'
						]
					}]);
				}
			}
		})
		//退单管理
		.state('manager.refundconfig', {
			abstract: true,
			url: "/refundconfig",
			template: "<ui-view/>",
		})
		.state('manager.refundconfig.refundabortedlist', {
			url: "/refundabortedlist/:funcId",
			templateUrl: "views/refund/RefundAbortedList.html",
			data: {
				pageTitle: '已中止退单'
			},
			controller: 'RefundAbortedController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundAbortedService.js',
							'js/controllers/refund/RefundAbortedController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refundfinishlist', {
			url: "/refundfinishlist/:funcId",
			templateUrl: "views/refund/RefundFinishList.html",
			data: {
				pageTitle: '已完成退单'
			},
			controller: 'RefundFinishController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundFinishService.js',
							'js/controllers/refund/RefundFinishController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refundpendingreviewlist', {
			url: "/refundpendingreviewlist/:funcId",
			templateUrl: "views/refund/RefundPendingReviewList.html",
			data: {
				pageTitle: '待审核退单'
			},
			controller: 'RefundPendingReviewController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundPendingReviewService.js',
							'js/controllers/refund/RefundPendingReviewController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refundauditedlist', {
			url: "/refundauditedlist/:funcId",
			templateUrl: "views/refund/RefundAuditedList.html",
			data: {
				pageTitle: '已审核退单'
			},
			controller: 'RefundAuditedController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundAuditedService.js',
							'js/controllers/refund/RefundAuditedController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refunddeliveredlist', {
			url: "/refunddeliveredlist/:funcId",
			templateUrl: "views/refund/RefundDeliveredList.html",
			data: {
				pageTitle: '已发货退单'
			},
			controller: 'RefundDeliveredController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundDeliveredService.js',
							'js/controllers/refund/RefundDeliveredController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refundreceivedlist', {
			url: "/refundreceivedlist/:funcId",
			templateUrl: "views/refund/RefundReceivedList.html",
			data: {
				pageTitle: '已收货退单'
			},
			controller: 'RefundReceivedController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundReceivedService.js',
							'js/controllers/refund/RefundReceivedController.js'
						]
					}]);
				}
			}
		})
		.state('manager.refundconfig.refundalllist', {
			url: "/refundalllist/:funcId",
			templateUrl: "views/refund/RefundAllList.html",
			data: {
				pageTitle: '全部退单'
			},
			controller: 'RefundAllController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/refund/RefundAllService.js',
							'js/controllers/refund/RefundAllController.js'
						]
					}]);
				}
			}
		})
		//网站管理
		.state('manager.webconfig', {
			abstract: true,
			url: "/webconfig",
			template: "<ui-view/>",
		})
		.state('manager.webconfig.navbar', {
			url: "/navbar/:funcId",
			templateUrl: "views/web/NavBar.html",
			data: {
				pageTitle: '导航栏管理'
			},
			controller: 'NavBarController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/web/NavBarService.js',
							'js/controllers/web/NavBarController.js'
						]
					}]);
				}
			}
		})
		//顾问管理
		.state('manager.consultant', {
			abstract: true,
			url: "/consultant",
			template: "<div ui-view></div>",
		})
		//顾问列表
		.state('manager.consultant.consultantlist', {
			url: "/consultantlist/:funcId",
			templateUrl: "views/consultant/AllConsultant.html",
			data: {
				pageTitle: '顾问管理'
			},
			controller: 'AllConsultantController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/consultant/AllConsultantService.js',
							'js/controllers/consultant/AllConsultantController.js'
						]
					}]);
				}
			}
		})
		//资质审核
		.state('manager.consultant.auditconsultantlist', {
			url: "/auditconsultantlist/:funcId",
			templateUrl: "views/consultant/AuditConsultantList.html",
			data: {
				pageTitle: '资质审核'
			},
			controller: 'AuditConsultantListController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/consultant/AuditConsultantListService.js',
							'js/controllers/consultant/AuditConsultantListController.js'
						]
					}]);
				}
			}
		})
		//推荐订单
		.state('manager.consultant.promptionMemberList', {
			url: "/promptionMemberList/:funcId",
			templateUrl: "views/consultant/promptionMemberList.html",
			data: {
				pageTitle: '未审核通过'
			},
			controller: 'promptionMemberListController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/consultant/AllConsultantOrderService.js',
							'js/controllers/consultant/promptionMemberListController.js'
						]
					}]);
				}
			}
		})

	//广告位管理
	.state('manager.webconfig.advert', {
			url: "/advert/:funcId",
			templateUrl: "views/web/Advertise.html",
			data: {
				pageTitle: '广告位管理'
			},
			controller: 'AdvertiseController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/web/AdvertiseService.js',
							'js/controllers/web/AdvertiseController.js'
						]
					}]);
				}
			}
		})
		//商品推荐位管理
		.state('manager.webconfig.commend', {
			url: "/commend/:funcId",
			templateUrl: "views/web/Commend.html",
			data: {
				pageTitle: '商品推荐位管理'
			},
			controller: 'CommendController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/web/CommendService.js',
							'js/controllers/web/CommendController.js'
						]
					}]);
				}
			}
		})
		//品牌分类推荐位管理
		.state('manager.webconfig.BrandGroom', {
			url: "/BrandGroom/:funcId",
			templateUrl: "views/web/BrandGroom.html",
			data: {
				pageTitle: '品牌分类推荐位管理'
			},
			controller: 'BrandGroomController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/web/BrandGroomService.js',
							'js/controllers/web/BrandGroomController.js'
						]
					}]);
				}
			}
		})
		//会员管理
		.state('manager.member', {
			abstract: true,
			url: "/member",
			template: "<ui-view/>",
		})
		.state('manager.member.memberlist', {
			url: "/memberlist/:funcId",
			templateUrl: "views/member/Member.html",
			data: {
				pageTitle: '会员管理'
			},
			controller: 'MemberController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/member/MemberService.js',
							'js/controllers/member/MemberController.js'
						]
					}]);
				}
			}
		})
		.state('manager.member.memberRank', {
			url: "/memberRank/:funcId",
			templateUrl: "views/member/memberRank.html",
			data: {
				pageTitle: '会员等级管理'
			},
			controller: 'memberRankController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/member/memberRankService.js',
							'js/controllers/member/memberRankController.js'
						]
					}]);
				}
			}
		})
		//文章管理
		.state('manager.articleconfig', {
			abstract: true,
			url: "/articleconfig",
			template: "<ui-view/>",
		})
		//文章分类管理
		.state('manager.articleconfig.articlescate', {
			url: "/articlescate/:funcId",
			templateUrl: "views/articles/ArticlesCate.html",
			data: {
				pageTitle: '文章分类管理'
			},
			controller: 'ArticlesCateController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/articles/ArticlesCateService.js',
							'js/controllers/articles/ArticlesCateController.js'
						]
					}, {
						files: ['css/plugins/jsTree/style.min.css', 'js/plugins/jsTree/jstree.min.js']
					}, {
						name: 'ngJsTree',
						files: ['js/plugins/jsTree/ngJsTree.min.js']
					}]);
				}
			}
		})
		//文章管理
		.state('manager.articleconfig.articles', {
			url: "/articles/:funcId",
			templateUrl: "views/articles/Articles.html",
			data: {
				pageTitle: '文章管理'
			},
			controller: 'ArticlesController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/articles/ArticlesService.js',
							'js/controllers/articles/ArticlesController.js'
						]
					}]);
				}
			}
		})
		//财务管理
		.state('manager.financialconfig', {
			abstract: true,
			url: "/financialconfig",
			template: "<ui-view/>",
		})
		//顾问结算管理
		.state('manager.financialconfig.consultantfinancial', {
			url: "/consultantfinancial/:funcId",
			templateUrl: "views/financial/consultantfinancial.html",
			data: {
				pageTitle: '顾问结算管理'
			},
			controller: 'consultantfinancialController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/financial/consultantfinancialService.js',
							'js/controllers/financial/consultantfinancialController.js'
						]
					}]);
				}
			}
		})
		//顾问汇款管理
		.state('manager.financialconfig.consultantremit', {
			url: "/consultantremit/:funcId",
			templateUrl: "views/financial/consultantremit.html",
			data: {
				pageTitle: '顾问汇款管理'
			},
			controller: 'consultantremitController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/financial/consultantremitService.js',
							'js/controllers/financial/consultantremitController.js'
						]
					}]);
				}
			}
		})
		//APP管理
		.state('manager.appconfig', {
			abstract: true,
			url: "/appconfig",
			template: "<ui-view/>",
		})
		//APP版本管理
		.state('manager.appconfig.version', {
			url: "/version/:funcId",
			templateUrl: "views/app/Version.html",
			data: {
				pageTitle: 'APP版本管理'
			},
			controller: 'VersionController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/app/VersionService.js',
							'js/controllers/app/VersionController.js'
						]
					}]);
				}
			}
		})

	//研发管理
	.state('manager.researchconfig', {
			abstract: true,
			url: "/researchconfig",
			template: "<ui-view/>",
		})
		//异常测试管理
		.state('manager.researchconfig.test', {
			url: "/test/:funcId",
			templateUrl: "views/research/test.html",
			data: {
				pageTitle: '异常测试'
			},
			controller: 'testController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/testService.js',
							'js/controllers/research/testController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.membercheck', {
			url: "/membercheck/:funcId",
			templateUrl: "views/research/membercheck.html",
			data: {
				pageTitle: '用户校验日志'
			},
			controller: 'membercheckController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/checkmemberService.js',
							'js/controllers/research/membercheckController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.stockcheck', {
			url: "/stockcheck/:funcId",
			templateUrl: "views/research/stockcheck.html",
			data: {
				pageTitle: '库存校验日志'
			},
			controller: 'stockcheckController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/stockcheckService.js',
							'js/controllers/research/stockcheckController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.consultantcheck', {
			url: "/consultantcheck/:funcId",
			templateUrl: "views/research/consultantcheck.html",
			data: {
				pageTitle: '顾问校验日志'
			},
			controller: 'consultantcheckController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/consultantcheckService.js',
							'js/controllers/research/consultantcheckController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.abnormalcheck', {
			url: "/abnormalcheck/:funcId",
			templateUrl: "views/research/abnormalcheck.html",
			data: {
				pageTitle: '异常日志'
			},
			controller: 'abnormalcheckController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/abnormalcheckService.js',
							'js/controllers/research/abnormalcheckController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.operationcheck', {
			url: "/operationcheck/:funcId",
			templateUrl: "views/research/operationcheck.html",
			data: {
				pageTitle: '操作日志'
			},
			controller: 'operationcheckController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/operationcheckService.js',
							'js/controllers/research/operationcheckController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.consultantlist', {
			url: "/consultantlist/:funcId",
			templateUrl: "views/research/consultantlist.html",
			data: {
				pageTitle: '顾问流水列表'
			},
			controller: 'consultantlistController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/consultantlistService.js',
							'js/controllers/research/consultantlistController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.stocklist', {
			url: "/stocklist/:funcId",
			templateUrl: "views/research/stocklist.html",
			data: {
				pageTitle: '库存流水列表'
			},
			controller: 'stocklistController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/stocklistService.js',
							'js/controllers/research/stocklistController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.memberlist', {
			url: "/memberlist/:funcId",
			templateUrl: "views/research/memberlist.html",
			data: {
				pageTitle: '用户流水列表'
			},
			controller: 'memberlistController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/memberlistService.js',
							'js/controllers/research/memberlistController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.syscode', {
			url: "/syscode/:funcId",
			templateUrl: "views/research/syscode.html",
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
							'js/services/research/syscodeService.js',
							'js/controllers/research/syscodeController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.timedtask', {
			url: "/timedtask/:funcId",
			templateUrl: "views/research/timedtask.html",
			data: {
				pageTitle: '定时任务'
			},
			controller: 'timedtaskController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/timedtaskService.js',
							'js/controllers/research/timedtaskController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.brandbatch', {
			url: "/brandbatch/:funcId",
			templateUrl: "views/research/brandbatch.html",
			data: {
				pageTitle: '品牌批量导入'
			},
			controller: 'brandbatchController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/brandbatchService.js',
							'js/controllers/research/brandbatchController.js'
						]
					}]);
				}
			}
		})
		.state('manager.researchconfig.functionconfig', {
			url: "/functionconfig/:funcId",
			templateUrl: "views/research/functionconfig.html",
			data: {
				pageTitle: '功能点配置'
			},
			controller: 'functionconfigController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							'js/services/research/functionconfigService.js',
							'js/controllers/research/functionconfigController.js'
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
