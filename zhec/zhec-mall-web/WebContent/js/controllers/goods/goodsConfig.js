var myGoodsApp = angular
	.module('goodsApp', ['ngDialog','ngVerify','me-lazyload'])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)