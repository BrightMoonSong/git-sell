/**
 * Created by shy on 2016/12/14.
 */

document.title = titleManage.login;

var app = angular
	.module('loginApp', ['ui.router', "oc.lazyLoad", "ngVerify", "ngDialog"])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('publicUrlMall', publicUrlMall)
	.config(config)
	/*.run(function($rootScope, $state) {
		$rootScope.$state = $state;
	})*/


function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
	$urlRouterProvider.when("", "/login");

	$stateProvider
		.state("login", {
			url: "/login",
			templateUrl: "/loginPage.html",
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'loginApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							publicUrlMall + 'js/common/cookie.js',
							publicUrlMall + 'js/login/appLogin.js'
						]
					}])
				}]

			}
		})
		.state("forgetpwd", {
			url: "/forgetpwd",
			templateUrl: "/ForgetPwd.html",
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'loginApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							publicUrlMall + 'js/login/appForgetPwd.js'
						]
					}])
				}]

			}
		});
}
