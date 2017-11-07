/**
 * Created by shy on 2016/12/14.
 */

var app = angular
	.module('memberApp', ["ui.router", "oc.lazyLoad", "ngDialog", "ngVerify", "ja.qr", "me-lazyload"])
	.constant('constBaseLocation', ConstBaseLocation + "/member")
	.constant('lapiBaseLocation', ConstBaseLocation)
	.constant('constMallLocation', constMallLocation)
	.constant('publicUrlMall', publicUrlMall)
	.constant('constPageSize', 10)
	.directive('headerpage', headerpage)
	.directive('footerpage', footerpage)
	.directive('goodsindown', goodsindown)
	.directive('smallcart', smallcart)
	.directive('navigationBar', navigationBar)
	.controller('datalistpager', datalistpager)
	.directive('pagerwaitorder', pagerwaitorder)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
	.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		$urlRouterProvider.otherwise("/center");
		//$urlRouterProvider.when('',"/center");
		$ocLazyLoadProvider.config({
			// Set to true if you want to see what and when is dynamically loaded
			debug: true
		});
		$stateProvider
			.state('center', {
				url: "/center",
				templateUrl: "views/member/personalCenter.html",
				controller: 'centerController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/centerController.js",
								publicUrlMall + "js/services/member/centerService.js",
								publicUrlMall + "stylesheets/member/personalCenter.css"
							]
						}])
					}]

				}
			})
			.state('orders', {
				url: "/orders",
				templateUrl: "views/member/orders.html",
				controller: "myOrderController",
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/myOrderController.js",
								publicUrlMall + "js/services/member/myOrderService.js",
								publicUrlMall + "stylesheets/member/orders.css"
							]
						}])
					}]

				}
			})
			.state('personalInformation', {
				url: "/personalInformation",
				templateUrl: "views/member/personalInformation.html",
				controller: 'personalInformationController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/personalInformationController.js",
								publicUrlMall + "js/services/member/personalInformationService.js",
								publicUrlMall + 'stylesheets/screen.css',
								publicUrlMall + "stylesheets/member/personalInformation.css"
							]
						}])
					}]
				}
			})
			.state('property', {
				url: "/property",
				templateUrl: "views/member/property.html",
				controller: 'propertyController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/propertyController.js",
								publicUrlMall + "js/services/member/propertyService.js",
								publicUrlMall + "stylesheets/member/property.css"
							]
						}])
					}]

				}
			})
			.state('collection', {
				url: "/collection",
				templateUrl: "views/member/collect.html",
				controller: 'collectController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/collectController.js",
								publicUrlMall + "js/services/member/collectService.js",
								publicUrlMall + 'stylesheets/member/collect.css',
								publicUrlMall + "stylesheets/screen.css",
								publicUrlMall + "js/common/CommonService.js",


							]
						}])
					}]

				}
			})
			.state('address', {
				url: "/address",
				templateUrl: "views/member/address.html",
				controller: 'AddressController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + 'js/controllers/member/AddressController.js',
								publicUrlMall + 'js/services/member/AddressService.js',
								publicUrlMall + 'stylesheets/member/address.css',
								publicUrlMall + 'stylesheets/order/order_morder.css'
							]
						}])
					}]

				}
			})
			.state('generalize', {
				url: "/generalize",
				templateUrl: "views/member/generalize.html",
				controller: 'GeneralizeController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + 'js/controllers/member/GeneralizeController.js',
								publicUrlMall + 'js/services/member/GeneralizeService.js',
								publicUrlMall + 'stylesheets/member/generalize.css',
								// 'stylesheets/order/order_morder.css'
							]
						}])
					}]

				}
			})
			.state('returnOrder', {
				url: "/returnOrder",
				templateUrl: "views/member/returnOrder.html",
				controller: "returnOrderController",
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/returnOrderController.js",
								publicUrlMall + "js/services/member/returnOrderService.js",
								publicUrlMall + "stylesheets/member/returnOrder.css"
							]
						}])
					}]

				}
			})
			.state('coupon', {
				url: "/coupon",
				templateUrl: "views/member/coupon.html",
				controller: 'couponController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/couponController.js",
								publicUrlMall + "js/services/member/couponService.js",
								publicUrlMall + "stylesheets/member/coupon.css"
							]
						}])
					}]

				}
			})
			.state('prescription', {
				url: "/prescription",
				templateUrl: "views/member/prescription.html",
				controller: "prescriptionController",
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'memberApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								publicUrlMall + "js/controllers/member/prescriptionController.js",
								publicUrlMall + "js/services/member/prescriptionService.js",
								publicUrlMall + "stylesheets/member/orders.css",
								publicUrlMall + 'stylesheets/plugins/jDialog/jDialog.css',
								publicUrlMall + 'stylesheets/plugins/ngDialog/ngDialog.min.css',
								publicUrlMall + 'stylesheets/plugins/ngDialog/ngDialog-theme-default.min.css',
								publicUrlMall + 'js/plugins/jDialog/jDialog.js',
								publicUrlMall + 'js/plugins/ngDialog/ngDialog.min.js'
							]
						}])
					}]

				}
			})

	});
