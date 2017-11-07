angular
	.module('indexApp', ['me-lazyload'])
	.constant('indextBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.constant('ConstBaseLocation', ConstBaseLocation)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
