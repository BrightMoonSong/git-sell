/**
 * Created by shy on 2016/11/30.
 */
var myApp = angular
	.module('searchListApp', ['me-lazyload'])
	.constant('ConstBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 24)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
