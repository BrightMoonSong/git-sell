/**
 * 系统用户service定义
 */
angular
	.module('goodsPreviewApp')
	.factory('goodsPreviewService', function($http, $q, constBaseLocation) {
		var baseUrl = constBaseLocation + '/goods';
		
		return {
			//商品详情
			goodsDetail: function(goodsId) {
				var defer = $q.defer();
				var url = baseUrl + "/getgoodspreview/" + goodsId;
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
		}
	});
