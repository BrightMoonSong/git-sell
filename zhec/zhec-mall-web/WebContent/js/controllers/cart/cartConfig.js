/**
 * Created by shy on 2016/11/30.
 */
angular
	.module('CartApp', ['ngDialog'])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.constant('pulicUrlMall', "http://lys613.oss-cn-beijing.aliyuncs.com/public")
	.factory('CommonService', CommonService)
	.filter('priceFormatFilter', priceFormatFilter)
