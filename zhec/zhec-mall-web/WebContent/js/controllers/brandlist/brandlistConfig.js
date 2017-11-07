/**
 * Created by shy on 2016/11/30.
 */
angular
	.module('brandlistApp', ['me-lazyload'])
	.constant('ConstBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 24)
	.constant('showAllGoods', 0)
	.constant('showStockGoods', 1)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
