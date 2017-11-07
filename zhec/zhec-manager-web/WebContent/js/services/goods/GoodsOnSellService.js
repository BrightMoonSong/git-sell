angular
	.module('managerApp')
	.factory('GoodsOnSellService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goods/goodsstate'; //各种基本路径****
		return {
			//查找在售商品列表
			find: function(currentPageNo, currentPaseSize, infoName) {
				var defer = $q.defer();
				var url = baseUrl + "?pageSize=" + currentPaseSize + "&pageNo=" + currentPageNo;
				if (null !== infoName || undefined !== infoName) {
					url = url + "&infoName=" + infoName;
				}
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
			//根据商品id下架一个在售商品
			soldOutById: function(RequestData) {
				var defer = $q.defer();
				var url = baseUrl;
				$http({
					method: 'put',
					url: url,
					data: RequestData
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		};
	});
