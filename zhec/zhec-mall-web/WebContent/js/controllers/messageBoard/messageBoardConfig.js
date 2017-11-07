/**
 * Created by shy on 2016/11/30.
 */
angular
	.module('messageApp', ['ngDialog'])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
