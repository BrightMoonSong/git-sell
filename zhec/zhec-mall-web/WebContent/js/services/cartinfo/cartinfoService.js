/**
 * 系统用户service定义
 */
angular
	.module('CartinfoApp')
	.factory('cartinfoService', function($http, $q, constBaseLocation) {
		
		return {
			//获取商品信息
			productInfo: function(pid) {
				var defer = $q.defer();
				var url = constBaseLocation + "/cart/productinfos?productIds=" + pid;
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
			//广告推荐位
			findRecommend: function() {
				var defer = $q.defer();
				var url = constBaseLocation + '/mallcommendgoods/findwebcommendgoods?applyType=1&size=5&commendId=12';
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},

		}
	});
