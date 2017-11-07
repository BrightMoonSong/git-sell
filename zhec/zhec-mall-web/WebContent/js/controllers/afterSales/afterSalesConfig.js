/**
 * Created by shy on 2017/2/20.
 */
angular
	.module('afterSalesApp', ['ngDialog', 'ngVerify'])
	.constant('constBaseLocation', ConstBaseLocation)
	.constant('constPageSize', 10)
	.factory('CommonService', CommonService);
