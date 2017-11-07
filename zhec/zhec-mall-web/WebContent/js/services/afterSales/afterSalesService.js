/**
 * Created by shy on 2017/2/20.
 */
angular
	.module('afterSalesApp')
	.factory('afterSalesService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + '/orders';
		return {
			//获取会员的收货信息
			getrefunddata: function(memberId,orderId,productId) {
				var defer = $q.defer();
				var url = baseUrl + "/getrefunddata?memberId=" + memberId + "&orderId=" + orderId + "&productId=" + productId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//提交
			refund: function(res,orderId,productId) {
				var defer = $q.defer();
				
				var url = baseUrl + "/refund";
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	});