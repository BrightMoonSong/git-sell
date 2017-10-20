module.exports = function(ngModule) {
	ngModule.config(config);
	ngModule.run(function($rootScope, $state) {
		$rootScope.$state = $state;
	});
	/**
	 * 路径配置
	 *
	 */
	function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		$urlRouterProvider.otherwise("/home");

		$ocLazyLoadProvider.config({
			// Set to true if you want to see what and when is dynamically loaded
			debug: true
		});
		
		$stateProvider
			.state('home', {
				url: "/home",
				template: require('../views/home/home.html'),
				//templateUrl: "views/home/home.html",
				data: {
					pageTitle: 'home'
				}
			})
			.state('first', {
				url: "/first",
				template: require('../views/first/first.html'),
				//templateUrl: "views/first/first.html",
				data: {
					pageTitle: 'first'
				}
			})
			.state('common', {
				url: "/common",
				template: require('../views/common/content.html'),
				//templateUrl: "views/common/content.html",
				data: {
					pageTitle: 'content'
				},
				controller: 'ContentController',
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'managerApp',
							insertbefore: "#ng_load_plugins_before",
							files: [
								'js/services/order/ContentService.js',
								'js/controllers/order/ContentController.js'
							]
						}])
					}]
				}
			})

	}
}